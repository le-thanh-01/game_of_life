// Các phần tử DOM
const sidebar = document.getElementById("rleSidebar");
const listBtn = document.getElementById("btn-list");
const closeBtn = document.getElementById("closeSidebarBtn");

// Hàm mở/đóng
function toggleSidebar() {
  sidebar.classList.toggle("open");
}

// Gán sự kiện
export function setupSidebar(Grid) {
  listBtn.addEventListener("click", toggleSidebar);
  closeBtn.addEventListener("click", toggleSidebar);

  // Logic vẽ RLE (kết nối với code cũ của bạn)
  document.getElementById("importRleBtn").addEventListener("click", () => {
    const x = parseInt(document.getElementById("coordx").value) || 0;
    const y = parseInt(document.getElementById("coordy").value) || 0;
    const rleCode = document.getElementById("rleInput").value;
    const myGrid = Grid();
    console.log(myGrid);
    if (rleCode.trim()) {
      // Gọi hàm parse trong class Grid của bạn
      // Lưu ý: Đảm bảo biến 'grid' đã được khởi tạo và có thể truy cập ở đây
      if (typeof myGrid !== "undefined") {
        myGrid.parseAndDrawRLE(x, y, rleCode);
      } else {
        alert("Lỗi. Chưa khởi tạo lưới.");
      }
    } else {
      alert("Vui lòng nhập mã RLE!");
    }
  });
}
