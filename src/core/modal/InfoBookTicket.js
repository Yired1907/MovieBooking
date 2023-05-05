export class InfoBookTiket {
  maLichChieu = 0;
  danhSachVe = [];
  constructor() {}
}

class historyUserBookTicket {
  email = String;
  hoTen = String;
  loaiNguoiDung = String;
  maNhom = String;
  matKhau = String;
  soDT = null;
  taiKhoan = String;
  thongTinDatVe = [
    {
      giaVe: Number,
      hinhAnh: String,
      maVe: Number,
      ngayDat: String,
      tenPhim: String,
      thoiLuongPhim: Number,
      danhSachGhe: [
        {
          maCumRap: String,
          maGhe: Number,
          maHeThongRap: String,
          maRap: Number,
          tenCumRap: String,
          tenGhe: String,
          tenHeThongRap: String,
          tenRap: String,
        },
      ],
    },
  ];
}
export const historyUserBookTickets = new historyUserBookTicket();
