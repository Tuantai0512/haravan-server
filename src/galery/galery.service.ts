import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Galery } from "./galery.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { S3 } from "aws-sdk";
import { ProductService } from "src/product/product.service";
import slugify from "slugify";

@Injectable()
export class GaleryService {
    private readonly region;
    private readonly accessKeyId;
    private readonly secretAccessKey;
    private readonly publicBucketName;

    constructor(
        @InjectRepository(Galery)
        private readonly galeryRepository: Repository<Galery>,
        private readonly configService: ConfigService,
        private readonly productService: ProductService,
    ) {
        this.region = this.configService.get('AWS_REGION'),
            this.accessKeyId = this.configService.get('AWS_ACCESS_KEY_ID'),
            this.secretAccessKey = this.configService.get('AWS_SECRET_ACCESS_KEY'),
            this.publicBucketName = this.configService.get('AWS_PUBLIC_BUCKET_NAME')
    }

    private getS3() {
        return new S3({
            region: this.region,
            accessKeyId: this.accessKeyId,
            secretAccessKey: this.secretAccessKey,
        })
    }

    getLinkMediaKey(media_key: string) {
        const s3 = this.getS3()
        return s3.getSignedUrl('getObject', {
            Key: media_key,
            Bucket: this.publicBucketName,
        })
    }

    slug = (str: string) => {
        if (!str) return "";

        str = slugify(str, {
            lower: true,      // convert to lower case, defaults to `false`
            locale: 'vi',      // language code of the locale to use 
            strict: true,     // strip special characters except replacement, defaults to `false`   
        });

        return str
    }

    async upload(file, productId: string) {
        const product = await this.productService.findOne(productId);

        if (product) {
            const arrName = file.originalname.split('.');
            const extension = arrName.pop();
            const name = arrName.join('.');
            const data = {
                name: name,
                fileName: String(file.originalname),
                mimeType: file.mimetype,
                size: file.size
            }
            const newPhoto = this.galeryRepository.create(data);
            newPhoto.product = product;
            if(product.galery.length == 0){
                newPhoto.avatar = true;
            }else{
                newPhoto.avatar = false;
            }
            newPhoto.key = `${this.slug(product.title)}/${this.slug(name)}.${extension}`;
            let urlParam = new URL(this.getLinkMediaKey(newPhoto.key));
            let urlWithoutParams = urlParam.origin + urlParam.pathname;
            newPhoto.url = urlWithoutParams;
            await this.uploadS3(file.buffer, newPhoto.key, file.mimetype);
            return await this.galeryRepository.save(newPhoto);
        } else {
            throw new NotFoundException(`product doesn't exist`)
        }
    }

    private async uploadS3(file_buffer, key, content_type) {
        const s3 = this.getS3();
        const params = {
            Bucket: this.publicBucketName,
            Key: key,
            Body: file_buffer,
            ContentType: content_type,
            ACL: 'public-read', // comment if private file
        };
        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
                if (err) {
                    reject(err.message);
                }
                resolve(data);
            });
        });
    }

    async deleteFileS3(media_id: string) {
        const media = await this.galeryRepository.findOneBy({ id: media_id });
        if (media) {
            const duplicatePhoto = await this.galeryRepository
                .createQueryBuilder('galery')
                .where('galery.key = :key', { key: media.key })
                .getMany();
            if (duplicatePhoto.length == 1) {
                const s3 = this.getS3();
                const params = {
                    Bucket: this.publicBucketName,
                    Key: media.key,
                };
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                s3.deleteObject(params, (err, data) => { });
            }
            await this.galeryRepository.delete(media_id);
            return true;
        } else {
            throw new NotFoundException(`Product's photo doesn't exist`);
        }
    }

    async update(photo: Galery): Promise<any> {
        if(!photo.id){
            throw new BadRequestException(`Enter product's photo id, please!!!!!`)
        }
        const selectedPhoto = await this.galeryRepository.findOne({ 
            where: { id: photo.id },
            relations: {
                product: true
            },
        });
        if(photo.avatar){
            const product = await this.productService.findOne(selectedPhoto.product.id);
            const avatarPhoto = product.galery.find(photo => photo.avatar);
            if(avatarPhoto){
                const unavatarPhoto = this.galeryRepository.create(avatarPhoto);
                unavatarPhoto.avatar = false;
                await this.galeryRepository.update(avatarPhoto.id, unavatarPhoto);
            };
        }else{
            const product = await this.productService.findOne(selectedPhoto.product.id);
            const avatarPhoto = product.galery.find(photo => photo.avatar);
            if(avatarPhoto){
                if(avatarPhoto.id === photo.id){
                    photo.avatar = true;
                };
            };
        }

        const changePhoto = this.galeryRepository.create(photo);
        const result =  await this.galeryRepository.update(photo.id, changePhoto);
        if (result.affected) {
            return { message: 'Updated photo' };
        } else {
            throw new BadRequestException({ message: 'Update photo failed' }) ;
        }
    }
}