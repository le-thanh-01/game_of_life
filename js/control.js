// Hàm lấy giá trị input và tạo lưới
import { InteractiveGrid } from "./Grid.js";
export function handleCreateGrid(Grid) {
  const rowsInput = document.getElementById("rowsInput");
  const colsInput = document.getElementById("colsInput");
  const m = parseInt(rowsInput.value);
  const n = parseInt(colsInput.value);

  if (m > 0 && n > 0) {
    Grid.myGrid = new InteractiveGrid(
      m,
      n,
      Grid.myGrid.cell_size,
      "grid-container"
    );
  } else {
    alert("Vui lòng nhập số dòng và cột lớn hơn 0");
  }
}
// Hàm xử lý nút bấm chọn toạ độ
export function handleSelectCoordinate(Grid) {
  if (!Grid.myGrid) return alert("Vui lòng tạo lưới trước!");

  const x = parseInt(document.getElementById("coordX").value);
  const y = parseInt(document.getElementById("coordY").value);

  // Gọi hàm trong class
  Grid.myGrid.toggleAt(x, y);
}
