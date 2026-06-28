# Edit Mode — hướng dẫn nhanh

Công cụ sửa nội dung & cắt section ngay trong trình duyệt, **không cần đụng code**.

## Bật Edit Mode
Mở trang bạn muốn sửa và **thêm `?edit=1` vào cuối URL**, ví dụ:
- `…/portfolio-home.html?edit=1`
- `…/education.html?edit=1`

Một thanh **EDIT MODE** sẽ hiện ở đáy màn hình.

## Sửa chữ
- **Click thẳng vào bất kỳ đoạn text nào** (tiêu đề, mô tả, chip, số liệu, tên…) rồi gõ để sửa.
- Tự **auto-save** sau mỗi lần gõ (xem chữ "Saved ✓" trên thanh dưới). Lưu trong trình duyệt nên reload không mất.

## Cắt bớt section (làm nội dung lean hơn)
- Mỗi section có nút **Hide** ở góc trên phải → bấm để ẩn. Bấm **Show** để hiện lại.
- Section đã ẩn sẽ **bị loại khỏi file khi Export** (cắt thật, không chỉ giấu).

## Lưu ra file để đăng
1. Bấm **Export HTML** trên thanh dưới → tải về file `.html` đã sửa (sạch, không còn dấu vết edit).
2. **Thay file cũ** trong thư mục Portfolio bằng file vừa tải.
3. Re-deploy lên Vercel/Netlify (hoặc kéo thả lại).

## Các nút khác
- **Reset:** xoá mọi chỉnh sửa của trang đó (về bản gốc).
- **Exit:** thoát Edit Mode (về URL thường, không `?edit=1`).

## Lưu ý
- Auto-save dùng bộ nhớ trình duyệt (localStorage) → chỉ trên **máy/trình duyệt của bạn**. Muốn nội dung lên web thật thì phải **Export → thay file → deploy**.
- Edit Mode chỉ bật khi có `?edit=1`. Khách xem trang bình thường **không thấy** thanh sửa.
- Sửa từng trang một (mỗi trang có vùng nhớ riêng).
