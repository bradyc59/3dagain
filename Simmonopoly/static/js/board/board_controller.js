class BoardController {

    constructor(options) {
        this.containerEl = options.containerEl;
        this.assetsUrl = options.assetsUrl;

        this.board = new Board();
    }

    drawBoard(callback) {
        this.GameEngine();
        this.Lights();
        this.Materials();

        this.Objects(() => {
            this.onAnimationFrame();

            callback();
        });
    }

    GameEngine() {
        let viewWidth = this.containerEl.offsetWidth;
        let viewHeight = this.containerEl.offsetHeight;
        let coordinates = BoardController.square_size * Board.size / 2;

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(viewWidth, viewHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.scene = new THREE.Scene();


        this.camera = new THREE.PerspectiveCamera(25, viewWidth / viewHeight, 1, 1000);
        this.camera.position.set(coordinates, 100, 160);
        this.cameraController = new THREE.OrbitControls(this.camera, this.containerEl);
        this.cameraController.center = new THREE.Vector3(coordinates, -6, coordinates);

        this.scene.add(this.camera);

        this.containerEl.appendChild(this.renderer.domElement);
    }

    Lights() {
        let coordinates = BoardController.square_size * Board.size / 2;
        this.lights = {};


        this.lights.topLight = new THREE.PointLight();
        this.lights.topLight.position.set(coordinates, 150, coordinates);
        this.lights.topLight.intensity = 0.4;


        this.lights.whiteSideLight = new THREE.SpotLight();
        this.lights.whiteSideLight.position.set(coordinates, 100, coordinates - 300);
        this.lights.whiteSideLight.intensity = 1;
        this.lights.whiteSideLight.shadow.camera.Fov = 55;


        this.lights.blackSideLight = new THREE.SpotLight();
        this.lights.blackSideLight.position.set(coordinates, 100, coordinates + 300);
        this.lights.blackSideLight.intensity = 1;
        this.lights.blackSideLight.shadow.camera.Fov = 55;


        this.lights.movingLight = new THREE.PointLight(0xf9edc9);
        this.lights.movingLight.position.set(0, 20, 0);
        this.lights.movingLight.intensity = 0.5;
        this.lights.movingLight.distance = 500;


        this.scene.add(this.lights.topLight);
        this.scene.add(this.lights.whiteSideLight);
        this.scene.add(this.lights.blackSideLight);
        this.scene.add(this.lights.movingLight);
    }

    Materials() {
        this.materials = {};


        this.materials.boardMaterial = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load(`${this.assetsUrl}/board_texture.jpg`)
        });

        this.materials.groundMaterial = new THREE.MeshBasicMaterial({
            transparent: true,
            map: new THREE.TextureLoader().load(`${this.assetsUrl}/ground.png`)
        });

        const defaultTileMaterial = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load(`${this.assetsUrl}/tiles/-1.png`)
        });

        this.materials.tileMaterial = [];
        let row = 0;
        while(row < Board.size)
        {
            let rowMaterial = [];
            let column = 0;
            while(column < Board.size)
            {
                const tileModelIndex = Board.posToTileId(row, column);
                const tileMaterial = (tileModelIndex === -1) ? defaultTileMaterial : new THREE.MeshLambertMaterial({
                    map: new THREE.TextureLoader().load(`${this.assetsUrl}/tiles/${tileModelIndex}.png`)
                });
                rowMaterial.push(tileMaterial);
                column++;
            }
            this.materials.tileMaterial.push(rowMaterial);
            row++;
            
        }
    }

    Objects(callback) {
        let loader = new THREE.JSONLoader();
        let totalObjectsToLoad = 1;
        let loadedObjects = 0;
        let coordinates = BoardController.square_size * Board.size / 2;

        const checkLoading = () => {
            loadedObjects += 1;
            if (loadedObjects === totalObjectsToLoad && callback) {
                callback();
            }
        };


        loader.load(`${this.assetsUrl}/board.js`, (geom) => {
            this.boardModel = new THREE.Mesh(geom, this.materials.boardMaterial);
            this.boardModel.position.y = -0.02;

            this.scene.add(this.boardModel);

            checkLoading();
        });

        this.groundModel = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 1, 1), this.materials.groundMaterial);
        this.groundModel.position.set(coordinates, -1.52, coordinates);
        this.groundModel.rotation.x = -90 * Math.PI / 180;
        this.scene.add(this.groundModel);

        for (let row = 0; row < Board.size; row++) {
            for (let col = 0; col < Board.size; col++) {
                let square = new THREE.Mesh(new THREE.PlaneGeometry(BoardController.square_size, BoardController.square_size, 1, 1), this.materials.tileMaterial[row][col]);

                square.position.x = col * BoardController.square_size + BoardController.square_size / 2;
                square.position.z = row * BoardController.square_size + BoardController.square_size / 2;
                square.position.y = -0.01;

                square.rotation.x = -90 * Math.PI / 180;

                this.scene.add(square);
            }
        }

    }

    onAnimationFrame() {
        requestAnimationFrame(() => this.onAnimationFrame());

        this.cameraController.update();

        this.lights.movingLight.position.x = this.camera.position.x;
        this.lights.movingLight.position.z = this.camera.position.z;

        this.renderer.render(this.scene, this.camera);
    }

    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

}

BoardController.square_size = 7.273;