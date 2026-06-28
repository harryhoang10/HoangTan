# Portfolio Blueprint — Đoàn Đình Thuyên (v49 system)

> **Mục đích:** Tài liệu phân tích build-ready để dựng lại 1:1 cấu trúc, layout, text, hiệu ứng của portfolio tham chiếu.
> **Nguồn:** `https://dinhthuyen.netlify.app/` (bộ trang `andrew_*_v49_*`)
> **Loại site:** Multi-page tĩnh (mỗi trang = 1 file HTML riêng), CSS + JS inline, không framework. Dark theme mặc định + Light theme toggle.

---

## 0. Bản đồ trang (Navigation)

Navigation cố định (fixed top) xuất hiện y hệt trên mọi trang. Thứ tự link:

| Nav label | Trỏ tới | Loại |
|---|---|---|
| Logo: `ĐOÀN ĐÌNH THUYÊN` + sub `<tên trang>` | `/andrew_portfolio_v49_home#top` | Về home |
| ABOUT | `/andrew_portfolio_v49_home#about` | Anchor trên Home |
| EDUCATION | `/andrew_education_v49` | Trang riêng |
| EXPERIENCE | `/andrew_work_v49_experience` | Trang riêng |
| LEADERSHIP | `/andrew_leadership_v49_firevent` | Trang riêng |
| PROJECTS | `/andrew_projects_v49_embedded` | Trang riêng |
| AWARDS | `/andrew_awards_v49` | Trang riêng |
| TESTIMONIALS | `/andrew_portfolio_v49_home#testimonials` | Anchor trên Home |
| CONTACT | `/andrew_portfolio_v49_home#contact` | Anchor trên Home |
| Nút `LIGHT`/`DARK` (theme toggle, pill, góc phải) | — | Toggle theme |

**6 trang vật lý cần build:**
1. **HOME** (`andrew_portfolio_v49_home`) — chứa Hero + About + Testimonials + Contact (anchor sections)
2. **EDUCATION** (`andrew_education_v49`)
3. **EXPERIENCE** (`andrew_work_v49_experience`)
4. **LEADERSHIP** (`andrew_leadership_v49_firevent`)
5. **PROJECTS** (`andrew_projects_v49_embedded`)
6. **AWARDS** (`andrew_awards_v49`)

Mỗi trang có **link điều hướng giữa trang** ở đầu (`BACK TO PORTFOLIO HOME`) và cuối (pill `NEXT · <TÊN TRANG KẾ>`) — tạo cảm giác lật trang tuần tự.

---

## 1. Design System (tokens)

### 1.1 Màu — Dark theme (mặc định, `:root`)
```css
--bg:           #050607;   /* nền đen gần tuyệt đối */
--text:         #f7f3ee;   /* trắng ngà */
--muted:        rgba(247,243,238,.68);
--muted-strong: rgba(247,243,238,.86);
--line:         rgba(247,243,238,.17);   /* viền hairline */
--glass:        rgba(255,255,255,.075);  /* nền card kính */
--glass-2:      rgba(255,255,255,.11);
--cardinal:     #9b1b30;   /* đỏ booc-đô (glow nền) */
--gold:         #e0b760;
--cyan:         #91f1ff;
--blue:         #4f8cff;
--violet:       #a58bff;
--pink:         #ff7aa8;
--lime:         #d7ff58;
--button-bg:    #f7f3ee;
--button-text:  #050607;
--shadow:       0 30px 110px rgba(0,0,0,.46);
--max:          1240px;    /* chiều rộng tối đa content */
```

### 1.2 Màu — Light theme (`body.light`)
Đổi sang hệ xanh dương / trắng "innovation":
```css
--bg:           #f4fbff;
--text:         #061826;
--muted:        rgba(6,24,38,.66);
--line:         rgba(6,24,38,.14);
--glass:        rgba(255,255,255,.64);
--glass-2:      rgba(255,255,255,.82);
--cardinal:     #1b78ff;   /* glow đỏ → xanh */
--gold:         #22b8ff;
--cyan:         #0aa7ff;
--blue:         #2b6dff;
--violet:       #7c5cff;
--pink:         #3ec8ff;
--lime:         #0b66ff;
--button-bg:    #061826;
--button-text:  #f4fbff;
--shadow:       0 32px 100px rgba(21,106,184,.18);
```
> Toàn site transition mượt khi đổi theme: `transition: background .85s cubic-bezier(.2,.8,.2,1), color .85s ...` đặt trên body và các bề mặt.

