import { BaseEntity } from 'src/common/mysql/base.entity';
import { UserDto } from 'src/users/users.dto';
import { User } from 'src/users/users.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

export enum Country {
    VN = "Vietnam",
    US = "United States",
    TL = "Thailand"
}

export enum Province {
    VN_HaNoi = 'Hà Nội',
    VN_HoChiMinh = 'Hồ Chí Minh',
    VN_HaiPhong = 'Hải Phòng',
    VN_DaNang = 'Đà Nẵng',
    VN_CanTho = 'Cần Thơ',
    VN_HaiDuong = 'Hải Dương',
    VN_BacNinh = 'Bắc Ninh',
    VN_ThaiNguyen = 'Thái Nguyên',
    VN_QuangNinh = 'Quảng Ninh',
    VN_NamDinh = 'Nam Định',
    VN_HaGiang = 'Hà Giang',
    VN_LaoCai = 'Lào Cai',
    VN_CaoBang = 'Cao Bằng',
    VN_LangSon = 'Lạng Sơn',
    VN_TuyenQuang = 'Tuyên Quang',
    VN_BacGiang = 'Bắc Giang',
    VN_PhuTho = 'Phú Thọ',
    VN_VinhPhuc = 'Vĩnh Phúc',
    VN_BacKan = 'Bắc Kạn',
    VN_ThaiBinh = 'Thái Bình',
    VN_HungYen = 'Hưng Yên',
    VN_QuangNam = 'Quảng Nam',
    VN_QuangNgai = 'Quảng Ngãi',
    VN_BinhDinh = 'Bình Định',
    VN_PhuYen = 'Phú Yên',
    VN_KhanhHoa = 'Khánh Hòa',
    VN_NinhThuan = 'Ninh Thuận',
    VN_BinhThuan = 'Bình Thuận',
    VN_KonTum = 'Kon Tum',
    VN_GiaLai = 'Gia Lai',
    VN_DakLak = 'Đắk Lắk',
    VN_DakNong = 'Đắk Nông',
    VN_LamDong = 'Lâm Đồng',
    VN_BinhPhuoc = 'Bình Phước',
    VN_TayNinh = 'Tây Ninh',
    VN_BinhDuong = 'Bình Dương',
    VN_DongNai = 'Đồng Nai',
    VN_BaRiaVungTau = 'Bà Rịa - Vũng Tàu',
    VN_LongAn = 'Long An',
    VN_TienGiang = 'Tiền Giang',
    VN_BenTre = 'Bến Tre',
    VN_TraVinh = 'Trà Vinh',
    VN_VinhLong = 'Vĩnh Long',
    VN_DongThap = 'Đồng Tháp',
    VN_AnGiang = 'An Giang',
    VN_KienGiang = 'Kiên Giang',
    VN_HauGiang = 'Hậu Giang',
    VN_SocTrang = 'Sóc Trăng',
    VN_BacLieu = 'Bạc Liêu',
    VN_CaMau = 'Cà Mau',
    VN_DienBien = 'Điện Biên',
    VN_LaiChau = 'Lai Châu',
    VN_SonLa = 'Sơn La',
    VN_YenBai = 'Yên Bái',
    VN_HoaBinh = 'Hòa Bình',
    VN_ThanhHoa = 'Thanh Hóa',
    VN_NgheAn = 'Nghệ An',
    VN_HaTinh = 'Hà Tĩnh',
    VN_QuangBinh = 'Quảng Bình',
    VN_QuangTri = 'Quảng Trị',
    VN_ThuaThienHue = 'Thừa Thiên Huế',
    US_Alabama = 'Alabama',
    US_Alaska = 'Alaska',
    US_Arizona = 'Arizona',
    US_Arkansas = 'Arkansas',
    US_California = 'California',
    US_Colorado = 'Colorado',
    US_Connecticut = 'Connecticut',
    US_Delaware = 'Delaware',
    US_Florida = 'Florida',
    US_Georgia = 'Georgia',
    US_Hawaii = 'Hawaii',
    US_Idaho = 'Idaho',
    US_Illinois = 'Illinois',
    US_Indiana = 'Indiana',
    US_Iowa = 'Iowa',
    US_Kansas = 'Kansas',
    US_Kentucky = 'Kentucky',
    US_Louisiana = 'Louisiana',
    US_Maine = 'Maine',
    US_Maryland = 'Maryland',
    US_Massachusetts = 'Massachusetts',
    US_Michigan = 'Michigan',
    US_Minnesota = 'Minnesota',
    US_Mississippi = 'Mississippi',
    US_Missouri = 'Missouri',
    US_Montana = 'Montana',
    US_Nebraska = 'Nebraska',
    US_Nevada = 'Nevada',
    US_NewHampshire = 'New Hampshire',
    US_NewJersey = 'New Jersey',
    US_NewMexico = 'New Mexico',
    US_NewYork = 'New York',
    US_NorthCarolina = 'North Carolina',
    US_NorthDakota = 'North Dakota',
    US_Ohio = 'Ohio',
    US_Oklahoma = 'Oklahoma',
    US_Oregon = 'Oregon',
    US_Pennsylvania = 'Pennsylvania',
    US_RhodeIsland = 'Rhode Island',
    US_SouthCarolina = 'South Carolina',
    US_SouthDakota = 'South Dakota',
    US_Tennessee = 'Tennessee',
    US_Texas = 'Texas',
    US_Utah = 'Utah',
    US_Vermont = 'Vermont',
    US_Virginia = 'Virginia',
    US_Washington = 'Washington',
    US_WestVirginia = 'West Virginia',
    US_Wisconsin = 'Wisconsin',
    US_Wyoming = 'Wyoming',
    TL_Bangkok = 'Bangkok',
    TL_Nonthaburi = 'Nonthaburi',
    TL_NakhonPathom = 'Nakhon Pathom',
    TL_SamutSakhon = 'Samut Sakhon',
    TL_SamutPrakan = 'Samut Prakan',
    TL_PathumThani = 'Pathum Thani',
    TL_PhraNakhonSiAyutthaya = 'Phra Nakhon Si Ayutthaya',
    TL_AngThong = 'Ang Thong',
    TL_Lopburi = 'Lopburi',
    TL_SingBuri = 'Sing Buri',
    TL_ChaiNat = 'Chai Nat',
    TL_Saraburi = 'Saraburi',
    TL_Chonburi = 'Chonburi',
    TL_Rayong = 'Rayong',
    TL_Chanthaburi = 'Chanthaburi',
    TL_Trat = 'Trat',
    TL_Chachoengsao = 'Chachoengsao',
    TL_Prachinburi = 'Prachinburi',
    TL_NakhonNayok = 'Nakhon Nayok',
    TL_SaKaeo = 'Sa Kaeo',
    TL_ChiangMai = 'Chiang Mai',
    TL_Lamphun = 'Lamphun',
    TL_Lampang = 'Lampang',
    TL_Uttaradit = 'Uttaradit',
    TL_Phrae = 'Phrae',
    TL_Nan = 'Nan',
    TL_Phayao = 'Phayao',
    TL_ChiangRai = 'Chiang Rai',
    TL_MaeHongSon = 'Mae Hong Son',
    TL_NakhonSawan = 'Nakhon Sawan',
    TL_UthaiThani = 'Uthai Thani',
    TL_KamphaengPhet = 'Kamphaeng Phet',
    TL_Tak = 'Tak',
    TL_Sukhothai = 'Sukhothai',
    TL_Phitsanulok = 'Phitsanulok',
    TL_Phichit = 'Phichit',
    TL_Phetchabun = 'Phetchabun',
    TL_Ratchaburi = 'Ratchaburi',
    TL_Kanchanaburi = 'Kanchanaburi',
    TL_Suphanburi = 'Suphanburi',
    TL_SamutSongkhram = 'Samut Songkhram',
    TL_Phetchaburi = 'Phetchaburi',
    TL_PrachuapKhiriKhan = 'Prachuap Khiri Khan',
    TL_NakhonSiThammarat = 'Nakhon Si Thammarat',
    TL_Krabi = 'Krabi',
    TL_PhangNga = 'Phang Nga',
    TL_Phuket = 'Phuket',
    TL_SuratThani = 'Surat Thani',
    TL_Ranong = 'Ranong',
    TL_Chumphon = 'Chumphon',
    TL_Songkhla = 'Songkhla',
    TL_Satun = 'Satun',
    TL_Trang = 'Trang',
    TL_Phatthalung = 'Phatthalung',
    TL_Pattani = 'Pattani',
    TL_Yala = 'Yala',
    TL_Narathiwat = 'Narathiwat',
    TL_BuengKan = 'Bueng Kan',
    TL_NongKhai = 'Nong Khai',
    TL_SakonNakhon = 'Sakon Nakhon',
    TL_NakhonPhanom = 'Nakhon Phanom',
    TL_Mukdahan = 'Mukdahan',
    TL_Yasothon = 'Yasothon',
    TL_RoiEt = 'Roi Et',
    TL_Kalasin = 'Kalasin',
    TL_MahaSarakham = 'Maha Sarakham',
    TL_Buriram = 'Buriram',
    TL_Surin = 'Surin',
    TL_Sisaket = 'Sisaket',
    TL_UbonRatchathani = 'Ubon Ratchathani',
    TL_AmnatCharoen = 'Amnat Charoen',
    TL_NakhonRatchasima = 'Nakhon Ratchasima',
    TL_UdonThani = 'Udon Thani',
    TL_Loei = 'Loei',
    TL_NongBuaLamphu = 'Nong Bua Lamphu',
    TL_KhonKaen = 'Khon Kaen',
    TL_Chaiyaphum = 'Chaiyaphum',
    TL_Pattaya = 'Pattaya',
}

@Entity({
    name: 'addresses'
})
export class Address extends BaseEntity {

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({nullable: true})
    company: string;

    @Column({nullable: true})
    address1: string;

    @Column({nullable: true})
    address2: string;

    @Column({
        type: 'enum',
        enum: Country,
        default: Country.VN
    })
    country: Country

    @Column({
        type: 'enum',
        enum: Province,
        default:Province.VN_HoChiMinh
    })
    province: Province

    @Column({nullable: true})
    phoneNumber: string;

    @Column({default: false})
    default:boolean

    @ManyToOne(() => User, (user) => user.addresses)
    user: UserDto
}



