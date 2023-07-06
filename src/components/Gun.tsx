import React, { useRef, useEffect } from "react";
import { useController, useXR } from "@react-three/xr";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

const Gun = () => {
  const rightController = useController("right");
  const blasterRef = useRef<THREE.Group>(null!);
  const player = useXR((state) => state.player);

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
    <group ref={blasterRef} dispose={null}>
      <group
        position={[0.311, 1.207, -0.106]}
        rotation={[0, Math.PI / 2, 0]}
        scale={3.057}>
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
    </group>
  );
};
useGLTF.preload("./models/blaster.gltf");

export default Gun;
