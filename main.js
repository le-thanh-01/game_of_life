// script.js
let btnStart = document.getElementById("start"),
  btnStop = document.getElementById("stop"),
  btnReset = document.getElementById("reset");
class InteractiveGrid {
  static Cell = class {
    constructor(x, y, state, parent) {
      this.x = x;
      this.y = y;
      this.state = state;
      this.next_state = state;
      this.parent = parent;
      this.cell_body = document.createElement("div");
      this.cell_body.classList.add("cell");
      this.cell_body.addEventListener("click", () => {
        parent.toggleCellState(this);
      });
    }
    update() {
      if (this.state != this.next_state) this.parent.toggleCellState(this);
    }
  };
  constructor(rows, cols, containerId) {
    this.timerId;
    this.intervalTime = 200;
    this.cell_size = 30;
    this.rows = rows;
    this.cols = cols;
    this.totalCells = this.rows * this.cols;
    this.container = document.getElementById(containerId);
    this.cells = [];
    // Gọi hàm tạo lưới ngay khi khởi tạo
    this.render();
  }

  render() {
    //  Xóa nội dung cũ
    this.container.innerHTML = "";
    this.cells = []; // Reset mảng lưu trữ
    this.container.style.gridTemplateColumns = `repeat(${this.cols}, ${this.cell_size}px)`;
    this.container.style.gridTemplateRows = `repeat(${this.rows}, ${this.cell_size}px)`;
    //  Tạo các ô

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const newCell = new InteractiveGrid.Cell(x, y, false, this);
        this.container.appendChild(newCell.cell_body);
        this.cells.push(newCell);
      }
    }
  }
  calcState(cell, x, y) {
    let count = 0;
    for (let j = -1; j < 2; j++)
      for (let i = -1; i < 2; i++) {
        const col = x + i;
        const row = y + j;
        if (col < 0 || col >= this.cols || row < 0 || row >= this.rows) {
          continue;
        }
        let target = this.cells[row * this.cols + col];
        if (target && target.state) count++;
      }
    if (cell.state) count--;
    if (count === 3) cell.next_state = true;
    else if (count === 2) cell.next_state = cell.state;
    else cell.next_state = false;
  }
  generate() {
    for (let i = 0; i < this.totalCells; i++) {
      this.calcState(this.cells[i], this.cells[i].x, this.cells[i].y);
    }
    for (let i = 0; i < this.totalCells; i++) {
      this.cells[i].update();
    }
  }
  toggleCellState(cell) {
    // Toggle class 'active' (Xanh <-> Vàng)
    cell.cell_body.classList.toggle("active");
    cell.state = !cell.state;
  }
  toggleAt(x, y) {
    // Kiểm tra toạ độ có hợp lệ không
    if (x < 0 || x >= this.rows || y < 0 || y >= this.cols) {
      alert(`Toạ độ (${x}, ${y}) không tồn tại!`);
      return;
    }

    // Áp dụng công thức: index = (hàng * tổng_cột) + cột
    const index = x * this.cols + y;

    // Truy xuất ô từ mảng đã lưu
    const targetCell = this.cells[index];

    // Thực hiện hành động
    if (targetCell) {
      this.toggleCellState(targetCell);
    }
  }
  parseAndDrawRLE(startX, startY, rleCode) {
    // 1. LÀM SẠCH DỮ LIỆU INPUT
    // Xóa bỏ các dòng comment (bắt đầu bằng #) hoặc dòng header (bắt đầu bằng x =)
    const lines = rleCode.split("\n");
    let cleanCode = "";

    lines.forEach((line) => {
      line = line.trim();
      // Bỏ qua dòng comment hoặc header
      if (
        line.startsWith("#") ||
        line.startsWith("x") ||
        line.startsWith("X")
      ) {
        return;
      }
      cleanCode += line;
    });

    // 2. BIẾN CỤC BỘ ĐỂ DUYỆT CHUỖI
    let currentX = 0; // Vị trí x tương đối trong pattern
    let currentY = 0; // Vị trí y tương đối trong pattern
    let countStr = ""; // Chuỗi lưu số lượng (VD: "24" trong "24b")

    // 3. VÒNG LẶP DUYỆT TỪNG KÝ TỰ
    for (let i = 0; i < cleanCode.length; i++) {
      const char = cleanCode[i];

      // Nếu gặp dấu chấm than (!) -> Kết thúc
      if (char === "!") break;

      // Nếu là số -> Cộng dồn vào chuỗi đếm
      if (!isNaN(parseInt(char))) {
        countStr += char;
      } else {
        // Nếu là ký tự lệnh (b, o, $)
        // Mặc định số lượng là 1 nếu không có số đứng trước
        const count = parseInt(countStr) || 1;
        countStr = ""; // Reset biến đếm sau khi dùng

        if (char === "b") {
          // b = dead (ô chết/bỏ qua)
          // Chỉ cần dịch chuyển con trỏ x sang phải
          currentX += count;
        } else if (char === "o") {
          // o = alive (ô sống)
          for (let k = 0; k < count; k++) {
            // Tính toạ độ thực tế trên lưới
            const targetX = startX + currentX + k;
            const targetY = startY + currentY;

            // KIỂM TRA AN TOÀN TRƯỚC KHI GỌI TOGGLE
            // 1. Kiểm tra biên (để tránh toggleAt hiện alert lỗi)
            if (
              targetX >= 0 &&
              targetX < this.cols &&
              targetY >= 0 &&
              targetY < this.rows
            ) {
              // 2. Lấy ô mục tiêu để kiểm tra trạng thái hiện tại
              const index = targetY * this.cols + targetX;
              const cell = this.cells[index];

              // QUAN TRỌNG: Chỉ toggle nếu ô đang CHẾT (state === false)
              // Nếu ô đang sống rồi thì giữ nguyên, không được toggle (vì toggle sẽ làm nó chết)
              if (cell && !cell.state) {
                this.toggleAt(targetX, targetY);
              }
            }
          }
          // Sau khi vẽ xong các ô sống, dịch chuyển con trỏ x
          currentX += count;
        } else if (char === "$") {
          // $ = xuống dòng
          currentY += count; // Xuống n dòng
          currentX = 0; // Reset x về đầu dòng
        }
      }
    }
  }
}
// --- Phần Khởi chạy ---
let myGrid; // Biến toàn cục để lưu instance lưới
// Hàm lấy giá trị input và tạo lưới
function handleCreateGrid() {
  const rowsInput = document.getElementById("rowsInput");
  const colsInput = document.getElementById("colsInput");

  const m = parseInt(rowsInput.value);
  const n = parseInt(colsInput.value);

  if (m > 0 && n > 0) {
    myGrid = new InteractiveGrid(m, n, "grid-container");
  } else {
    alert("Vui lòng nhập số dòng và cột lớn hơn 0");
  }
}
// Hàm xử lý nút bấm chọn toạ độ
function handleSelectCoordinate() {
  if (!myGrid) return alert("Vui lòng tạo lưới trước!");

  const x = parseInt(document.getElementById("coordX").value);
  const y = parseInt(document.getElementById("coordY").value);

  // Gọi hàm trong class
  myGrid.toggleAt(x, y);
}
//thực hiện gen
function Active(grid) {
  grid.timerId = setInterval(() => {
    grid.generate();
  }, grid.intervalTime);
  btnStart.disabled = true;
  btnStop.disabled = false;
  btnReset.disabled = true;
}
function Passive(grid) {
  clearInterval(grid.timerId);
  btnStart.disabled = false;
  btnStop.disabled = true;
  btnReset.disabled = false;
}
function Reset(grid) {
  for (let i = 0; i < grid.totalCells; i++) {
    grid.cells[i].next_state = false;
    grid.cells[i].update();
  }
}
// Gán sự kiện cho nút bấm
document
  .getElementById("createBtn")
  .addEventListener("click", handleCreateGrid);
