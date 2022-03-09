import * as THREE from "three.js"

class Board {

    initialisation (options) {
        Board.SQUARE_SIZE = 7.273;
        Board.TILE_MAX = 39;
        this.container = options.container
        this.assests = options.assests

        this.board = new Board()
        this.players = []
    }

    drawBoard(callback) {
        this.Engine();
        this.Lights();
        this.Materials();

        this.Objects(callback() => {
            this.firstAnimation();
            callback();
        });
    }

    Engine() {
        let ViewWidth = this.container.offfsetWidth;
        let ViewHeight = this.container.offfsetHeight;

        this.renderer = new THREE.WebGLRenderer({
            antialias : true
        })
        this.renderer.setSize(viewWidth, viewHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(25, viewWidth/ viewHeight, 1, 1000);
        this.camera.position.set(Board.SQUARE_SIZE * Board.SIZE / 2, 100, 160);
        this.cameraController = new THREE.OrbitControls(this.camera, this.container)
        this.cameraController.center = new THREE.Vector3(Board.SQUARE_SIZE * Board.SIZE / 2, -6, Board.SQUARE_SIZE * Board.SIZE / 2);

        this.scene.add(this.camera);

        this.container.appendChild(this.renderer.domElement);
    }

    Lights() {
        this.lights = {};

        this.lights.TopDownLight = new THREE.PointLight();
        this.lights.TopDownLight.position.set(Board.SQUARE_SIZE * Board.SIZE / 2, 150, Board.SQUARE_SIZE * Board.SIZE / 2);
        this.lights.TopDownLight.intensity = 0.4;

        // white's side light
        this.lights.LighterSideLight = new THREE.SpotLight();
        this.lights.LighterSideLight.position.set(Board.SQUARE_SIZE * Board.SIZE / 2, 100, Board.SQUARE_SIZE * Board.SIZE / 2 - 300);
        this.lights.LighterSideLight.intensity = 1;
        this.lights.LighterSideLight.shadow.camera.Fov = 55;

        // black's side light
        this.lights.DarkerSideLight = new THREE.SpotLight();
        this.lights.DarkerSideLight.position.set(Board.SQUARE_SIZE * Board.SIZE / 2, 100, Board.SQUARE_SIZE * Board.SIZE / 2 + 300);
        this.lights.DarkerSideLight.intensity = 1;
        this.lights.DarkerSideLight.shadow.camera.Fov = 55;

        // light that will follow the this.camera position
        this.lights.OrbitLight = new THREE.PointLight(0xf9edc9);
        this.lights.OrbitLight.position.set(0, 20, 0);
        this.lights.OrbitLight.intensity = 0.5;
        this.lights.OrbitLight.distance = 500;

        // add the this.lights in the this.scene
        this.scene.add(this.lights.TopDownLight);
        this.scene.add(this.lights.LighterSideLight);
        this.scene.add(this.lights.DarkerSideLight);
        this.scene.add(this.lights.OrbitLight);
    }

    Materials() {
        this.materials = {};

        this.materials.BoardTextures = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load( {% static 'images/board.jpg' %})
        });

        this.materials.GroundMaterial = new THREE.MeshLambertMaterial({
            transparent: true,
            map: new THREE.TextureLoader().load({% static 'images/ground.png' %})
        });

        const StandardTileMaterial = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load({% static 'images/default.png' %})
        });

        this.materials.Tiles = [];
        let row = 0
        while (row < Board.Size) {
            let RowMaterial = [];
            let column = 0;
            while (column < Board.SIZE) {
                    const TileIndex = Board.MapTiles(row, column);
                    if (TileIndex === -1) {
                        const Tiles = StandardTileMaterial;
                    }
                    else {
                        const Tiles = new.THREE.MeshLambertMaterial({
                        map: new THREE.TextureLoader().load({% static 'images/tiles/${TileIndex}.png' %})
                        });
                    column++;
                    RowMaterial.push(Tiles);
                    }
            }
            this.materials.Tiles.push(RowMaterial);
            row++;
        }
    }

}



