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
  const bounding = useRef<THREE.Box3[]>([]);

  const worldUpdate = (boxes: THREE.Box3[]) => {
    bounding.current = [...boxes];
  };

  return (
    <XR>
      <Sky />
      <Floor />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <GameWorld updateWorld={worldUpdate} />
      <Gun bounds={bounding.current} />
      <VRNavigation />
    </XR>
  );
};

export default VRGame;
