import * as THREE from "three";
import Project from "./Project";
import TweenLite from "gsap/TweenLite";

import projectsFingerTrackingSlideASources from "../../../models/projects/fingerTracking/final_result.png";
import projectsFingerTrackingSlideBSources from "../../../models/projects/fingerTracking/hand_segmentation.png";
import projectsFingerTrackingSlideCSources from "../../../models/projects/fingerTracking/optimisation.png";
import projectsFingerTrackingSlideDSources from "../../../models/projects/fingerTracking/system_architecture.png";

import projectsMattaSlideASources from "../../../models/projects/matta/matta_os.png";
import projectsMattaSlideBSources from "../../../models/projects/matta/nozzle_selector.png";

import projectsRocketBoosterSlideASources from "../../../models/projects/rocketBooster/rocket_booster_playing.png";
import projectsRocketBoosterSlideBSources from "../../../models/projects/rocketBooster/rocket_booster_controllers.png";
import projectsRocketBoosterSlideCSources from "../../../models/projects/rocketBooster/rocket_booster_ui.png";

import projectsIYPTSlideASources from "../../../models/projects/iypt/iypt_hurricane_balls.jpg";
import projectsIYPTSlideBSources from "../../../models/projects/iypt/iypt_my_photo.jpg";

import projectsSafeCrackingSlideASources from "../../../models/projects/safeCracking/safe_cracking_award.jpg";
import projectsSafeCrackingSlideBSources from "../../../models/projects/safeCracking/safe_cracking_solving.jpg";

import projectsThreejsJourneySlideASources from "../../../models/projects/threejsJourney/slideA.jpg";
import projectsThreejsJourneySlideBSources from "../../../models/projects/threejsJourney/slideB.jpg";
import projectsThreejsJourneySlideCSources from "../../../models/projects/threejsJourney/slideC.jpg";
import projectsThreejsJourneySlideDSources from "../../../models/projects/threejsJourney/slideD.jpg";

import projectsMadboxSlideASources from "../../../models/projects/madbox/slideA.jpg";
import projectsMadboxSlideBSources from "../../../models/projects/madbox/slideB.jpg";
import projectsMadboxSlideCSources from "../../../models/projects/madbox/slideC.jpg";

import projectsScoutSlideASources from "../../../models/projects/scout/slideA.jpg";
import projectsScoutSlideBSources from "../../../models/projects/scout/slideB.jpg";
import projectsScoutSlideCSources from "../../../models/projects/scout/slideC.jpg";

import projectsChartogneSlideASources from "../../../models/projects/chartogne/slideA.jpg";
import projectsChartogneSlideBSources from "../../../models/projects/chartogne/slideB.jpg";
import projectsChartogneSlideCSources from "../../../models/projects/chartogne/slideC.jpg";

import projectsZenlySlideASources from "../../../models/projects/zenly/slideA.jpg";
import projectsZenlySlideBSources from "../../../models/projects/zenly/slideB.jpg";
import projectsZenlySlideCSources from "../../../models/projects/zenly/slideC.jpg";

import projectsCitrixRedbullSlideASources from "../../../models/projects/citrixRedbull/slideA.jpg";
import projectsCitrixRedbullSlideBSources from "../../../models/projects/citrixRedbull/slideB.jpg";
import projectsCitrixRedbullSlideCSources from "../../../models/projects/citrixRedbull/slideC.jpg";

import projectsPriorHoldingsSlideASources from "../../../models/projects/priorHoldings/slideA.jpg";
import projectsPriorHoldingsSlideBSources from "../../../models/projects/priorHoldings/slideB.jpg";
import projectsPriorHoldingsSlideCSources from "../../../models/projects/priorHoldings/slideC.jpg";

import projectsOranoSlideASources from "../../../models/projects/orano/slideA.jpg";
import projectsOranoSlideBSources from "../../../models/projects/orano/slideB.jpg";
import projectsOranoSlideCSources from "../../../models/projects/orano/slideC.jpg";

// import projectsGleecChatSlideASources from '../../../models/projects/gleecChat/slideA.jpg'
// import projectsGleecChatSlideBSources from '../../../models/projects/gleecChat/slideB.jpg'
// import projectsGleecChatSlideCSources from '../../../models/projects/gleecChat/slideC.jpg'
// import projectsGleecChatSlideDSources from '../../../models/projects/gleecChat/slideD.jpg'

