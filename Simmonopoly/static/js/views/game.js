class GameView {
    constructor() {
        this.StartUp();

    }

    StartUp() {
        this.userName = document.getElementById("username").value;
        this.hostName = document.getElementById("hostname").value;

        this.drawBoard();
    }

    drawBoard() {
        this.gameController = new GameController({
            containerEl: document.getElementById("game-container"),

            assetsUrl: "/static/3d_assets",

            onBoardPainted: this.WebSocket.bind(this)
        });

        window.addEventListener("resize", () => {
            this.gameController.resizeBoard();
        }, false);
    }

    WebSocket() {
        const connection = 'ws://' + window.location.host + '/ws/join/' + this.hostName + '/';
        const gameSocket = new WebSocket(connection);

        gameSocket.onmessage = (event) => {
            const message = JSON.parse(event.data);
        };
    }
}

window.onload = () => {
    new GameView();
};
