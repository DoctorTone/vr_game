import React, { useRef } from "react";
import { useController } from "@react-three/xr";
import { useFrame } from "@react-three/fiber";
import Box from "@react-three/drei";

const Gun = () => {
  const rightController = useController("right");
  const controllerPosRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (!rightController) return;

    const { grip: controller } = rightController;

    controllerPosRef.current.position.x = controller.position.x;
    controllerPosRef.current.position.y = controller.position.y;
    controllerPosRef.current.position.z = controller.position.z;
  });
  return (
    <mesh ref={controllerPosRef}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshLambertMaterial color="red" />
    </mesh>
  );
};

export default Gun;
