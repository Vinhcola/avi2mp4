# FFVN Video AutoConvert - Hướng Dẫn Cài Đặt Chi Tiết

## Dành cho người dùng không chuyên về IT

Hướng dẫn này sẽ giúp bạn cài đặt và sử dụng ứng dụng **FFVN Video AutoConvert** một cách đơn giản, từng bước một.

---

## 📋 Mục Lục

1. [Yêu Cầu Hệ Thống](#yêu-cầu-hệ-thống)
2. [Cài Đặt Node.js](#bước-1-cài-đặt-nodejs)
3. [Tải Về Ứng Dụng](#bước-2-tải-về-ứng-dụng)
4. [Cài Đặt Ứng Dụng](#bước-3-cài-đặt-ứng-dụng)
5. [Chạy Ứng Dụng](#bước-4-chạy-ứng-dụng)
6. [Sử Dụng Ứng Dụng](#bước-5-sử-dụng-ứng-dụng)
7. [Xử Lý Lỗi Thường Gặp](#xử-lý-lỗi-thường-gặp)

---

## Yêu Cầu Hệ Thống

Trước khi bắt đầu, hãy đảm bảo máy tính của bạn:

- ✅ Hệ điều hành: **Windows 10** hoặc **Windows 11**
- ✅ Kết nối Internet (chỉ cần khi cài đặt)
- ✅ Quyền Administrator (để cài đặt phần mềm)

---

## Bước 1: Cài Đặt Node.js

Node.js là phần mềm cần thiết để chạy ứng dụng.

### 1.1. Tải Node.js

1. Mở trình duyệt web (Chrome, Edge, Firefox...)
2. Truy cập: **https://nodejs.org/**
3. Bạn sẽ thấy 2 nút tải:
   - **LTS** (khuyến nghị) - bấm vào nút này
   - **Current** - không cần dùng

4. File tải về sẽ có tên như: `node-v20.x.x-x64.msi`

### 1.2. Cài Đặt Node.js

1. Mở file vừa tải về (thường ở thư mục **Downloads**)
2. Bấm **Next** → **Next** → **Next** (giữ nguyên các tùy chọn mặc định)
3. Bấm **Install** (có thể cần nhập mật khẩu Administrator)
4. Đợi cài đặt hoàn tất (khoảng 1-2 phút)
5. Bấm **Finish**

### 1.3. Kiểm Tra Cài Đặt

1. Nhấn phím **Windows** + **R**
2. Gõ: `cmd` và nhấn **Enter**
3. Trong cửa sổ đen (Command Prompt), gõ:
   ```
   node --version
   ```
4. Nếu hiển thị số phiên bản (ví dụ: `v20.11.0`) → **Thành công!**
5. Nếu báo lỗi → Xem phần [Xử Lý Lỗi](#xử-lý-lỗi-thường-gặp)

---

## Bước 2: Tải Về Ứng Dụng

### 2.1. Tải Từ GitHub

1. Mở trình duyệt web
2. Truy cập: **https://github.com/Vinhcola/avi2mp4**
3. Bấm nút màu xanh **Code** (ở góc trên bên phải)
4. Chọn **Download ZIP**
5. File tải về sẽ có tên: `avi2mp4-main.zip`

### 2.2. Giải Nén File

1. Tìm file `avi2mp4-main.zip` trong thư mục **Downloads**
2. Click chuột phải vào file → Chọn **Extract All...** (hoặc **Giải nén tất cả...**)
3. Chọn thư mục giải nén (ví dụ: `D:\` hoặc `C:\Users\YourName\`)
4. Bấm **Extract** (Giải nén)
5. Sau khi giải nén, bạn sẽ có thư mục: `avi2mp4-main`

### 2.3. Đổi Tên Thư Mục (Tùy chọn)

1. Click chuột phải vào thư mục `avi2mp4-main`
2. Chọn **Rename** (Đổi tên)
3. Đổi tên thành: `avi2mp4` (để dễ nhớ)

---

## Bước 3: Cài Đặt Ứng Dụng

### 3.1. Mở Command Prompt Trong Thư Mục Ứng Dụng

**Cách 1: Dùng File Explorer**
1. Mở thư mục `avi2mp4` (đã giải nén ở bước trên)
2. Click vào thanh địa chỉ (nơi hiển thị đường dẫn)
3. Gõ: `cmd` và nhấn **Enter**
4. Cửa sổ Command Prompt sẽ mở ra trong thư mục này

**Cách 2: Dùng Command Prompt**
1. Nhấn **Windows** + **R**
2. Gõ: `cmd` và nhấn **Enter**
3. Gõ lệnh (thay `D:\avi2mp4` bằng đường dẫn thực tế của bạn):
   ```
   cd D:\avi2mp4
   ```

### 3.2. Cài Đặt Dependencies

1. Trong cửa sổ Command Prompt, gõ lệnh:
   ```
   npm install
   ```
2. Nhấn **Enter**
3. Đợi quá trình cài đặt (có thể mất 2-5 phút)
4. Bạn sẽ thấy nhiều dòng chữ chạy qua
5. Khi thấy dòng: `added XXX packages` → **Thành công!**

**Lưu ý:**
- Lần đầu cài đặt có thể mất thời gian
- Cần kết nối Internet
- Nếu gặp lỗi, xem phần [Xử Lý Lỗi](#xử-lý-lỗi-thường-gặp)

---

## Bước 4: Chạy Ứng Dụng

### 4.1. Chạy Ứng Dụng (Development Mode)

1. Trong cửa sổ Command Prompt (vẫn ở thư mục `avi2mp4`)
2. Gõ lệnh:
   ```
   npm run dev
   ```
3. Nhấn **Enter**
4. Đợi 10-30 giây (ứng dụng đang khởi động)
5. Cửa sổ ứng dụng sẽ tự động mở ra

**Lưu ý:**
- Giữ cửa sổ Command Prompt mở (đừng đóng)
- Để dừng ứng dụng: Nhấn **Ctrl + C** trong cửa sổ Command Prompt

### 4.2. Tạo File .exe (Tùy chọn - Cho Người Dùng Cuối)

Nếu muốn tạo file `.exe` để chạy trực tiếp (không cần Command Prompt):

1. Trong cửa sổ Command Prompt, gõ:
   ```
   npm run build
   ```
2. Nhấn **Enter**
3. Đợi 5-10 phút (quá trình build)
4. File `.exe` sẽ được tạo trong thư mục `dist/`
5. Bạn có thể chạy file `.exe` này trực tiếp (double-click)

---

## Bước 5: Sử Dụng Ứng Dụng

### 5.1. Giao Diện Ứng Dụng

Khi mở ứng dụng, bạn sẽ thấy:

- **Header**: "FFVN Video AutoConvert" và "Medical IT Utility"
- **Configuration**: Hiển thị 3 thông tin:
  - Watch Folder: `D:/ffvn/avi`
  - Output Folder: `D:/ffvn/mp4`
  - Interval: `60 seconds`
- **Buttons**: START và STOP
- **Status**: Trạng thái (Watching... hoặc Stopped)
- **Logs**: Hiển thị các hoạt động chuyển đổi

### 5.2. Chuẩn Bị Thư Mục

**Quan trọng:** Trước khi sử dụng, hãy tạo 2 thư mục:

1. **Thư mục nguồn** (chứa file AVI):
   - Tạo thư mục: `D:\ffvn\avi`
   - Đặt các file AVI cần chuyển đổi vào đây

2. **Thư mục đích** (chứa file MP4 sau khi convert):
   - Tạo thư mục: `D:\ffvn\mp4`
   - File MP4 sẽ được tạo tự động ở đây

**Cách tạo thư mục:**
1. Mở **File Explorer** (Windows + E)
2. Vào ổ đĩa **D:**
3. Tạo thư mục mới: `ffvn`
4. Trong thư mục `ffvn`, tạo 2 thư mục: `avi` và `mp4`

### 5.3. Sử Dụng Ứng Dụng

**Bước 1: Đặt File AVI**
- Copy các file AVI cần chuyển đổi vào thư mục: `D:\ffvn\avi`

**Bước 2: Bắt Đầu Chuyển Đổi**
- Click nút **START** trong ứng dụng
- Status sẽ chuyển thành "Watching..." (màu xanh)

**Bước 3: Theo Dõi Quá Trình**
- Ứng dụng sẽ tự động kiểm tra thư mục mỗi 60 giây
- Khi phát hiện file AVI, sẽ tự động chuyển đổi
- Xem tiến trình trong phần **Logs**

**Bước 4: Kiểm Tra Kết Quả**
- File MP4 sẽ được tạo trong: `D:\ffvn\mp4`
- File AVI gốc vẫn được giữ trong: `D:\ffvn\avi`

**Bước 5: Dừng Ứng Dụng**
- Click nút **STOP** khi muốn dừng
- Hoặc đóng cửa sổ ứng dụng

---

## Xử Lý Lỗi Thường Gặp

### ❌ Lỗi: "node is not recognized"

**Nguyên nhân:** Node.js chưa được cài đặt hoặc chưa được thêm vào PATH.

**Giải pháp:**
1. Cài đặt lại Node.js (xem [Bước 1](#bước-1-cài-đặt-nodejs))
2. Sau khi cài, **khởi động lại máy tính**
3. Thử lại lệnh `node --version`

### ❌ Lỗi: "npm is not recognized"

**Nguyên nhân:** npm chưa được cài đặt (thường đi kèm với Node.js).

**Giải pháp:**
1. Cài đặt lại Node.js (đảm bảo chọn đầy đủ các tùy chọn)
2. Khởi động lại máy tính
3. Thử lại lệnh `npm --version`

### ❌ Lỗi: "Port 3333 already in use"

**Nguyên nhân:** Có ứng dụng khác đang dùng port 3333.

**Giải pháp:**
1. Đóng tất cả cửa sổ Command Prompt cũ
2. Đóng ứng dụng đang chạy
3. Khởi động lại máy tính (nếu cần)
4. Thử chạy lại `npm run dev`

### ❌ Lỗi: "Cannot find module"

**Nguyên nhân:** Dependencies chưa được cài đặt.

**Giải pháp:**
1. Đảm bảo đang ở đúng thư mục `avi2mp4`
2. Chạy lại: `npm install`
3. Đợi cài đặt hoàn tất
4. Thử lại `npm run dev`

### ❌ Lỗi: "FFmpeg not found"

**Nguyên nhân:** FFmpeg chưa được đặt trong thư mục `ffmpeg/bin/`.

**Giải pháp:**
1. Kiểm tra thư mục `ffmpeg/bin/` có file `ffmpeg.exe` không
2. Nếu không có, tải FFmpeg từ: https://ffmpeg.org/download.html
3. Giải nén và copy file `ffmpeg.exe` vào `ffmpeg/bin/`

### ❌ Lỗi: "Watch folder not found"

**Nguyên nhân:** Thư mục `D:\ffvn\avi` chưa được tạo.

**Giải pháp:**
1. Tạo thư mục `D:\ffvn\avi` (xem [Bước 5.2](#52-chuẩn-bị-thư-mục))
2. Đảm bảo thư mục tồn tại trước khi chạy ứng dụng

### ❌ Ứng Dụng Không Mở

**Nguyên nhân:** Có thể do nhiều nguyên nhân.

**Giải pháp:**
1. Kiểm tra cửa sổ Command Prompt có hiển thị lỗi không
2. Đợi thêm 30 giây (ứng dụng cần thời gian khởi động)
3. Kiểm tra Windows Firewall có chặn không
4. Thử chạy lại: `npm run dev`

### ❌ File Không Được Chuyển Đổi

**Nguyên nhân:** Có thể do file AVI bị lỗi hoặc FFmpeg không hoạt động.

**Giải pháp:**
1. Kiểm tra file AVI có mở được bằng trình phát video không
2. Kiểm tra logs trong ứng dụng để xem lỗi chi tiết
3. Đảm bảo có đủ dung lượng ổ đĩa
4. Kiểm tra quyền truy cập vào thư mục

---

## 📞 Hỗ Trợ

Nếu gặp vấn đề không giải quyết được:

1. **Kiểm tra Logs**: Xem phần Logs trong ứng dụng để biết lỗi chi tiết
2. **Liên Hệ IT Team**: Gửi thông tin lỗi và screenshot cho IT team
3. **GitHub Issues**: Tạo issue tại https://github.com/Vinhcola/avi2mp4/issues

---

## ✅ Checklist Cài Đặt

Trước khi sử dụng, hãy đảm bảo:

- [ ] Node.js đã được cài đặt (`node --version` hiển thị số phiên bản)
- [ ] Ứng dụng đã được tải về và giải nén
- [ ] Đã chạy `npm install` thành công
- [ ] Thư mục `D:\ffvn\avi` đã được tạo
- [ ] Thư mục `D:\ffvn\mp4` đã được tạo
- [ ] FFmpeg đã có trong thư mục `ffmpeg/bin/`
- [ ] Ứng dụng chạy được (`npm run dev`)

---

## 🎉 Hoàn Tất!

Chúc mừng! Bạn đã cài đặt thành công **FFVN Video AutoConvert**.

Bây giờ bạn có thể:
- Đặt file AVI vào `D:\ffvn\avi`
- Click **START** để bắt đầu chuyển đổi
- File MP4 sẽ tự động được tạo trong `D:\ffvn\mp4`

**Lưu ý:** File AVI gốc sẽ được giữ nguyên, không bị xóa.

---

*Hướng dẫn này được viết cho người dùng không chuyên về IT. Nếu bạn có kinh nghiệm về IT, có thể tham khảo file README.md để biết thêm chi tiết kỹ thuật.*


