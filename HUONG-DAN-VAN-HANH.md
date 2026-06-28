# HƯỚNG DẪN VẬN HÀNH PORTFOLIO (tất tần tật)

> Đọc file này là hiểu **toàn bộ cách chạy, sửa, thay ảnh/text, gắn link, và đưa lên mạng**.
> Portfolio: 8 trang HTML dùng chung 1 bộ `assets/` (CSS + JS + content.json). Vai trò: Business Development → Influencer Management.

---

## 0. BẢN ĐỒ FILE (cái gì nằm ở đâu)

```
Portfolio/
├─ portfolio-home.html      ← Trang chủ (Hero, Dashboard, Selected work, Organisations, CONTACT)
├─ portfolio-about.html     ← Giới thiệu (story, journey, skills)
├─ education.html           ← Học vấn + chứng chỉ
├─ experience.html          ← Kinh nghiệm (PMAX, xSCORE, Influencer)
├─ ai-vibecode.html         ← AI initiatives / tool tự build
├─ projects.html            ← Dự án (có drawer "View details" + Deck)
├─ awards.html              ← Achievements & Leadership
├─ testimonials.html        ← Reference + tổ chức
│
├─ assets/
│   ├─ core.css             ← TOÀN BỘ giao diện, màu, hiệu ứng
│   ├─ core.js              ← TOÀN BỘ tương tác (theme, drawer, recruiter mode, nút nổi…)
│   ├─ content.json         ← ⭐ Thông tin chung (tên, sđt, email, LinkedIn, CV) — sửa 1 chỗ, đồng bộ mọi trang
│   └─ Hoang-Nhu-Quoc-Tan-CV.pdf   ← File CV để tải về
│
└─ (các file .md hướng dẫn — không hiển thị trên web)
```

> ⚠️ **Trang Contact đã bỏ** — toàn bộ liên hệ nằm ở **cuối trang Home** (mục `#connect`). Nav "Contact" và nút nổi đều nhảy về đó.

---

## 1. XEM THỬ TRÊN MÁY (bắt buộc để sửa đúng)

Mở **Terminal**, dán:

```
cd "/Users/hoangtan/Documents/AI Project/Portfolio" && python3 -m http.server 8000
```

Mở trình duyệt: **http://localhost:8000/portfolio-home.html** · Dừng: `Ctrl + C`.

> 📌 **Vì sao phải localhost?** `content.json` (tên/sđt/email/CV) chỉ nạp khi chạy qua server. Mở thẳng file `.html` (nhấp đúp) trình duyệt chặn → trang dùng giá trị mặc định trong HTML (không lỗi, nhưng không đồng bộ).

---

## 2. SỬA NỘI DUNG — 3 CÁCH (dễ → sâu)

### Cách A — `content.json` (thông tin chung, sửa 1 lần áp mọi trang) ⭐ dùng nhiều nhất
Mở `assets/content.json`, sửa giá trị trong ngoặc kép, lưu lại:

| Khóa | Là gì | Ví dụ |
|---|---|---|
| `name` | Tên hiển thị (nav, footer, card) | "Hoàng Như Quốc Tấn" |
| `role` | Chức danh ngắn dưới tên | "Influencer Management" |
| `phone` | SĐT (hiện + nút gọi + Copy) | "0345 543 548" |
| `email` | Email (hiện + nút mail + Copy) | "harryhoang10@gmail.com" |
| `linkedin_url` | Link LinkedIn (mở khi bấm) | "https://www.linkedin.com/in/…" |
| `linkedin_text` | Chữ hiển thị LinkedIn | "Tấn Hoàng Như Quốc" |
| `mediakit_url` | File CV để tải | "assets/Hoang-Nhu-Quoc-Tan-CV.pdf" |
| `location` / `city` | Khu vực / thành phố | "Ho Chi Minh City" |

→ Sửa xong, refresh localhost là thấy đổi khắp nơi.

### Cách B — Edit Mode trong trình duyệt (sửa text từng trang, không cần code) ⭐ dễ nhất cho text riêng
1. Thêm `?edit=1` vào cuối URL, ví dụ: `http://localhost:8000/about.html?edit=1` → trang vào **chế độ sửa**.
2. **Bấm thẳng vào chữ** để sửa (tự lưu trong trình duyệt).
3. Nút **Hide** ở góc mỗi section để ẩn phần không dùng.
4. Bấm **Export HTML** (thanh dưới) → tải file `.html` sạch về → **thay file cũ** trong folder Portfolio.
5. Thoát: bấm **Exit** hoặc bỏ `?edit=1`.
> (Chi tiết hơn: xem `EDIT-MODE-GUIDE.md`.) Edit Mode **bỏ qua content.json** để bạn sửa thô — nên dùng content.json cho info chung, Edit Mode cho nội dung riêng từng trang.

