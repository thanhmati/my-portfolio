# Technical Architecture - Portfolio Website

Tài liệu này mô tả kiến trúc kỹ thuật chi tiết cho website portfolio lập trình viên Full Stack & Giảng viên Udemy sử dụng React, TypeScript và Tailwind CSS.

## 1. Công nghệ sử dụng (Tech Stack)
* **Build Tool & Framework:** [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/).
* **Styling (CSS):** [Tailwind CSS](https://tailwindcss.com/) cho giao diện responsive và tiện ích thiết kế, kết hợp custom CSS trong `index.css` cho các hiệu ứng đặc biệt (retro grids, scanlines, glow).
* **Animations:** [Framer Motion](https://www.framer.com/motion/) để tạo các chuyển động mượt mà, chuyển trang, hiệu ứng cuộn và micro-animations.
* **Routing:** [React Router DOM](https://reactrouter.com/) (hoặc sử dụng state-based routing/hash-routing để tối ưu hóa việc chạy client-side thuần túy không server). Chúng ta sẽ dùng React Router DOM v6 để quản lý định tuyến giữa các trang chi tiết.
* **Icons:** [Lucide React](https://lucide.dev/) cung cấp thư viện icon phong cách outline, hiện đại và nhẹ.

## 2. Cấu trúc thư mục dự án (Directory Structure)
```text
my-portfolio/
├── public/                 # Các tài nguyên tĩnh (images, favicon, v.v.)
├── src/
│   ├── assets/             # Hình ảnh, font chữ custom, styles bổ sung
│   ├── components/         # Các component dùng chung (UI, Layout)
│   │   ├── Terminal/       # CLI Widget mô phỏng Terminal
│   │   ├── CommandMenu/    # Command Palette (Cmd+K)
│   │   ├── CourseCard/     # Card hiển thị khóa học Udemy
│   │   └── ProjectCard/    # Card hiển thị dự án
│   ├── layouts/            # Layout chính (Header, Footer, CodeThemeWrapper)
│   ├── pages/              # Các trang chính của hệ thống
│   │   ├── Home/           # Trang chủ chứa các sections
│   │   ├── CourseDetail/   # Trang chi tiết khóa học
│   │   └── ProjectDetail/  # Trang chi tiết dự án
│   ├── services/           # Lớp kết nối API và xử lý dữ liệu ngoại vi
│   │   └── udemyService.ts # Chứa logic fetch dữ liệu Udemy (kèm mock data)
│   ├── hooks/              # Custom React hooks (useKeyPress, v.v.)
│   ├── context/            # Context quản lý State chung (nếu cần)
│   ├── App.tsx             # Component gốc kết hợp router
│   ├── index.css           # File CSS cấu hình biến thiết kế (tokens)
│   └── main.tsx            # Entry point của React
├── PRD.md                  # Tài liệu yêu cầu sản phẩm
├── TECHNICAL_ARCHITECTURE.md # Tài liệu kiến trúc kỹ thuật
├── PLAN.md                 # Kế hoạch triển khai dự án
├── tailwind.config.js      # Cấu hình Tailwind CSS
├── tsconfig.json           # Cấu hình TypeScript
└── package.json            # Quản lý dependencies
```

## 3. Kiến trúc Component chính (Key Components Design)

### 3.1. Terminal / CLI Widget (`src/components/Terminal/`)
* **Mục đích:** Tạo trải nghiệm lập trình chân thực ở Hero Section.
* **Tính năng:**
  * Mô phỏng giao diện terminal cổ điển (phông chữ Monospace, con trỏ nhấp nháy).
  * Lắng nghe input của người dùng và thực hiện lệnh:
    * `help`: Hiển thị danh sách lệnh khả dụng.
    * `about`: Xuất ra mô tả ngắn về bản thân.
    * `courses`: Liệt kê các khóa học nổi bật.
    * `projects`: Hiển thị các dự án tiêu biểu.
    * `contact`: Trả về thông tin email / link mạng xã hội.
    * `clear`: Xóa lịch sử terminal.
  * Giới hạn lịch sử hiển thị (scroll container tự cuộn xuống dưới cùng).

### 3.2. Command Palette / Command Menu (`src/components/CommandMenu/`)
* **Mục đích:** Cho phép điều hướng nhanh và tìm kiếm toàn trang bằng bàn phím.
* **Tính năng:**
  * Lắng nghe tổ hợp phím `Cmd+K` (macOS) hoặc `Ctrl+K` (Windows/Linux) để kích hoạt.
  * Hiển thị danh sách các lối tắt: Đi đến section (About, Courses, Projects), mở Github, chuyển hướng sang trang chi tiết khóa học.
  * Tích hợp bộ lọc tìm kiếm tức thì (fuzzy search trên danh sách khóa học và dự án).

### 3.3. Udemy Service Wrapper (`src/services/udemyService.ts`)
* **Mục đích:** Gọi dữ liệu trực tiếp từ Udemy API và xử lý lỗi client-side.
* **Cơ chế:**
  * Định nghĩa `UdemyCourse` interface mô tả dữ liệu khóa học (ID, title, url, price, rating, student_count, image, description, curriculum).
  * Trong giai đoạn đầu, lớp này sẽ trả về dữ liệu mẫu (Mock data) khớp hoàn toàn với cấu trúc mong đợi.
  * Khi bạn cung cấp Udemy API schema chính thức, hàm fetch sẽ được cập nhật để thực hiện gọi trực tiếp bằng `fetch()` hoặc `axios` (với các xử lý cache và xử lý lỗi cần thiết ở client-side).

### 3.4. Contact Form Integration
* **Giải pháp:** Sử dụng Formspree hoặc EmailJS để nhận phản hồi từ form liên hệ.
* **Cơ chế:** Gửi POST request trực tiếp từ client-side đến endpoint dịch vụ bằng AJAX. Hiển thị trạng thái gửi thành công/thất bại thông qua các hiệu ứng toast message hoặc modal chuyên nghiệp.

## 4. Thiết kế giao diện & Hiệu ứng (UI & Styling System)
* **Color Palette (Màu sắc):**
  * Chủ đạo: Các sắc độ tối của xám/đen (`slate-950`, `zinc-950`).
  * Màu nhấn (Accents): Xanh lá cây dòng lệnh cổ điển (`emerald-400`), Xanh dương công nghệ (`cyan-400`), Tím sáng tạo (`violet-500`).
* **Hiệu ứng Creative:**
  * **Code Glow:** Hiệu ứng bóng mờ (box-shadow) phát sáng xung quanh các thẻ card khi hover.
  * **Grid Background:** Nền lưới ô vuông mờ ảo (`background-grid`) chuyển động nhẹ khi di chuyển chuột.
  * **Glassmorphism:** Sử dụng `backdrop-filter: blur(12px)` kết hợp viền mỏng sáng bóng cho các thanh điều hướng và cửa sổ nổi.
