import * as THREE from "three";
import { createRoot } from "react-dom/client";
import React, { useRef, useState } from "react";
import {
  Canvas,
  useFrame,
  ThreeElements,
  useLoader,
  useThree,
} from "@react-three/fiber";

import img from "../moon.jpg";

import {
  Hud,
  OrbitControls,
  OrthographicCamera,
  Environment,
} from "@react-three/drei";

function Planet(props: ThreeElements["mesh"]) {
  const texture = useLoader(THREE.TextureLoader, img);

  const renderPriority = 1;
  const matrix = new THREE.Matrix4();

  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(null);
  const [clicked, click] = useState(false);

  const { camera } = useThree();

  useFrame(() => {
    // Spin mesh to the inverse of the default cameras matrix
    matrix.copy(camera.matrix).invert();
    ref.current?.quaternion.setFromRotationMatrix(matrix);
  });

  useFrame((state, delta) => (ref.current.rotation.y += delta));

  return (
    <Hud renderPriority={renderPriority}>
      <OrthographicCamera makeDefault position={[0, 0, 100]} />
      <mesh
        {...props}
        ref={ref}
        scale={clicked ? 3 : 1}
        onClick={(event) => click(!clicked)}
        onPointerOut={(e) => hover(null)}
        onPointerMove={(e) => hover(null)}
      >
        <sphereGeometry args={[1, 32]} />
        {/* <meshBasicMaterial attach="material" /> */}
        {/* <meshStandardMaterial color={hovered ? "hotpink" : "orange"} /> */}
        <meshBasicMaterial attach="material" map={texture} />
        {/* <meshBasicMaterial name="material">
        <texture
          attach="map"
          image={img}
          onUpdate={(self) => img && (self.needsUpdate = true)}
        />
      </meshBasicMaterial> */}
      </mesh>
      {/* <ambientLight intensity={1} /> */}
      <pointLight position={[200, 200, 100]} intensity={2} />
    </Hud>
  );
}

export default Planet;