### 1.3 Typography
| Vai trò | Font | Chi tiết |
|---|---|---|
| Body / mô tả / heading lớn | **Instrument Sans** (Google), fallback `system-ui` | weight 400–700 |
| H1 hero | Instrument Sans **700** | `font-size: clamp(...~92px)`, `text-transform: uppercase`, `letter-spacing: -0.075em` (rất chặt), line-height ~0.95 |
| Nav, kicker/eyebrow, label, meta, tag, số "01/02…" | **IBM Plex Mono** (monospace) | UPPERCASE, letter-spacing rộng (~0.12–0.2em), cỡ nhỏ 11–13px |

Tương phản chính của hệ thống: **heading sans cực lớn, chặt + label mono nhỏ, thưa.** Đây là "chữ ký" thị giác của portfolio.

### 1.4 Bề mặt & layout chung
- Container: `width: min(100%, var(--max))`, căn giữa, padding ngang ~24px.
- **Glass card:** nền `var(--glass)`, viền `1px solid var(--line)`, `border-radius` ~18–24px, `backdrop-filter: blur(...)`, shadow `var(--shadow)`.
- Spacing dọc giữa các section rất lớn (section padding ~120–160px).
- Grid 2 cột bất đối xứng phổ biến (vd hero `~726px / ~656px`, education head `503px / 661px`).
- Tag/chip: pill bo tròn, viền hairline, label mono nhỏ, có dot màu nhỏ đứng trước (•).

---

## 2. Component toàn cục (lặp trên mọi trang)

### 2.1 Fixed Nav
```css
.nav{
  position:fixed; top:0; left:0; right:0; width:100%; z-index:9999;
  display:flex; align-items:center; justify-content:space-between; gap:18px;
  backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
  /* nền trong suốt + blur, viền dưới hairline */
}
.nav-links a{ font:IBM Plex Mono; text-transform:uppercase; transition:color .25s ease, transform .25s ease; }
.nav-links a:hover{ color:var(--text); transform:translateY(-2px); }   /* nhấc nhẹ khi hover */
```
- Bên trái: logo 2 dòng — dòng 1 tên `ĐOÀN ĐÌNH THUYÊN`, dòng 2 mono nhỏ = tên trang hiện tại (ABOUT / EDUCATION / …).
- Link của trang hiện tại có underline active (gạch dưới).
- Bên phải: **theme toggle pill** (icon ☀ + chữ `LIGHT`/`DARK`).

### 2.2 Scroll progress bar
- Phần tử `.scroll-progress-v43` (thanh mảnh trên cùng).
- JS: `scaleX(pct)` với `pct = scrollY / (scrollHeight - innerHeight)`.
- Body nhận class `.v43-scrolled` khi `scrollY > 18` (đổi style nav khi đã cuộn).

### 2.3 Theme toggle (JS)
```js
// STORAGE_KEY = 'andrewThemeV45' (+ tương thích cũ 'andrewThemeV42')
applyTheme(theme){
  const light = theme === 'light';
  document.body.classList.toggle('light', light);
  // cập nhật aria-pressed + đổi nhãn nút thành 'Dark'/'Light'
}
// load: đọc localStorage → applyTheme(saved)
// click nút .theme-toggle-v42 → toggle dark/light, lưu localStorage
```
*Lưu ý build trong môi trường artifact: tránh localStorage (không hỗ trợ) — dùng state trong bộ nhớ.*

### 2.4 Section-transition (giữa các trang/section)
Pill mono ở cuối mỗi block: `NEXT · EXPERIENCE`, `NEXT · EDUCATION`, `NEXT · LEADERSHIP`… nằm trên một đường kẻ ngang mảnh chạy hết chiều rộng. Đầu trang có `BACK TO PORTFOLIO HOME`.

