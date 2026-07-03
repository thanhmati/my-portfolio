# Product Requirement Document (PRD) - Portfolio Website

## 1. Giới thiệu dự án (Project Overview)
Dự án nhằm xây dựng một website portfolio cá nhân độc đáo và ấn tượng dành cho một lập trình viên Full Stack kiêm Giảng viên (Instructor) trên nền tảng Udemy. 
Website không chỉ là nơi giới thiệu năng lực lập trình, kinh nghiệm làm việc thực tế (Projects) mà còn là kênh giới thiệu, quảng bá và thúc đẩy học viên đăng ký các khóa học trực tuyến trên Udemy.

## 2. Mục tiêu dự án (Goals)
* **Xây dựng thương hiệu cá nhân:** Khẳng định năng lực kỹ thuật thông qua các dự án thực tế và kinh nghiệm giảng dạy.
* **Tăng trưởng học viên Udemy:** Giới thiệu trực quan các khóa học, chương trình học và hướng người dùng đăng ký khóa học trên Udemy.
* **Giao diện sáng tạo & Độc đáo:** Gây ấn tượng mạnh mẽ cho khách truy cập (nhà tuyển dụng, học viên, đối tác) bằng phong cách thiết kế Technical & Creative (Dark mode, mang hơi hướng code editor/terminal kết hợp hiệu ứng mượt mà).
* **Vận hành tối giản (Serverless/Backendless):** Không tự xây dựng hệ thống backend riêng, chạy trực tiếp client-side để tối ưu tốc độ và chi phí vận hành.

## 3. Đối tượng người dùng (User Personas)
* **Học viên tiềm năng:** Những người muốn học lập trình, tìm kiếm các khóa học chất lượng trên Udemy. Họ cần thấy được sự uy tín của giảng viên, đề cương khóa học rõ ràng và phản hồi tích cực từ học viên khác.
* **Nhà tuyển dụng / Đối tác:** Những người tìm kiếm lập trình viên Full Stack có tay nghề cao. Họ cần xem các dự án thực tế (Demo, Github, Tech Stack) và cách lập trình viên giải quyết các bài toán kỹ thuật phức tạp.

## 4. Các tính năng chính (Core Features)

### 4.1. Trang chủ (Landing Page)
Trang chủ hoạt động theo cơ chế cuộn mượt mà (smooth scrolling) với các phần chính:
1. **Hero Section (Technical/Creative Intro):**
   * Giới thiệu ngắn gọn, ấn tượng về bản thân.
   * Tích hợp một **Terminal/CLI Widget** tương tác: Cho phép người dùng nhập các lệnh cơ bản (ví dụ: `help`, `about`, `courses`, `skills`, `clear`) để hiển thị thông tin dạng dòng lệnh.
2. **About Me & Instructor Stats:**
   * Thông tin giới thiệu bản thân, kỹ năng cốt lõi (Full Stack).
   * Các chỉ số giảng dạy (ví dụ: Tổng số học viên, số lượng đánh giá, số khóa học) hiển thị trực quan.
3. **Udemy Courses Showcase:**
   * Hiển thị danh sách khóa học lấy trực tiếp từ API của Udemy.
   * Bộ lọc khóa học (theo danh mục, công nghệ).
   * Thẻ khóa học (Course Cards) hiển thị: Ảnh bìa, Tên khóa học, Đánh giá (Rating), Số lượng học viên, Giá bán (nếu có), và nút kêu gọi hành động (CTA) dẫn tới trang chi tiết hoặc Udemy.
4. **Projects Portfolio:**
   * Hiển thị các dự án lập trình tiêu biểu.
   * Thẻ dự án hiển thị: Tên dự án, mô tả ngắn, Tech Stack badges, liên kết Github/Live Demo.
5. **Contact Form:**
   * Form cho phép người dùng gửi lời nhắn (Họ tên, Email, Tiêu đề, Nội dung).
   * Vì không có backend/Supabase, form sẽ được xử lý client-side bằng cách tích hợp dịch vụ bên thứ ba (như Formspree, EmailJS) hoặc mở ứng dụng gửi email (mailto).

### 4.2. Các trang chi tiết (Detail Pages)
Để tối ưu hóa SEO và cung cấp thông tin chuyên sâu:
1. **Trang chi tiết khóa học (Course Detail Page):**
   * Xem thông tin chi tiết của từng khóa học Udemy.
   * Đề cương khóa học (Curriculum overview), đối tượng phù hợp, yêu cầu đầu vào.
   * Đánh giá chi tiết từ học viên (Reviews).
   * Nút đăng ký mua khóa học dẫn trực tiếp sang trang Udemy (chứa mã giảm giá/affiliate nếu có).
2. **Trang chi tiết dự án (Project Detail Page):**
   * Mô tả sâu về dự án: Bài toán đặt ra, Giải pháp kỹ thuật, Sơ đồ kiến trúc (nếu có).
   * Tech stack chi tiết và lý do lựa chọn công nghệ đó.
   * Hình ảnh chụp màn hình / Video demo sản phẩm.

### 4.3. Tính năng hỗ trợ trải nghiệm (Creative UX Features)
* **Command Palette (Menu Lệnh):** Phím tắt `Cmd+K` (hoặc `Ctrl+K`) mở ra thanh tìm kiếm/điều hướng nhanh toàn trang web theo phong cách Spotlight của macOS hoặc VS Code.
* **Code Editor Theme:** Giao diện tối chủ đạo, font chữ monospace cho các đoạn code/technical info, thiết kế bo góc với viền mỏng (glassmorphism/border-slate-800).
* **Micro-animations:** Hiệu ứng hover mượt mà trên các nút bấm, hiệu ứng chuyển trang bằng Framer Motion.

## 5. Ràng buộc & Yêu cầu kỹ thuật (Constraints & Tech Stack)
* **Framework:** ReactJS (Vite) + TypeScript.
* **Styling:** TailwindCSS (sử dụng CSS thuần kết hợp các lớp tiện ích của Tailwind).
* **Animation:** Framer Motion.
* **Icons:** Lucide React.
* **Backend:** Không có backend riêng.
* **Database:** Không sử dụng Supabase (tạm thời lược bỏ theo yêu cầu).
* **Udemy API Integration:** Lấy dữ liệu trực tiếp từ API của Udemy (Client-side fetch với schema sẽ được cung cấp sau). Trong thời gian chờ đợi, hệ thống sẽ sử dụng Mock Service với cấu trúc dữ liệu chuẩn.

## 6. Các tính năng nằm ngoài phạm vi (Out of Scope)
* Hệ thống thanh toán trực tiếp trên trang web.
* Hệ thống quản lý/phát video bài học (e-learning player).
* Đăng ký, đăng nhập tài khoản người dùng.
* Hệ thống Blog cá nhân phức tạp (CMS).