### Cách C — Sửa thẳng HTML (hoặc nhờ tôi)
Mở file `.html` bằng VS Code, tìm đoạn chữ cần đổi và sửa. Hoặc nhắn tôi: *"Điền Experience case Influencer theo info…"* — tôi sửa đúng cấu trúc.
> Bản đồ chỗ nào điền gì: xem `PORTFOLIO-CONTENT-GUIDE.md`.

---

## 3. THAY ẢNH (đang dùng ảnh tạm `picsum.photos`)

**Quy trình:**
1. Tạo thư mục `assets/img/` (nếu chưa có), bỏ ảnh thật vào đó.
2. **Nén sang WebP** trước khi dùng (nhẹ, tải nhanh): dùng https://squoosh.app → xuất `.webp`.
3. Trong HTML, đổi đường dẫn ảnh:
   - Tìm: `src="https://picsum.photos/seed/xxx/640/640"`
   - Thay thành: `src="assets/img/ten-anh.webp"`

**Kích thước gợi ý:**
| Vị trí | Tỷ lệ / cỡ |
|---|---|
| Ảnh chân dung (Home hero) | vuông ~640×640 |
| Ảnh case / proof (Experience) | dọc 4:5 (~640×800) |
| Ảnh chứng chỉ (Education) | ngang 4:3 (~600×450) |
| Slide deck (Projects) | ngang 16:10 (~1200×750) |
| Avatar reference | vuông ~80×80 |

**Ảnh bấm phóng to (lightbox):** cần CẢ 2 thuộc tính — ảnh nhỏ ở `src`, ảnh lớn ở `data-full`:
```html
<img src="assets/img/anh-nho.webp" data-full="assets/img/anh-lon.webp" alt="Mô tả"/>
```
> Mẹo tìm nhanh mọi ảnh tạm: trong VS Code bấm `Ctrl+Shift+F`, tìm `picsum.photos`.

---

## 4. PROJECTS & DRAWER "VIEW DETAILS" (kiểu CRM)

Trên trang **Projects** (và AI Vibecode), mỗi card có nút **"View details"** → mở **panel trượt phải** với tab **Overview / Deck / Details**.

**Tab "Deck" lấy slide từ đâu?** Từ các khối `<figure>` trong phần `full-stack` của mỗi project. Muốn đổi slide thật:
```html
<figure>
  <img src="assets/img/deck1-1.webp" data-full="assets/img/deck1-1.webp" alt=""/>
  <figcaption>01 · Tên slide / nội dung 1 dòng</figcaption>
</figure>
```
- Đổi `src`/`data-full` = ảnh slide thật.
- Đổi chữ trong `<figcaption>` (giữ kiểu "01 · …", "02 · …" để đánh số đẹp).
- Thêm/bớt `<figure>` = thêm/bớt slide (số đếm "Deck (n)" tự cập nhật).

> Overview & tags trong drawer tự lấy từ tiêu đề + mô tả + tag của card → bạn chỉ cần sửa nội dung card là drawer cập nhật theo.

---

## 5. RECRUITER MODE (overlay quét 60 giây)

Nút **"⚡ Recruiter mode"** góc dưới-trái. Nội dung (tên, pitch, 4 KPI, 3 proof) **nằm trong `assets/core.js`**.
- Mở `core.js`, tìm `rec-card` (hoặc `rec-kpi`).
- Sửa số/chữ trong đoạn đó (ví dụ đổi KPI, proof). Lưu, refresh.
> Đây là chỗ duy nhất cần đụng code; còn lại đều sửa qua content.json / Edit Mode.

---

## 6. CÁC FILE & LINK GẮN VÀO (CV, media kit, social)

| Muốn gắn | Làm gì |
|---|---|
| **CV tải về** | Thay file `assets/Hoang-Nhu-Quoc-Tan-CV.pdf` (giữ nguyên tên) HOẶC đổi `mediakit_url` trong content.json sang link Google Drive/PDF mới. |
| **LinkedIn** | Sửa `linkedin_url` trong content.json (đã gắn link của bạn). |
| **SĐT / Email** | Sửa `phone` / `email` trong content.json → tự thành nút gọi (tel:) / gửi mail (mailto:). |
| **File nặng (deck, media kit)** | Upload lên Google Drive → đặt quyền "Anyone with link" → dán link vào nút tương ứng (đừng nhét file nặng vào repo). |
| **Video (YouTube/TikTok)** | Gửi tôi link + vị trí, tôi nhúng iframe. |

