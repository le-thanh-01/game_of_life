export const ques3 = {
  name: "Question 3",
  description: "Save the marked",
  toolset: [
    { x: 0, y: 0, name: "Gosper Glider Gun" },
    { x: 37, y: 23, name: "Square" },
  ],
  duration: 120,
  rows: 25,
  cols: 50,
  size: 10,
  mark: [
    { x: 37, y: 23 },
    { x: 38, y: 23 },
    { x: 37, y: 24 },
    { x: 38, y: 24 },
    { x: 0, y: 4 },
    { x: 0, y: 5 },
    { x: 35, y: 2 },
    { x: 35, y: 3 },
  ],
  time_remain: 300,
  dead: false,
  stat_check: " Remaining: 60",
  checkWinCondition(myGrid, game_stat) {
    this.dead = this.mark.some((cell) => !myGrid.State(cell.x, cell.y));
    if (this.dead) return -1;
    this.time_remain--;
    if (this.time_remain <= 0) return 1;
    game_stat.textContent = " Remaining: " + Math.floor(this.time_remain / 5);
    return 0;
  },
};
