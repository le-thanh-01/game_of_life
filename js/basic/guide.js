//phần hướng dẫn
let slideIndex = 0;
const slides = document.querySelectorAll(".gol-slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.getElementsByClassName("prev-btn");
const nextBtn = document.getElementsByClassName("next-btn");
function showSlide(n) {
  // Xử lý vòng lặp (về đầu hoặc về cuối)
  if (n >= slides.length) slideIndex = 0;
  else if (n < 0) slideIndex = slides.length - 1;
  else slideIndex = n;

  // Ẩn tất cả slide
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  // Hiện slide hiện tại
  slides[slideIndex].classList.add("active");
  dots[slideIndex].classList.add("active");
}

// Hàm gọi bởi mũi tên
function changeSlide(n) {
  showSlide(slideIndex + n);
}

nextBtn[0].addEventListener("click", () => changeSlide(1));
prevBtn[0].addEventListener("click", () => changeSlide(-1));
dots.forEach((dot, i) => dot.addEventListener("click", () => showSlide(i)));
//====================================================