import projectsKepplerSlideASources from "../../../models/projects/keppler/slideA.jpg";
import projectsKepplerSlideBSources from "../../../models/projects/keppler/slideB.jpg";
import projectsKepplerSlideCSources from "../../../models/projects/keppler/slideC.jpg";

export default class ProjectsSection {
    constructor(_options) {
        // Options
        this.time = _options.time;
        this.resources = _options.resources;
        this.camera = _options.camera;
        this.passes = _options.passes;
        this.objects = _options.objects;
        this.areas = _options.areas;
        this.zones = _options.zones;
        this.tiles = _options.tiles;
        this.debug = _options.debug;
        this.x = _options.x;
        this.y = _options.y;

        // Debug
        if (this.debug) {
            this.debugFolder = this.debug.addFolder("projects");
            this.debugFolder.open();
        }

        // Set up
        this.items = [];

        this.interDistance = 18;
        this.positionRandomess = 5;
        this.projectHalfWidth = 9;
        this.projectHalfHeight = 6;

        this.container = new THREE.Object3D();
        this.container.matrixAutoUpdate = false;
        this.container.updateMatrix();

        // Add GridHelper for debugging
        // const gridHelper = new THREE.GridHelper(200, 40); // 5 units per division
        // gridHelper.rotation.x = Math.PI / 2;
        // this.container.add(gridHelper);

        this.setGeometries();
        this.setMeshes();
        this.setList();
        this.setZone();

        // Add all project from the list
        for (const _options of this.list) {
            this.add(_options);
        }
    }

    setGeometries() {
        this.geometries = {};
        this.geometries.floor = new THREE.PlaneBufferGeometry(16, 8);
    }

