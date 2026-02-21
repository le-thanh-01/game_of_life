// js/SurvivalManager.js
import { ques1 } from "./ques1.js";
import { ques2 } from "./ques2.js";
import { ques3 } from "./ques3.js";
import { InteractiveGrid } from "../basic/Grid.js"; // Instance grid chính
import { TimeSystem } from "../basic/timer.js";
import * as Win from "./errorAlert.js";
import { PATTERN_LIBRARY } from "./toolset.js";
import { endGame } from "./endGame.js";
const questions = [ques1, ques2, ques3];
const patternIndex = {
  Square: 0,
  Glider: 1,
  LWSS: 2,
  "Gosper Glider Gun": 3,
  Pulsar: 4,
  "Eater 1": 5,
};
export const SurvivalManager = {
  max_ques: questions.length,
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
    setTimeout(() => {
      document.getElementById("game-over-notice").classList.remove("hidden");
      TimeSystem.startCountdown(5, this.gameOver.bind(this), 1);
    }, 2000);
  },
  startSuvival(i) {
    this.quesIndex = i;
    this.loadLevel(questions[i]);
  },
  loadLevel(currentQues) {
    const myGrid = this.myGrid;
    // 1. Reset trạng thái Grid & Giao diện
    // Bỏ sự kiện gắn mặc định lên nút start
    myGrid.controller.abort();
    this.isPlaying = false;

    // Hiển thị đề bài
    document.querySelector(".fa-hourglass-half").classList.remove("hidden");
    document.getElementById("game-timer").classList.remove("hidden");
    document.querySelector(".fa-check").classList.add("hidden");
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
    myGrid.btnStart.disabled = false;
    myGrid.render(); // Vẽ lưới mới
    myGrid.unLockCell(0, 0, myGrid.cols, myGrid.rows);
    this.game_stat.textContent = currentQues.stat_check;
    if (currentQues.toolset) {
      currentQues.toolset.forEach((tool) => {
        const item = PATTERN_LIBRARY[patternIndex[tool.name]];
        myGrid.parseAndDrawRLE(tool.x, tool.y, item.rle);
        myGrid.lockCell(
          tool.x - 1,
          tool.y - 1,
          tool.x + item.size_x,
          tool.y + item.size_y,
        );
      });
    }
    if (currentQues.mark) {
      currentQues.mark.forEach((cell) => {
        myGrid.mark(cell.x, cell.y);
      });
    }
    // 2. Bắt đầu đếm ngược (Truyền callback handleTimeOut)
    // Bind(this) để đảm bảo 'this' trong handleTimeOut trỏ đúng về SurvivalManager
    TimeSystem.startCountdown(
      currentQues.duration,
      this.handleTimeOut.bind(this),
    );

    // 3. Gắn sự kiện nút Start (Dùng cơ chế Handler để tránh chồng sự kiện)
    if (this.currentHandler) {
      myGrid.btnStart.removeEventListener("click", this.currentHandler);
    }

    // Tạo handler mới
    this.currentHandler = () => {
      if (this.isPlaying) return; // Tránh bấm start 2 lần
      this.isPlaying = true;
      myGrid.btnStart.disabled = true;
      myGrid.container.classList.add("grid-disabled");
      this.runGameLoop(myGrid, currentQues);
    };

    myGrid.btnStart.addEventListener("click", this.currentHandler);
  },

  runGameLoop(myGrid, currentQues) {
    if (!this.isPlaying) return;

    // 1. CHECK WIN/LOSS (Chỉ check trong vòng lặp)
    // Lúc này không cần check TimeSystem nữa vì callback đã lo rồi
    const result = currentQues.checkWinCondition(myGrid, this.game_stat);
    // 2. Tính toán thế hệ mới
    myGrid.generate();
    if (result) {
      this.stopGame();

      if (result === 1) {
        if (this.quesIndex + 2 > this.max_ques)
          setTimeout(() => this.gameComplete(), 3000);
        else
          setTimeout(() => {
            // Gọi đệ quy startSuvival với index mới
            this.startSuvival(this.quesIndex + 1);
          }, 3000);
        setTimeout(() => {
          document.querySelector(".fa-hourglass-half").classList.add("hidden");
          document.getElementById("game-timer").classList.add("hidden");
          document.querySelector(".fa-check").classList.remove("hidden");
        }, 1000);
      } else {
        setTimeout(() => {
          document
            .getElementById("game-over-notice")
            .classList.remove("hidden");
          TimeSystem.startCountdown(5, this.gameOver.bind(this), 1);
        }, 2000);
      }
      return;
    }

    // 3. Loop tiếp
    this.gameInterval = setTimeout(
      () => this.runGameLoop(myGrid, currentQues),
      myGrid.intervalTime,
    );
  },

  stopGame() {
    this.isPlaying = false;
    clearTimeout(this.gameInterval);
    TimeSystem.stopCountdown();
    this.myGrid.container.classList.remove("grid-disabled");
  },
  gameOver() {
    document.querySelector(".loading-spinner").style.animationPlayState =
      "paused";
    Win.startError();
  },
  gameComplete() {
    document.querySelector(".win-notice").classList.remove("hidden");
    endGame();
  },
};
