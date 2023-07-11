import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import {
  XRControllerEvent,
  useController,
  useXR,
  useXREvent,
} from "@react-three/xr";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { SCENE } from "../state/Config.js";
import { GLTF } from "three-stdlib";

interface GunProps {
  getEnemies: () => THREE.Mesh[];
}

const Gun = ({ getEnemies }: GunProps) => {
  const rightController = useController("right");
  const blasterRef = useRef<THREE.Group>(null!);
  const player = useXR((state) => state.player);
  const [fireSound] = useState(() => new Audio("./sounds/blasterShort.ogg"));
  const [blasting, setBlasting] = useState(false);
  const bulletRef = useRef<THREE.Mesh>(null!);
  const firedRef = useRef(false);
  const firingRef = useRef(false);
  const dummyMatrix = useRef<THREE.Matrix4>(new THREE.Matrix4());
  const bulletDir = useRef(new THREE.Vector3());
  const enemiesRef = useRef<THREE.Mesh[]>([]);

  const onFire = () => {
    fireSound.play();
    setBlasting(true);
    firedRef.current = true;
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

  useFrame((state, delta) => {
    if (!rightController) return;

    const { grip: controller } = rightController;

    blasterRef.current.position.copy(controller.position);
    blasterRef.current.rotation.copy(controller.rotation);

    // Bullets
    if (firingRef.current) {
      bulletRef.current.position.add(bulletDir.current);
      enemiesRef.current = getEnemies();
      // DEBUG
      // console.log(boundsRef.current);
      if (
        enemiesRef.current[0].geometry.boundingBox!.containsPoint(
          bulletRef.current.position
        )
      ) {
        bulletRef.current.position.y = -1000;
        enemiesRef.current[0].geometry.boundingBox!.translate(
          new THREE.Vector3(0, -1000, 0)
        );
        enemiesRef.current[0].visible = false;
        firingRef.current = false;
      }
    }

    if (firedRef.current) {
      bulletRef.current.visible = true;
      bulletRef.current.position.copy(controller.position);
      dummyMatrix.current.identity().extractRotation(controller.matrixWorld);
      bulletDir.current.set(0, -0.1, -0.065).applyMatrix4(dummyMatrix.current);
      firedRef.current = false;
      firingRef.current = true;
    }
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
        {/* <mesh
          visible={blasting}
          position={[-0.07, -0.2, -0.19]}
          rotation-x={2}
          scale={0.75}
        >
          <torusGeometry args={[0.075, 0.01]} />
          <meshLambertMaterial emissive="white" />
        </mesh> */}
        <pointLight visible={blasting} position={[-0.07, -0.3, -0.225]} />
      </group>
      <mesh ref={bulletRef}>
        <boxGeometry
          args={[SCENE.BULLET_SIZE, SCENE.BULLET_SIZE, SCENE.BULLET_SIZE]}
        />
        <meshLambertMaterial emissive="white" />
      </mesh>
    </>
  );
};
useGLTF.preload("./models/blaster.gltf");

export default Gun;
