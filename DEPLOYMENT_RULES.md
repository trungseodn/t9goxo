# BẢN QUY TẮC BẢO TOÀN DỮ LIỆU & QUY TRÌNH TRIỂN KHAI HỆ THỐNG VPS
**Dự án**: T9 Goxo Reels & Image Automation (`t9.goxo.us`)  
**Ngày thiết lập**: 11/11/2026  
**Trạng thái**: Có hiệu lực bắt buộc cho toàn bộ chu trình phát triển & bảo trì  

---

## 1. TÔN CHỈ BẤT BIẾN (CORE SAFETY PRINCIPLES)

1. **BẢO TOÀN DỮ LIỆU VÀ CÁC DỰ ÁN KHÁC TRÊN VPS (ZERO INTERFERENCE & DATA LOSS)**:
   * VPS này có thể chạy cùng các dự án khác trong tương lai hoặc hiện tại.
   * **Nghiêm cấm tuyệt đối đụng chạm, sửa đổi, dừng (stop), xóa, hoặc ghi đè bất kỳ file/container/database/port nào của các dự án khác.**
   * Toàn bộ mã nguồn, container, docker volume, network và cấu hình của `t9` phải được cô lập hoàn toàn (prefix `ztreel9_`, thư mục riêng `/root/ztreel9-app`).

2. **QUẢN LÝ MÃ NGUỒN PHÂN TÁCH HOÀN TOÀN**:
   * **Upstream (Template gốc)**: `https://github.com/trungseodn/t6goxo` $\rightarrow$ **CHỈ ĐỌC (READ-ONLY)**.
   * **Origin (Phát triển chính)**: `https://github.com/trungseodn/t9goxo` $\rightarrow$ Toàn bộ code phát triển, tính năng mới và deploy đều đi qua repo này.

3. **CƠ CHẾ PHÊ DUYỆT (EXPLICIT APPROVAL)**:
   * Mọi can thiệp vào VPS (pull code mới, chạy migration, rebuild container, sửa cấu hình Nginx) đều phải tuân thủ cô lập hoàn toàn cho `t9`.

---

## 2. HƯỚNG DẪN ĐĂNG NHẬP & KẾT NỐI VPS (SSH ACCESS DETAILS)

* **IP Server**: `161.97.130.4` (Port: `22`)
* **Domain trỏ về**: `t9.goxo.us`
* **User**: `root`
* **Đường dẫn thư mục dự án trên VPS**: `/root/ztreel9-app`
* **File Docker Compose**: `docker-compose.t9.yml`

### Các câu lệnh SSH chuẩn:

1. **Mở phiên SSH tương tác (Interactive Shell)**:
   ```powershell
   ssh -o StrictHostKeyChecking=no root@161.97.130.4
   ```

2. **Chạy lệnh đơn từ PowerShell (One-shot command)**:
   ```powershell
   ssh -o BatchMode=yes -o StrictHostKeyChecking=no root@161.97.130.4 '<câu_lệnh_bash>'
   ```

3. **Xem trạng thái các container của T9**:
   ```powershell
   ssh -o BatchMode=yes -o StrictHostKeyChecking=no root@161.97.130.4 'docker ps --filter "name=ztreel9"'
   ```

4. **Xem log realtime của API T9**:
   ```powershell
   ssh -o StrictHostKeyChecking=no root@161.97.130.4 'docker logs -f ztreel9_api_prod --tail 100'
   ```

---

## 3. THIẾT KẾ CÔ LẬP HỆ THỐNG T9 TRÊN VPS

* **Thư mục dự án**: `/root/ztreel9-app`
* **Docker Compose file**: `docker-compose.t9.yml`
* **Containers của T9**:
  * `ztreel9_api_prod` (API NestJS - Port host `3009` -> container `3000`)
  * `ztreel9_web_prod` (Frontend React - Port host `8089` -> container `80`)
  * `ztreel9_postgres_prod` (PostgreSQL 15 - Port host `5439` -> container `5432`)
  * `ztreel9_redis_prod` (Redis 7 - Port host `6389` -> container `6379`)
* **Docker Volumes cô lập**:
  * `ztreel9-app_ztreel9_postgres_data`
  * `ztreel9-app_ztreel9_redis_data`
  * `ztreel9-app_ztreel9_storage`
  * `ztreel9-app_ztreel9_uploads`
* **Docker Network riêng**: `ztreel9_net`

---

## 4. CÁC ĐIỀU CẤM TUYỆT ĐỐI (STRICT PROHIBITIONS)

❌ **NGHIÊM CẤM** đụng đến bất kỳ thư mục hoặc container/volume/process nào không thuộc `ztreel9`.  
❌ **NGHIÊM CẤM** dùng lệnh `docker compose down -v` hoặc `docker-compose down -v` (Cờ `-v` sẽ xóa sạch các Docker Volume dữ liệu!).  
❌ **NGHIÊM CẤM** dùng lệnh `npx prisma db push --force-reset` hoặc `npx prisma migrate reset`.  
❌ **NGHIÊM CẤM** tự ý xóa file `.env` hoặc `apps/api/.env` trên VPS.  
❌ **NGHIÊM CẤM** chỉnh sửa trực tiếp mã nguồn trên VPS bằng tay. Mọi thay đổi phải đi từ Local $\rightarrow$ Commit Git $\rightarrow$ Pull về VPS.  
❌ **NGHIÊM CẤM** push code lên repo upstream `trungseodn/t6goxo` (chỉ push lên `trungseodn/t9goxo`).  
