import React from "react";
import { useController, useXR } from "@react-three/xr";
import { useFrame } from "@react-three/fiber";

interface NavigationProps {
  updatePos: (x: number, y: number) => void;
}

const VRNavigation = ({ updatePos }: NavigationProps) => {
  const rightController = useController("right");
  const player = useXR((state) => state.player);

  useFrame(() => {
    if (!rightController) return;

    const [xPos, yPos] = [
      rightController.inputSource.gamepad!.axes[2],
      rightController.inputSource.gamepad!.axes[3],
    ];
    updatePos(xPos, yPos);
    player.position.set(xPos, 0, yPos);
  });

  return <></>;
};

export default VRNavigation;
