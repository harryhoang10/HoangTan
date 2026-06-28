# Portfolio — Influencer Management · Tổng hợp dự án

> Cập nhật mới nhất sau khi hoàn tất Batch 0→5 (kiến trúc shared assets + dựng lại đa trang theo blueprint dinhthuyen, giữ visual lime/dark).
> Vị trí: `Documents/AI Project/Portfolio`

---

## 1. Mục tiêu
Website portfolio cá nhân vai trò **Influencer Management**. Phong cách sống động, accent **Lime/Acid Green**, nền tối điện ảnh + chế độ Light. Học cách chia section của **dinhthuyen** (qua `portfolio-structure-blueprint.md`) nhưng khác visual để không bị nói đạo.

## 2. Kiến trúc (MỚI — quan trọng)
Toàn site dùng **assets dùng chung**:
- `assets/core.css` — design tokens dark/light + toàn bộ component & effect.
- `assets/core.js` — toàn bộ logic effect + tương tác.

Mỗi trang HTML chỉ: snippet FOUC trong `<head>` → `<link core.css>` → (vài CSS riêng nhỏ) → nội dung → `<script src=core.js defer>`. Sửa 1 chỗ ăn cả 9 trang.

**9 trang:** `portfolio-home.html`, `portfolio-about.html`, `education.html`, `experience.html`, `ai-vibecode.html`, `projects.html`, `awards.html`, `testimonials.html`, `contact.html`. Nav 8 mục dùng chung, mục trang hiện tại có class `cur`.

## 3. Theme & điều hướng
- **Theme persist:** lưu `localStorage('pf-theme')`; snippet FOUC set `.light` trước khi vẽ → bấm sáng/tối **giữ nguyên qua mọi trang**, không nháy màu.
- **Page transition:** cross-fade nội dung mượt (fade-out nhẹ + dịch, trang mới fade-in trên nền đúng theme) — **không còn màn đen**.
- **Nav auto-hide:** cuộn xuống ẩn, cuộn lên / đưa chuột lên mép trên thì hiện lại; ở đỉnh luôn hiện; mở menu mobile không ẩn.
- **Rail chấm phải** scroll-spy theo section + **scroll-progress bar** trên đỉnh.

## 4. Bộ effect (trong core, mọi trang)
Headline ignite theo chuột (split theo từ, không vỡ chữ) · cursor dot+ring · nền phản ứng chuột (dot-grid + spotlight) · scanline · HUD toạ độ · aurora blob + film grain · scroll reveal blur-up **staggered** · count-up · skill/GPA meter tự fill · magnetic CTA · card spotlight · marquee · **lightbox ảnh** (`data-full`) · **copy-to-clipboard + toast** · **proposal-reel** (thumb đổi slide + expand full deck) · quote-wall · contact form mở mail draft · focus-visible a11y · favicon monogram lime · footer year tự điền.
*Tối ưu hiệu năng:* scroll/pointermove rAF-throttle, blob blur giảm + will-change.

## 5. Nội dung từng trang (đã dựng sâu theo blueprint)
- **Home:** hero + marquee + What I do + Snapshot + Selected work + Clients + Words + CTA + **Let's connect** (card định danh + dòng liên hệ Copy/Open). 
- **About:** intro + story + journey + rules + skills/tools + moments + contact.
- **Education:** Academic foundation (2 cột) + coursework GPA-meter + 6 certifications + dải ảnh bằng cấp (lightbox) + continuous learning.
- **Experience:** hero stats + case-nav + 3 case study (filmstrip lightbox + proof card + metrics count-up) + toolkit.
- **AI Vibecode Project:** 6 thẻ builds + tech stack + process timeline + AI toolkit.
- **Projects:** 6 "proposal reel" (preview + thumb-row + expand full deck).
- **Awards:** fast-scan bento + featured award (frame mockup) + 6 thẻ awards.
- **Testimonials:** quote-wall 6 card + logo wall.
- **Contact:** card định danh + dòng liên hệ Copy/Open + form gửi mail draft.

Nội dung đang là **placeholder** (`[...]`) — chờ điền số/tên/ảnh/liên hệ thật.

## 6. Đã verify (tự động, jsdom)
9/9 trang: theme persist + FOUC, 0 lỗi JS, 180 link nội bộ 0 gãy, rail→section đúng, headline split, nav-active đúng, lightbox/copy/reel/contact-form chạy, 0 ảnh thiếu alt.

## 7. Cần bạn cung cấp để thay placeholder
Tên + handle (`[YOUR NAME]`), ảnh chân dung/moments/proof/cert (đang picsum), số liệu thật, nội dung Education/Experience/Awards/Testimonials, email/phone/social thật, mô tả AI Vibecode.

## 8. Bước tiếp theo (gợi ý)
1. Generate ảnh art-directed lime/dark thay picsum (`imagegen-frontend-web`).
2. Logo/monogram + OG image (`brandkit`).
3. Media kit PDF tải về (`pdf`).
4. Điền nội dung thật từng trang.
