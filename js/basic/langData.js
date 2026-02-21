// js/langData.js

export const translations = {
  // 1. TIẾNG VIỆT
  vi: {
    // Login
    lbl_username: "Tên người chơi:",
    placeholder_name: "Nhập tên của bạn...",

    // Settings
    h_set_grid: "Cài đặt",
    lbl_t_duration: "Thời gian thế hệ:",
    cell_size: "Kích thước cell:",
    btn_save_set: "Lưu",

    // Modal Mode
    mode_title: "Chọn Chế Độ Chơi",
    mode_survival: "Thử thách",
    desc_survival: "Lixi!",
    mode_creative: "Thử nghiệm",
    desc_creative: "Trải nghiệm cách mọi thứ hoạt động",

    // User Bar
    hello: "Xin chào",
    btn_logout: "Đăng xuất",

    // Game Controls
    h_coordinates: "Toạ độ M x N",
    placeholder_rows: "Số dòng",
    placeholder_cols: "Số cột",
    btn_create: "Tạo Lưới Mới",
    h_coordinates_select: "Chọn toạ độ (x, y)",
    p_coordinates_explain: "(Lưu ý: Tính từ 0. Ví dụ 0,0 là ô đầu tiên)",
    btn_select: "Chọn Ô Này",

    // Guide

    //slide 1:
    h_slide1_ex1: "Trạng thái Tế bào",
    p_slide1_ex2: "Thế giới này chỉ có 2 màu:",
    p_slide1_ex3: "ĐANG SỐNG",
    p_slide1_ex4: "ĐÃ CHẾT",
    //slide 2:
    h_slide2_ex1: "Quy tắc Sinh tồn",
    strong_slide2_ex2: "Tiếp tục sống:",
    span_slide2_ex2: "Có 2 hoặc 3 hàng xóm.",
    //slide 3:
    h_slide3_ex1: "Quy tắc Tử vong",
    strong_slide3_ex2: "Chết do cô đơn:",
    span_slide3_ex2: "< 2 hàng xóm.",
    strong_slide3_ex3: "Chết do quá tải:",
    span_slide3_ex3: "> 3 hàng xóm.",
    //slide 4:
    h_slide4_ex1: "Quy tắc Sinh sản",
    strong_slide4_ex2: "Sinh ra mới:",
    span_slide4_ex2: "Ô chết có đúng 3 hàng xóm sẽ hồi sinh.",
    //slide 5:
    h_slide5_ex1: "Cách chơi",
    li_slide5_ex2: "Bạn có thể lựa chọn chế độ Thử thách hoặc Thử nghiệm.",
    li_slide5_ex3: "Hãy thiết lập trước mô hình trước khi chạy.",
    li_slide5_ex4: "Click chuột vào ô bất kỳ để Bật/Tắt sự sống.",
    li_slide5_ex5: "Nhấn nút Start/Run để quan sát sự tiến hóa.",
    li_slide5_ex6:
      "Lưu ý rằng trong Thử thách bạn chỉ được Start 1 lần duy nhất.",
    li_slide5_ex7: "Máy của bạn sẽ crack nếu thất bại.",
    //slide 6:
    li_slide6_ex1: "Chế Độ Thử nghiệm",
    li_slide6_ex2:
      "Hãy thử vào Chế Độ Thử nghiệm trước khi vào game để hiểu rõ quy luật và xây dựng một số quần thể mẫu",

    //info
    li_info_1: "Trang web được xây dựng bởi le-thanh-01",
    li_info_2: "Nguồn tham khảo:",
    li_info_3:
      "Trang web được tạo với mục đích phi thương mại và không nhằm mục đích miệt thị, ám chỉ, miệt thị hay liên quan đến bất kỳ cá nhân, tổ chức, tập thể cụ thể nào. Tất cả sự trùng hợp đều chỉ là ngẫu nhiên.",
    li_info_4:
      "Trang web và toàn bộ mã nguồn được cung cấp theo nguyên trạng (As-Is) mà không có bất kỳ sự bảo đảm nào, dù tường minh hay ngầm định. Tác giả không chịu trách nhiệm cho bất kỳ sự cố mất mát dữ liệu, gián đoạn phần cứng hay thiệt hại nào phát sinh từ việc sử dụng hoặc không thể sử dụng trang web này.",
    li_info_5:
      "Trang web này sử dụng bộ nhớ cục bộ (Local Storage) của trình duyệt để lưu trữ các tùy chọn giao diện tạm thời. Chúng tôi không thu thập, lưu trữ trên máy chủ, hay phân phối bất kỳ dữ liệu định danh cá nhân nào của người dùng.",
    li_info_6:
      "Dự án này hoạt động hoàn toàn phi thương mại và luôn nỗ lực tôn trọng quyền sở hữu trí tuệ của các bên thứ ba. Nếu bạn là chủ sở hữu hợp pháp và phát hiện trang web có chứa nội dung vi phạm bản quyền, vui lòng liên hệ qua email: le6134074@gmail.com.",
    //Sidebar
    h_pattern: "Nhập Pattern (RLE)",
    p_pattern: "Dán mã RLE vào bên dưới để vẽ nhanh:",
    lbl_start: "Vị trí bắt đầu:",
    txtarea_ex: "Ví dụ: bo$2bo$3o!",
    btn_action: "Vẽ ngay",
    btn_close: "Đóng",

    //thông báo game over
    err_notice: "PC của bạn sẽ crack sau:",
  },

  // 2. TIẾNG ANH
  en: {
    // Login
    lbl_username: "Player Name:",
    placeholder_name: "Enter your name...",

    // Settings
    h_set_grid: "Setting",
    lbl_t_duration: "Generation Time:",
    cell_size: "Cell Size:",
    btn_save_set: "Save",

    // User Bar
    hello: "Hello",
    btn_logout: "Logout",

    // Modal Mode
    mode_title: "Select Mode",
    mode_survival: "Challenge",
    desc_survival: "x",
    mode_creative: "Trial",
    desc_creative: "x",

    // Game Controls
    h_coordinates: "Dimensions M x N",
    placeholder_rows: "Rows",
    placeholder_cols: "Columns",
    btn_create: "Create New Grid",
    h_coordinates_select: "Select Coordinates (x, y)",
    p_coordinates_explain: "(Note: 0-indexed. E.g., 0,0 is the first cell)",
    btn_select: "Select This Cell",

    // Guide

    //slide 1:
    h_slide1_ex1: "Cell State",
    p_slide1_ex2: "This world has only 2 colors:",
    p_slide1_ex3: "ALIVE",
    p_slide1_ex4: "DEAD",
    //slide 2:
    h_slide2_ex1: "Survival Rules",
    strong_slide2_ex2: "Stay Alive:",
    span_slide2_ex2: "Has 2 or 3 neighbors.",
    //slide 3:
    h_slide3_ex1: "Death Rules",
    strong_slide3_ex2: "Death by isolation:",
    span_slide3_ex2: "< 2 neighbors.",
    strong_slide3_ex3: "Death by overcrowding:",
    span_slide3_ex3: "> 3 neighbors.",
    //slide 4:
    h_slide4_ex1: "Birth Rules",
    strong_slide4_ex2: "Reproduction:",
    span_slide4_ex2: "A dead cell with exactly 3 neighbors comes to life.",
    //slide 5:
    h_slide5_ex1: "How to Play",
    li_slide5_ex2: "You can choose between Challenge or Trial mode.",
    li_slide5_ex3: "Set up the pattern before running.",
    li_slide5_ex4: "Click on any cell to toggle Life/Dead.",
    li_slide5_ex5: "Press Start/Run to watch the evolution.",
    li_slide5_ex6: "Notice: You can only Start 1 time in Challenge.",
    li_slide5_ex7: "Your PC will crash if you fail.",
    //slide 6:
    li_slide6_ex1: "Trial Mode",
    li_slide6_ex2:
      "Use Trial Mode to understand the rules and test some patterns",
    //Sidebar
    h_pattern: "Import Pattern (RLE)",
    p_pattern: "Paste RLE code below to draw quickly:",
    lbl_start: "Start Position:",
    txtarea_ex: "Example: bo$2bo$3o!",
    btn_action: "Draw Now",
    btn_close: "Close",

    //Game over notice
    err_notice: "Your PC will crack after:",
  },
};
