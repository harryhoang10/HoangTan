# Portfolio — Hướng dẫn điền nội dung (Content Fill Guide)

> File này liệt kê **toàn bộ cấu trúc 9 trang từ trên xuống dưới**, mỗi phần ghi rõ **cần điền gì**, mức độ **🔴 Bắt buộc / 🟡 Nên có / ⚪ Tùy chọn**, và gợi ý nội dung phù hợp.
> Dùng để: (a) tự điền qua **Edit Mode** (`?edit=1`), hoặc (b) đưa cho tôi và nói "điền/sửa phần X" — tôi theo file này để làm đúng.
>
> **Quy ước:** chỗ trong `[ngoặc vuông]` = placeholder cần thay. Ảnh đang dùng `picsum.photos` = ảnh tạm, cần thay bằng ảnh thật trong `assets/img/`.

---

## 0. TOÀN CỤC (xuất hiện ở mọi trang)

| Mục | Mức | Cần điền | Gợi ý |
|---|---|---|---|
| `[YOUR NAME]` | 🔴 | Tên hiển thị (nav, footer, tiêu đề tab) | Tên thật hoặc tên thương hiệu cá nhân. Xuất hiện ~3 chỗ/trang. |
| Subtitle "Influencer Management" | ⚪ | Chức danh ngắn dưới tên | Giữ hoặc đổi: "Creator Partnerships", "Influencer Marketing"… |
| Nav 8 mục | ⚪ | Tên mục điều hướng | Giữ nguyên trừ khi muốn đổi nhãn. |
| Footer — link social | 🔴 | href Instagram / TikTok / LinkedIn / Email | Đang để `#`. Thay bằng URL thật. Email dùng `mailto:ban@email.com`. |
| Favicon | ⚪ | Icon tab trình duyệt | Đang là monogram tia chớp lime. Đổi sau bằng logo thật (`brandkit`). |
| Theme sáng/tối | ✅ | Không cần điền | Tự chạy. |

> **Mẹo:** Sửa `[YOUR NAME]` 1 lần cho mỗi trang qua Edit Mode, hoặc nhờ tôi thay đồng loạt cả site trong 1 lệnh.

---

## 1. HOME — `portfolio-home.html`

