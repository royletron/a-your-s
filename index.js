import Game from "./game";

const game = new Game("game", "overlay");

if (module.hot) {
  module.hot.accept(function () {
    window.location.reload();
  });
}