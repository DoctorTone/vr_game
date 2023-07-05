import { XR, Controllers } from "@react-three/xr";
import { Sky } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import Floor from "./Floor";
import VRNavigation from "./VRNavigation";

const VRGame = () => {
  const updatePos = (x: number, y: number) => {
    // console.log("Pos = ", x, y);
  };

  return (
    <XR>
      <Controllers />
      <Sky />
      <Floor />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh position={[0, 2, -3]}>
        <boxGeometry />
        <meshBasicMaterial color="blue" />
      </mesh>
      <VRNavigation updatePos={updatePos} />
    </XR>
  );
};

export default VRGame;