    setMeshes() {
        this.meshes = {};

        // this.meshes.boardStructure = this.objects.getConvertedMesh(this.resources.items.projectsBoardStructure.scene.children, { floorShadowTexture: this.resources.items.projectsBoardStructureFloorShadowTexture })
        this.resources.items.areaOpenTexture.magFilter = THREE.NearestFilter;
        this.resources.items.areaOpenTexture.minFilter = THREE.LinearFilter;
        this.meshes.boardPlane =
            this.resources.items.projectsBoardPlane.scene.children[0];
        this.meshes.areaLabel = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(2, 0.5),
            new THREE.MeshBasicMaterial({
                transparent: true,
                depthWrite: false,
                color: 0xffffff,
                alphaMap: this.resources.items.areaOpenTexture,
            })
        );
        this.meshes.areaLabel.matrixAutoUpdate = false;
    }

    setList() {
        this.list = [
            {
                name: "Finger Tracking System",
                imageSources: [
                    projectsFingerTrackingSlideASources,
                    projectsFingerTrackingSlideBSources,
                    projectsFingerTrackingSlideCSources,
                    // projectsFingerTrackingSlideDSources,
                ],
                floorHTML: `
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
                    <div class="custom-css-inner">
                        <h2>Event-based Finger Tracking System</h2>
                        <p>
                           I implemented the lightweight real-time finger tracker using a novel approach by integrating simulated event-based vision data with MediaPipe's hand tracking module through sensor fusion. 
                           
                           The system can achieve frame rates of up to <strong>120 fps</strong>!
                        </p>
                        </div>
                        `,
                // TODO: add icons below, without blurring text (maybe extra window)
                // <br>
                // <a href="https://www.python.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/python-colored.svg" width="36" height="36" alt="Python" /></a>
                // <a href="https://opencv.org/" target="_blank" rel="noreferrer"><img src="https://icon.icepanel.io/Technology/svg/OpenCV.svg" width="36" height="36" alt="OpenCV" /></a>
                // <a href="https://www.latex-project.org/" target="_blank" rel="noreferrer"><img src="https://icon.icepanel.io/Technology/png-shadow-512/LaTeX.png" width="36" height="36" alt="LaTeX" /></a>
                link: {
                    href: "https://youtu.be/VA0pFY0snbU", // TODO: add ?utm_source=project&utm_medium=floor_html&utm_campaign=click_tracking
                    x: -4.8,
                    y: -3,
                    halfExtents: {
                        x: 3.2,
                        y: 1.5,
                    },
                },
                distinctions: [],
            },
            {
                name: "Linux Plugin for 3D Printing",
                imageSources: [
                    projectsMattaSlideASources,
                    projectsMattaSlideBSources,
                ],
                floorHTML: `
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
                    <div class="custom-css-inner">
                        <h2>Linux Plugin for 3D Printing</h2>
                        <p>
                            I initiated the development of a Linux application plugin for Raspberry Pi-controlled 3D printers using Klipper firmware, expanding the company's AI service to a wider user base.
                            <br>
                            Matta's AI service can correct 3D prints in real-time to ensure perfect prints.  Check them out at <a href="https://www.matta.ai/">matta.ai</a>! 
                        </p>
                    </div>
                `,
                link: {
                    href: "https://github.com/Matta-Labs/moonraker-mattaos",
                    x: -4.8,
                    y: -3,
                    halfExtents: {
                        x: 3.2,
                        y: 1.5,
                    },
                },
                distinctions: [],
            },
            {
                name: "Rocket Booster VR",
                imageSources: [
                    projectsRocketBoosterSlideASources,
                    projectsRocketBoosterSlideBSources,
                    projectsRocketBoosterSlideCSources,
                ],
                floorHTML: `
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
                    <div class="custom-css-inner">
                        <h2>Rocket Booster VR</h2>
                        <p>
                            A simple game to nagivate a rocket through obstacles, but in Virtual Reality :D
                        </p>
                    </div>
                `,
                link: {
                    href: "https://youtu.be/WCtxOAUMq8s",
                    x: -4.8,
                    y: -3,
                    halfExtents: {
                        x: 3.2,
                        y: 1.5,
                    },
                },
                distinctions: [],
            },
            {
                name: "Safe Cracking Physics Tournament",
                imageSources: [
                    projectsSafeCrackingSlideASources,
                    projectsSafeCrackingSlideBSources,
                ],
                floorHTML: `
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
                    <div class="custom-css-inner">
                        <h2>Most Popular 'Safe' in UK</h2>
                        <p>
                            We built a physics puzzle named the Most Popular Safe in the national 'Safe Cracking Physics tournament'! We also achieved First Runner-up and participated in the 24th international competition in Israel.
                        </p>
                    </div>
                `,
                link: {
                    href: "https://www.weizmann.org.uk/galleries/safe-cracking-competition-2019",
                    x: -4.8,
                    y: -3,
                    halfExtents: {
                        x: 3.2,
                        y: 1.5,
                    },
                },
                distinctions: [],
            },
            {
                name: "IYPT",
                imageSources: [
                    projectsIYPTSlideASources,
                    projectsIYPTSlideBSources,
                ],
                floorHTML: `
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
                    <div class="custom-css-inner">
                        <h2>International Young Physicists' Tournament</h2>
                        <p>
                            I represented the UK in the 32nd IYPT in Poland as part of a team of 5. I analysed the rotational dynamics of 'Hurricane Balls' using motion analysis software Tracker. In the competition, we presented and defended findings in physics fights against other international teams.
                        </p>
                    </div>
                `,
                link: {
                    href: "http://iypt.pl/",
                    x: -4.8,
                    y: -3,
                    halfExtents: {
                        x: 3.2,
                        y: 1.5,
                    },
                },
                distinctions: [],
            },
            // {
            //     name: "Original Project",
            //     imageSources: [
            //         projectsThreejsJourneySlideASources,
            //         projectsThreejsJourneySlideBSources,
            //         projectsThreejsJourneySlideCSources,
            //         projectsThreejsJourneySlideDSources,
            //     ],
            //     floorTexture:
            //         this.resources.items.projectsThreejsJourneyFloorTexture,
            //     link: {
            //         href: "https://threejs-journey.com?c=p3",
            //         x: -4.8,
            //         y: -3,
            //         halfExtents: {
            //             x: 3.2,
            //             y: 1.5,
            //         },
            //     },
            //     distinctions: [{ type: "fwa", x: 3.95, y: 4.15 }],
            // },
            // {
            //     name: "Madbox",
            //     imageSources: [
            //         projectsMadboxSlideASources,
            //         projectsMadboxSlideBSources,
            //         projectsMadboxSlideCSources,
            //     ],
            //     floorTexture: this.resources.items.projectsMadboxFloorTexture,
            //     link: {
            //         href: "https://madbox.io",
            //         x: -4.8,
            //         y: -4,
            //         halfExtents: {
            //             x: 3.2,
            //             y: 1.5,
            //         },
            //     },
            //     distinctions: [
            //         { type: "awwwards", x: 3.95, y: 4.15 },
            //         { type: "fwa", x: 5.6, y: 4.15 },
            //     ],
            // },
            // {
            //     name: "Scout",
            //     imageSources: [
            //         projectsScoutSlideASources,
            //         projectsScoutSlideBSources,
            //         projectsScoutSlideCSources,
            //     ],
            //     floorTexture: this.resources.items.projectsScoutFloorTexture,
            //     link: {
            //         href: "https://fromscout.com",
            //         x: -4.8,
            //         y: -2,
            //         halfExtents: {
            //             x: 3.2,
            //             y: 1.5,
            //         },
            //     },
            //     distinctions: [],
            // },
            // {
            //     name: "Chartogne Taillet",
            //     imageSources: [
            //         projectsChartogneSlideASources,
            //         projectsChartogneSlideBSources,
            //         projectsChartogneSlideCSources,
            //     ],
            //     floorTexture:
            //         this.resources.items.projectsChartogneFloorTexture,
            //     link: {
            //         href: "https://chartogne-taillet.com",
            //         x: -4.8,
            //         y: -3.3,
            //         halfExtents: {
            //             x: 3.2,
            //             y: 1.5,
            //         },
            //     },
            //     distinctions: [
            //         { type: "awwwards", x: 3.95, y: 4.15 },
            //         { type: "fwa", x: 5.6, y: 4.15 },
            //         { type: "cssda", x: 7.2, y: 4.15 },
            //     ],
            // },
            // {
            //     name: "Zenly",
            //     imageSources: [
            //         projectsZenlySlideASources,
            //         projectsZenlySlideBSources,
            //         projectsZenlySlideCSources,
            //     ],
            //     floorTexture: this.resources.items.projectsZenlyFloorTexture,
            //     link: {
            //         href: "https://zen.ly",
            //         x: -4.8,
            //         y: -4.2,
            //         halfExtents: {
            //             x: 3.2,
            //             y: 1.5,
            //         },
            //     },
            //     distinctions: [
            //         { type: "awwwards", x: 3.95, y: 4.15 },
            //         { type: "fwa", x: 5.6, y: 4.15 },
            //         { type: "cssda", x: 7.2, y: 4.15 },
            //     ],
            // },
            // {
            //     name: "priorHoldings",
            //     imageSources: [
            //         projectsPriorHoldingsSlideASources,
            //         projectsPriorHoldingsSlideBSources,
            //         projectsPriorHoldingsSlideCSources,
            //     ],
            //     floorTexture:
            //         this.resources.items.projectsPriorHoldingsFloorTexture,
            //     link: {
            //         href: "https://prior.co.jp/discover/",
            //         x: -4.8,
            //         y: -3,
            //         halfExtents: {
            //             x: 3.2,
            //             y: 1.5,
            //         },
            //     },
            //     distinctions: [
            //         { type: "awwwards", x: 3.95, y: 4.15 },
            //         { type: "fwa", x: 5.6, y: 4.15 },
            //         { type: "cssda", x: 7.2, y: 4.15 },
            //     ],
            // },
            // {
            //     name: "orano",
            //     imageSources: [
            //         projectsOranoSlideASources,
            //         projectsOranoSlideBSources,
            //         projectsOranoSlideCSources,
            //     ],
            //     floorTexture: this.resources.items.projectsOranoFloorTexture,
            //     link: {
            //         href: "https://orano.imm-g-prod.com/experience/innovation/en",
            //         x: -4.8,
            //         y: -3.4,
            //         halfExtents: {
            //             x: 3.2,
            //             y: 1.5,
            //         },
            //     },
            //     distinctions: [
            //         { type: "awwwards", x: 3.95, y: 4.15 },
            //         { type: "fwa", x: 5.6, y: 4.15 },
            //         { type: "cssda", x: 7.2, y: 4.15 },
            //     ],
            // },
            // {
            //     name: "citrixRedbull",
            //     imageSources: [
            //         projectsCitrixRedbullSlideASources,
            //         projectsCitrixRedbullSlideBSources,
            //         projectsCitrixRedbullSlideCSources,
            //     ],
            //     floorTexture:
            //         this.resources.items.projectsCitrixRedbullFloorTexture,
            //     link: {
            //         href: "https://thenewmobileworkforce.imm-g-prod.com/",
            //         x: -4.8,
            //         y: -4.4,
            //         halfExtents: {
            //             x: 3.2,
            //             y: 1.5,
            //         },
            //     },
            //     distinctions: [
            //         { type: "awwwards", x: 3.95, y: 4.15 },
            //         { type: "fwa", x: 5.6, y: 4.15 },
            //         { type: "cssda", x: 7.2, y: 4.15 },
            //     ],
            // },
            // {
            //     name: 'gleecChat',
            //     imageSources:
            //     [
            //         projectsGleecChatSlideASources,
            //         projectsGleecChatSlideBSources,
            //         projectsGleecChatSlideCSources,
            //         projectsGleecChatSlideDSources
            //     ],
            //     floorTexture: this.resources.items.projectsGleecChatFloorTexture,
            //     link:
            //     {
            //         href: 'http://gleec.imm-g-prod.com',
            //         x: - 4.8,
            //         y: - 3.4,
            //         halfExtents:
            //         {
            //             x: 3.2,
            //             y: 1.5
            //         }
            //     },
            //     distinctions:
            //     [
            //         { type: 'awwwards', x: 3.95, y: 4.15 },
            //         { type: 'fwa', x: 5.6, y: 4.15 },
            //         { type: 'cssda', x: 7.2, y: 4.15 }
            //     ]
            // },
            // {
            //     name: "keppler",
            //     imageSources: [
            //         projectsKepplerSlideASources,
            //         projectsKepplerSlideBSources,
            //         projectsKepplerSlideCSources,
            //     ],
            //     floorTexture: this.resources.items.projectsKepplerFloorTexture,
            //     link: {
            //         href: "https://brunosimon.github.io/keppler/",
            //         x: 2.75,
            //         y: -1.1,
            //         halfExtents: {
            //             x: 3.2,
            //             y: 1.5,
            //         },
            //     },
            //     distinctions: [],
            // },
        ];
    }

    setZone() {
        // const totalWidth = this.list.length * (this.interDistance / 2);

        // const zone = this.zones.add({
        //     position: {
        //         x: this.x + totalWidth - this.projectHalfWidth - 6,
        //         y: this.y,
        //     },
        //     halfExtents: { x: totalWidth, y: 12 },
        //     data: { cameraAngle: "projects" },
        // });

        const totalHeight = this.list.length * (this.interDistance / 2);

        const zone = this.zones.add({
            position: {
                x: this.x, // + totalWidth - this.projectHalfWidth - 6,
                y: this.y - totalHeight - this.projectHalfHeight + 6,
            },
            halfExtents: { x: 12, y: totalHeight },
            data: { cameraAngle: "projects" },
        });

        zone.on("in", (_data) => {
            this.camera.angle.set(_data.cameraAngle);
            TweenLite.to(
                this.passes.horizontalBlurPass.material.uniforms.uStrength
                    .value,
                2,
                { x: 0 }
            );
            TweenLite.to(
                this.passes.verticalBlurPass.material.uniforms.uStrength.value,
                2,
                { y: 0 }
            );
        });

        zone.on("out", () => {
            this.camera.angle.set("default");
            TweenLite.to(
                this.passes.horizontalBlurPass.material.uniforms.uStrength
                    .value,
                2,
                { x: this.passes.horizontalBlurPass.strength }
            );
            TweenLite.to(
                this.passes.verticalBlurPass.material.uniforms.uStrength.value,
                2,
                { y: this.passes.verticalBlurPass.strength }
            );
        });
    }

    // * Overhaul on add method later
    add(_options) {
        // const x = this.x + this.items.length * this.interDistance;
        // let y = this.y;
        // if (this.items.length > 0) {
        //     y += (Math.random() - 0.5) * this.positionRandomess;
        // }
        const x = this.x; // + this.items.length * this.interDistance;
        let y = this.y - this.items.length * this.interDistance;
        // if (this.items.length > 0) {
        //     y += (Math.random() - 0.5) * this.positionRandomess;
        // }

        // Create project
        const project = new Project({
            time: this.time,
            resources: this.resources,
            objects: this.objects,
            areas: this.areas,
            geometries: this.geometries,
            meshes: this.meshes,
            debug: this.debugFolder,
            x: x,
            y: y,
            ..._options,
        });

        this.container.add(project.container);

        // Add tiles
        if (this.items.length >= 1) {
            const previousProject = this.items[this.items.length - 1];
            const start = new THREE.Vector2(
                // previousProject.x + this.projectHalfWidth,
                // previousProject.y
                previousProject.x,
                previousProject.y - this.projectHalfHeight
            );
            const end = new THREE.Vector2(
                // project.x - this.projectHalfWidth,
                // project.y
                project.x,
                project.y + this.projectHalfHeight
            );
            const delta = end.clone().sub(start);
            this.tiles.add({
                start: start,
                delta: delta,
            });
        }

        // Save
        this.items.push(project);
    }
}