### 2.5 Footer marquee
Băng chữ chạy ngang lặp vô tận: `About • Education • Awards • Work • Leadership • Testimonials • Contact •` — dùng keyframe `marquee`.

---

## 3. Hệ thống Hiệu ứng (EFFECT ENGINE) — phần quan trọng nhất

### 3.1 Scroll reveal (IntersectionObserver) — hiệu ứng "lia vào màn hình"
Mọi block content gắn attribute `data-reveal-v43`.

**Trạng thái ẩn (mặc định):**
```css
[data-reveal-v43]{
  opacity:0;
  transform:translateY(24px);
  filter:blur(8px);
  transition:
    opacity .75s cubic-bezier(.2,.8,.2,1),
    transform .75s cubic-bezier(.2,.8,.2,1),
    filter .75s cubic-bezier(.2,.8,.2,1);
  transition-delay:var(--v43-delay, 0ms);   /* stagger */
  will-change:opacity,transform,filter;
}
[data-reveal-v43].is-visible-v43{
  opacity:1; transform:translate(0,0) scale(1); filter:blur(0);
}
```
**JS observer:**
```js
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('is-visible-v43');
      io.unobserve(entry.target);   // chỉ chạy 1 lần
    }
  });
}, { threshold:.14, rootMargin:'0px 0px -6% 0px' });
revealItems.forEach(i=>io.observe(i));
// fallback: nếu không hỗ trợ IO → add is-visible-v43 cho tất cả
```
→ Cảm giác: khối content trượt lên 24px + tan blur + fade-in trong 0.75s, **stagger** nhau qua `--v43-delay`.
*(Có thêm biến thể nhẹ `[data-reveal]`: chỉ `translateY(12px)` → 0 trong .42s.)*

### 3.2 Cursor spotlight (pointermove)
```js
// throttle bằng requestAnimationFrame
document.documentElement.style.setProperty('--v43-x', clientX+'px');
document.documentElement.style.setProperty('--v43-y', clientY+'px');
```
→ Hai biến `--v43-x/--v43-y` theo con trỏ, dùng cho vầng sáng/gradient bám chuột trên card & nền.

### 3.3 Card lift on hover (`.v43-lift`)
```css
.v43-lift{
  transition:transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .35s ease,
             border-color .35s ease, background .35s ease, filter .35s ease;
  will-change:transform;
}
.v43-lift:hover{
  transform:translateY(-5px);
  box-shadow:0 26px 80px rgba(0,0,0,.32);
  border-color:rgba(145,241,255,.30);   /* viền cyan sáng lên */
  filter:saturate(1.04);
}
body.light .v43-lift:hover{
  box-shadow:0 26px 70px rgba(10,111,214,.16);
  border-color:rgba(10,111,214,.24);
}
```

### 3.4 Media zoom on hover (`.v43-media-hover`)
```css
.v43-media-hover img{ transition:transform .55s cubic-bezier(.2,.8,.2,1), filter .45s ease; }
.v43-media-hover:hover img{ transform:scale(1.035); filter:saturate(1.08) contrast(1.02); }
```

### 3.5 Word reveal trên heading (`.word`)
Heading lớn được tách từng từ thành `<span class="word">`, mỗi từ animate `wordGlow .58s cubic-bezier(.2,.85,.2,1)` (stagger), và đổi màu gradient theo cụm (vd phần cuối câu đổi sang cyan→blue→violet).
```css
.word:hover{
  transform:translateY(-8px) skewX(-3deg) scale(1.015);
  color:#fff; filter:brightness(1.18) saturate(1.1);
  text-shadow:0 0 1.. ;
  transition:transform .24s ease, filter .24s ease, text-shadow .24s ease, color .24s ease;
}
```

### 3.6 Nút (`.btn`)
```css
.btn:hover{
  transform:translateY(-3px);
  border-color:color-mix(in srgb, var(--text) 40%, transparent);
  box-shadow:var(--shadow);
}
/* nút bulb (hero home) */
.bulb-button:hover .bulb-glow{ opacity:.9; transform:scale(1.15); }
```