---

## 7. ĐƯA LÊN MẠNG (HOSTING) — & "vào link nào để có quyền sửa"

### 7.1 GitHub (đã setup sẵn) — nơi chứa source & cấp quyền sửa
- **Repo của bạn:** https://github.com/harryhoang10/HoangTan.git (đăng nhập github.com bằng tài khoản **harryhoang10**).
- **Đẩy thay đổi lên:** mở Terminal tại folder Portfolio, chạy:
  ```
  git add -A && git commit -m "update noi dung" && git push
  ```
- **Sửa nhanh ngay trên web:** vào repo trên github.com → mở file → bấm icon ✏️ (Edit) → sửa → "Commit changes". (Hợp cho sửa text nhỏ, không cần máy.)

### 7.2 Đưa thành website chạy thật — chọn 1 trong 3 (đều miễn phí)

**A) Netlify (dễ nhất, khuyên dùng)**
1. Vào **https://app.netlify.com** → đăng nhập bằng GitHub.
2. "Add new site" → "Import an existing project" → chọn repo **HoangTan**.
3. Build command: để trống · Publish directory: `.` → Deploy.
4. Được link dạng `https://ten-cua-ban.netlify.app`. Mỗi lần `git push` → **tự cập nhật**.
5. Đổi tên/subdomain: Site settings → Domain.

**B) Vercel** — tương tự: **https://vercel.com** → đăng nhập GitHub → Import repo → Deploy.

**C) GitHub Pages** — repo Settings → Pages → Source: branch `main`, folder `/root` → Save → link `https://harryhoang10.github.io/HoangTan/`.

> Sau khi host: gửi đường link site (vd `…netlify.app/portfolio-home.html`) cho nhà tuyển dụng. Trên host, `content.json` + nút CV chạy đầy đủ.

---

## 8. BẢNG TRA NHANH "Tôi muốn… → Làm gì"

| Tôi muốn… | Làm gì |
|---|---|
| Đổi tên / sđt / email / LinkedIn | `assets/content.json` |
| Đổi CV tải về | Thay file PDF cùng tên trong `assets/` |
| Sửa 1 câu chữ trên 1 trang | Mở trang đó với `?edit=1` → bấm vào chữ → Export → thay file |
| Thay ảnh | Bỏ ảnh `.webp` vào `assets/img/` → đổi `src` (và `data-full` nếu bấm phóng to) |
| Thêm/sửa slide dự án | Sửa `<figure><img><figcaption>` trong `projects.html` |
| Đổi KPI / proof ở Recruiter Mode | `assets/core.js`, tìm `rec-card` |
| Đổi màu / giao diện | `assets/core.js`→ không; giao diện ở `assets/core.css` (biến màu ở đầu file: `--lime`, `--bg`…) |
| Đưa thay đổi lên web | `git add -A && git commit -m "..." && git push` |
| Nhờ tôi làm | Nhắn: "sửa/điền [phần] theo [nội dung]" |

---

## 9. LƯU Ý QUAN TRỌNG (đọc 1 lần)

- **content.json chỉ chạy trên localhost/host**, không chạy khi mở file trực tiếp → luôn test bằng localhost (Mục 1).
- **Số đếm động (count-up):** chỉ sửa số nguyên trong `data-to="50"`; hậu tố `%`, `+`, `M` nằm ngoài.
- **Nút Copy** đọc từ `data-copy` — nếu sửa sđt/email thẳng trong HTML, sửa luôn `data-copy` cho khớp (hoặc cứ dùng content.json là tự khớp).
- **Ảnh phóng to** phải có cả `src` và `data-full`.
- **Đừng commit file nặng** (ảnh gốc chưa nén, video) → dùng Google Drive/link.
- Các file `.md` (kể cả file này) **không hiển thị** trên web — chỉ để bạn tham khảo.

---

## 10. CÁC FILE HƯỚNG DẪN KHÁC (đã có sẵn)
- `PORTFOLIO-CONTENT-GUIDE.md` — bản đồ chi tiết từng trang cần điền gì.
- `EDIT-MODE-GUIDE.md` — hướng dẫn sâu Edit Mode.
- `ENHANCEMENT-PLAN.md` / `MECE-AUDIT.md` / `REVOLUTION-PROPOSAL.md` — chiến lược nâng cấp & lộ trình.

> Cần gì thêm cứ nhắn — gửi tôi nội dung/ảnh, tôi điền đúng chỗ và giữ mọi thứ chạy ổn.
