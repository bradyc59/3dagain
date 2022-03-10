
class JoinView {
    constructor() {
        this.userName = document.getElementById("user-name").value;
        this.hostName = document.getElementById("host-name").value;

        this.StartUp();
        this.WebSocket();
    }

    StartUp() {
        this.$startGame = document.getElementById("start-game");
        this.$startGame.addEventListener("click", () => {
            this.startGame();
        });


        this.$invitationLink = document.getElementById("invitation-url");
        this.$invitationLink.value = `${window.location.host}/join/${this.hostName}`;

    }

    WebSocket() {
        const connection = 'ws://' + window.location.host + '/ws/join/' + this.hostName + '/';
        const gameSocket = new WebSocket(connection);

        gameSocket.onmessage = (event) => {
            const message = JSON.parse(event.data);
        }
    }


    startGame() {
        
    }

}

window.onload = () => {
    new JoinView();
};