document
  .getElementById("selectBtn")
  .addEventListener("click", handleSelectCoordinate);
// Tạo lưới mặc định (5x5) khi vừa vào trang
document.addEventListener("DOMContentLoaded", () => {
  checkLoginStatus();
  myGrid = new InteractiveGrid(7, 15, "grid-container");
  TimeSystem.startRealClock();
});
btnStart.addEventListener("click", () => Active(myGrid));
btnStop.addEventListener("click", () => Passive(myGrid));
btnReset.addEventListener("click", () => Reset(myGrid));

//==========================================================
//Phần Setting
// Các phần tử DOM cần dùng
const els = {
  btnSetting: document.getElementById("btn-setting"),
  btnGuide: document.getElementById("btn-guide"),
  modal: document.getElementById("setting-modal"),
  modalG: document.getElementById("tutorialCard"),
  btnClose: document.getElementById("close-modal"),
  btnCloseG: document.getElementById("close-guide"),
  btnSave: document.getElementById("btn-save-settings"),
  inputRows: document.getElementById("modal-rows"),
  inputCols: document.getElementById("modal-cols"),
};

function setupEvents() {
  // --- MỞ MODAL ---
  els.btnSetting.addEventListener("click", () => {
    els.modal.classList.remove("hidden");
  });
  els.btnGuide.addEventListener("click", () => {
    els.modalG.classList.remove("hidden");
  });
  // --- ĐÓNG MODAL ---
  const closeModal = (m) => m.classList.add("hidden");

  els.btnClose.addEventListener("click", () => closeModal(els.modal));
  els.btnCloseG.addEventListener("click", () => closeModal(els.modalG));

  // Click ra ngoài vùng đen cũng đóng
  els.modal.addEventListener("click", (e) => {
    if (e.target === els.modal) closeModal(els.modal);
  });
  els.modalG.addEventListener("click", (e) => {
    if (e.target === els.modalG) closeModal(els.modalG);
  });
  // --- LƯU CÀI ĐẶT ---
  els.btnSave.addEventListener("click", () => {
    const interval = parseInt(els.inputRows.value);
    const csize = parseInt(els.inputCols.value);

    if (interval >= 100 && csize >= 10) {
      myGrid.intervalTime = interval;
      myGrid.cell_size = csize;
      myGrid.render();
      closeModal(); // Đóng modal
    } else {
      alert("thời gian phải >= 100ms và kích thước phải >= 10px");
    }
  });
}
setupEvents();

