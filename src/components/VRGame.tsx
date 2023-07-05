import { XR, Controllers } from "@react-three/xr";
import { Sky } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import Floor from "../models/Floor";
import VRNavigation from "./VRNavigation";
import Gun from "./Gun";

const VRGame = () => {
  return (
    <XR>
      <Gun />
      <Sky />
      <Floor />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh position={[0, 2, -3]}>
        <boxGeometry />
        <meshBasicMaterial color="blue" />
      </mesh>
      <VRNavigation />
    </XR>
  );
};

export default VRGame;
