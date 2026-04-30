// src/components/Experience.tsx
"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Stars, Scroll, Sparkles } from "@react-three/drei";
import { EffectComposer } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

import SpaceshipController from "./SpaceshipController";
import Capsule from "./Capsule";
import FloatingImage from "./FloatingImage";
import { Bloom, ChromaticAberration, Vignette } from "./Effects"; 

export default function Experience() {
  const spaceshipRef = useRef<THREE.Group>(null);

  return (
    <Canvas camera={{ position:[0, 1, 5], fov: 75 }}>
      
      {/* 1. FOND NOIR ABSOLU */}
      <color attach="background" args={["#000000"]} />

      {/* 2. LUMIÈRES SOMBRES ET MYSTÉRIEUSES */}
      {/* Ambient quasi nul pour avoir de vraies ombres */}
      <ambientLight intensity={0.05} />
      
      {/* Lumière cockpit très subtile (distance=4 pour qu'elle ne s'étale pas partout) */}
      <pointLight position={[0, 2, 5]} intensity={0.3} color="#00ffff" distance={4} /> 
      
      {/* Lumière directionnelle violette adoucie pour la sortie */}
      <directionalLight position={[0, 10, -100]} intensity={0.5} color="#8a2be2" />

      <ScrollControls pages={4} damping={0.2}>
        <SpaceshipController capsuleRef={spaceshipRef} />

        <Suspense fallback={null}>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={1} fade speed={2} />
          
          <Sparkles count={500} scale={30} size={6} speed={0.4} color="#00ffff" position={[0, 0, -40]} />

          <Capsule ref={spaceshipRef} position={[0, 0, 5]} />
          <FloatingImage />

          {/* CIBLE GÉOMÉTRIQUE FINALE (Elle seule brillera fortement !) */}
          <mesh position={[0, 0, -130]} rotation={[0.5, 0.5, 0]}>
            <icosahedronGeometry args={[15, 0]} /> 
            <meshBasicMaterial color={[2, 0.2, 5]} toneMapped={false} wireframe />
          </mesh>
          <mesh position={[0, 0, -130]}>
            <icosahedronGeometry args={[14, 1]} />
            <meshStandardMaterial color="#000000" roughness={0.1} metalness={1} />
          </mesh>
        </Suspense>

        {/* 3. POST-PROCESSING CALIBRÉ POUR LE "DARK" */}
        <EffectComposer>
          {/* Seuil très haut (0.9) : Le vaisseau ne brille pas, seules les particules et l'étoile finale s'illuminent */}
          <Bloom luminanceThreshold={0.9} mipmapBlur intensity={1.5} />
          
          <ChromaticAberration 
            blendFunction={BlendFunction.NORMAL} 
            offset={new THREE.Vector2(0.003, 0.003)} 
          />
          
          {/* Vignette plus forte pour assombrir agressivement les bords de l'écran */}
          <Vignette eskil={false} offset={0.3} darkness={1.3} />
        </EffectComposer>

        {/* --- L'INTERFACE HTML --- */}
        <Scroll html style={{ width: "100%" }}>
          <div className="w-full h-screen flex flex-col items-center justify-center text-white pb-20">
            <h1 className="text-7xl font-bold tracking-widest uppercase mb-4 drop-shadow-[0_0_20px_rgba(0,255,255,0.3)]">
              NEONOVA
            </h1>
            <p className="text-xl tracking-widest opacity-50 animate-pulse">Scrollez pour engager les moteurs ↓</p>
          </div>

          <div className="w-full h-screen flex items-center justify-end pr-20 text-white">
            <div className="text-right">
               <h2 className="text-4xl font-light tracking-widest mb-3 drop-shadow-md">
                 VITESSE LUMIÈRE <span className="font-bold text-cyan-400">—</span> ENGAGÉE
               </h2>
               <p className="text-xs uppercase tracking-[0.3em] opacity-40">
                 Traversée du vide quantique en cours
               </p>
             </div>
          </div>

          <div className="w-full h-screen"></div>

          <div className="w-full h-screen flex flex-col items-center justify-center text-white">
            <h2 className="text-4xl font-light tracking-[0.2em] mb-12 text-center uppercase drop-shadow-md">
              Bienvenue sur <span className="font-bold text-purple-400">Aura-7</span>
            </h2>
            <button className="px-10 py-5 border border-cyan-500/50 hover:bg-cyan-500 hover:text-black text-white font-bold text-xl rounded-full transition-all uppercase tracking-wider hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:scale-105 backdrop-blur-md">
              Réserver votre expédition
            </button>
          </div>
        </Scroll>

      </ScrollControls>
    </Canvas>
  );
}