### 3.7 Keyframes (6 cái)
| Keyframe | Dùng cho | Tham số tiêu biểu |
|---|---|---|
| `wordGlow` | từ trong heading hiện lên | `.58s cubic-bezier(.2,.85,.2,1) both` |
| `shine` | gradient/viền lấp lánh | `4.5s–8s ease-in-out infinite alternate` |
| `orb` | quầng sáng quanh portrait | `10s ease-in-out infinite alternate` |
| `sway` | bóng đèn treo (hero home) | `4.6s ease-in-out infinite` |
| `marquee` | băng chữ footer chạy | `22s linear infinite` |
| `spinCarousel` | vòng xoay/carousel | `42s linear infinite` |

### 3.8 Lightbox ảnh (Experience + galleries)
```js
// ảnh có class .image-button + data-full="<ảnh lớn>"
// click → set #lightbox img.src = data.full, add class 'open'
// click nền hoặc nút .close → remove 'open'; phím Escape → đóng
```

---

## 4. Phân tích từng trang

> Quy ước chung mọi trang: kicker mono có **số thứ tự** trong huy hiệu tròn + tiêu đề mục (vd `02 · EDUCATION & ACADEMIC RECOGNITION`). H1 cực lớn, một cụm từ được tô gradient màu. Nền có vầng glow `--cardinal` đặt lệch (góc phải trên), bám chuột nhẹ.

---

### 4.1 TRANG HOME (`andrew_portfolio_v49_home`)
Tiêu đề tab: *"Phạm Đoàn Đình Thuyên — Portfolio Hero"*. Gồm 4 section: `#top` (hero), `#about`, `#testimonials`, `#contact`.

#### Section HERO (`#top`)
- **Eyebrow:** `—— INTERACTIVE EVIDENCE SYSTEM` (mono, có gạch ngang dẫn).
- **H1 (`.hero-title`):** 5 dòng `<span class="line">`:
  `I BUILD INTERACTIVE EVIDENCE FOR STRATEGIC INNOVATION.`
  → chữ trắng, các từ cuối ("INNOVATION") phủ gradient cyan→blue. Word-reveal stagger.
- **Subcopy (`.subcopy`):** "Strategic Planning / Market Research candidate building **research-backed strategy** from consumer tensions, category signals, and business evidence."
- **CTA row (`.cta-row`):** 2 nút — `VIEW SELECTED WORK` (primary, nền sáng) + `VIEW EDUCATION PROOF` (outline).
- **Proof line (`.proof-line`):** 5 span đánh số:
  `01 Q2 Wiley Research · 02 ASEAN+3 Spatial Research · 03 Strategic Planning Cases · 04 Science in Motion by Stanford University — 2nd Place · Stanford Postdoctoral Association · 05 10+ Event Leadership`
- **Visual phải (`aside.visual`):**
  - `status-card`: chấm lime + "Open to internships" / "Market Research · Strategic Planning · Business Strategy · Consulting-oriented roles".
  - `name-side`: "PORTFOLIO BY" + `ĐOÀN ĐÌNH THUYÊN`.
  - `portrait-wrap` > `img.portrait`: ảnh chân dung trong **vòng tròn phát sáng** (quầng hạt màu cyan/violet, keyframe `orb`).
  - **Bóng đèn treo (`.bulb-button`)** trên dây ở góc phải: keyframe `sway`, tooltip "SHAKE THINGS UP. TURN INSIGHT ON." → click = gợi ý đổi theme ("Click to switch between dark strategy theme and blue-white innovation theme").

