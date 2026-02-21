// script.js
import { InteractiveGrid } from "./basic/Grid.js";
import "./basic/guide.js";
import * as login from "./basic/login.js";
import { setupEvents } from "./basic/setting.js";
import { TimeSystem } from "./basic/timer.js";
import { ModeSystem } from "./basic/mode.js";
import "./theme/themeManager.js";
import { updateTheme } from "./theme/themeManager.js";
// --- Phần Khởi chạy ---
// Tạo lưới mặc định (5x5) khi vừa vào trang
document.addEventListener("DOMContentLoaded", () => {
  updateTheme("tet");
  login.checkLoginStatus();
  TimeSystem.startRealClock();
  ModeSystem.init();
  ModeSystem.openSelection();
  document.getElementById("btn-list").disabled = true;
});
setupEvents(() => Grid.myGrid);

//==========================================================
