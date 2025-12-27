export class InteractiveGrid {
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
  constructor(rows, cols, cell_size, containerId) {
    this.timerId;
    this.intervalTime = 200;
    this.controller = new AbortController();
    this.generation = 0;
    this.lives = 0;
    this.cell_size = cell_size;
    this.rows = rows;
    this.cols = cols;
    this.totalCells = this.rows * this.cols;
    this.container = document.querySelector(`#${containerId} .grid-container`);
    this.cells = [];
    this.btnStart = document.querySelector(`#${containerId} .start`);
    this.btnStart.addEventListener("click", () => this.Active(), {
      signal: this.controller.signal,
    });
    this.btnStop = document.querySelector(`#${containerId} .stop`);
    this.btnStop.addEventListener("click", () => this.Passive(), {
      signal: this.controller.signal,
    });
    this.btnReset = document.querySelector(`#${containerId} .reset`);
    this.btnReset.addEventListener("click", () => this.Reset(), {
      signal: this.controller.signal,
    });
    // Gọi hàm tạo lưới ngay khi khởi tạo
    // this.render();
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
    this.totalCells = this.rows * this.cols;
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
    this.generation++;
  }
  State(col, row) {
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols)
      return false;
    return this.cells[row * this.cols + col].state;
  }
  toggleCellState(cell) {
    // Toggle class 'active' (Xanh <-> Vàng)
    cell.cell_body.classList.toggle("active");
    cell.state = !cell.state;
    if (cell.state) this.lives++;
    else this.lives--;
  }
  toggleAt(x, y) {
    // Kiểm tra toạ độ có hợp lệ không
    if (y < 0 || y >= this.rows || x < 0 || x >= this.cols) {
      alert(`Toạ độ (${x}, ${y}) không tồn tại!`);
      return;
    }

    // Áp dụng công thức: index = (hàng * tổng_cột) + cột
    const index = y * this.cols + x;

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
  //thực hiện gen
  Active() {
    this.timerId = setInterval(() => {
      this.generate();
    }, this.intervalTime);
    this.btnStart.disabled = true;
    this.btnStop.disabled = false;
    this.btnReset.disabled = true;
  }
  Passive() {
    clearInterval(this.timerId);
    this.btnStart.disabled = false;
    this.btnStop.disabled = true;
    this.btnReset.disabled = false;
  }
  Reset() {
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i].next_state = false;
      this.cells[i].update();
    }
  }
  // Trong file Grid.js
  mark(x, y) {
    // 1. Kiểm tra toạ độ hợp lệ
    if (x < 0 || x >= this.cols || y < 0 || y >= this.rows) return;

    // 2. Tính index trong mảng 1 chiều
    const index = y * this.cols + x;
    const targetCell = this.cells[index];

    // 3. Thêm class 'marked' vào phần tử DOM của cell
    if (targetCell && targetCell.cell_body) {
      // Nếu muốn bật tắt (toggle) thì dùng .toggle, muốn đánh dấu luôn thì dùng .add
      targetCell.cell_body.classList.add("marked");
    }
  }

  // Bổ sung phương thức unmark để xoá nếu cần
  unmark(x, y) {
    const index = y * this.cols + x;
    if (this.cells[index]) {
      this.cells[index].cell_body.classList.remove("marked");
    }
  }
}
