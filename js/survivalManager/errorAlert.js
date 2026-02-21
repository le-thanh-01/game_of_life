import { ThemeManager } from "../theme/themeManager.js";
// Cấu hình
const MAX_ERRORS = 90; // Số lượng hộp thoại tối đa (để tránh đơ máy)
const SPAWN_SPEED = 50; // Tốc độ xuất hiện (ms) - càng nhỏ càng nhanh
const AUDIO_SPAWN_SPEED = 200;
let OFFSET_X = 25; // Độ lệch ngang mỗi lần xuất hiện (px)
let OFFSET_Y = 25; // Độ lệch dọc mỗi lần xuất hiện (px)
let START_X = 150; // Vị trí bắt đầu X
let START_Y = 100; // Vị trí bắt đầu Y
let BASE_Z_INDEX = 8000; // Z-index bắt đầu để đảm bảo nó nổi lên trên

//======================
const errorDialog = document.getElementById("critical-error");
const dragHandle = document.getElementById("error-drag-handle");
const audio = new Audio(
  "https://www.myinstants.com/media/sounds/windows-xp-error.mp3",
);
function triggerWin10Error() {
  const overlay = document.getElementById("win10-bsod-overlay");
  const progressSpan = document.getElementById("bsod-progress");

  let progress = 0;

  // 1. Hiện màn hình lỗi
  overlay.classList.remove("hidden");
  document.documentElement.style.overflow = "hidden";
  // 2. Bắt đầu chạy phần trăm giả
  const interval = setInterval(() => {
    // Tăng ngẫu nhiên từ 1 đến 15 đơn vị
    progress += Math.floor(Math.random() * 15) + 1;

    // Cập nhật số lên màn hình
    if (progress > 100) progress = 100;
    progressSpan.textContent = progress;

    // Khi đạt 100% thì dừng lại (treo máy)
    if (progress === 100) {
      clearInterval(interval);
      console.log("System Halted.");
      // Bạn có thể thêm lệnh location.reload() sau vài giây nếu muốn reset trang
      setTimeout(
        () => document.getElementById("black-div").classList.remove("hidden"),
        2000,
      );
    }
  }, 800); // Cập nhật mỗi 800ms (hơi chậm để tạo cảm giác đang "thu thập dữ liệu")
}
// Hàm hiển thị lỗi (Gọi hàm này khi Game Over hoặc Logic fail)
function showCriticalError() {
  errorDialog.classList.remove("hidden");
  //tắt BGM
  if (ThemeManager.gameBGM) ThemeManager.gameBGM.stop();
  // Phát âm thanh lỗi Windows (Link online hoặc tải về máy)

  audio.play().catch((e) => console.log("Trình duyệt chặn autoplay"));

  // Tự động căn giữa lại (phòng trường hợp đã bị kéo đi chỗ khác)
  errorDialog.style.top = "50%";
  errorDialog.style.left = "50%";
}

function closeError() {
  errorDialog.classList.add("hidden");
}

// --- LOGIC KÉO THẢ (DRAG) ---
let isDragging = false;
let offset = { x: 0, y: 0 };

dragHandle.addEventListener("mousedown", (e) => {
  isDragging = true;
  const rect = errorDialog.getBoundingClientRect();
  offset.x = e.clientX - rect.left;
  offset.y = e.clientY - rect.top;

  // Gỡ bỏ transform translate để tính toán theo top/left tuyệt đối
  errorDialog.style.transform = "none";
  errorDialog.style.left = rect.left + "px";
  errorDialog.style.top = rect.top + "px";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const x = e.clientX - offset.x;
  const y = e.clientY - offset.y;

  errorDialog.style.left = x + "px";
  errorDialog.style.top = y + "px";

  // *** KẾT HỢP HIỆU ỨNG LAG Ở BÀI TRƯỚC VÀO ĐÂY ***
  // createTrail(x, y);
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

//==========================

let errorCount = 0;
let cascadeInterval, audioInterval;

// Hàm tạo ra MỘT hộp thoại mới
function spawnDialog() {
  if (errorCount >= MAX_ERRORS) {
    clearInterval(cascadeInterval); // Dừng lại khi đủ số lượng
    clearInterval(audioInterval);
    console.log("Đã đạt giới hạn lỗi!");
    setTimeout(triggerWin10Error, 5000);
    return;
  }

  errorCount++;

  // 1. Clone (nhân bản) cái mẫu
  const clone = errorDialog.cloneNode(true);

  // 2. Xóa ID mẫu để tránh trùng lặp
  clone.removeAttribute("id");

  // 3. Hiện nó lên
  clone.classList.remove("hidden");

  // 4. Tính toán vị trí mới (lệch dần đều)
  const newLeft = START_X + (errorCount % 10) * OFFSET_X;
  const newTop = START_Y + (errorCount % 10) * OFFSET_Y;
  if (errorCount % 10 === 9) {
    START_X += 250;
  }
  if (errorCount % 30 === 29) {
    START_X = 150;
    START_Y += 150;
    BASE_Z_INDEX += 10;
  }
  clone.style.left = newLeft + "px";
  clone.style.top = newTop + "px";

  // 5. Tăng z-index để cái mới đè lên cái cũ
  clone.style.zIndex = BASE_Z_INDEX + (errorCount % 10);

  // 6. Gắn vào trang web
  document.body.appendChild(clone);
}
function errorAudio() {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}
// Hàm chính để bắt đầu hiệu ứng
function startErrorCascade() {
  console.log("Bắt đầu quy trình lỗi...");

  // Phát âm thanh mở đầu
  audio.play().catch(() => console.log("Cần tương tác để phát âm thanh"));

  // Hiện cái đầu tiên ngay lập tức (Tùy chọn)
  spawnDialog();
  // Bắt đầu vòng lặp tạo lỗi liên tục
  cascadeInterval = setInterval(spawnDialog, SPAWN_SPEED);
  audioInterval = setInterval(errorAudio, AUDIO_SPAWN_SPEED);
}

export function startError() {
  setTimeout(() => {
    document.getElementById("real-time-box").classList.add("hidden");
    showCriticalError();
    const st = setTimeout(startErrorCascade, 1000);
  }, 2000);
}
