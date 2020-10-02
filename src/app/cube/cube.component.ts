import {
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as Cube from 'cubejs';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.css'],
})
export class CubeComponent implements OnInit {
  @ViewChild('rendererContainer') rendererContainer: ElementRef;

  @Input()
  private scramble: string;

  renderer = new THREE.WebGLRenderer();
  loader = null;
  scene = null;
  camera = null;
  mesh = null;
  light = null;

  constructor() {
    this.loader = new GLTFLoader();

    this.scene = new THREE.Scene();

    this.light = new THREE.AmbientLight(0xffffff, 2);
    this.scene.add(this.light);

    // Create a basic perspective camera
    this.camera = new THREE.PerspectiveCamera(50, 1, 0.6, 1000);
    this.camera.position.z = 5;

    // Create a renderer with Antialiasing
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      precision: 'mediump',
    });

    this.renderer.setSize(200, 200);

    // Configure renderer clear color
    this.renderer.setClearColor('#ffffff');

    // Configure renderer size
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // ------------------------------------------------
    // FUN STARTS HERE
    // ------------------------------------------------

    new OrbitControls(this.camera, this.renderer.domElement);

    this.loader.load(
      './assets/cube.gltf',
      (gltf: any) => {
        const cube = new Cube();
        cube.move(this.scramble);
        const scrambleString = cube.asString();

        this.scene.add(gltf.scene);
        const cubeModel = gltf.scene.children[2];

        const tileOrder = [
          'U1',
          'U2',
          'U3',
          'U4',
          'U5',
          'U6',
          'U7',
          'U8',
          'U9',
          'R1',
          'R2',
          'R3',
          'R4',
          'R5',
          'R6',
          'R7',
          'R8',
          'R9',
          'F1',
          'F2',
          'F3',
          'F4',
          'F5',
          'F6',
          'F7',
          'F8',
          'F9',
          'D1',
          'D2',
          'D3',
          'D4',
          'D5',
          'D6',
          'D7',
          'D8',
          'D9',
          'L1',
          'L2',
          'L3',
          'L4',
          'L5',
          'L6',
          'L7',
          'L8',
          'L9',
          'B1',
          'B2',
          'B3',
          'B4',
          'B5',
          'B6',
          'B7',
          'B8',
          'B9',
        ];

        tileOrder.forEach((tile, index) => {
          const meshIndex = cubeModel.children.findIndex(
            (mesh: any) => mesh.material.name === tile
          );

          switch (scrambleString[index]) {
            case 'U':
              gltf.scene.children[2].children[meshIndex].material.color = {
                r: 0.8,
                g: 0.8,
                b: 0.8,
                isColor: true,
              };
              break;
            case 'R':
              gltf.scene.children[2].children[meshIndex].material.color = {
                r: 0.8,
                g: 0,
                b: 0,
                isColor: true,
              };
              break;
            case 'F':
              gltf.scene.children[2].children[meshIndex].material.color = {
                r: 0,
                g: 0.8,
                b: 0,
                isColor: true,
              };
              break;
            case 'D':
              gltf.scene.children[2].children[meshIndex].material.color = {
                r: 0.8,
                g: 0.8,
                b: 0,
                isColor: true,
              };
              break;
            case 'L':
              gltf.scene.children[2].children[meshIndex].material.color = {
                r: 0.8,
                g: 0.3,
                b: 0.1,
                isColor: true,
              };
              break;
            case 'B':
              gltf.scene.children[2].children[meshIndex].material.color = {
                r: 0,
                g: 0,
                b: 0.8,
                isColor: true,
              };
              break;
          }
        });
      },
      (xhr) => {
        // called while loading is progressing
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (error) => {
        // called when loading has errors
        console.error('An error happened', error);
      }
    );
  }

  ngAfterViewInit() {
    this.renderer.setSize(250, 250);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.scramble.currentValue);
  }

  ngOnInit(): void {}
}
