// src/components/Capsule.tsx
import { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// L'utilisation de forwardRef permet au composant parent de contrôler la position de la capsule
const Capsule = forwardRef<THREE.Group, any>((props, ref) => {
  const { scene } = useGLTF("/capsule.glb");

  return (
    <group ref={ref} {...props}>
      {/* On tourne le modèle 3D de 180° sur l'axe Y pour faire face à la sortie ! */}
      <primitive object={scene} rotation={[0, Math.PI, 0]} />
    </group>
  );
});

export default Capsule;

useGLTF.preload("/capsule.glb");