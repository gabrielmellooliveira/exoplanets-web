import React, { useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
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
import Box from "./Box";
import Planet from "./Planet";
import {
  Hud,
  OrbitControls,
  OrthographicCamera,
  Environment,
  Stats,
  useGLTF,
} from "@react-three/drei";

import img from "./moon.jpg";
import img2 from "./hot.jpg";

import backgroudImage from "./background.jpg";
import ViewCube2 from "./ViewCube2";
import Planet2 from "./Planet2";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Viewcube({
  renderPriority = 1,
  matrix = new THREE.Matrix4(),
  image = "",
  onSelectPlanet = () => {},
}) {
  const texture = useLoader(THREE.TextureLoader, image);

  const { scene } = useThree();

  const texture2 = useLoader(THREE.TextureLoader, backgroudImage);

  texture2.encoding = THREE.sRGBEncoding;

  scene.background = texture2;

  const mesh = useRef<THREE.Mesh>(null!);
  const { camera } = useThree();
  const [hovered, hover] = useState<number>(0);

  useFrame((state, delta) => {
    // Spin mesh to the inverse of the default cameras matrix
    mesh.current.rotation.y += delta;

    matrix.copy(camera.matrix).invert();
    mesh.current?.quaternion.setFromRotationMatrix(matrix);
  });

  useFrame((state, delta) => (mesh.current.rotation.y += delta));

  return (
    <Hud renderPriority={renderPriority}>
      <OrthographicCamera makeDefault position={[0, 0, 300]} />
      <mesh
        ref={mesh}
        //position={[size.width / 2 - 120, size.height / 2 - 120, 0]}
        onPointerOut={(e) => hover(0)}
        onPointerMove={(e: ThreeEvent<PointerEvent>) =>
          hover(e.face?.materialIndex || 0)
        }
        onClick={onSelectPlanet}
      >
        {/* {[...Array(6)].map((_, index) => (
          <meshLambertMaterial
            attach={`material-${index}`}
            key={index}
            color={hovered === index ? "orange" : "hotpink"}
          />
        ))}
        <boxGeometry args={[80, 80, 80]} /> */}

        <sphereGeometry args={[300, 32]} />
        <meshBasicMaterial
          attach="material"
          map={texture}
          polygonOffsetUnits={500}
        />
      </mesh>
      {/* <ambientLight intensity={1} /> */}
      {/* <pointLight position={[200, 200, 100]} intensity={0.5} /> */}
    </Hud>
  );
}

function Model() {
  const gltf = useGLTF("./planet2.glb"); // Substitua '/path/to/your/model.glb' pelo caminho para o seu arquivo GLB
  const modelRef = useRef();

  return <primitive ref={modelRef} object={gltf.scene} />;
}

function App() {
  const [selectedImage, setSelectedImage] = useState(img);

  const [isSelectedPlanet, setIsSelectedPlanet] = useState(false);

  const onSelectPlanet = () => {
    setIsSelectedPlanet(true);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!isSelectedPlanet && (
        <>
          <div className="fixed-title">Exoplaneta</div>
          <div
            className="fixed-button-prev"
            onClick={() => setSelectedImage(img)}
          >
            Anterior
          </div>
          <div className="fixed-button" onClick={() => setSelectedImage(img2)}>
            Próximo
          </div>
        </>
      )}

      {isSelectedPlanet && (
        <>
          <div className="fixed-title">Exoplaneta</div>
          <div
            className="fixed-button-prev"
            onClick={() => setSelectedImage(img)}
          >
            Voltar
          </div>
          <div className="fixed-button" onClick={() => setSelectedImage(img2)}>
            Próximo
          </div>
        </>
      )}

      <Canvas camera={{ position: [0, 0, 2] }}>
        {/* <ambientLight /> */}
        {/* <pointLight position={[10, 10, 10]} /> */}
        {/* <Box position={[-1.2, 0, 0]} /> <Box position={[1.2, 0, 0]} /> */}

        <ambientLight intensity={0.3} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        {/* <Model position={[0, 0, 0]} />

        <Planet2
          position={[20, 0, -40]}
          image={selectedImage}
          modelPath="./planet.glft"
        /> */}

        <Model />

        {/* {!isSelectedPlanet && (
          <Viewcube onSelectPlanet={onSelectPlanet} image={selectedImage} />
        )}

        {isSelectedPlanet && <ViewCube2 image={selectedImage} />} */}
        {/* <Planet position={[1, 0, 0]} /> */}

        <OrbitControls enableZoom={true} />
        <Stats />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

export default App;
