// Phần đăng nhập
export function checkLoginStatus() {
  // Giả sử ta lưu tên người dùng trong localStorage
  const user = localStorage.getItem("player_name");

  const loginModal = document.getElementById("login-modal");
  // const welcomeText = document.getElementById('welcome-msg');
  // Bạn có thể tạo thẻ này để hiển thị tên

  if (!user) {
    // Chưa đăng nhập -> Hiện Modal
    loginModal.classList.remove("hidden");
  } else {
    alert(`Đã đăng nhập là: ${user}, bắt đầu chơi thôi!`);
  }

  // Xử lý nút Đăng nhập
  const btnSubmit = document.getElementById("btn-submit-login");
  const inputUser = document.getElementById("username");

  btnSubmit.addEventListener("click", () => {
    const name = inputUser.value.trim();

    if (name.length > 0) {
      // 1. Lưu vào bộ nhớ trình duyệt
      localStorage.setItem("player_name", name);

      // 2. Ẩn Modal đi
      loginModal.classList.add("hidden");
      // hiện hướng dẫn ngay
      document.getElementById("tutorialCard").classList.remove("hidden");
      // 3. (Tùy chọn) Chào mừng
      alert(`Xin chào ${name}, bắt đầu chơi thôi!`);
    } else {
      alert("Vui lòng nhập tên!");
    }
  });
}
