# Conversation Summary — Portfolio Hoàng Như Quốc Tấn

> Tổng hợp toàn bộ quá trình làm việc trên portfolio (điền nội dung CV → fix UI/UX → tính năng cách mạng → tài liệu vận hành). Dùng để nắm nhanh "đã làm gì, đang ở đâu, làm tiếp gì".

---

## 1. Bối cảnh
- **Chủ nhân:** Hoàng Như Quốc Tấn — UEH (International Business, GPA 3.98/4.00, TOEIC 970). Định vị: **Business Development → Influencer Management**, nhắm intern/Management Trainee mảng Marketing/Brand tại tập đoàn đa quốc gia.
- **Portfolio:** site tĩnh đa trang (HTML/CSS/JS thuần), hệ dùng chung `assets/` (core.css · core.js · content.json). Benchmark tham khảo: `dinhthuyen.netlify.app`.
- **Repo:** https://github.com/harryhoang10/HoangTan.git (đã init + commit; user tự `git push`).

---

## 2. Đã làm (theo nhóm)

**A. Điền nội dung thật từ CV**
- `content.json`: tên, SĐT (0345 543 548), email (harryhoang10@gmail.com), LinkedIn thật.
- Education: UEH, GPA 3.98, Top 501–600 THE, certs thật (TOEIC 970, COBRP, Young Researchers Award B…).
- Experience: 2 case BD thật theo STAR — **PMAX** (conversion <40%→>50%, +30% YoY revenue, N8N −20% workload) & **xSCORE** (proposals, contracts, landing page). Case Influencer để placeholder (import sau).
- About viết lại trung thực (bỏ "5+ năm" hư cấu); Awards → **Achievements & Leadership** (học bổng ×3, Young Researchers, campaign Xuân Giảng Đường 30+ SV / 12.5M VND); Testimonials → reference thật + "references on request".

**B. Fix UI/UX & nhất quán**
- Lỗi "màu xanh": tên brand + link social bị màu link mặc định → fix CSS.
- Accent **lime**: night giữ #c7f73b, light đổi #5c9a00 (đỡ chìm).
- Effect đồng nhất: bỏ `pf-calm` dimming → mọi trang full effect như Home.
- **Spotlight theo chuột** đồng bộ mọi loại card.
- **Font tiếng Việt**: đổi Clash Display (vỡ dấu) → **Outfit** + fallback Plus Jakarta.

**C. Tính năng & cấu trúc**
- **Nav sticky** luôn hiện (bỏ auto-hide).
- **Nút Contact nổi** kéo-thả được, mọi trang → nhảy về khu liên hệ Home.
- Bỏ **trang Contact**, gom liên hệ về cuối Home (`#connect`); bỏ IG/TikTok; **click-to-act** (số→gọi, email→mailto, LinkedIn→mở).
- **CV tải về** + OG/social meta (Home).

**D. "Sprint cách mạng"**
- **Impact Dashboard** ở Home (micro-bar + delta animate).
- **Recruiter Mode** — overlay quét 60 giây (KPI + proof + CV/Email/LinkedIn).
- **Drawer chi tiết kiểu CRM** cho Projects/AI Vibecode (trượt phải, tab Overview / Deck slide đánh số / Details); level-up thêm hero + facts + nền gradient chống ảnh đen; fix tương phản "Expand full deck" night mode.

**E. Tài liệu**
- `HUONG-DAN-VAN-HANH.md` — vận hành tất tần tật (sửa text/ảnh/link, Edit Mode, drawer, hosting, quyền sửa).
- `PLAN-BACKLOG.md` — mọi thứ chưa làm/sơ sài, chia 9 batch.
- `ENHANCEMENT-PLAN.md`, `MECE-AUDIT.md`, `REVOLUTION-PROPOSAL.md` — chiến lược & lộ trình.

---

## 3. Trạng thái hiện tại
- 8 trang: Home · About · Education · Experience · AI Vibecode · Projects · Awards (Achievements) · Testimonials. (Contact gộp vào Home.)
- Verify qua mỗi bước: 0 link gãy, JS/CSS hợp lệ, không còn placeholder danh tính.
- Đã commit nhiều mốc; **chờ user `git push`** để lên GitHub + deploy.

## 4. Files chính
```
assets/ core.css · core.js · content.json · Hoang-Nhu-Quoc-Tan-CV.pdf
8 trang .html
Docs: HUONG-DAN-VAN-HANH.md · PLAN-BACKLOG.md · ENHANCEMENT-PLAN.md ·
      MECE-AUDIT.md · REVOLUTION-PROPOSAL.md · conversation-summary.md ·
      PORTFOLIO-CONTENT-GUIDE.md · EDIT-MODE-GUIDE.md · SESSION-LOG.md
```

## 5. Làm tiếp (xem PLAN-BACKLOG.md)
Cốt lõi: **Batch 1** (nội dung thật: Influencer case, Projects, AI builds, Testimonials) → **Batch 3** (chiều sâu drawer STAR + slide thật) → **Batch 4** (MECE). Song song: ảnh thật, CV 1 trang mới, deploy.

## 6. Cách tiếp tục
Nói kiểu *"điền [phần] theo [nội dung]"*, *"làm Batch X"*, hoặc bỏ ảnh vào `assets/img/` rồi nhắn. Test localhost: `cd "…/Portfolio" && python3 -m http.server 8000`.
