import { useRef, useState } from "react";
import "./App.css";
import * as THREE from "three";
import {
  Canvas,
  useFrame,
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
  useGLTF,
} from "@react-three/drei";

import planet1 from "./planeta.png";
import planet2 from "./planeta3.png";
import planet3 from "./planeta4.png";

import backgroudImage from "./background.jpg";
import ViewCube2 from "./ViewCube2";

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

  useFrame((state, delta) => {
    matrix.copy(camera.matrix).invert();
    mesh.current?.quaternion.setFromRotationMatrix(matrix);
  });

  useFrame((state, delta) => (mesh.current.rotation.y += delta));

  return (
    <Hud renderPriority={renderPriority}>
      <OrthographicCamera makeDefault position={[0, 0, 300]} />
      <mesh ref={mesh} onClick={onSelectPlanet}>
        <sphereGeometry args={[250, 32]} />
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

const planets = [
  {
    path: planet2,
    name: "Veridiana",
    description:
      "Veridiana é um exoplaneta fictício situado em um sistema estelar distante, a aproximadamente 40 anos-luz da Terra, na constelação de Aurora. Descoberto por telescópios avançados em uma missão interestelar de exploração, Veridiana é notável por ser um dos raros exoplanetas situados na zona habitável de sua estrela-mãe, uma gigante amarela conhecida como 'Aurora Prime'. Veridiana tem características geofísicas e climáticas únicas. Sua superfície é composta principalmente por vastas extensões de oceanos límpidos, com ilhas e arquipélagos dispersos, onde a vida marinha floresce em uma profusão de cores e formas. O planeta também possui um sistema complexo de ventos que cria correntes aéreas constantes, tornando possível a existência de enormes criaturas voadoras e aves exóticas.",
  },
  {
    path: planet1,
    name: "Seraphis-IV",
    description:
      "Seraphis-IV é um exoplaneta fascinante situado a aproximadamente 50 anos-luz da Terra, na constelação de Lyra. Descoberto recentemente por astrônomos usando tecnologias avançadas de telescópios espaciais, Seraphis-IV captura a imaginação dos cientistas e entusiastas do espaço devido às suas características únicas e potencial para abrigar vida. Este exoplaneta orbita uma estrela similar ao Sol, conhecida como Seraphis, com uma órbita que o coloca na chamada 'zona habitável'. Seraphis-IV é aproximadamente 1,5 vezes o tamanho da Terra e tem uma atmosfera densa e rica em oxigênio, criando um efeito estufa natural que regula as temperaturas em sua superfície.",
  },
  {
    path: planet3,
    name: "Aeloria",
    description:
      "Aeloria é um exoplaneta hipotético que orbita uma estrela similar ao Sol na constelação de Nova Lysia, localizada a aproximadamente 150 anos-luz da Terra. Este planeta fascinante possui uma rica diversidade de ecossistemas e características únicas que o tornam um candidato ideal para a habitabilidade. A atmosfera de Aeloria é composta principalmente de oxigênio e nitrogênio, proporcionando condições respiráveis para formas de vida semelhantes às terrestres. A presença de mares e oceanos cobrindo cerca de 70% da superfície de Aeloria contribui para a regulação do clima, criando uma variedade de paisagens costeiras e ilhas tropicais.",
  },
];

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState(0);

  const [selectedImage, setSelectedImage] = useState(planet2);

  const [isSelectedPlanet, setIsSelectedPlanet] = useState(false);

  const onSelectPlanet = () => {
    setIsSelectedPlanet(true);
  };

  const onSelectNextPlanet = () => {
    if (selectedPlanet === 2) {
      setSelectedPlanet(0);
      setSelectedImage(planets[0].path);
    } else {
      setSelectedPlanet((prev) => prev + 1);
      setSelectedImage(planets[selectedPlanet + 1].path);
    }
  };

  const onSelectPrevPlanet = () => {
    if (selectedPlanet === 0) {
      setSelectedPlanet(2);
      setSelectedImage(planets[2].path);
    } else {
      setSelectedPlanet((prev) => prev - 1);
      setSelectedImage(planets[selectedPlanet - 1].path);
    }
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
          <div className="fixed-title">{planets[selectedPlanet].name}</div>
          <div className="fixed-button-prev" onClick={onSelectPrevPlanet}>
            Anterior
          </div>
          <div className="fixed-button" onClick={onSelectNextPlanet}>
            Próximo
          </div>
        </>
      )}

      {isSelectedPlanet && (
        <>
          <div className="fixed-title-details">
            {planets[selectedPlanet].name}
          </div>
          <div className="fixed-text-details">
            {planets[selectedPlanet].description}
          </div>
          <div
            className="fixed-button-back"
            onClick={() => setIsSelectedPlanet(false)}
          >
            Voltar
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

        {!isSelectedPlanet && (
          <Viewcube onSelectPlanet={onSelectPlanet} image={selectedImage} />
        )}

        {isSelectedPlanet && <ViewCube2 image={selectedImage} />}

        <OrbitControls enableZoom={true} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

export default App;
