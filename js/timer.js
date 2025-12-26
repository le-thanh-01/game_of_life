//Phần thời gian
// --- QUẢN LÝ THỜI GIAN ---
export const TimeSystem = {
  timerInterval: null,
  currentLocale: "en-US", // Mặc định là en

  // Hàm này để LanguageSystem gọi khi đổi ngôn ngữ
  setLocale(langKey) {
    // Map từ khóa của bạn (vi/en) sang chuẩn của trình duyệt
    const localeMap = {
      vi: "vi-VN",
      en: "en-US",
    };
    this.currentLocale = localeMap[langKey] || "vi-VN";

    // Gọi update ngay lập tức để không phải đợi 1 giây mới đổi
    this.updateClockDisplay();
  },

  startRealClock() {
    // Chạy lần đầu
    this.updateClockDisplay();

    // Lặp lại mỗi giây
    setInterval(() => {
      this.updateClockDisplay();
    }, 1000);
  },

  // Tách hàm vẽ giao diện ra riêng để tái sử dụng
  updateClockDisplay() {
    const elTime = document.getElementById("rt-time");
    const elDate = document.getElementById("rt-date");

    if (!elTime || !elDate) return;

    const now = new Date();

    // 1. Xử lý GIỜ (Luôn hiển thị kiểu 24h cho dễ nhìn)
    // en-GB giúp hiển thị 23:59 thay vì 11:59 PM
    elTime.textContent = now.toLocaleTimeString();

    // 2. Xử lý NGÀY THÁNG (Tự động dịch theo this.currentLocale)
    const dateOptions = {
      weekday: "long", // Hiện đầy đủ: "Thứ Hai" hoặc "Monday"
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    // Phép thuật nằm ở đây: Nó tự dịch dựa trên locale
    let dateString = now.toLocaleDateString(this.currentLocale, dateOptions);

    // (Tuỳ chọn) Chữ tiếng Anh mặc định không viết hoa -> Viết hoa chữ cái đầu
    // Ví dụ: "monday, ..." -> "Monday, ..."
    dateString = dateString.charAt(0).toUpperCase() + dateString.slice(1);

    elDate.textContent = dateString;
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
