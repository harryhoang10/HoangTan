# Portfolio — Nhật ký phiên build (Session Log)

> Tổng hợp lại toàn bộ đoạn chat: từng yêu cầu của bạn → việc đã làm → kết quả/verify.
> Dự án: portfolio đa trang vai trò **Influencer Management** (hệ lime/dark + light), host dự kiến Vercel/Netlify.
> Vị trí: `Documents/AI Project/Portfolio`.

---

## Bối cảnh đầu phiên
- Đã có sẵn 9 trang HTML (Home, About, Education, Experience, AI Vibecode, Projects, Awards, Testimonials, Contact) + `conversation-summary.md`.
- Benchmark cấu trúc: **dinhthuyen** (`dinhthuyen.netlify.app/andrew_*_v49`) — bạn cung cấp thêm `portfolio-structure-blueprint.md` để deep-dive. Định hướng: học cách chia section nhưng **giữ visual riêng** để không bị nói đạo.

---

## 1. Yêu cầu: lập plan + triển khai full portfolio theo batch; đồng bộ effect; giữ chế độ sáng/tối qua mọi trang
**Đã chốt:** kiến trúc assets dùng chung · full parity Tier 1+2+3 · có page transition · tham khảo dinhthuyen từng trang.

- **Batch 0 — Nền tảng dùng chung:** tách `assets/core.css` + `assets/core.js`; **theme persist** bằng `localStorage('pf-theme')` + snippet FOUC set theme trước khi vẽ (không nháy màu) + page transition + entrance.
- **Batch 1 — Home + About:** nối vào hệ dùng chung; fix bug regex "ăn nhầm" FOUC; thêm overlay `.pgt`.
- ✅ Verify jsdom: theme giữ qua mọi trang, headline split, 0 lỗi.

## 2. Wire 7 trang còn lại + verify toàn site
- Link `core.css` trước `<style>` inline (giữ look 100%, không vỡ layout) + FOUC + `core.js` + overlay.
- ✅ **9/9 trang PASS:** theme persist + FOUC, 0 lỗi JS.

## 3. Đánh giá Batch 0–1 + nâng (enhancements, đặt vào core → uplift cả site)
- Thêm: **scroll-progress bar**, **nav scrolled state**, **staggered reveal**, **lightbox** ảnh (`data-full`), **focus-visible** a11y, **NEXT-page** pill tuần tự.
- ✅ Verify 9/9, 0 lỗi.

## 4. Yêu cầu: bỏ màn đen khi chuyển trang → mượt hơn
- Đổi page transition thành **cross-fade nội dung** (fade-out nhẹ + dịch, trang mới fade-in trên nền đúng theme); set `html` background theo theme để không lóe đen/trắng. **Bỏ overlay đen.**
- ✅ Verify 9/9.

## 5. Yêu cầu: Home hơi chậm → tối ưu hiệu năng
- rAF-throttle: headline `measure()` khi scroll (thủ phạm chính), progress, pointermove (cursor + HUD + nền). Giảm blob blur 100→72px + `will-change`.
- ✅ Verify 0 lỗi, không hồi quy.

## 6. Yêu cầu: thêm section "Let's connect" cuối Home (giống ảnh gửi)
- Thêm section identity card + 4 dòng liên hệ (Phone/Email/IG-TikTok/LinkedIn) có nút **Copy** (clipboard + toast). Dùng hệ lime/dark. Component vào core (Contact tái dùng).
- ✅ Verify copy + toast + theme.

## 7. Yêu cầu: nav thông minh — ẩn/hiện theo cuộn & chuột
- Nav **auto-hide** khi cuộn xuống, **hiện lại** khi cuộn lên hoặc đưa chuột lên mép trên; đỉnh luôn hiện; mở menu mobile không ẩn.
- ✅ Verify 4 hành vi.

## 8. Batch 2 — Education + Experience (dựng sâu theo blueprint, visual lime/dark)
- **Education:** Academic foundation (2 cột) · Coursework **GPA-meter** tự fill · 6 Certifications + dải ảnh bằng cấp (lightbox) · Continuous learning. + footer year tự điền.
- **Experience:** hero stats (count-up) + case-nav · 3 case study (filmstrip lightbox + proof card + metrics) · toolkit.
- ✅ Verify rail/lightbox/count-up/nav/theme, 0 lỗi.

## 9. Batch 3 — AI Vibecode + Projects
- **Projects:** 6 "proposal reel" (thumb đổi slide + Expand full deck + lightbox).
- **AI Vibecode:** 6 builds + tech stack · process timeline · AI toolkit.
- ✅ Verify thumb-switch + expand + rail/nav/theme.

