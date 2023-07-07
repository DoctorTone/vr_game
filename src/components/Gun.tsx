import React, { useRef, useState, useEffect } from "react";
import {
  XRControllerEvent,
  useController,
  useXR,
  useXREvent,
} from "@react-three/xr";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

const Gun = () => {
  const rightController = useController("right");
  const blasterRef = useRef<THREE.Group>(null!);
  const player = useXR((state) => state.player);
  const [fireSound] = useState(() => new Audio("./sounds/blaster.ogg"));
  const [blastIntensity, setIntensity] = useState(0);
  const [blasting, setBlasting] = useState(false);

  const onFire = () => {
    fireSound.play();
    setBlasting(true);
    setTimeout(() => {
      setBlasting(false);
    }, 200);
  };

  useXREvent("selectstart", onFire);

  type GLTFResult = GLTF & {
    nodes: {
      Mesh_blasterA: THREE.Mesh;
      Mesh_blasterA_1: THREE.Mesh;
      Mesh_blasterA_2: THREE.Mesh;
      Mesh_blasterA_3: THREE.Mesh;
    };
    materials: {
      metal: THREE.MeshStandardMaterial;
      dark: THREE.MeshStandardMaterial;
      darkMetal: THREE.MeshStandardMaterial;
      purple: THREE.MeshStandardMaterial;
    };
  };
  const { nodes, materials } = useGLTF("./models/blaster.gltf") as GLTFResult;

  useEffect(() => {
    player.add(blasterRef.current);
  }, []);

  useFrame(() => {
    if (!rightController) return;

    const { grip: controller } = rightController;

    blasterRef.current.position.copy(controller.position);
    blasterRef.current.rotation.copy(controller.rotation);
  });
  return (
    <>
      <group ref={blasterRef} dispose={null}>
        <group scale={0.5} rotation={[-Math.PI / 3, 0, 0]}>
          <mesh
            geometry={nodes.Mesh_blasterA.geometry}
            material={materials.metal}
          />
          <mesh
            geometry={nodes.Mesh_blasterA_1.geometry}
            material={materials.dark}
          />
          <mesh
            geometry={nodes.Mesh_blasterA_2.geometry}
            material={materials.darkMetal}
          />
          <mesh
            geometry={nodes.Mesh_blasterA_3.geometry}
            material={materials.purple}
          />
        </group>
        {/* <mesh visible={blasting} position={[-0.07, -0.3, -0.225]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshLambertMaterial emissive="white" />
        </mesh> */}
        <pointLight visible={blasting} position={[-0.07, -0.3, -0.225]} />
      </group>
    </>
  );
};
useGLTF.preload("./models/blaster.gltf");

export default Gun;
