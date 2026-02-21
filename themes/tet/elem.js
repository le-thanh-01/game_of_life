export default [
  {
    content:
      '<img src = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgb3PBtYvcb0AwzJvp5rDfHAOlC_0BsSevp3we6JTICzZAbrhaLcMtlnOAvCb_6A_LuZfnDSCYUVp5M6a_SSq1tQ825ioZ3H1mkboSV8OA7y-cqo723yZJVuniaCibs715peZlIoVfENoBVvigVfJJDffiAoij6tWFv4Jx3RWIVUcQDN5zeMWweAuCuCw/s16000/left-1.png" alt = "AnonyViet-Tet">',
    parent: "body",
    class: ["tet_left"],
  },
  {
    content:
      '<img src = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhmE7w44KuUqFCci75HHT6fo4Snv-s9j8NpP9ERbJhtT9WOasSnDeiDGruspoNUbHQBENce0laVEZZaQc0C-V5pZBPhNgX2ktJprmXpW96EgMHVBBDdbO2UugIYyNY-nXST_nKFcDwDXDiBqM7LZktNIrkgDqQEtdnvYxtt5ZCoV82VNKgSYUIxT1OzYg/s16000/right-1.png" alt = "AnonyViet-Tet">',
    parent: "body",
    class: ["tet_right"],
  },
  {
    content:
      '<img src = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgwruFlhClo3FUKNBQtDvqWYiDVOoi-IT7Jy4R11OU5HaOFR2N7CcX5sH4FWQI_GRoVrx4Hd5pVQREJ_QsAjvSA41v25TW0LEGW2jb8s3J2QwCrXp4qsMqdvxUZz9lglGyxL4YQxIbbf17zyqd99Rr28rDzx-foaXJRQ13kQUAblMtlt4U1rKMYbHkn5w/s16000/bottom-1.png" alt = "AnonyViet-Tet">',
    parent: "body",
    class: ["tet_bottom"],
  },
  {
    content:
      '<img src="./themes/tet/ico/android-icon-96x96.png" alt="game of life"/>',
    parent: ".modal-header",
    class: [],
  },
  // {
  //   content:
  //     '<img src="https://c.pxhere.com/photos/4e/17/luck_coins_lucky_coins_chinese_new_year_fortune_prosperity_feng_shui_i_ching-901577.jpg!d" srcset="https://c.pxhere.com/photos/4e/17/luck_coins_lucky_coins_chinese_new_year_fortune_prosperity_feng_shui_i_ching-901577.jpg!d" alt="tiền bạc, vàng, thau, tiền tệ, đồng tiền, Đồng, May mắn, vận may, đồng xu, Giải thưởng, sự phồn thịnh, phong thủy, Tết nguyên đán, Tiền xu may mắn, Tôi ching, hình ảnh In PxHere">',
  //   parent: "#btn-mode-survival",
  //   class: "gold-coin",
  // },
  {
    content:
      '<img src="https://homenest.com.vn/wp-content/uploads/2025/12/Hoa-dao-ngay-tet-decor-website.png" alt="hoa đào trang trí">',
    parent: "#btn-mode-survival",
    class: ["decor", "peach-blossom-decor"],
  },
  {
    content: "🧧",
    parent: "#btn-mode-survival",
    class: ["decor", "red-envelope-decor"],
  },
  {
    content: "<span>🏮</span>",
    parent: "#btn-mode-survival",
    class: ["decor", "lantern"],
  },
];
export const audio = {
  bgm: "AP3Rsimhyg4",
};
export function effect() {
  // --- CẤU HÌNH ---
  const CONFIG = {
    // Số lượng cánh hoa (Mobile giảm xuống 10, PC là 20)
    count: window.matchMedia("(max-width: 767px)").matches ? 10 : 20,
    // Link ảnh
    imageUrl:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEizrrtX-KQtKY8e8pxCHjLROT5pYW7sVkUpET9HHpW8QO-PnoIRKVsvRDxM6shrE4Q-44Oh9teSGK1SApaZ1OJvhR4z7ENgKSJOLWfsdKw9jPszAa2HqaE6W8ohyGHRvff6TgKXEUjnn73LLLp3FHbtMTJnIkPxPhujWwG5ZsFgW7ctQ0zrR5KKSqlewg/s16000/hoadao-anonyviet.com.png",
    // Thời gian tự ẩn (0 là không bao giờ ẩn)
    hideTime: 0,
  };

  let particles = [];
  let docWidth = window.innerWidth;
  let docHeight = window.innerHeight;
  let animationId;

  // Khởi tạo các hạt
  function init() {
    for (let i = 0; i < CONFIG.count; i++) {
      createParticle();
    }
    loop();

    // Tự động ẩn sau thời gian quy định
    if (CONFIG.hideTime > 0) {
      setTimeout(() => {
        cancelAnimationFrame(animationId);
        particles.forEach((p) => p.element.remove());
        particles = [];
      }, CONFIG.hideTime * 1000);
    }
  }

  // Tạo một hạt đơn lẻ
  function createParticle() {
    const div = document.createElement("div");
    const img = document.createElement("img");

    img.src = CONFIG.imageUrl;
    img.alt = "falling-flower";
    img.style.width = "100%";

    // CSS cho hạt (Thay thế inline style cũ)
    div.style.position = "fixed";
    div.style.top = "-50px"; // Bắt đầu từ trên màn hình
    div.style.left = "0";
    div.style.width = "15px"; // Kích thước hoa
    div.style.zIndex = "7000";
    div.style.pointerEvents = "none"; // Click xuyên qua
    div.style.userSelect = "none";

    div.appendChild(img);
    document.body.appendChild(div);

    // Lưu trạng thái chuyển động của hạt
    particles.push({
      element: div,
      x: Math.random() * docWidth, // Vị trí ngang ban đầu
      y: Math.random() * docHeight, // Vị trí dọc ban đầu
      am: Math.random() * 20, // Biên độ dao động (lắc lư)
      dx: 0, // Góc quay dao động
      stx: 0.02 + Math.random() / 10, // Tốc độ lắc ngang
      sty: 0.7 + Math.random(), // Tốc độ rơi dọc
    });
  }

  // Vòng lặp chuyển động
  function loop() {
    docWidth = window.innerWidth;
    docHeight = window.innerHeight;

    particles.forEach((p) => {
      // Cập nhật tọa độ
      p.y += p.sty;
      p.dx += p.stx;

      // Kiểm tra nếu rơi xuống đáy màn hình
      if (p.y > docHeight + 50) {
        p.y = -50; // Đưa lại lên đỉnh
        p.x = Math.random() * (docWidth - p.am - 30);
        p.stx = 0.02 + Math.random() / 10;
        p.sty = 0.7 + Math.random();
      }

      // Tính toán vị trí X (kết hợp vị trí gốc + dao động hình sin)
      const currentX = p.x + p.am * Math.sin(p.dx);

      // Gán vị trí vào DOM (Sử dụng transform để mượt hơn top/left truyền thống)
      p.element.style.transform = `translate(${currentX}px, ${p.y}px)`;
    });

    animationId = requestAnimationFrame(loop);
  }

  // Chạy script khi DOM đã sẵn sàng
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}
