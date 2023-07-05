import { VRButton } from "@react-three/xr";
import { Canvas } from "@react-three/fiber";
import VRGame from "./components/VRGame";

const App = () => {
  return (
    <>
      <VRButton />
      <Canvas>
        <VRGame />
      </Canvas>
    </>
  );
};

export default App;