//phần hướng dẫn
let slideIndex = 0;
const slides = document.querySelectorAll(".gol-slide");
const dots = document.querySelectorAll(".dot");

function showSlide(n) {
  // Xử lý vòng lặp (về đầu hoặc về cuối)
  if (n >= slides.length) slideIndex = 0;
  else if (n < 0) slideIndex = slides.length - 1;
  else slideIndex = n;

  // Ẩn tất cả slide
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  // Hiện slide hiện tại
  slides[slideIndex].classList.add("active");
  dots[slideIndex].classList.add("active");
}

// Hàm gọi bởi mũi tên
function changeSlide(n) {
  showSlide(slideIndex + n);
}

// Hàm gọi bởi dấu chấm
function currentSlide(n) {
  showSlide(n);
}
//====================================================
// Phần đăng nhập
function checkLoginStatus() {
  // Giả sử ta lưu tên người dùng trong localStorage
  const user = localStorage.getItem("player_name");

  const loginModal = document.getElementById("login-modal");
  // const welcomeText = document.getElementById('welcome-msg');
  // Bạn có thể tạo thẻ này để hiển thị tên

  if (!user) {
    // Chưa đăng nhập -> Hiện Modal
    loginModal.classList.remove("hidden");
  } else {
    alert(`Đã đăng nhập là: ${user}, bắt đầu chơi thôi!`);
  }

  // Xử lý nút Đăng nhập
  const btnSubmit = document.getElementById("btn-submit-login");
  const inputUser = document.getElementById("username");

  btnSubmit.addEventListener("click", () => {
    const name = inputUser.value.trim();

    if (name.length > 0) {
      // 1. Lưu vào bộ nhớ trình duyệt
      localStorage.setItem("player_name", name);

      // 2. Ẩn Modal đi
      loginModal.classList.add("hidden");

      // 3. (Tùy chọn) Chào mừng
      alert(`Xin chào ${name}, bắt đầu chơi thôi!`);
    } else {
      alert("Vui lòng nhập tên!");
    }
  });
}

