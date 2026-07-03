# Implementation Plan - Portfolio Website

Kế hoạch phát triển chi tiết cho dự án website portfolio của Full Stack Developer & Udemy Instructor.

## Giai đoạn 1: Khởi tạo dự án & Cấu hình môi trường (Setup) ✅
* [x] **Khởi tạo mã nguồn:** Sử dụng Vite tạo dự án React + TypeScript.
* [x] **Cấu hình Tailwind CSS:** Cài đặt, cấu hình file `tailwind.config.js` với các màu nhấn (emerald, cyan, violet) và các biến font chữ monospace.
* [x] **Cài đặt thư viện bổ trợ:**
  * Framer Motion (hiệu ứng chuyển động)
  * Lucide React (icons)
  * React Router DOM (điều hướng trang)
* [x] **Cấu trúc lại thư mục:** Tạo sẵn các thư mục `components`, `pages`, `services`, `layouts`, `hooks` theo thiết kế kiến trúc.

## Giai đoạn 2: Thiết lập hệ thống Thiết kế & Layouts (Design System) ✅
* [x] **Cấu hình `index.css`:** Thiết lập font chữ chủ đạo (Inter/Outfit cho tiêu đề, Roboto Mono cho code/terminal), định nghĩa các hiệu ứng background (grid, scanlines) và các gradient màu nhấn.
* [x] **Xây dựng Main Layout:**
  * Header/Navigation: Tích hợp nút kích hoạt Command Menu, logo và liên kết cuộn.
  * Footer: Bản quyền và liên kết mạng xã hội (Github, LinkedIn, Udemy, YouTube...).
  * Wrapper hiệu ứng: Cửa sổ giả lập hệ điều hành bao bọc toàn trang web.

## Giai đoạn 3: Phát triển Trang chủ & các Component cốt lõi (Core UI) ✅
* [x] **Hero Section & CLI Terminal Widget:**
  * Thiết kế giao diện Terminal CLI tương tác.
  * Viết logic xử lý các lệnh nhập vào từ bàn phím (`help`, `about`, `courses`, `projects`, `contact`, `clear`).
* [x] **About Me Section:**
  * Hiển thị thông tin cá nhân và kỹ năng kỹ thuật (Full Stack badges).
  * Khu vực "Instructor Stats" hiển thị các chỉ số ấn tượng từ Udemy (học viên, đánh giá) dưới dạng các con số đếm tăng dần (counter animation).
* [x] **Contact Section:**
  * Thiết kế Form liên hệ phong cách terminal.
  * Tích hợp xử lý gửi email qua mailto (client-side, không cần backend).


## Giai đoạn 4: Thiết lập dữ liệu & Kết nối API Udemy (Data Integration) ✅
* [x] **Udemy Service:**
  * Tạo file `udemyService.ts` chứa interface định nghĩa dữ liệu khóa học.
  * Viết mock data hoàn chỉnh cho các khóa học hiện tại (`src/data/courses.ts` — 6 khoá học thật từ API).
  * Viết API Client/fetcher (`src/services/udemyService.ts`) với cơ chế fetch → fallback → cache.
* [x] **Projects Configuration:**
  * Tạo `src/data/projects.ts` với 6 dự án thực tế (case-study format: Problem / Solution / Outcome / Tech Stack / Links).


## Giai đoạn 5: Phát triển danh sách Khóa học & Dự án (Showcase Pages)
* [ ] **Udemy Course Cards:**
  * Card khóa học có hiệu ứng phát sáng (Glow hover).
  * Bộ lọc khóa học theo danh mục (ví dụ: Frontend, Backend, Devops).
* [ ] **Project Grid:**
  * Hiển thị danh sách dự án với hiệu ứng fade-in khi cuộn chuột.
* [ ] **Command Palette (Cmd+K Menu):**
  * Triển khai modal tìm kiếm nhanh.
  * Lắng nghe phím tắt bàn phím và hỗ trợ điều hướng nhanh bằng phím mũi tên + Enter.

## Giai đoạn 6: Các trang chi tiết & Hoàn thiện UX (Detail Pages & Polish)
* [ ] **Trang chi tiết khóa học (`CourseDetail`):**
  * Hiển thị chi tiết chương trình học, đánh giá và nút CTA nổi bật dẫn sang Udemy.
* [ ] **Trang chi tiết dự án (`ProjectDetail`):**
  * Trình bày dạng nghiên cứu điển hình (Case study) chuyên nghiệp: Vấn đề, Giải pháp, Thành quả.
* [ ] **Hiệu ứng chuyển trang (Page Transitions):**
  * Dùng Framer Motion `AnimatePresence` để chuyển đổi mượt mà giữa Landing Page và các trang chi tiết.

## Giai đoạn 7: Tối ưu hóa & Deploy (Verification & Launch)
* [ ] **SEO Optimization:** Thiết lập title, meta description đầy đủ cho từng trang.
* [ ] **Kiểm tra Responsive:** Đảm bảo hiển thị hoàn hảo trên các thiết bị Mobile, Tablet và Desktop.
* [ ] **Build:** Kiểm tra quá trình build production (`npm run build`) xem có lỗi TypeScript hay cú pháp nào không.