#### Section ABOUT (`#about`, `.about-section .v43-lift`)
Kicker `Profile Snapshot` → tiêu đề `About Me`. Nội dung khối:
- **Professional positioning:** "A Strategic Planning / Market Research candidate focused on consumer insight, cultural/category signal decoding, and brand problem solving — turning market evidence into actionable brand strategy."
- **Core strengths** (chips): Research-driven strategy · Consumer insight · Category signal decoding · Market trend analysis · Competitor benchmarking · Customer journey mapping · Communication gap analysis · Brief thinking.
- **Soft skills:** Structured Problem Solving · Cross-functional Coordination · Continuous Learning · Resilience & Flexibility.
- **Favorite industries** (chip có dot): FMCG · Technology Innovation · Education · Automobile.
- **Expertise areas:** Strategic Planning · Consumer & Market Research.
- **Tools I use** (grid icon 2 ký tự + tên), nhóm:
  - *AI Productivity:* ChatGPT, Codex, Antigravity, Claude, Gemini
  - *Data Analysis:* Google Colab, Python/R, Excel, Apify
  - *Creative Production:* Adobe Illustrator, Canva, Adobe Photoshop
- Card hover: `.about-card:hover` nhấc + viền chuyển cyan.
- Cuối section: pill `NEXT · EDUCATION`.

#### Section TESTIMONIALS (`#testimonials`)
Anchor mỏng/tối giản (gần như placeholder trong bản tham chiếu) — khi build có thể đặt grid card trích dẫn (avatar + quote + tên/chức danh).

#### Section CONTACT (`#contact`, `.contact-section`)
- Kicker `08 · Contact · 2024–2026`.
- **H1:** `LET'S CONNECT.` (gradient pink).
- Card trái: tên `ĐOÀN ĐÌNH THUYÊN (ANDREW)`, "Strategic Planning / Market Research Intern", "Phu Nhuan District, Ho Chi Minh City", 2024–2026. Nút: `Download CV`, `Email Me`, `LinkedIn`.
- Danh sách liên hệ có **nút Copy** từng dòng (Phone / Email / handle / LinkedIn) → toast "Copied to clipboard".
- Gợi ý theme: "Switch the light. Click for blue-white theme."

---

### 4.2 TRANG EDUCATION (`andrew_education_v49`)
Tiêu đề tab: *"… Portfolio Hero"*. 1 section `#education` (`.education-section .v43-lift .v43-media-hover`).

- **Kicker:** huy hiệu `02` + `EDUCATION & ACADEMIC RECOGNITION`.
- **`edu-head`** — grid 2 cột (~503 / 661):
  - `edu-title-card`: H2 lớn "BUSINESS MANAGEMENT + CORPORATE FINANCE, **BUILT FOR CREDIBILITY.**" (cụm cuối gradient cyan→blue) + đoạn mô tả "I study two academic tracks…".
  - `edu-summary-card`: kicker `ACADEMIC FOUNDATION`, mô tả "University of Finance - Marketing under the Ministry of Finance…" + 4 chip: Business Management · Corporate Finance · Analytics · Strategic Management.
- **`edu-foundation-grid`** — grid 2 cột (~454 / 710):
  - `edu-program-card`: kicker `DEGREE & COURSEWORK`, "Bachelor of Business Management + Bachelor of Corporate Finance", "Sep 2023 — Nov 2026 expected · UFM", mô tả dual-degree. Danh sách môn + điểm: Business Information Systems 4.0/4.0 · Strategic Management 3.7/4.0 · International Business Management 3.7/4.0 · Business Analytics …
  - `edu-visual-grid`: grid ảnh 2 cột vuông (~346×346) — logo trường UFM "THE MINISTRY OF FINANCE / UNIVERSITY OF FINANCE - MARKETING" + ảnh "TOP 6" (chân dung).
- **`research-credentials`** — `research-head` + **4 `article.research-project`** (mỗi article grid ~330/783):
  - Mỗi research-project = 1 paper, có nút **"Expand project"** mở danh sách slide đánh số (01→13) với caption từng slide. Ví dụ:
    - *Paper:* "Green Finance Policy Storytelling" — slide 01 Topic cover, 02 The simple answer fails, 03 The hidden question, 04 ASEAN+3 tension, 05 Carbon relocation example, 06 Carbon leakage, 07 No single policy is enough, 08 Policy ecosystem (GGDP, OPTR, FD, DCRE, FBAL, GPI, ETAX, MRE, EEP), 09 Variable mechanism map, 10–13 Findings/Theory/Governance/Policy timing map.
    - *Paper (Q1 / JFTOR under review):* "From Storytelling to Storyliving — Brand behavioral experience and psychological ownership in Marketing 6.0" (S–O–R, PLS-SEM, NCA trên Gen Z metaverse users).
