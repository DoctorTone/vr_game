import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface GameProps {
  updateWorld: (bounds: THREE.Box3[]) => void;
}

const GameWorld = ({ updateWorld }: GameProps) => {
  const box = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (!box.current.geometry) return;

    if (!box.current.geometry.boundingBox) {
      box.current.geometry.computeBoundingBox();
    }

    updateWorld([box.current.geometry.boundingBox!]);
  });

  return (
    <mesh ref={box} position={[0, 2, -3]}>
      <boxGeometry />
      <meshBasicMaterial color="blue" />
    </mesh>
  );
};

export default GameWorld;
