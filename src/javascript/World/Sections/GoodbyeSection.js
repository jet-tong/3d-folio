import * as THREE from "three";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";

export default class GoodbyeSection {
    constructor(_options) {
        // Options
        this.config = _options.config;
        this.time = _options.time;
        this.resources = _options.resources;
        this.objects = _options.objects;
        this.areas = _options.areas;
        this.walls = _options.walls;
        this.tiles = _options.tiles;
        this.debug = _options.debug;
        this.x = _options.x;
        this.y = _options.y;

        // Set up
        this.container = new THREE.Object3D();
        this.container.matrixAutoUpdate = false;
        this.container.updateMatrix();

        // this.setStatic();
        this.setHtml();
        // this.setImage()
        this.setText();
        // this.setInstructions()
        // this.setTitles()
        // this.setTiles();
        // this.setDikes();
    }

    setHtml() {
        this.html = {};

        this.html.element = document.createElement("div");
        this.html.element.classList.add("custom-css-class");

        this.html.element.style.opacity = "0"; // Start with the element being fully transparent
        this.html.element.style.transition = "opacity 0.3s ease-in-out"; // Set the transition effect for opacity change
        this.html.element.style.position = "absolute";
        // this.html.element.style.pointerEvents = 'none'; // Make sure the element doesn't block your scene interactions

        this.html.element.innerHTML = `
        <style>
            .custom-css-class {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                color: #ffffff;
            }
            .custom-css-class p {
                font-size: 1.0rem;
            }
            ul {
                list-style-position: inside;
                padding-left: 10pt;
            }

        </style>

        <p align="center"> 
            <a href="https://www.github.com/jet-tong/" target="_blank" rel="noreferrer"><img src="https://icon.icepanel.io/Technology/png-shadow-512/GitHub.png" width="36" height="36" alt="Github" /></a>
            <a href="https://www.linkedin.com/in/jensen-tong/" target="_blank" rel="noreferrer"><img src="https://icon.icepanel.io/Technology/svg/LinkedIn.svg" width="36" height="36" alt="LinkedIn" /></a>
        </p>

        <br><br>

        Made with three.js, based on Bruno Simon's amazing portfolio: https://bruno-simon.com/
        <br>
        Jensen Tong, 2025

        `;

        this.css3DObject = new CSS3DObject(this.html.element);
        this.css3DObject.position.set(this.x + 0, this.y - 6, 0);
        this.css3DObject.scale.set(0.018, 0.018, 0.018);
        this.css3DObject.rotation.set(0, 0, 0);
        this.container.add(this.css3DObject);
    }

    // setImage()
    // {
    //     // ! Must disable cuz or else it will not load on mobile!
    //     // if(this.config.touch)
    //     // {
    //     //     return
    //     // }

    //     this.image = {}
    //     this.image.x = this.x + 0
    //     this.image.y = this.y - 5

    //     // Container
    //     this.image.container = new THREE.Object3D()
    //     this.image.container.position.x = this.image.x
    //     this.image.container.position.y = this.image.y
    //     this.image.container.matrixAutoUpdate = false
    //     this.image.container.updateMatrix()
    //     this.container.add(this.image.container)

    //     // Label
    //     this.image.label = {}
    //     this.image.label.geometry = new THREE.PlaneBufferGeometry(9, 7, 1, 1)

    //     this.image.label.texture = this.resources.items.jensenfolioImageTexture
    //     this.image.label.texture.magFilter = THREE.NearestFilter
    //     this.image.label.texture.minFilter = THREE.LinearFilter

    //     this.image.label.material = new THREE.MeshBasicMaterial({ transparent: true, alphaMap: this.image.label.texture, color: 0xffffff, depthWrite: false, opacity: 0 })

    //     this.image.label.mesh = new THREE.Mesh(this.image.label.geometry, this.image.label.material)
    //     this.image.label.mesh.matrixAutoUpdate = false
    //     this.image.container.add(this.image.label.mesh)
    // }

    // ALTERNATIVE: Use createTextTexture() to create a texture from a string
    setText() {
        // if (this.config.touch) {
        //         return;
        // }

        this.text = {};
        this.text.x = this.x + 0;
        this.text.y = this.y - 23;

        // Container
        this.text.container = new THREE.Object3D();
        this.text.container.position.x = this.text.x;
        this.text.container.position.y = this.text.y;
        this.text.container.matrixAutoUpdate = false;
        this.text.container.updateMatrix();
        this.container.add(this.text.container);

        const markdownContent = `
        (based on Bruno Simon's amazing portfolio: https://bruno-simon.com/)
        `;
        const textTexture = this.createTextTexture(markdownContent, 1024, 512); // You need to define createTextTexture

        // Label
        this.text.label = {};
        this.text.label.geometry = new THREE.PlaneBufferGeometry(8, 6, 1, 1);
        this.text.label.material = new THREE.MeshBasicMaterial({
            map: textTexture,
            transparent: true,
            depthWrite: false,
            opacity: 0,
        });
        this.text.label.mesh = new THREE.Mesh(
            this.text.label.geometry,
            this.text.label.material
        );
        this.text.label.mesh.matrixAutoUpdate = false;
        this.text.container.add(this.text.label.mesh);
    }

