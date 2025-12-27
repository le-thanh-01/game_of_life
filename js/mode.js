import { setupCreativeMode } from "./creativeManager/creativeManager.js";
import { SurvivalManager } from "./survivalManager/survivalManager.js";

// Thêm vào trong Object UserSystem hoặc tạo module mới ModeSystem
export const ModeSystem = {
  els: {
    modal: document.getElementById("mode-modal"),
    btnCreative: document.getElementById("btn-mode-creative"),
    btnSurvival: document.getElementById("btn-mode-survival"),

    // Các khu vực giao diện cần ẩn/hiện
    controlsArea: document.querySelector(".controls"),
    questionArea: document.querySelector(".question"),
    timerFloat: document.getElementById("game-timer-box"), // ID của đồng hồ đếm ngược
  },

  init(myGrid) {
    // Gắn sự kiện click
    this.els.btnCreative.addEventListener("click", () =>
      this.setMode("creative", myGrid)
    );
    this.els.btnSurvival.addEventListener("click", () =>
      this.setMode("survival", myGrid)
    );
  },

  // Hàm mở bảng chọn mode (Gọi hàm này sau khi đăng nhập thành công)
  openSelection() {
    this.els.modal.classList.remove("hidden");
  },

  setMode(mode, myGrid) {
    // 1. Ẩn bảng chọn mode đi
    this.els.modal.classList.add("hidden");

    if (mode === "creative") {
      console.log("Mode: Creative");

      // HIỆN Controls
      this.els.controlsArea.classList.remove("hidden");

      // ẨN Question & Timer
      this.els.questionArea.classList.add("hidden");
      this.els.timerFloat.classList.add("hidden");
      setupCreativeMode(myGrid);
    } else if (mode === "survival") {
      console.log("Mode: Survival");

      // ẨN Controls
      this.els.controlsArea.classList.add("hidden");

      // HIỆN Question
      this.els.questionArea.classList.remove("hidden");

      // HIỆN Timer (Xóa class hidden)
      this.els.timerFloat.classList.remove("hidden");
      SurvivalManager.startSuvival(0);
    }
  },
};
