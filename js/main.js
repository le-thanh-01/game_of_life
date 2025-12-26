// script.js
import { InteractiveGrid } from "./Grid.js";
import "./guide.js";
import * as login from "./login.js";
import { setupSidebar } from "./sidebar.js";
import { setupEvents } from "./setting.js";
import { TimeSystem } from "./timer.js";
import * as control from "./control.js";

// --- Phần Khởi chạy ---
const Grid = {
  myGrid: null, // Biến toàn cục để lưu instance lưới
};
// Tạo lưới mặc định (5x5) khi vừa vào trang
document.addEventListener("DOMContentLoaded", () => {
  login.checkLoginStatus();
  Grid.myGrid = new InteractiveGrid(7, 15, 30, "grid-container");
  TimeSystem.startRealClock();
  // Gán sự kiện cho nút bấm
  document
    .getElementById("createBtn")
    .addEventListener("click", () => control.handleCreateGrid(Grid));
  document
    .getElementById("selectBtn")
    .addEventListener("click", () => control.handleSelectCoordinate(Grid));
});
setupEvents(() => Grid.myGrid);
setupSidebar(() => Grid.myGrid);
//==========================================================
