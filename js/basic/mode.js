import { setupCreativeMode } from "../creativeManager/creativeManager.js";
import { SurvivalManager } from "../survivalManager/survivalManager.js";

// Thêm vào trong Object UserSystem hoặc tạo module mới ModeSystem
export const ModeSystem = {
  els: {
    modal: document.getElementById("mode-modal"),
    btnCreative: document.getElementById("btn-mode-creative"),
    btnSurvival: document.getElementById("btn-mode-survival"),

    // Các khu vực giao diện cần ẩn/hiện
    logo: document.querySelector(".modal-header"),
    controlsArea: document.querySelector(".controls"),
    questionArea: document.querySelector(".question"),
    timerFloat: document.getElementById("game-timer-box-0"), // ID của đồng hồ đếm ngược
  },

  init() {
    // Gắn sự kiện click
    this.els.btnCreative.addEventListener("click", () =>
      this.setMode("creative"),
    );
    this.els.btnSurvival.addEventListener("click", () =>
      this.setMode("survival"),
    );
  },

  // Hàm mở bảng chọn mode (Gọi hàm này sau khi đăng nhập thành công)
  openSelection() {
    this.els.modal.classList.remove("hidden");
  },

  setMode(mode) {
    // 1. Ẩn bảng chọn mode đi
    this.els.modal.classList.add("hidden");
    this.els.logo.classList.add("hidden");
    //Toàn màn hình
    if (!document.fullscreenElement) {
      // requestFullscreen là một Promise
      // , nên có thể bắt lỗi nếu trình duyệt chặn
      document.documentElement.requestFullscreen().catch((err) => {
        alert(`Lỗi không thể bật chế độ toàn màn hình: ${err.message}`);
      });
    }
    if (mode === "creative") {
      console.log("Mode: Creative");

      // HIỆN Controls
      this.els.controlsArea.classList.remove("hidden");

      // ẨN Question & Timer
      this.els.questionArea.classList.add("hidden");
      this.els.timerFloat.classList.add("hidden");
      setupCreativeMode();
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