//Phần thời gian
// --- QUẢN LÝ THỜI GIAN ---
const TimeSystem = {
  timerInterval: null,

  startRealClock() {
    const elTime = document.getElementById("rt-time");
    const elDate = document.getElementById("rt-date");

    // Mảng tên các thứ trong tuần (Date.getDay() trả về 0-6)
    const daysOfWeek = [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ];

    const update = () => {
      const now = new Date();

      // 1. Lấy Giờ : Phút : Giây
      const timeStr = now.toLocaleTimeString("vi-VN", { hour12: false });

      // 2. Lấy Thứ (0-6)
      const dayName = daysOfWeek[now.getDay()];

      // 3. Lấy Ngày (1-31)
      const date = now.getDate().toString().padStart(2, "0");

      // 4. Lấy Tháng (0-11) -> Phải cộng thêm 1
      const month = (now.getMonth() + 1).toString().padStart(2, "0");

      // 5. Lấy Năm (Full)
      const year = now.getFullYear();

      // Gán vào HTML
      elTime.textContent = timeStr;
      elDate.textContent = `${dayName}, ${date}/${month}/${year}`;
    };

    update(); // Chạy ngay lập tức không cần đợi 1s
    setInterval(update, 1000);
  },

  startCountdown(seconds) {
    // Hiện đồng hồ đếm ngược lên (nếu đang ẩn)
    document.getElementById("game-timer-box").classList.remove("hidden");

    this.stopCountdown();
    const el = document.getElementById("game-timer");
    const box = document.getElementById("game-timer-box");

    let timeLeft = seconds;

    const format = (s) => {
      const m = Math.floor(s / 60)
        .toString()
        .padStart(2, "0");
      const sec = (s % 60).toString().padStart(2, "0");
      return `${m}:${sec}`;
    };

    el.textContent = format(timeLeft);
    box.classList.remove("timer-warning");

    this.timerInterval = setInterval(() => {
      timeLeft--;
      el.textContent = format(timeLeft);

      if (timeLeft <= 10) box.classList.add("timer-warning");

      if (timeLeft <= 0) {
        this.stopCountdown();
        // Ẩn đồng hồ đi khi hết giờ (tuỳ chọn)
        // box.classList.add('hidden');
        alert("Time's Up!");
      }
    }, 1000);
  },

  stopCountdown() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  },
};
// Các phần tử DOM
const sidebar = document.getElementById("rleSidebar");
const listBtn = document.getElementById("btn-list");
const closeBtn = document.getElementById("closeSidebarBtn");

// Hàm mở/đóng
function toggleSidebar() {
  sidebar.classList.toggle("open");
}

// Gán sự kiện
listBtn.addEventListener("click", toggleSidebar);
closeBtn.addEventListener("click", toggleSidebar);

// Logic vẽ RLE (kết nối với code cũ của bạn)
document.getElementById("importRleBtn").addEventListener("click", () => {
  const x = parseInt(document.getElementById("coordx").value) || 0;
  const y = parseInt(document.getElementById("coordy").value) || 0;
  const rleCode = document.getElementById("rleInput").value;

  if (rleCode.trim()) {
    // Gọi hàm parse trong class Grid của bạn
    // Lưu ý: Đảm bảo biến 'grid' đã được khởi tạo và có thể truy cập ở đây
    if (typeof myGrid !== "undefined") {
      myGrid.parseAndDrawRLE(x, y, rleCode);
    } else {
      alert("Lỗi. Chưa khởi tạo lưới.");
    }
  } else {
    alert("Vui lòng nhập mã RLE!");
  }
});
