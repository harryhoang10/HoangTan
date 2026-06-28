# Rà soát logic file (MECE) + Room to enhance UI/UX

> MECE = **M**utually **E**xclusive (không trùng lặp), **C**ollectively **E**xhaustive (đủ, không hổng).
> Kết luận nhanh: **CE đạt tốt** (9 trang phủ đủ những gì recruiter cần). Vấn đề chính nằm ở **ME — có vài chỗ trùng nội dung** giữa các trang. Dưới đây là chỗ chồng lấn, chỗ hổng, và cách nắn lại.

---

## A. Bản đồ trách nhiệm 9 trang (mỗi trang nên "sở hữu" 1 việc)

| Trang | Sở hữu (nên là duy nhất) |
|---|---|
| Home | Hook + định vị 5 giây + điều hướng. Chỉ **teaser**, không chứa nội dung chi tiết. |
| About | Câu chuyện *why* + tư duy làm việc + con người. |
| Education | Học vấn + bằng cấp + credential học thuật (TOEIC, COBRP). |
| Experience | **Việc làm** (PMAX, xSCORE, Influencer) theo STAR + số liệu. |
| AI Vibecode | **Công cụ tự build bằng AI** + learning agility. |
| Projects | **Sản phẩm/đề xuất** (deck, proposal, campaign) — output cụ thể. |
| Achievements (Awards) | Giải thưởng + học bổng + **leadership** (campaign). |
| Testimonials | **Bằng chứng xã hội** (reference) + tổ chức từng gắn bó. |
| Contact | Thông tin liên hệ đầy đủ + form + CV. |

---

## B. Vi phạm ME — các chỗ TRÙNG cần nắn (ưu tiên cao → thấp)

**1. 🔴 Khối liên hệ bị nhân đôi: Home "Let's connect" ↔ Contact.**
Home đang chứa nguyên khối liên hệ chi tiết (phone/email/social + nút Copy) giống hệt trang Contact. → Trùng rõ nhất.
*Sửa:* Home chỉ giữ **teaser** (tên + 1 dòng + 2 nút "Download CV" / "Contact"). Toàn bộ chi tiết liên hệ + form → **chỉ ở Contact**.

**2. 🟡 "Organisations" lặp: Home ↔ Testimonials.**
Cả hai cùng hiện PMAX · xSCORE · UEH.
*Sửa:* Giữ ở **một nơi**. Gợi ý: Home bỏ logo, để dành Testimonials (nơi gắn với reference). Hoặc Home = logo nhanh, Testimonials = logo + tên reference (khác vai trò).

**3. 🟡 Kỹ năng/tools rải khắp nơi: About (skill meter) ↔ Education (coursework/cert) ↔ Experience (toolkit) ↔ AI Vibecode (AI stack).**
Một số tool (Sheets, AI tools, automation) xuất hiện 3–4 lần → cảm giác lặp.
*Sửa (phân vai rõ):* About = **năng lực cấp cao** (định tính). Education = **học thuật + cert**. Experience = **tool dùng trong công việc**. AI Vibecode = **chỉ AI/coding stack**. Mỗi tool thuộc về đúng 1 ngữ cảnh.

**4. 🟡 Ranh giới mờ: Experience ↔ Projects ↔ AI Vibecode** (quan trọng — chốt TRƯỚC khi import nội dung thật).
Một việc ở PMAX (vd build automation) có thể rơi vào cả 3 trang.
*Quy tắc đề xuất:*
- **Experience** = *vai trò & kết quả* tại một công ty (bạn được thuê làm gì, đạt gì).
- **Projects** = *sản phẩm bàn giao* (proposal deck, campaign plan) — xem được, có thể là bài thi/competition.
- **AI Vibecode** = *công cụ bạn tự dựng bằng AI* (tool, script, dashboard).
→ Cùng 1 thành tựu chỉ kể **1 lần ở trang sở hữu chính**, nơi khác chỉ nhắc & link sang.

**5. ⚪ Home "Selected work" ↔ Experience.**
Chấp nhận được (teaser → chi tiết) **miễn là** Home chỉ tóm tắt + link sang Experience (đang đúng). Không cần sửa.

---

## C. Vi phạm CE — chỗ HỔNG (cần bổ sung)

