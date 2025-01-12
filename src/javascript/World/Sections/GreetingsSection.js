import * as THREE from "three";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";

export default class GreetingsSection {
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

        this.setStatic();
        this.setHtml();
        this.setTiles();
        // this.setDikes();
    }

    setStatic() {
        this.objects.add({
            base: this.resources.items.introStaticBase.scene,
            collision: this.resources.items.introStaticCollision.scene,
            floorShadowTexture:
                this.resources.items.introStaticFloorShadowTexture,
            offset: new THREE.Vector3(this.x + 0, this.y + 0, 0),
            mass: 0,
        });
    }

    setHtml() {
        this.html = {};

        this.html.element = document.createElement("div");
        this.html.element.classList.add("custom-css-class");

        this.html.element.style.opacity = "0"; // Start with the element being fully transparent
        this.html.element.style.transition = "opacity 0.3s ease-in-out"; // Set the transition effect for opacity change
        this.html.element.style.position = "absolute";

        this.html.element.innerHTML = `
        <style>
            .custom-css-class {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                color: #ffffff;
                text-align: left;
            }
            .custom-css-class h1 {
                font-size: 4rem;
                margin: 0;
                line-height: 1.2;
            }
            .custom-css-class h2 {
                font-size: 2rem;
                margin-top: 1rem;
                line-height: 1.5;
            }
        </style>
        <h2>Hey there👋 I'm Jensen</h2> <br><br>
        <p>I'm a Cambridge Engineering Graduate in computer vision and software development. 

        <br><br>

        <p align="left">
            <a href="https://www.python.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/python-colored.svg" width="36" height="36" alt="Python" /></a>
            <a href="https://opencv.org/" target="_blank" rel="noreferrer"><img src="https://icon.icepanel.io/Technology/svg/OpenCV.svg" width="36" height="36" alt="OpenCV" /></a>
            <a href="https://git-scm.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/git-colored.svg" width="36" height="36" alt="Git" /></a>
            <a href="https://www.javascript.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/javascript-colored.svg" width="36" height="36" alt="JavaScript" /></a>
            <a href="https://fastapi.tiangolo.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/fastapi-colored.svg" width="36" height="36" alt="Fast API" /></a>
            <a href="https://www.postgresql.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/postgresql-colored.svg" width="36" height="36" alt="PostgreSQL" /></a>
            <a href="https://www.digitalocean.com" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/digitalocean-colored.svg" width="36" height="36" alt="Digital Ocean" /></a>
            <a href="https://www.docker.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/docker-colored.svg" width="36" height="36" alt="Docker" /></a>
            <a href="https://www.linux.org" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/linux-colored.svg" width="36" height="36" alt="Linux" /></a>
            <a href="https://www.raspberrypi.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/raspberrypi-colored.svg" width="36" height="36" alt="Raspberry Pi" /></a>
            <a href="https://www.mathworks.com/products/matlab.html" target="_blank" rel="noreferrer"><img src="https://icon.icepanel.io/Technology/svg/MATLAB.svg" width="36" height="36" alt="MATLAB" /></a>
        </p>
        <p align="left">
            <a href="https://pytorch.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/pytorch-colored.svg" width="36" height="36" alt="PyTorch" /></a>
            <a href="https://html.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/html5-colored.svg" width="36" height="36" alt="HTML5" /></a>
            <a href="https://www.w3.org/Style/CSS/Overview.en.html" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/css3-colored.svg" width="36" height="36" alt="CSS3" /></a>
            <a href="https://vuejs.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/vuejs-colored.svg" width="36" height="36" alt="Vue" /></a>
            <a href="https://www.nginx.com/" target="_blank" rel="noreferrer"><img src="https://icon.icepanel.io/Technology/svg/NGINX.svg" width="36" height="36" alt="nginx" /></a>
            <a href="https://github.com/features/actions" target="_blank" rel="noreferrer"><img src="https://icon.icepanel.io/Technology/svg/GitHub-Actions.svg" width="36" height="36" alt="Google Tag Manager" /></a>
            <a href="https://www.gnu.org/software/bash/" target="_blank" rel="noreferrer"><img src="https://icon.icepanel.io/Technology/png-shadow-512/Bash.png" width="36" height="36" alt="Bash Scripting" /></a>
            <a href="https://unity.com/" target="_blank" rel="noreferrer"><img src="https://icon.icepanel.io/Technology/png-shadow-512/Unity.png" width="36" height="36" alt="Unity" /></a>
            <a href="https://docs.microsoft.com/en-us/dotnet/csharp/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/csharp-colored.svg" width="36" height="36" alt="C#" /></a>
            <a href="https://docs.microsoft.com/en-us/cpp/?view=msvc-170" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/cplusplus-colored.svg" width="36" height="36" alt="C++" /></a>
            <a href="https://www.latex-project.org/" target="_blank" rel="noreferrer"><img src="https://icon.icepanel.io/Technology/png-shadow-512/LaTeX.png" width="36" height="36" alt="LaTeX" /></a>
            </p>

            <br><br>Scroll down to check out my favourite projects!</p>

        `;

        this.css3DObject = new CSS3DObject(this.html.element);
        this.css3DObject.position.set(this.x + 0, this.y - 6, 0);
        this.css3DObject.scale.set(0.02, 0.02, 0.02); // Larger scale for bigger text
        this.css3DObject.rotation.set(0, 0, 0);
        this.container.add(this.css3DObject);

        // Fade in animation
        setTimeout(() => {
            this.html.element.style.opacity = "1";
        }, 100);
    }

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
