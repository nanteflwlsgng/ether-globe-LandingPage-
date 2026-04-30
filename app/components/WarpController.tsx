// src/components/WarpController.tsx
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";

export default function WarpController({ onComplete }: { onComplete: () => void }) {
  const { camera } = useThree();
  
  // Référence pour manipuler nos centaines de lignes de lumière d'un coup
  const linesRef = useRef<THREE.InstancedMesh>(null);
  const lineCount = 600; // Le nombre d'étoiles filantes
  const dummy = useMemo(() => new THREE.Object3D(),[]);
  
  // On génère les positions initiales des lignes de vitesse
  const particles = useMemo(() => {
    const temp =[];
    for (let i = 0; i < lineCount; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 100, // Largeur du tunnel
        y: (Math.random() - 0.5) * 100, // Hauteur
        z: (Math.random() - 0.5) * 400, // Profondeur
        speed: Math.random() * 3 + 2,   // Vitesse aléatoire pour chaque ligne
      });
    }
    return temp;
  },[lineCount]);

  useEffect(() => {
    // 3 secondes de pure vitesse avant le "cut" vers la planète
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  useFrame(() => {
    // 1. La caméra avance de manière CONSTANTE (très vite, mais sans casser l'univers)
    camera.position.z -= 4;

    // 2. Effet d'étirement (FOV) de la caméra
    const pCamera = camera as THREE.PerspectiveCamera;
    if (pCamera.fov < 140) {
      pCamera.fov += 1.5;
      pCamera.updateProjectionMatrix();
    }

    // 3. Animation des "Warp Stars" (Les lignes de lumière qui foncent vers nous)
    if (linesRef.current) {
      particles.forEach((particle, i) => {
        // Les étoiles foncent vers la caméra !
        particle.z += particle.speed;

        // Si la ligne de lumière dépasse la caméra derrière nous
        if (particle.z > camera.position.z + 20) {
          // On la recycle et on la renvoie très loin devant nous pour un cycle infini
          particle.z = camera.position.z - 300 - Math.random() * 100;
          particle.x = (Math.random() - 0.5) * 100;
          particle.y = (Math.random() - 0.5) * 100;
        }

        dummy.position.set(particle.x, particle.y, particle.z);
        // On étire la ligne pour faire l'effet de vitesse (entre 10 et 30 de long)
        dummy.scale.set(1, 1, Math.random() * 20 + 10);
        dummy.updateMatrix();
        linesRef.current!.setMatrixAt(i, dummy.matrix);
      });
      linesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    // InstancedMesh permet d'afficher 600 objets 3D sans faire laguer le navigateur
    <instancedMesh ref={linesRef} args={[undefined, undefined, lineCount]}>
      <boxGeometry args={[0.03, 0.03, 1]} />
      {/* Couleur ultra-blanche avec toneMapped={false} pour que le Bloom les fasse exploser de lumière */}
      <meshBasicMaterial color={[5, 5, 5]} toneMapped={false} />
    </instancedMesh>
  );
}