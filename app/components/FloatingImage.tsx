// src/components/FloatingImage.tsx
import { Float, useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function FloatingImage() {
  // On charge l'image comme une vraie texture 3D
  const texture = useTexture("/planet-3d-sphere-with-craters.png");

  return (
    <Float 
      speed={2} 
      rotationIntensity={0.2} 
      floatIntensity={2} 
      floatingRange={[-1, 1]}
    >
      <mesh position={[0, 0, -40]}>
        {/* On crée un plan plat (Ajuste les dimensions [largeur, hauteur] ici) */}
        <planeGeometry args={[10, 10]} />
        
        {/* On applique un matériau de base avec la transparence activée */}
        <meshBasicMaterial 
          map={texture} 
          transparent={true} // Obligatoire pour les PNG
          alphaTest={0.05}   // Astuce magique : supprime les bordures bizarres
          side={THREE.DoubleSide} // Pour voir l'image de face ET de dos quand on la dépasse
          toneMapped={false} // Garde les couleurs vives de ton image (pas assombries par la 3D)
        />
      </mesh>
    </Float>
  );
}

// Pré-charge l'image pour éviter un écran noir au début
useTexture.preload("/planet-3d-sphere-with-craters.png");