**Hero (#top)**
- 🔴 Eyebrow: nhãn nhỏ trên tiêu đề — vd "Influencer Management System".
- 🔴 H1: câu hook chính — vd "I run the **engine** behind creators." (từ in lime là điểm nhấn).
- 🔴 Lede: 1–2 câu mô tả bạn làm gì (sourcing, booking, briefing, tracking).
- 🟡 Badge: trạng thái — "Open for bookings & partnerships".
- 🟡 2 nút CTA: nhãn + link (mặc định → Projects, → Contact).
- 🟡 Chips (5): các mảng kỹ năng ngắn.
- 🔴 Ảnh chân dung: thay `picsum…/influencermgr` → ảnh bạn (vuông, ~640×640).
- 🟡 Persona quote: 1 câu "định vị" cá tính.

**Marquee (băng chữ chạy)** — ⚪ các từ dịch vụ lặp.

**01 · What I do (#do)** — 🔴 tiêu đề + **4 thẻ dịch vụ** (mỗi thẻ: tên + 1–2 câu). Gợi ý: Creator management / Booking & negotiation / Brief & QC / Tracking & reporting.

**02 · Snapshot (#snapshot)** — 🔴 **4 số liệu thật** (số chạy count-up) + nhãn. Vd: 40+ creators, 120+ campaigns, 85M reach, 30+ brands. *(Sửa số ở thuộc tính `data-to`.)*

**03 · Selected work (#work)** — 🟡 3 case nổi bật (ảnh + tag ngành + tên + mô tả + **3 kết quả**: reach/engagement/sales). Có thể ẩn nếu trùng trang Projects.

**04 · Clients (#clients)** — 🟡 ~10 logo brand (text "[Logo]" → ảnh logo thật trong `assets/img/`).

**05 · Words (#words)** — 🟡 1 trích dẫn lớn + tên + chức danh + avatar.

**06 · Contact CTA (#cta)** — ⚪ câu kêu gọi + nút.

**07 · Let's connect (#connect)** — 🔴 tên, vai trò, chips (khu vực/thành phố/trạng thái), 3 nút (Media kit/Email/LinkedIn), **4 dòng liên hệ** (Phone/Email/IG-TikTok/LinkedIn).
> ⚠️ Khi sửa giá trị liên hệ, sửa **cả phần hiển thị lẫn nút Copy** (nút Copy đọc từ thuộc tính `data-copy`, phải khớp).

---

## 2. ABOUT — `portfolio-about.html`

- 🔴 **Intro:** 1 đoạn giới thiệu bản thân (bạn là ai, làm influencer management thế nào).
- 🟡 **Story:** câu chuyện/định hướng nghề (2–3 đoạn).
- 🟡 **Journey (timeline):** các mốc thời gian — năm + tiêu đề + mô tả ngắn (học/việc/bước ngoặt).
- 🟡 **Four rules:** 4 nguyên tắc làm việc (số + tên + mô tả).
- 🟡 **Skills & tools:** thanh kỹ năng + tag công cụ (xem mục "skill meter" ở phần Lưu ý kỹ thuật).
- ⚪ **Person:** vài câu cá nhân (sở thích, tính cách).
- 🟡 **Moments (ảnh):** dải ảnh đời thường/hậu trường — thay picsum.
- 🔴 **Contact:** thông tin liên hệ (đồng bộ với Home/Contact).

---

## 3. EDUCATION — `education.html`

**Hero (#top)** — 🔴 H1 + 🟡 lede.

**A · Academic foundation (#foundation)**
- 🔴 Tên bằng cấp (vd "Bachelor of Marketing & Communications").
- 🔴 Trường + khoa (`[University name] — [Faculty]`).
- 🟡 Mô tả ngắn chuyên ngành.
- 🟡 Focus chips (6) + 🟡 thời gian học.

**B · Degree & coursework (#degree)**
- 🟡 **6 môn học + điểm** (GPA-meter). Sửa tên môn, điểm hiển thị (vd "3.8 / 4.0"), và **độ dài thanh** = điểm/4×100% (vd 3.8 → `--val:95%`).
- ⚪ Bỏ bớt môn nếu muốn lean (ẩn qua Edit Mode).

**C · Certifications (#certs)**
- 🟡 **6 thẻ chứng chỉ:** tên + đơn vị cấp + năm + 1 câu mô tả. Gợi ý ngành: Meta Blueprint, TikTok, GA4, HubSpot, Influencer Marketing, Looker.
- 🟡 **4 ảnh bằng/chứng chỉ:** thay picsum → ảnh thật (click phóng to được). ⚪ Có thể để link PDF sau.

**D · Continuous learning (#learning)** — ⚪ tag-wall các khóa/kỹ năng đang học.

---

## 4. EXPERIENCE — `experience.html`

**Hero (#top)** — 🔴 H1 + 🔴 đoạn intro + 🟡 jump-links + 🔴 **4 stats** (count-up).

**3 Case study (#case1 / #case2 / #case3)** — mỗi case:
- 🔴 Tên công ty + 🔴 vai trò + 🟡 thời gian + địa điểm.
- 🟡 4 chips (mảng công việc).
- 🟡 **Ảnh proof (filmstrip)** — thay picsum → ảnh thật (click phóng to). ⚪ số lượng tùy ý.
- 🟡 3 proof-card (label + tiêu đề + mô tả việc đã làm).
- 🟡 3 metrics (count-up) cho case.
> ⚪ Có thể giảm còn 2 case, hoặc thêm case (nhờ tôi nhân bản block).

**🎬 Nhúng video (TÙY CHỌN — CÓ làm được):**
- **YouTube:** dán link → tôi gắn `<iframe>` player (gọn, nhẹ, tự responsive). Hợp cho video case/recap.
- **TikTok:** nhúng bằng embed chính thức (blockquote + script) hoặc iframe — hiện player TikTok ngay trong case.
- 👉 Muốn dùng: gửi tôi link + case nào, tôi thêm "video block" vào case đó (đặt cạnh hoặc thay filmstrip). Tôi sẽ thêm 1 component dùng chung để sau này chỉ cần dán link.

**Toolkit (#stack)** — ⚪ tag-wall công cụ.

---

## 5. AI VIBECODE PROJECT — `ai-vibecode.html`

**Hero (#top)** — 🔴 H1 + 🔴 đoạn intro (bạn không phải dev nhưng dùng AI build tool).

**A · Builds (#builds)** — 🟡 **6 thẻ:** tên tool + mô tả + **stack tags**. Thẻ #1 "This portfolio" nên giữ (chính là bằng chứng). 5 thẻ còn lại điền tool thật bạn từng vibe-code (hoặc ẩn bớt).

**B · Process (#process)** — ⚪ 4 bước quy trình (giữ được, hoặc viết theo cách bạn làm).

**C · Stack (#stack)** — ⚪ tag-wall công cụ AI.

---

## 6. PROJECTS — `projects.html`

**Hero (#top)** — 🔴 H1 + 🟡 lede + 🟡 jump-links.

**6 "Proposal reel" (#p1 … #p6)** — mỗi project:
- 🔴 Tên project + 🟡 loại (ngành) + 🟡 năm + 🟡 số slide.
- 🔴 Mô tả 1–2 câu.
- 🟡 4 tags.
- 🟡 **Ảnh slide:** thumbnail (đổi slide) + preview lớn + full-deck (bung ra). Thay picsum → ảnh deck thật. ⚪ Caption từng slide.
> ⚪ Giảm/ tăng số project: nhờ tôi thêm/bớt block (mặc định 6).

---

## 7. AWARDS — `awards.html`

**Hero (#top)** — 🔴 H1 + 🟡 lede.

**A · Fast-scan (#preview)** — 🟡 4 stat chip (count-up) — vd awards / features / nominations / testimonials.

**B · Featured (#featured)** — 🟡 1 giải nổi bật: **ảnh chứng nhận** (khung mockup, click phóng to) + tên giải + mô tả + đơn vị trao + năm + tags.

**C · The list (#list)** — 🟡 **6 thẻ award:** tên + đơn vị + năm + mô tả. ⚪ Ẩn bớt nếu ít giải.
> Nếu chưa nhiều award: giữ 2–3 cái thật, ẩn phần còn lại cho gọn (Edit Mode → Hide).

---

## 8. TESTIMONIALS — `testimonials.html`

**Hero (#top)** — 🔴 H1 + 🟡 lede.

**A · Quote wall (#words)** — 🔴 **6 trích dẫn:** nội dung + tên người + chức danh + avatar. Gợi ý: brand lead, founder, creator. ⚪ Ít hơn cũng được (ẩn bớt).

**B · Brands (#brands)** — 🟡 ~10 logo brand (thay "[Logo]" → ảnh).

---

## 9. CONTACT — `contact.html`

**Hero (#top)** — 🔴 H1 + 🟡 lede.

**Identity & details (#cards)**
- 🔴 Tên + vai trò + chips (khu vực/thành phố/trạng thái).
- 🟡 3 nút: Media kit (link PDF), Message me (→ form), LinkedIn (link).
- 🔴 **4 dòng liên hệ** (Phone/Email/IG-TikTok/LinkedIn) — nhớ khớp giá trị hiển thị với nút Copy (`data-copy`).

**Send a message (#form)**
- 🔴 Đặt **email nhận** ở thuộc tính `data-to` của form (đang `[you@email.com]`). Form mở mail draft tới email này.

---

## Lưu ý kỹ thuật khi điền

- **Số đếm (count-up):** sửa con số ở thuộc tính `data-to="..."` (số nguyên). Hậu tố như `+`, `M`, `%` nằm ngoài, sửa riêng.
- **Thanh kỹ năng/GPA (meter):** độ dài = `--val:NN%`. GPA: điểm/4×100 (3.6→90%). Skill: tự ước theo %.
- **Nút Copy:** giá trị copy nằm ở `data-copy="..."` — phải khớp text hiển thị.
- **Ảnh:** thay link `picsum.photos/...` bằng `assets/img/ten-anh.webp`. Nén WebP trước (xem khuyến nghị hosting). Ảnh nào click phóng to thì có cả `src` (nhỏ) và `data-full` (lớn).
- **PDF/Media kit:** để link (Google Drive/CDN) vào nút tương ứng — không cần upload nặng vào repo.
- **Cắt section:** dùng Edit Mode → **Hide** → **Export** (section bị loại khỏi file).
- **Email form:** đổi `data-to` trên thẻ `<form>` trang Contact.

---

## Cách nhờ tôi điều chỉnh sau này
Chỉ cần nói kiểu: *"Điền Education theo info: trường X, bằng Y, GPA Z…"* hoặc *"Cắt section Clients ở Home"*, *"Thêm video YouTube [link] vào case 1 Experience"*, *"Đổi 6 project còn 4"*. Tôi sẽ theo đúng cấu trúc trong file này để chỉnh.

---

## 11. `assets/content.json` — sửa 1 chỗ, đồng bộ mọi tab

Các thông tin **dùng chung lặp ở nhiều trang** (tên, vai trò, liên hệ, social) giờ đọc từ **`assets/content.json`**. Sửa file này → tất cả trang tự cập nhật (tên ở nav + footer + card liên hệ, số điện thoại/email + nút Copy, link Instagram/TikTok/LinkedIn, media kit, email nhận của form Contact, cả tiêu đề tab).

**Các khóa trong content.json:**

| Khóa | Ý nghĩa |
|---|---|
| `name` | Tên hiển thị (nav, footer, card) |
| `role` | Chức danh ngắn (subtitle) |
| `phone` / `email` | SĐT / email (hiện + nút Copy + form) |
| `social_handle` | @handle Instagram/TikTok |
| `instagram_url` / `tiktok_url` / `linkedin_url` | Link social |
| `linkedin_text` | Text hiển thị LinkedIn |
| `mediakit_url` | Link media kit (PDF/Drive) |
| `location` / `city` | Khu vực / thành phố |

**Lưu ý quan trọng:**
- `content.json` chỉ áp dụng **khi site chạy trên host (Vercel/Netlify)** hoặc local server. Mở trực tiếp file `.html` (file://) trình duyệt chặn đọc JSON → trang **tự fallback** về text mặc định trong HTML (không lỗi).
- Đây là nguồn cho **field dùng chung**. Text riêng từng trang (mô tả, case, project…) vẫn sửa qua **Edit Mode** hoặc nhờ tôi.
- **Edit Mode (`?edit=1`) bỏ qua content.json** để bạn sửa raw — nên dùng content.json cho thông tin chung, Edit Mode cho nội dung riêng.
