// js/SurvivalManager.js
import { ques1 } from "./ques1.js";
import { ques2 } from "./ques2.js";
import { InteractiveGrid } from "../Grid.js"; // Instance grid chính
import { TimeSystem } from "../timer.js";
import * as Win from "./errorAlert.js";
const questions = [ques1, ques2];

export const SurvivalManager = {
  quesIndex: 0,
  gameInterval: null,
  startGen: null,
  isPlaying: false,
  game_stat: document.querySelector(".game-progress p"),
  myGrid: new InteractiveGrid(7, 15, 30, "grid-survival"),
  // Trong vòng lặp game (khi bấm Start)
  handleTimeOut() {
    // Hàm này được TimeSystem tự gọi khi về 0, dù game có đang chạy hay không
    this.stopGame(); // Dừng mọi thứ
    Win.showCriticalError();
    const st = setTimeout(Win.startErrorCascade, 1000);
    document.getElementById("real-time-box").classList.add("hidden");
  },
  startSuvival(i) {
    (this.quesIndex = i), this.loadLevel(questions[i]);
  },
  loadLevel(currentQues) {
    const myGrid = this.myGrid;

    // 1. Reset trạng thái Grid & Giao diện
    myGrid.controller.abort(); // Cắt sạch sự kiện cũ trên Grid (vẽ vời...)
    this.isPlaying = false;

    // Hiển thị đề bài
    document.getElementById("lbl_question").textContent = currentQues.name;
    const qText = document.getElementById("question-text");
    if (qText) qText.textContent = currentQues.description;

    // Cấu hình Grid
    myGrid.rows = currentQues.rows;
    myGrid.cols = currentQues.cols;
    myGrid.cell_size = currentQues.size;
    myGrid.generation = 0;

    // Hiện Grid
    myGrid.container.parentElement.classList.remove("hidden");
    myGrid.btnStop.classList.add("hidden");
    myGrid.btnReset.classList.add("hidden");

    myGrid.render(); // Vẽ lưới mới
    this.game_stat.textContent = currentQues.stat_check;
    if (currentQues.mark) {
      currentQues.mark.forEach((cell) => {
        myGrid.mark(cell.x, cell.y);
      });
    }
    // 2. Bắt đầu đếm ngược (Truyền callback handleTimeOut)
    // Bind(this) để đảm bảo 'this' trong handleTimeOut trỏ đúng về SurvivalManager
    TimeSystem.startCountdown(
      currentQues.duration,
      this.handleTimeOut.bind(this)
    );

    // 3. Gắn sự kiện nút Start (Dùng cơ chế Handler để tránh chồng sự kiện)
    if (this.currentHandler) {
      myGrid.btnStart.removeEventListener("click", this.currentHandler);
    }

    // Tạo handler mới
    this.currentHandler = () => {
      if (this.isPlaying) return; // Tránh bấm start 2 lần
      this.isPlaying = true;
      myGrid.container.classList.add("grid-disabled");
      this.runGameLoop(myGrid, currentQues);
    };

    myGrid.btnStart.addEventListener("click", this.currentHandler);
  },

  runGameLoop(myGrid, currentQues) {
    if (!this.isPlaying) return;

    // 1. Tính toán thế hệ mới
    myGrid.generate();

    // 2. CHECK WIN/LOSS (Chỉ check trong vòng lặp)
    // Lúc này không cần check TimeSystem nữa vì callback đã lo rồi
    const result = currentQues.checkWinCondition(myGrid, this.game_stat);

    if (result) {
      this.stopGame();

      if (result === 1) {
        setTimeout(() => {
          // Gọi đệ quy startSuvival với index mới
          this.startSuvival(this.quesIndex + 1);
        }, 5000);
      } else {
        Win.showCriticalError();
        const st = setTimeout(Win.startErrorCascade, 1000);
      }
      return;
    }

    // 3. Loop tiếp
    this.gameInterval = setTimeout(
      () => this.runGameLoop(myGrid, currentQues),
      myGrid.intervalTime
    );
  },

  stopGame() {
    this.isPlaying = false;
    clearTimeout(this.gameInterval);
    TimeSystem.stopCountdown();
    this.myGrid.container.classList.remove("grid-disabled");
  },
};
