import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface GameProps {
  updateWorld: (enemies: THREE.Mesh[]) => void;
}

const GameWorld = ({ updateWorld }: GameProps) => {
  const box = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (!box.current.geometry) return;

    if (!box.current.geometry.boundingBox) {
      box.current.geometry.computeBoundingBox();
      box.current.geometry.boundingBox!.translate(new THREE.Vector3(0, 2, -3));
    }

    updateWorld([box.current]);
  });

  return (
    <mesh ref={box} position={[0, 2, -3]}>
      <boxGeometry />
      <meshBasicMaterial color="blue" />
    </mesh>
  );
};

export default GameWorld;
