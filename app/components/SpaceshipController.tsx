// src/components/SpaceshipController.tsx
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";
import { RefObject } from "react";

// Il prend la ref de la capsule en paramètre pour la faire bouger
export default function SpaceshipController({ capsuleRef }: { capsuleRef: RefObject<THREE.Group | null> }) {
  const scroll = useScroll();
  const { camera } = useThree();

  useFrame(({ pointer }) => {
    // 1. LE DÉPLACEMENT (SCROLL)
    // On part de Z = 5 (entrée du tunnel) et on plonge jusqu'à Z = -120 (la sortie)
    const zPos = 5 - scroll.offset * 125; 
    
    // On fait avancer la caméra
    camera.position.z = zPos;
    
    // On fait avancer la capsule exactement à la même vitesse !

    // 2. LE MOUVEMENT DE TÊTE (SOURIS)
    const mouseLookX = (pointer.x * Math.PI) / 8;
    const mouseLookY = (pointer.y * Math.PI) / 10;

    // La caméra tourne pour regarder autour, mais la capsule reste droite
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, -mouseLookX, 0.05);
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, mouseLookY, 0.05);
  });

  return null;
}