import * as Win from "./errorAlert.js";

export function endGame() {
  // Lấy các phần tử cần tương tác
  const openBtn = document.getElementById("openBtn");
  const envelopeWrapper = document.getElementById("envelopeWrapper");
  const envelopeFlap = document.getElementById("envelopeFlap");
  const lightContainer = document.getElementById("lightContainer");

  // Thêm sự kiện click cho nút OPEN
  openBtn.addEventListener("click", function () {
    // 1. Dừng hiệu ứng nhảy
    envelopeWrapper.classList.remove("jumping");

    // 2. Mở nắp bao lì xì
    envelopeFlap.classList.add("open");

    // 3. Ẩn nút bấm đi cho đỡ vướng
    openBtn.style.display = "none";

    // 4. Kích hoạt luồng sáng (delay nhẹ 300ms để chờ nắp mở ra một chút)
    setTimeout(() => {
      lightContainer.classList.add("active");
      setTimeout(() => Win.startError(), 5000);
    }, 300);
  });
}