- **`edu-note`** ở cuối.
- Cuối trang: pill `NEXT · EXPERIENCE`.

---

### 4.3 TRANG EXPERIENCE (`andrew_work_v49_experience`)
Tiêu đề tab: *"Work Experience - Đoàn Đình Thuyên"*.

- **Hero (`section.hero`):**
  - Kicker `04 · Work Experience · Professional Experience`.
  - H1 (`.gradient`): "**Real workplace outputs, not just job titles.**"
  - `hero-grid` (grid ~726/656): `intro-card` (mô tả "A curated work-proof archive across automotive retail operations, brand consultancy execution, and CRM-enabled education marketing…" + `case-nav` nhảy tới từng case) và **`stats`** (grid 4 ô): `3 Company cases` · `20+ Proof visuals` · `8+ Team CRM users` · `+38.5% SteamN 2025 revenue growth`.
- **3 case study** (mỗi case `.case .v43-lift .v43-media-hover`):
  1. **`#vinfast` — VinFast / Minh Dao Group** — "Assistant to Deputy of CCO · Oct 2024 – Feb 2025". Chủ đề: Retail Experience, Planning & Event Activation. Các proof card: GO!/Tops/Big C rollout context (36 GO! malls, 4 Tops, 2 Big C), Regional location mapping (Bắc/Trung/Nam), GO! booth layout proposal (50m²), Distributor footprint & 2026 expansion goal, Partner event, The Nine showcase activation. Tag mỗi card: Customer proposal planning, Journey mapping, Event activation, Cross-functional coordination…
  2. **Clover Brand Consultancy** — "Graphic Design Intern · Dec 2023 – Apr 2024". Brand Execution & Visual Consistency: POSM, social creatives, client-facing visual storytelling.
  3. **SteamN Kids Preschool** — CRM-enabled education marketing. Report architecture (payments, student status, inventory, class situation, business tracking), Revenue-by-student dashboard (privacy-masked), **+38.5% revenue growth 2025**.
- **Layout mỗi case:** hàng ảnh proof cuộn ngang (filmstrip, ảnh là `.image-button` → lightbox) + bên dưới các text card (kicker label mono / title / mô tả / tag chips), reveal stagger.
- Cuối: pill `Next · Leadership`.

---

### 4.4 TRANG LEADERSHIP (`andrew_leadership_v49_firevent`)
Tiêu đề tab: *"Leadership & Extracurricular - Đoàn Đình Thuyên"*. Section: `#top`(hero), `#mv`, `#gapmo`, `#sponsorship`, `#ops`, `#portfolio`.

- **Hero:**
  - Kicker `04 · Leadership & Extracurricular · FIREVENT first`.
  - H1: "**Building event systems, not just joining clubs.**"
  - `leadership-jumps`: các **jump-chip** (anchor nội trang) — FIREVENT / event-ops / sponsorship / ops / portfolio.
  - `hero-grid` (~726/656): `intro-card` (Faculty of Business Administration — "Board of Director / Head of Technical & External Relations for FIREVENT…") + **stats 4 ô** (`.stats`), tổng cộng 8 chỉ số: `150+ Members led` · `30+ Core team` · `21K+ Fanpage followers` · `3 yrs Most favorite club` · `357K+ Portfolio reach` · `3.8K+ Student participants` · `13.7K+ Interactions` · `400+ Outreach emails`. Bên phải `media-card` (img + label).
