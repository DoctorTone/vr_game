import { useRef } from "react";
import { XR } from "@react-three/xr";
import { Sky } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import Floor from "../models/Floor";
import VRNavigation from "./VRNavigation";
import Gun from "./Gun";
import GameWorld from "./GameWorld";

const VRGame = () => {
  const enemiesRef = useRef<THREE.Mesh[]>([]);

  const worldUpdate = (enemies: THREE.Mesh[]) => {
    enemiesRef.current = [...enemies];
  };

  const getCurrentEnemies = () => enemiesRef.current;

  return (
    <XR>
      <Sky />
      <Floor />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <GameWorld updateWorld={worldUpdate} />
      <Gun getEnemies={getCurrentEnemies} />
      <VRNavigation />
    </XR>
  );
};

export default VRGame;