    createTextTexture(text, width, height) {
        // Create a canvas element
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        // Get the 2D context of the canvas
        const context = canvas.getContext("2d");

        // Set the font styles here
        context.fillStyle = "#ffffff"; // Text color
        context.font = "Bold 20px Arial";
        context.textAlign = "center";
        context.textBaseline = "middle";

        // Calculate the position for the text
        const x = width / 2;
        const y = height / 2;

        // Split the text into lines
        const lines = text.split("\n");

        // Calculate the starting Y position to center the text block
        const blockHeight = lines.length * 24; // 24px line height
        let currentY = y - blockHeight / 2 + 12; // +12 for half line height

        // Draw each line
        lines.forEach((line) => {
            context.fillText(line, x, currentY);
            currentY += 24; // Move to the next line
        });

        // Use the canvas as a texture
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;

        return texture;
    }

    // setTitles()
    // {
    //     // Title
    //     this.objects.add({
    //         base: this.resources.items.introBBase.scene,
    //         collision: this.resources.items.introBCollision.scene,
    //         offset: new THREE.Vector3(0, 0, 0),
    //         rotation: new THREE.Euler(0, 0, 0),
    //         shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
    //         mass: 1.5,
    //         soundName: 'brick'
    //     })
    //     this.objects.add({
    //         base: this.resources.items.introRBase.scene,
    //         collision: this.resources.items.introRCollision.scene,
    //         offset: new THREE.Vector3(0, 0, 0),
    //         rotation: new THREE.Euler(0, 0, 0),
    //         shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
    //         mass: 1.5,
    //         soundName: 'brick'
    //     })
    //     this.objects.add({
    //         base: this.resources.items.introUBase.scene,
    //         collision: this.resources.items.introUCollision.scene,
    //         offset: new THREE.Vector3(0, 0, 0),
    //         rotation: new THREE.Euler(0, 0, 0),
    //         shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
    //         mass: 1.5,
    //         soundName: 'brick'
    //     })
    //     this.objects.add({
    //         base: this.resources.items.introNBase.scene,
    //         collision: this.resources.items.introNCollision.scene,
    //         offset: new THREE.Vector3(0, 0, 0),
    //         rotation: new THREE.Euler(0, 0, 0),
    //         duplicated: true,
    //         shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
    //         mass: 1.5,
    //         soundName: 'brick'
    //     })
    //     this.objects.add({
    //         base: this.resources.items.introOBase.scene,
    //         collision: this.resources.items.introOCollision.scene,
    //         offset: new THREE.Vector3(0, 0, 0),
    //         rotation: new THREE.Euler(0, 0, 0),
    //         duplicated: true,
    //         shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
    //         mass: 1.5,
    //         soundName: 'brick'
    //     })
    //     this.objects.add({
    //         base: this.resources.items.introSBase.scene,
    //         collision: this.resources.items.introSCollision.scene,
    //         offset: new THREE.Vector3(0, 0, 0),
    //         rotation: new THREE.Euler(0, 0, 0),
    //         shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
    //         mass: 1.5,
    //         soundName: 'brick'
    //     })
    //     this.objects.add({
    //         base: this.resources.items.introIBase.scene,
    //         collision: this.resources.items.introICollision.scene,
    //         offset: new THREE.Vector3(0, 0, 0),
    //         rotation: new THREE.Euler(0, 0, 0),
    //         shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
    //         mass: 1.5,
    //         soundName: 'brick'
    //     })
    //     this.objects.add({
    //         base: this.resources.items.introMBase.scene,
    //         collision: this.resources.items.introMCollision.scene,
    //         offset: new THREE.Vector3(0, 0, 0),
    //         rotation: new THREE.Euler(0, 0, 0),
    //         shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
    //         mass: 1.5,
    //         soundName: 'brick'
    //     })
    //     this.objects.add({
    //         base: this.resources.items.introOBase.scene,
    //         collision: this.resources.items.introOCollision.scene,
    //         offset: new THREE.Vector3(3.95, 0, 0),
    //         rotation: new THREE.Euler(0, 0, 0),
    //         duplicated: true,
    //         shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
    //         mass: 1.5,
    //         soundName: 'brick'
    //     })
    //     this.objects.add({
    //         base: this.resources.items.introNBase.scene,
    //         collision: this.resources.items.introNCollision.scene,
    //         offset: new THREE.Vector3(5.85, 0, 0),
    //         rotation: new THREE.Euler(0, 0, 0),
    //         duplicated: true,
    //         shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
    //         mass: 1.5,
    //         soundName: 'brick'
    //     })
    //     this.objects.add({
    //         base: this.resources.items.introCreativeBase.scene,
    //         collision: this.resources.items.introCreativeCollision.scene,
    //         offset: new THREE.Vector3(0, 0, 0),
    //         rotation: new THREE.Euler(0, 0, 0.25),
    //         shadow: { sizeX: 5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.3 },
    //         mass: 1.5,
    //         sleep: false,
    //         soundName: 'brick'
    //     })
    //     this.objects.add({
    //         base: this.resources.items.introDevBase.scene,
    //         collision: this.resources.items.introDevCollision.scene,
    //         offset: new THREE.Vector3(0, 0, 0),
    //         rotation: new THREE.Euler(0, 0, 0),
    //         shadow: { sizeX: 2.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.3 },
    //         mass: 1.5,
    //         soundName: 'brick'
    //     })
    // }