## 10. Batch 4 — Awards + Testimonials + Contact
- **Awards:** fast-scan bento · featured award (frame mockup, lightbox) · 6 thẻ awards.
- **Testimonials:** quote-wall 6 card · logo wall.
- **Contact:** identity + dòng liên hệ Copy · **form gửi mở mail draft** (`data-to`).
- ✅ Verify (form mailto chạy; lỗi "navigation" chỉ do jsdom).

## 11. Batch 5 — Polish + verify toàn site
- Thêm **favicon** monogram lime cả 9 trang.
- ✅ Full-site: 180 link nội bộ 0 gãy · rail→section đúng · headline split · nav-active · FOUC theme · 0 ảnh thiếu alt · 0 lỗi. Cập nhật `conversation-summary.md`.

## 12. Tư vấn: sửa nội dung linh hoạt + ảnh/PDF nhẹ khi host
- Khuyến nghị: **Edit Mode in-browser** (chọn #1), **content.json** (#2), nén ảnh WebP + lazy-load + CDN/Cloudinary, PDF để link.

## 13. #1 — Edit Mode (`?edit=1`)
- Sửa text inline (contenteditable) + **auto-save localStorage** + nút **Hide** ẩn section + **Export HTML** sạch. Bỏ qua ở chế độ thường.
- ✅ Verify: 53 vùng sửa, save + hide, export sạch, normal mode không đổi. Tạo `EDIT-MODE-GUIDE.md`.

## 14. Yêu cầu: file .md outline full content để fill + hỏi nhúng video
- Tạo **`PORTFOLIO-CONTENT-GUIDE.md`** (9 trang, 🔴/🟡/⚪ + hướng dẫn từng chỗ).
- Video Experience: **CÓ** nhúng YouTube (iframe) / TikTok (embed) — chờ link để gắn.

## 15. Lean & Focus pass (lược + gom cụm + UI/UX + đồng bộ)
- Cắt **vừa:** Home 7→5 section (bỏ Words, gộp Contact CTA vào Connect, Clients 10→6, rút mô tả dịch vụ 1 dòng).
- **Thống nhất numbering 01/02…** toàn site (bỏ A/B/C).
- **Làm nhạt hiệu ứng trang con** (`pf-calm`: ẩn HUD + scanline, dịu dot-grid/blob); Home giữ full.
- ✅ Verify 9/9.

## 16. Đồng bộ nav + numbering toàn site
- Rút nhãn nav/overlay "AI Vibecode Project" → **"AI Vibecode"** (giữ tiêu đề trang đầy đủ).
- About section 02–08 → **01–07** (đồng bộ các trang khác). Trang đánh số About 01 → Contact 08; chuỗi NEXT loop đúng.
- ✅ Verify: nav 9 trang giống hệt, link 0 gãy, 0 lỗi.

## 17. #2 — `assets/content.json` (1 chỗ sửa → đồng bộ mọi tab)
- Field dùng chung (name, role, phone, email, social, linkedin, mediakit, location) đọc từ `content.json`; gắn `data-c` toàn site; loader có **fallback** (file:// fail thì giữ text mặc định); **bỏ qua khi edit mode**.
- ✅ Verify: bind đúng, fallback đúng, edit-mode skip đúng, 0 lỗi. Guide bổ sung mục #11.

---

## Trạng thái cuối phiên
**Cấu trúc file:**
```
Portfolio/
  assets/  core.css · core.js · content.json
  portfolio-home.html · portfolio-about.html
  education.html · experience.html · ai-vibecode.html
  projects.html · awards.html · testimonials.html · contact.html
  conversation-summary.md · portfolio-structure-blueprint.md
  PORTFOLIO-CONTENT-GUIDE.md · EDIT-MODE-GUIDE.md · SESSION-LOG.md
```

**Đã có:**
- 9 trang đồng bộ trên 1 hệ dùng chung (sửa core = đổi cả site).
- Theme sáng/tối giữ nguyên qua mọi trang; chuyển trang cross-fade mượt; nav auto-hide/reveal.
- Effect đầy đủ ở Home, làm nhạt ở trang con; lightbox, count-up, GPA/skill meter, proposal-reel, quote-wall, contact form mail-draft, copy + toast.
- 3 công cụ vận hành: **Edit Mode** (sửa/cắt trực quan), **content.json** (đồng bộ thông tin chung), **2 guide** (follow-up).
- Verify tự động (jsdom) qua mọi bước: 0 lỗi JS, 0 link gãy.

**Còn lại (khi bạn sẵn sàng):**
- Điền nội dung thật (đang `[placeholder]`).
- Thay ảnh thật (WebP nén) + link PDF media kit.
- (Tùy chọn) nhúng video YouTube/TikTok cho Experience.
- (Tùy chọn) gộp Education + Awards → "Credentials" (9→8 tab).
- (Tùy chọn) logo/OG image (`brandkit`).
