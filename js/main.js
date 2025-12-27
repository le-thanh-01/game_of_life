// script.js
import { InteractiveGrid } from "./Grid.js";
import "./guide.js";
import * as login from "./login.js";
import { setupEvents } from "./setting.js";
import { TimeSystem } from "./timer.js";
import { ModeSystem } from "./mode.js";

// --- Phần Khởi chạy ---
const Grid = {
  myGrid: null, // Biến toàn cục để lưu instance lưới
};
// Tạo lưới mặc định (5x5) khi vừa vào trang
document.addEventListener("DOMContentLoaded", () => {
  login.checkLoginStatus();
  Grid.myGrid = new InteractiveGrid(7, 15, 30, "grid-creative");
  TimeSystem.startRealClock();
  ModeSystem.init(Grid.myGrid);
  ModeSystem.openSelection();
});
setupEvents(() => Grid.myGrid);

//==========================================================
