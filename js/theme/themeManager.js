// js/themeManager.js
export class BgmManager {
  constructor(videoId) {
    this.videoId = videoId;
    this.player = null;

    // Trỏ tham chiếu tới các phần tử DOM
    this.btnStartGame = document.getElementById("btn-submit-login");
    this.btnPlay = document.querySelector(".vol-on");
    this.btnStop = document.querySelector(".vol-off");

    // Gán sự kiện click ngay từ đầu
    this.btnStartGame.addEventListener("click", () => this.play());
    this.btnPlay.addEventListener("click", () => this.stop());
    this.btnStop.addEventListener("click", () => this.play());

    // Kích hoạt tiến trình tải API
    this.loadYouTubeAPI();
  }

  // 1. Tải YouTube API bất đồng bộ
  loadYouTubeAPI() {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      // BỔ SUNG: Bắt lỗi tín hiệu mạng
      tag.onerror = () => {
        console.log("error with API");
        throw new Error("Lỗi mạng: Không thể kết nối tới máy chủ API YouTube.");
        // Tại đây có thể gọi hàm hiển thị thông báo "Offline" cho người dùng
      };
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // Hàm callback toàn cục bắt buộc của YouTube API
      window.onYouTubeIframeAPIReady = () => this.initPlayer();
    } else {
      this.initPlayer();
    }
  }

  // 2. Khởi tạo đối tượng Player
  initPlayer() {
    const currentOrigin = window.location.origin;
    this.player = new YT.Player("bgm-container", {
      height: "0",
      width: "0",
      videoId: this.videoId,
      playerVars: {
        autoplay: 0, // Không tự động phát, chờ người dùng bấm
        controls: 0, // Ẩn giao diện
        disablekb: 1, // Vô hiệu hóa phím tắt
        loop: 1, // Bật chế độ lặp lại
        playlist: this.videoId, // BẮT BUỘC: API yêu cầu playlist = videoId để loop hoạt động
        origin: currentOrigin,
      },
      events: {
        onReady: () => this.onPlayerReady(),
        // BỔ SUNG: Lắng nghe mã lỗi từ máy chủ trả về
        onError: (event) => console.log(event),
      },
    });
  }

  // 3. Mở khóa nút bấm khi dữ liệu đã tải xong
  onPlayerReady() {
    this.btnPlay.disabled = false;
    this.btnStop.disabled = false;
    console.log("BGM Manager đã sẵn sàng.");
  }

  // 4. Các phương thức điều khiển luồng
  play() {
    if (this.player && typeof this.player.playVideo === "function") {
      this.player.playVideo();
      console.log("đã bật âm thanh");
    } else if (!this.player) console.log("chưa khởi tạo player");
    else console.log(typeof this.player.playVideo);
    this.btnPlay.classList.toggle("hidden");
    this.btnStop.classList.toggle("hidden");
  }

  stop() {
    if (this.player && typeof this.player.pauseVideo === "function") {
      this.player.pauseVideo();
    }
    this.btnPlay.classList.toggle("hidden");
    this.btnStop.classList.toggle("hidden");
  }
  // Phương thức dọn dẹp bộ nhớ
  dispose() {
    if (this.player && typeof this.player.destroy === "function") {
      // Hủy toàn bộ tiến trình setInterval ngầm và xóa Iframe khỏi DOM
      this.player.destroy();
      this.player = null;
    }
    console.log("Đã giải phóng tài nguyên BGM cũ.");
  }
}

export const ThemeManager = {
  // KHỞI TẠO ĐỐI TƯỢNG VÀO BỘ NHỚ
  // Truyền vào ID của video YouTube (Ví dụ: 'M7lc1UVf-VE')
  gameBGM: null,
  activeElements: [],

  // 1. Hàm dọn dẹp (Giữ nguyên như cũ)
  clearTheme: function () {
    this.activeElements.forEach((el) => el.remove());
    this.activeElements = [];
  },

  // 2. Hàm tải Theme mới (SỬ DỤNG ASYNC/AWAIT)
  loadTheme: async function (themeName) {
    // --- Bước A: Dọn dẹp theme cũ ---
    this.clearTheme();
    if (this.gameBGM) {
      this.gameBGM.dispose();
    }
    // --- Bước B: Tải CSS (Như bài trước) ---
    const themeLink = document.getElementById("theme-style");
    if (themeLink) themeLink.href = `./themes/${themeName}/style.css`;

    const favicon = document.querySelectorAll(".favicon");
    favicon.forEach((link) => {
      link.href =
        `./themes/${themeName}/ico/` + link.getAttribute("data-filename");
    });
    document
      .getElementById("favicon")
      .setAttribute("content", `./themes/${themeName}/ico/ms-icon-144x144.png`);

    // --- Bước C: Tải file Config JS động ---
    try {
      // Trình duyệt sẽ tải file config.js của theme tương ứng
      // Nếu themeName = 'tet' -> tải 'themes/tet/elem.js'
      const module = await import(`../../themes/${themeName}/elem.js`);

      // Lấy dữ liệu từ "export default"
      const elementsConfig = module.default;
      //thêm BGM theo theme
      try {
        this.gameBGM = new BgmManager(module.audio.bgm);
        console.log("đã khởi tạo bgm với id: " + module.audio.bgm);
      } catch (error) {
        console.error("Lỗi khởi tạo BgmManager:", error.message);
      }
      // --- Bước D: Tạo phần tử (Logic cũ) ---
      const overlay = document.getElementById("theme-overlay");

      elementsConfig.forEach((data) => {
        const el = document.createElement("div");
        const parent = document.querySelector(data.parent);
        if (data.content) el.innerHTML = data.content;
        if (data.class)
          data.class.forEach((d_class) => {
            el.classList.add(d_class);
          });
        if (parent) parent.prepend(el);
        else overlay.appendChild(el);
        this.activeElements.push(el);
      });
      module.effect();
      console.log(`✅ Đã tải cấu hình theme: ${themeName}`);
    } catch (error) {
      console.warn(
        `⚠️ Theme "${themeName}" không có file config.js hoặc bị lỗi tải.`,
      );
      console.error(error);
    }
  },
};

// Sử dụng:
export function updateTheme(themeName) {
  const theme = localStorage.getItem("theme_name");
  if (!theme || theme != "default") {
    localStorage.setItem("theme_name", themeName);
    ThemeManager.loadTheme(themeName);
  }
}
