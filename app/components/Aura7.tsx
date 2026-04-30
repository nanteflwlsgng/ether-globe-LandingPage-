// src/components/Aura7.tsx
import { Sky, Clouds, Cloud, Float, Sparkles, Environment } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Aura7() {
  const { camera } = useThree();
  const cloudsRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const pCamera = camera as THREE.PerspectiveCamera;
    pCamera.position.set(0, 2, 20); 
    pCamera.fov = 60;
    pCamera.updateProjectionMatrix();
  }, [camera]);

  // LOGIQUE DE PARALLAX : Les nuages bougent légèrement à l'opposé de la souris
  useFrame((state) => {
    if (cloudsRef.current) {
      // On calcule la cible du parallax basée sur la souris (pointer.x et y)
      const targetX = -state.pointer.x * 5;
      const targetY = -state.pointer.y * 2;
      
      // On applique un mouvement fluide (Lerp)
      cloudsRef.current.position.x = THREE.MathUtils.lerp(cloudsRef.current.position.x, targetX, 0.02);
      cloudsRef.current.position.y = THREE.MathUtils.lerp(cloudsRef.current.position.y, targetY, 0.02);
    }
    
    // La caméra garde un petit mouvement de respiration
    camera.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.005;
  });

  return (
    <group>
      {/* 1. AMBIANCE LUMINEUSE (Coucher de soleil éthéré) */}
      <Sky sunPosition={[100, 20, 100]} turbidity={0.1} rayleigh={3} mieCoefficient={0.005} mieDirectionalG={0.8} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 20, 10]} intensity={2} color="#ffcf9e" />

      {/* 2. LE SYSTÈME DE NUAGES (PARALLAX) */}
      <group ref={cloudsRef}>
        <Clouds material={THREE.MeshBasicMaterial}>
          {/* Nuages de premier plan (bougent plus vite visuellement) */}
          <Cloud 
            segments={40} 
            bounds={[20, 2, 20]} 
            volume={10} 
            color="#ffffff" 
            opacity={0.8}
            seed={1}
            position={[0, -5, 0]}
          />
          
          {/* Nuages en arrière-plan (donnent la profondeur) */}
          <Cloud 
            segments={40} 
            bounds={[50, 5, 50]} 
            volume={20} 
            color="#ffeecf" 
            opacity={0.5}
            seed={2}
            position={[0, -10, -20]}
          />

          {/* Nuages lointains roses/dorés */}
          <Cloud 
            segments={20} 
            bounds={[100, 10, 100]} 
            volume={50} 
            color="#ffc7ed" 
            opacity={0.3}
            seed={3}
            position={[0, -20, -50]}
          />
        </Clouds>
      </group>

      {/* 3. L'ARTEFACT FLOTTANT (Ton point d'intérêt) */}
      <Float speed={2} floatIntensity={4} rotationIntensity={1}>
        <mesh position={[0, 4, -10]}>
          <octahedronGeometry args={[3, 0]} />
          <meshPhysicalMaterial 
            color="#ffffff" 
            transmission={1} 
            thickness={1} 
            roughness={0} 
            ior={1.5}
            envMapIntensity={2}
          />
        </mesh>
      </Float>

      {/* Particules magiques qui flottent dans les nuages */}
      <Sparkles count={400} scale={40} size={5} speed={0.3} color="#ffffff" />
      
      {/* Pour des reflets parfaits sur l'artefact de cristal */}
      <Environment preset="sunset" />
    </group>
  );
}