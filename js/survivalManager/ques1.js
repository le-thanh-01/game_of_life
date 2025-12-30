export const ques1 = {
  name: "Question 1",
  description: "Make the 'x' cell live and dead 10 times",
  toolset: [],
  duration: 60,
  rows: 7,
  cols: 15,
  size: 30,
  times: 0,
  state: true,
  mark: [{ x: 7, y: 3 }],
  stat_check: "Times: 0",
  checkWinCondition(myGrid, game_stat) {
    if (myGrid.State(7, 3) !== this.state) {
      if (this.state) this.times++;
      this.state = !this.state;
    }
    game_stat.textContent = "Times: " + this.times;
    if (this.times >= 10) return 1;
    return 0;
  },
};
