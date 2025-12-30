import { setupSidebar } from "./sidebar.js";
import * as control from "./control.js";
export function setupCreativeMode(mainGrid) {
  const Grid = {
    myGrid: mainGrid,
  };
  Grid.myGrid.container.parentElement.classList.remove("hidden");
  Grid.myGrid.rows = 7;
  Grid.myGrid.cols = 15;
  Grid.myGrid.cell_size = 30;
  Grid.myGrid.render();
  document
    .getElementById("createBtn")
    .addEventListener("click", () => control.handleCreateGrid(Grid));
  document
    .getElementById("selectBtn")
    .addEventListener("click", () => control.handleSelectCoordinate(Grid));
  setupSidebar(() => Grid.myGrid);
  document.getElementById("btn-exit").addEventListener("click", () => {
    Grid.myGrid.container.parentElement.classList.add("hidden");
    document.querySelector(".controls").classList.add("hidden");
    document.getElementById("mode-modal").classList.remove("hidden");
  });
}