- **Influencer case** (Experience #3), **Projects**, **AI Vibecode builds** vẫn là placeholder → cần import nội dung thật (đã chừa chỗ, đánh dấu rõ).
- Chưa có **CV/Résumé 1 trang tinh chỉnh** khớp định vị mới (hiện đang dùng CV bản cũ tải về). Nên tạo bản mới (skill `pdf`/`docx`).
- Chưa có **song ngữ EN/VI** (hiện EN-only — ổn cho MNC, nhưng VI là điểm cộng khi nộp công ty VN).
- (Nhỏ) Chưa có **OG image** (mới có OG text) → thêm ảnh share bằng `brandkit`.

---

## D. Room to enhance UI/UX (đã làm + nên làm)

**Đã làm ngay trong lần này:**
- ✅ **Spotlight theo chuột đồng bộ mọi card** (case/quote/contact-row/tool/glass/duocard/timeline/frame) — trước đây chỉ vài loại card phản hồi nên "lia chuột" thấy chập chờn khi kéo xuống. Giờ nhất quán top→bottom, có cả biến thể màu cho light mode.

**Nên làm tiếp (ưu tiên):**
1. 🔴 **Gỡ trùng khối liên hệ ở Home** (mục B1) — vừa fix MECE vừa làm Home gọn, dẫn dắt tốt hơn.
2. 🟡 **Tách typographic scale chặt hơn**: hiện H1 trang con & Home cùng cỡ cực lớn; nên giảm nhẹ H1 trang con để nhịp đọc đỡ "đuối".
3. 🟡 **Trạng thái rỗng cho phần placeholder** (Influencer/Projects): thay vì số "—", dùng 1 thẻ "Coming soon" có chủ đích (đỡ trông như thiếu sót).
4. 🟡 **Ảnh thật thay `picsum`** ở Experience/Education/Awards (ảnh xám placeholder làm giảm độ tin).
5. ⚪ **Giảm mật độ hiệu ứng nền ở khu nhiều chữ** (tuỳ chọn) để ưu tiên đọc — nhưng bạn đã chọn "full effect mọi trang", nên giữ.
6. ⚪ **Reduced-motion** đã có; cân nhắc thêm tuỳ chọn tắt con trỏ tuỳ biến cho người dùng cảm thấy rối.

---

## E. Việc nên làm theo thứ tự
1. Chốt **quy tắc ranh giới Experience/Projects/AI Vibecode** (mục B4) → rồi import nội dung thật.
2. Gỡ trùng **Home connect** (B1) + **Organisations** (B2).
3. Phân vai lại **skills/tools** (B3).
4. Tạo **CV 1 trang mới** + **ảnh thật** + **OG image**.

---

## ✅ FINAL MECE MAP — LOCKED (Batch 1, 2026-06-29)

Each block now has exactly ONE home. Cross-links keep everything discoverable without duplicating.

| Page | Owns (single source) | Explicitly NOT here |
|---|---|---|
| **Home** | Hook + impact snapshot + **Organisations strip** (PMAX/xSCORE/UEH) + Contact | skill meters, tool stack |
| **About** | Identity + **Core strengths** (skill meters) | tool chips → link to Experience |
| **Education** | Degree, coursework grades, **methods/topics** (research, journey mapping, negotiation…) | operational tools (N8N/HubSpot/Sheets) → Experience |
| **Experience** | Roles, timeline, outcomes + **Toolkit** (the operational tool stack) | the decks themselves → Projects |
| **Projects** | **Campaign decks** (proposal reels) only | roles/outcomes → Experience |
| **AI Vibecode** | **Self-built AI tools** + AI-builder stack (Claude/Cursor/Python) | client campaigns → Projects |
| **Awards** | Leadership & awards | — |
| **Testimonials** | Quotes only (Organisations removed; references = role + "on request") | Organisations → Home |

**Dedup actions taken:** removed Organisations from Testimonials; removed tool chips from About; reframed Education "Continuous learning" to methods/topics (no tool overlap); added boundary lines to Experience/Projects/Vibecode intros; cleaned all `[...]` author-placeholders site-wide (instructions removed, draft copy debracketed, references turned into intentional empty-states).
