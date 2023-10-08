import React, { useRef, useState } from "react";
import logo from "./logo.svg";
import "../App.css";
import * as THREE from "three";
import { createRoot } from "react-dom/client";
import {
  Canvas,
  useFrame,
  ThreeElements,
  useThree,
  ThreeEvent,
  useLoader,
} from "@react-three/fiber";
import {
  Hud,
  OrbitControls,
  OrthographicCamera,
  Environment,
  Stats,
} from "@react-three/drei";

import img from "../moon.jpg";
import img2 from "../hot.jpg";

import backgroudImage from "../background.jpg";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// function Planet2({
//   renderPriority = 1,
//   matrix = new THREE.Matrix4(),
//   image = "",
//   onSelectPlanet = () => {},
//   modelPath = "",
//   scale = 40,
//   position = [0, 0, 0],
// }) {
//   const gltf = useLoader(GLTFLoader, modelPath);

//   const texture = useLoader(THREE.TextureLoader, image);

//   const { scene } = useThree();

//   const texture2 = useLoader(THREE.TextureLoader, backgroudImage);

//   texture2.encoding = THREE.sRGBEncoding;

//   scene.background = texture2;

//   const mesh = useRef<THREE.Mesh>(null!);
//   const { camera } = useThree();
//   const [hovered, hover] = useState<boolean>(false);

//   useFrame((state, delta) => {
//     // Spin mesh to the inverse of the default cameras matrix
//     mesh.current.rotation.y += delta;

//     matrix.copy(camera.matrix).invert();
//     mesh.current?.quaternion.setFromRotationMatrix(matrix);
//   });

//   useFrame((state, delta) => (mesh.current.rotation.y += delta));

//   return (
//     <Hud renderPriority={renderPriority}>
//       <OrthographicCamera makeDefault position={[0, 0, 300]} />
//       <primitive
//         ref={mesh}
//         object={gltf.scene}
//         position={position}
//         scale={hovered ? scale * 1.2 : scale}
//         onPointerOver={() => hover(true)}
//         onPointerOut={() => hover(false)}
//       />
//       {/* <mesh
//         ref={mesh}
//         //position={[size.width / 2 - 120, size.height / 2 - 120, 0]}
//         onPointerOut={(e) => hover(0)}
//         onPointerMove={(e: ThreeEvent<PointerEvent>) =>
//           hover(e.face?.materialIndex || 0)
//         }
//         onClick={onSelectPlanet}
//       > */}
//       {/* {[...Array(6)].map((_, index) => (
//           <meshLambertMaterial
//             attach={`material-${index}`}
//             key={index}
//             color={hovered === index ? "orange" : "hotpink"}
//           />
//         ))}
//         <boxGeometry args={[80, 80, 80]} /> */}

//       {/* <sphereGeometry args={[300, 32]} />
//         <meshBasicMaterial
//           attach="material"
//           map={texture}
//           polygonOffsetUnits={500}
//         />
//       </mesh> */}
//       {/* <ambientLight intensity={1} /> */}
//       {/* <pointLight position={[200, 200, 100]} intensity={0.5} /> */}
//     </Hud>
//   );
// }

function Planet2({
  renderPriority = 1,
  matrix = new THREE.Matrix4(),
  image = "",
  onSelectPlanet = () => {},
  modelPath = "",
  scale = 10,
  position = [0, 0, 0],
}) {
  const gltf = useLoader(GLTFLoader, modelPath);

  const mesh = useRef<THREE.Mesh>(null!);
  const { camera } = useThree();
  const [hovered, hover] = useState<boolean>(false);

  // useFrame((state, delta) => {
  //   // Spin mesh to the inverse of the default cameras matrix
  //   mesh.current.rotation.y += delta;

  //   matrix.copy(camera.matrix).invert();
  //   mesh.current?.quaternion.setFromRotationMatrix(matrix);
  // });

  useFrame((state, delta) => (mesh.current.rotation.y += delta));

  return (
    <>
      <primitive
        ref={mesh}
        object={gltf.scene}
        position={position}
        scale={hovered ? scale * 1.2 : scale}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      />
    </>
  );
}

export default Planet2;