- **`#mv` — Culture proof:** "Official MV preview embedded directly" — video nhúng (FIREVENT'S DREAM – OFFICIAL MUSIC VIDEO), fallback "Open Facebook / Watch MV" nếu Facebook chặn inline.
- **`#gapmo` — Flagship "Gặp Mặt":** talkshow về nghề event-planning & định hướng nghề nghiệp sinh viên (có khách mời).
- **`#sponsorship` — ER & Sponsorship:** các proposal có metric — "Trạm Xanh" (20K+ reach, 550+ students, 2 partners), "HR Arena UFM 2024" (70K+ reach, 5K+ interactions, 2 sponsors), Past sponsor/partner proof, **HSBC Business Case Competition 2027** (proposal nhiều trang: cover, purpose & requirements…).
- **`#ops` — Ops workflow** và **`#portfolio` — Project portfolio / Business case mentorship**.
- Toàn bộ card dùng `.v43-lift` + `.v43-media-hover`; nền glow cardinal đỏ rõ (theme dark).

---

### 4.5 TRANG PROJECTS (`andrew_projects_v49_embedded`)
Tiêu đề tab: *"Projects · Đoàn Đình Thuyên"*.

- **Hero (`section.hero`):**
  - Kicker `06 · Projects · Proposal Archive`.
  - H1: "**Project proof, shown as cinematic proposal reels.**"
  - `project-nav`: 7 anchor link nhảy tới từng project (`#p1`–`#p7`).
  - Dòng hướng dẫn: "Each project uses a compressed embedded slide carousel: description on the left, proposal preview on the right, and slide rail below."
- **7 project block** (`.project-block` id `p1`–`p7`). Cấu trúc mỗi block:
  ```
  .project-main  (grid ~440px / ~899px)
    .project-copy   → .meta (chips: số + loại + năm + "N slides"), h3 (tên), p (mô tả), .tags (chips), .actions (nút "EXPAND FULL DECK")
    .preview-wrap   → .preview-shell  (ảnh slide lớn + "Slide x / N" + tên project)
  .filmstrip
    .thumb-row      → button.thumb (×N, 1 cái .active) — click đổi slide chính, cuộn ngang
  .full-stack       → figure.full-shot (img + figcaption) — toàn bộ slide xếp dọc, hiện khi "EXPAND FULL DECK"
  ```
- **Danh sách 7 project:**

  | # | Meta | Tên | Tags chính |
  |---|---|---|---|
  | 01 | Digital Beverage Audit / Entrance Test 2026 · 8 slides | **Where Can a New Beverage Brand Enter?** | Beverage audit · Owned-content signals · SKU proxy · Occasion mapping · Winning zone |
  | 02 | Competition Proposal 2025 · 18 slides | **The Catalyst MC25** | Case solving · Strategic storyline · Presentation logic · Q&A framing |
  | 03 | Business Intelligence Project 2026 · 4 slides | **V-Mind on Business Intelligence** | Business intelligence · Dashboard logic · Data storytelling · Decision support |
  | 04 | Academic Strategy Deck 2025 · 53 slides | **Strategic Management VinFast - EFE** | IFE/EFE · Automotive strategy · Growth logic · Market analysis |
  | 05 | Brand / Market Project 2025 · 33 slides | **Mixue** | Brand analysis · Market overview · F&B · Positioning |
  | 06 | Operations Project 2025 · 13 slides | **Quality Management** | Quality control · Operations · Audit · Improvement |
  | 07 | Case Proposal 2025 · 10 slides | **C-er** | Case proposal · Consumer insight · Brand logic · Recommendations |

  *(Project 01 mô tả: "Owned-content, SKU and retail proxy audit across Coca-Cola, Pepsi and Fanta, mapping channel roles, content pillars, consumer response leakage, and winning-zone entry spaces for a new beverage brand.")*

---

### 4.6 TRANG AWARDS (`andrew_awards_v49`)
Tiêu đề tab: *"Awards & Certifications — Phạm Đoàn Đình Thuyên"*. Section: `#proof-preview`, `#stanford-feature`, `#tsinghua-feature`, `#academic-awards`, `#business-competitions`, `#video-preview`, `#international-recognition`.

- **Hero:** kicker `03 · Awards & Certifications`. H1: "**PROOF BY ORGANIZATIONS.**" (gradient trên "ORGANIZATIONS"). Intro: "A scannable gallery of academic awards, business competitions, and international recognition…".
- **`#proof-preview` (Proof Preview):** dải 4 stat chip "Fast scan before detailed gallery": `Selected +12 proof cards` · `Top 2 / Top 3 academic awards` · `VTV / UFM public-stage proof` · `Stanford / Tsinghua institutional visibility`.
- **`#stanford-feature` (Featured · first impression):** layout 2 cột — trái: **ảnh chứng nhận lớn trong khung browser-mockup**; phải: kicker `FEATURED RECOGNITION · FIRST IMPRESSION`, title lớn "SCIENCE IN MOTION **GLOBAL 2ND PLACE**" (gradient gold trên cụm cuối), mô tả "Science in Motion 2026 Global Intelligent Imaging Science Communication & Innovation Competition — Second Place in Public Voting for *From Storytelling to Storyliving on Metaverse*". Org card: **Stanford University**, **Yale Postdoctoral Association**. Tags: Global 2nd Place · Science Communication · Public Voting · Metaverse Research.
- **`#tsinghua-feature`:** "Tsinghua Global Program — Innovation & Entrepreneurship", "Certificate of Completion for the Global Program on Innovation and Entrepreneurship for the 21st Century AI-driven Global Digital Economy" — Tsinghua University. Tags: Innovation · Entrepreneurship · AI-driven Economy.
- **`#academic-awards`:** "Academic proof comes first — research awards and quantitative/econometric recognition." (Top 2/Top 3, VTV/UFM…).
- **`#business-competitions`:** card chứng chỉ:
  - **PwC US — Management Consulting Job Simulation** (Forage/PwC): business summary, divestiture guide, qualitative synergy, Excel/email summary.
  - **BCG — Strategy Consulting Job Simulation** (Forage/BCG): market research, survey design, data analysis, financial modeling, findings synthesis.
  - **Prompt Engineering for ChatGPT** — Vanderbilt University / Coursera.
  - **Financial Markets — With Honors** — Yale University / Coursera.
- **`#video-preview` (`.reel-showcase`):** khối video/reel nhúng.
- **`#international-recognition`:** nhóm credential quốc tế còn lại.
- Layout: card grid 2–3 cột, ảnh chứng nhận `.v43-media-hover` zoom khi hover, reveal stagger.

---

## 5. Checklist build lại (1:1)

1. **Khung trang:** mỗi mục = 1 HTML riêng + CSS/JS inline; share chung 1 block `:root`/`body.light` tokens, nav, footer, effect engine.
2. **Fonts:** load Instrument Sans + IBM Plex Mono (Google Fonts). Heading uppercase, letter-spacing âm; label mono uppercase letter-spacing dương.
3. **Nav fixed** + scroll-progress bar + class `v43-scrolled` khi cuộn.
4. **Theme toggle** dark↔light (persist; trong artifact dùng in-memory state).
5. **Effect engine bắt buộc:**
   - `[data-reveal-v43]` + IntersectionObserver (threshold .14, rootMargin `0 0 -6% 0`, one-shot), stagger `--v43-delay`.
   - `.v43-lift` hover (translateY -5px + shadow + viền cyan).
   - `.v43-media-hover img` hover (scale 1.035 + saturate).
   - `.word` split heading + `wordGlow` + gradient cụm từ.
   - pointermove → `--v43-x/--v43-y` cho glow bám chuột.
   - keyframes: wordGlow, shine, orb, sway, marquee, spinCarousel.
   - lightbox ảnh (click mở, Escape/click nền đóng).
6. **Mỗi section:** kicker mono có số thứ tự trong huy hiệu tròn + H1 cực lớn (1 cụm gradient) + glass card + chip tags + pill `NEXT · …` cuối.
7. **Nền:** vầng glow `--cardinal` lệch góc phải-trên (dark = đỏ booc-đô, light = xanh).
8. **Nội dung:** dùng đúng các block số liệu/stat đã liệt kê ở mục 4 cho từng trang.

---

*Tài liệu phân tích cho mục đích tham khảo cấu trúc & dựng lại layout. Nội dung text/số liệu thuộc về chủ sở hữu portfolio gốc.*