    setTiles() {
        this.tiles.add({
            start: new THREE.Vector2(this.x + 0, this.y - 11.0),
            delta: new THREE.Vector2(0, -10.5),
        });
    }

    setDikes() {
        this.dikes = {};
        this.dikes.brickOptions = {
            base: this.resources.items.brickBase.scene,
            collision: this.resources.items.brickCollision.scene,
            offset: new THREE.Vector3(0, 0, 0.1),
            rotation: new THREE.Euler(0, 0, 0),
            duplicated: true,
            shadow: { sizeX: 1.2, sizeY: 1.8, offsetZ: -0.15, alpha: 0.35 },
            mass: 0.5,
            soundName: "brick",
        };

        // this.walls.add({
        //     object:
        //     {
        //         ...this.dikes.brickOptions,
        //         rotation: new THREE.Euler(0, 0, Math.PI * 0.5)
        //     },
        //     shape:
        //     {
        //         type: 'brick',
        //         equilibrateLastLine: true,
        //         widthCount: 3,
        //         heightCount: 2,
        //         position: new THREE.Vector3(this.x + 0, this.y - 4, 0),
        //         offsetWidth: new THREE.Vector3(1.05, 0, 0),
        //         offsetHeight: new THREE.Vector3(0, 0, 0.45),
        //         randomOffset: new THREE.Vector3(0, 0, 0),
        //         randomRotation: new THREE.Vector3(0, 0, 0.2)
        //     }
        // })

        this.walls.add({
            object: this.dikes.brickOptions,
            shape: {
                type: "brick",
                equilibrateLastLine: true,
                widthCount: 5,
                heightCount: 2,
                position: new THREE.Vector3(this.x - 7, this.y - 13, 0),
                offsetWidth: new THREE.Vector3(0, 1.05, 0),
                offsetHeight: new THREE.Vector3(0, 0, 0.45),
                randomOffset: new THREE.Vector3(0, 0, 0),
                randomRotation: new THREE.Vector3(0, 0, 0.2),
            },
        });

        this.walls.add({
            object: {
                ...this.dikes.brickOptions,
                rotation: new THREE.Euler(0, 0, Math.PI * 0.5),
            },
            shape: {
                type: "brick",
                equilibrateLastLine: true,
                widthCount: 3,
                heightCount: 2,
                position: new THREE.Vector3(this.x - 4, this.y + 6, 0),
                offsetWidth: new THREE.Vector3(1.05, 0, 0),
                offsetHeight: new THREE.Vector3(0, 0, 0.45),
                randomOffset: new THREE.Vector3(0, 0, 0),
                randomRotation: new THREE.Vector3(0, 0, 0.2),
            },
        });

        this.walls.add({
            object: this.dikes.brickOptions,
            shape: {
                type: "brick",
                equilibrateLastLine: false,
                widthCount: 3,
                heightCount: 2,
                position: new THREE.Vector3(this.x + 9.9, this.y - 24.7, 0),
                offsetWidth: new THREE.Vector3(0, -1.05, 0),
                offsetHeight: new THREE.Vector3(0, 0, 0.45),
                randomOffset: new THREE.Vector3(0, 0, 0),
                randomRotation: new THREE.Vector3(0, 0, 0.2),
            },
        });

        // this.walls.add({
        //     object:
        //     {
        //         ...this.dikes.brickOptions,
        //         rotation: new THREE.Euler(0, 0, Math.PI * 0.5)
        //     },
        //     shape:
        //     {
        //         type: 'brick',
        //         equilibrateLastLine: true,
        //         widthCount: 3,
        //         heightCount: 2,
        //         position: new THREE.Vector3(this.x - 14, this.y + 2, 0),
        //         offsetWidth: new THREE.Vector3(1.05, 0, 0),
        //         offsetHeight: new THREE.Vector3(0, 0, 0.45),
        //         randomOffset: new THREE.Vector3(0, 0, 0),
        //         randomRotation: new THREE.Vector3(0, 0, 0.2)
        //     }
        // })

        this.walls.add({
            object: this.dikes.brickOptions,
            shape: {
                type: "brick",
                equilibrateLastLine: false,
                widthCount: 3,
                heightCount: 2,
                position: new THREE.Vector3(this.x - 7.8, this.y + 0.7, 0),
                offsetWidth: new THREE.Vector3(0, -1.05, 0),
                offsetHeight: new THREE.Vector3(0, 0, 0.45),
                randomOffset: new THREE.Vector3(0, 0, 0),
                randomRotation: new THREE.Vector3(0, 0, 0.2),
            },
        });

        this.walls.add({
            object: this.dikes.brickOptions,
            shape: {
                type: "brick",
                equilibrateLastLine: false,
                widthCount: 3,
                heightCount: 2,
                position: new THREE.Vector3(this.x + 8.8, this.y - 6.7, 0),
                offsetWidth: new THREE.Vector3(0, -1.05, 0),
                offsetHeight: new THREE.Vector3(0, 0, 0.45),
                randomOffset: new THREE.Vector3(0, 0, 0),
                randomRotation: new THREE.Vector3(0, 0, 0.2),
            },
        });

        this.walls.add({
            object: this.dikes.brickOptions,
            shape: {
                type: "brick",
                equilibrateLastLine: true,
                widthCount: 3,
                heightCount: 2,
                position: new THREE.Vector3(this.x - 8.8, this.y - 7.5, 0),
                offsetWidth: new THREE.Vector3(0, -1.05, 0),
                offsetHeight: new THREE.Vector3(0, 0, 0.45),
                randomOffset: new THREE.Vector3(0, 0, 0),
                randomRotation: new THREE.Vector3(0, 0, 0.2),
            },
        });

        this.walls.add({
            object: {
                ...this.dikes.brickOptions,
                rotation: new THREE.Euler(0, 0, Math.PI * 0.5),
            },
            shape: {
                type: "brick",
                equilibrateLastLine: true,
                widthCount: 2,
                heightCount: 2,
                position: new THREE.Vector3(this.x + 8.5, this.y + 6, 0),
                offsetWidth: new THREE.Vector3(1.05, 0, 0),
                offsetHeight: new THREE.Vector3(0, 0, 0.45),
                randomOffset: new THREE.Vector3(0, 0, 0),
                randomRotation: new THREE.Vector3(0, 0, 0.2),
            },
        });

        this.walls.add({
            object: this.dikes.brickOptions,
            shape: {
                type: "brick",
                equilibrateLastLine: false,
                widthCount: 2,
                heightCount: 2,
                position: new THREE.Vector3(this.x + 9.9, this.y + 5.2, 0),
                offsetWidth: new THREE.Vector3(0, -1.05, 0),
                offsetHeight: new THREE.Vector3(0, 0, 0.45),
                randomOffset: new THREE.Vector3(0, 0, 0),
                randomRotation: new THREE.Vector3(0, 0, 0.2),
            },
        });

        // * If not touch (i.e. desktop version)
        // if(!this.config.touch)
        // {
        //     this.walls.add({
        //         object:
        //         {
        //             ...this.dikes.brickOptions,
        //             rotation: new THREE.Euler(0, 0, Math.PI * 0.5)
        //         },
        //         shape:
        //         {
        //             type: 'brick',
        //             equilibrateLastLine: true,
        //             widthCount: 2,
        //             heightCount: 2,
        //             position: new THREE.Vector3(this.x + 8.5, this.y + 6, 0),
        //             offsetWidth: new THREE.Vector3(1.05, 0, 0),
        //             offsetHeight: new THREE.Vector3(0, 0, 0.45),
        //             randomOffset: new THREE.Vector3(0, 0, 0),
        //             randomRotation: new THREE.Vector3(0, 0, 0.2)
        //         }
        //     })

        //     this.walls.add({
        //         object: this.dikes.brickOptions,
        //         shape:
        //         {
        //             type: 'brick',
        //             equilibrateLastLine: false,
        //             widthCount: 2,
        //             heightCount: 2,
        //             position: new THREE.Vector3(this.x + 9.9, this.y + 5.2, 0),
        //             offsetWidth: new THREE.Vector3(0, - 1.05, 0),
        //             offsetHeight: new THREE.Vector3(0, 0, 0.45),
        //             randomOffset: new THREE.Vector3(0, 0, 0),
        //             randomRotation: new THREE.Vector3(0, 0, 0.2)
        //         }
        //     })
        // }
    }
}
