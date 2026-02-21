export const ques2 = {
  name: "Question 2",
  description: "Make 4000 lives",
  toolset: [],
  duration: 60,
  rows: 9,
  cols: 11,
  size: 25,
  mark: [],
  stat_check: "Lives: 0",
  lives: 0,
  checkWinCondition(myGrid, game_stat) {
    this.lives += myGrid.lives;
    game_stat.textContent = "Lives: " + this.lives;
    if (this.lives >= 4000) return 1;
    return 0;
  },
};
