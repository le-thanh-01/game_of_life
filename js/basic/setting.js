import { translations } from "./langData.js"; // Nhập từ điển
import { TimeSystem } from "./timer.js";
import { Grid } from "../creativeManager/creativeManager.js";
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

export function setupEvents() {
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
    const myGrid = Grid.myGrid;
    if (interval >= 100 && csize >= 10) {
      myGrid.intervalTime = interval;
      myGrid.cell_size = csize;
      myGrid.render();
      closeModal(els.modal); // Đóng modal
    } else {
      alert("thời gian phải >= 100ms và kích thước phải >= 10px");
    }
  });
}

// --- HỆ THỐNG NGÔN NGỮ ---
const LanguageSystem = {
  currentLang: "vi", // Mặc định

  init() {
    // 1. Lấy ngôn ngữ đã lưu trong localStorage (nếu có)
    const savedLang = localStorage.getItem("grid_game_lang");
    if (savedLang) {
      this.currentLang = savedLang;
    }

    // 2. Áp dụng ngôn ngữ ngay khi vào trang
    this.applyLanguage(this.currentLang);

    // 3. Gắn sự kiện cho nút bấm
    const btnToggle = document.getElementById("btn-lang-toggle");
    if (btnToggle) {
      btnToggle.addEventListener("click", () => this.toggleLang());
    }
  },

  toggleLang() {
    // Đổi VI -> EN và ngược lại
    this.currentLang = this.currentLang === "vi" ? "en" : "vi";

    // Lưu vào bộ nhớ
    localStorage.setItem("grid_game_lang", this.currentLang);

    // Cập nhật giao diện
    this.applyLanguage(this.currentLang);
  },

  applyLanguage(lang) {
    const data = translations[lang]; // Lấy bộ từ điển tương ứng
    const langIcon = document.getElementById("lang-icon");

    // A. Cập nhật Icon cờ
    if (langIcon) {
      langIcon.textContent = lang === "vi" ? "🇻🇳" : "🇺🇸";
    }

    // B. Cập nhật các thẻ có data-lang (Text nội dung)
    const elements = document.querySelectorAll("[data-lang]");
    elements.forEach((el) => {
      const key = el.getAttribute("data-lang");
      if (data[key]) {
        el.textContent = data[key];
      }
    });

    // C. Cập nhật Placeholder cho ô Input (Trường hợp đặc biệt)
    const inputs = document.querySelectorAll("[data-placeholder]");
    inputs.forEach((input) => {
      const key = input.getAttribute("data-placeholder");
      if (data[key]) {
        input.placeholder = data[key];
      }
    });
    if (TimeSystem && typeof TimeSystem.setLocale === "function") {
      TimeSystem.setLocale(lang);
    }
    console.log(`Đã chuyển sang ngôn ngữ: ${lang}`);
  },
};

// --- GỌI HÀM TRONG INIT ---
document.addEventListener("DOMContentLoaded", () => {
  // ... các code khác ...

  LanguageSystem.init(); // Kích hoạt đa ngôn ngữ
});
