# APP
## Made by Group 88
1. Nguyễn Thái Tiệp 
2. Vũ Tố Uyên
## Tech
1. NodeJs, express
2. HMTL, JavaScript, css
3. Database : mysql
4. other: md5,...
## Run
1. npm run dev (terminal)
2. localhost:3000 (browser)

## Giới thiệu
### Math Learning là dự án mô phỏng lại phần mềm học toán tại trang web dragonlearn.in dành cho các bạn học sinh lớp 2 Thông qua phần mềm, học sinh có thể hiểu biết và thực hành tốt hơn trong các bài toán sử dụng phép cộng.
### Sản phẩm gốc :  https://bit.ly/sanphamgoc

## Chức năng
### Login
1. GET : /login : show ra màn hình login
2. POST: /login : kiểm tra tài khoản và mật khẩu có đúng không
3. Lưu ý:

-  Nếu chưa login thì không thể vào các màn hình tiếp theo
### Create-  Mật khẩu được bảo mật theo cơ thế mã hóa md5
1. GET :/create : show ra màn hình create
2. POST: /create : gửi thông tin đăng kí lên csdl và kiểm tra
-  Mật khẩu được bảo mật theo cơ thế mã hóa md5
### Home
1. GET :/home : show ra màn hình home
- Màn hình home có 2 lựa chọn : UFO và Market cho học sinh có thể lựa chọn trò chơi
### Màn chơi 1
1. GET : /screen/UFOSCreen : show màn hơi 1 UFO Screen
- Đây là trò chơi giúp học sinh có được kiến thức thực thế về phép toán cộng 2 số bằng 10
- Học sinh sẽ thực hiện kéo thả các đối tượng số đến với nhau sao cho tổng của chúng bằng 10
- Nếu đúng, 1 viền xanh sẽ xuất hiện, cả 2 đối tượng đều di chuyển về UFO và sau đó biến mất
- Nếu sai, 1 viền đỏ sẽ xuất hiện, cả 2 đối tượng sẽ trở lại vị trí ban đầu
- Kết thúc 1 lượt chơi, màn chơi mới sẽ xuất hiện
- Sau khi kết thúc 5 màn chơi, màn hình win  xuất hiện
### Màn chơi 2
1. GET : /screen/MarketScreen : show màn hơi 1 Market Screen
- Đây là trò chơi giúp học sinh có được kiến thức thực thế về phép toán cộng 2 số bằng 10
- Học sinh sẽ thực hiện kéo thả các đối tượng số đến vào hộp sao cho tổng của chúng bằng 10
- nếu đúng, 1 màn hình paid sẽ xuất hiện, và 1 màn chơi mới sẽ xuất hiện
- nếu sai, các đối tượng số trở về vị trí ban đầu
- Sau khi kết thúc 5 màn chơi, màn win sẽ xuất hiện
