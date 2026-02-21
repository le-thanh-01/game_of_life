import { setupSidebar } from "./sidebar.js";
import * as control from "./control.js";
import { InteractiveGrid } from "../basic/Grid.js";
export const Grid = {
  myGrid: new InteractiveGrid(7, 15, 30, "grid-creative"),
};
export function setupCreativeMode() {
  //Tạo Grid mặc định

  Grid.myGrid.container.parentElement.classList.remove("hidden");
  Grid.myGrid.render();
  //Tạo chức năng cho các nút bấm trong class control
  document
    .getElementById("createBtn")
    .addEventListener("click", () => control.handleCreateGrid(Grid));
  document
    .getElementById("selectBtn")
    .addEventListener("click", () => control.handleSelectCoordinate(Grid));

  //Mở sidebar
  setupSidebar(() => Grid.myGrid);

  //Nút exit
  document.getElementById("btn-exit").addEventListener("click", () => {
    Grid.myGrid.container.parentElement.classList.add("hidden");
    Grid.myGrid.destroy();
    document.querySelector(".controls").classList.add("hidden");
    document.querySelector(".modal-header").classList.remove("hidden");
    document.getElementById("mode-modal").classList.remove("hidden");
    document.getElementById("btn-list").disabled = true;
  });
}
