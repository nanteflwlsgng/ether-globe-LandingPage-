// src/components/Experience.tsx
"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Stars, Scroll, Sparkles } from "@react-three/drei";
import { EffectComposer } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

import SpaceshipController from "./SpaceshipController";
import Capsule from "./Capsule";
import FloatingImage from "./FloatingImage";
import { Bloom, ChromaticAberration, Vignette } from "./Effects"; 

import WarpController from "./WarpController";
import Aura7 from "./Aura7";
import LoadingBug from "./LoadingBug";

export default function Experience() {
    const spaceshipRef = useRef<THREE.Group>(null);
    const [stage, setStage] = useState<'space' | 'warping' | 'loading' | 'aura7'>('space');
  
    const startWarp = () => setStage('warping');
    // const finishWarp = () => setStage('aura7');
    const goToLoading = () => setStage('loading');

      // Gestion de la sortie du Loading vers Aura-7
  useEffect(() => {
    if (stage === 'loading') {
      const timer = setTimeout(() => {
        setStage('aura7');
      }, 2000); // 2 secondes de suspense "bug"
      return () => clearTimeout(timer);
    }
  }, [stage]);
  
  
  return (
    <>
      {/* 🎬 ÉCRAN DE BUG (Apparaît seulement pendant la phase loading) */}
      {stage === 'loading' && <LoadingBug />}

      <Canvas camera={{ position:[0, 1, 5], fov: 75 }}>
        <color attach="background" args={[stage === 'aura7' ? "#fdfbd4" : "#000000"]} />

        {/* 🚀 --- SCÈNE 1 : ESPACE / WARP --- */}
        {(stage === 'space' || stage === 'warping') && (
          <>
            <ambientLight intensity={0.05} />
            <pointLight position={[0, 2, 5]} intensity={0.3} color="#00ffff" distance={4} /> 
            <directionalLight position={[0, 10, -100]} intensity={0.5} color="#8a2be2" />

            <ScrollControls pages={4} damping={0.2}>
              {stage === 'space' && <SpaceshipController capsuleRef={spaceshipRef} />}
              {stage === 'warping' && <WarpController onComplete={goToLoading} />}

              <Suspense fallback={null}>
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={1} fade speed={2} />
                <Sparkles count={500} scale={30} size={6} speed={0.4} color="#00ffff" position={[0, 0, -40]} />
                <Capsule ref={spaceshipRef} position={[0, 0, 5]} />
                <FloatingImage />
                
                <mesh position={[0, 0, -130]} rotation={[0.5, 0.5, 0]}>
                  <icosahedronGeometry args={[15, 0]} /> 
                  <meshBasicMaterial color={[2, 0.2, 5]} toneMapped={false} wireframe />
                </mesh>
              </Suspense>

              {stage === 'space' && (
                <Scroll html style={{ width: "100%" }}>
                    <div className="w-full h-screen flex flex-col items-center justify-center text-white pb-20">
                        <h1 className="text-7xl font-bold tracking-widest uppercase mb-4">NEONOVA</h1>
                        <button onClick={startWarp} className="px-10 py-5 border border-cyan-500/50 hover:bg-cyan-400 hover:text-black transition-all text-white font-bold rounded-full cursor-pointer">
                            Réserver votre expédition
                        </button>
                    </div>
                    {/* ... Tes autres sections HTML ici ... */}
                </Scroll>
              )}
            </ScrollControls>
          </>
        )}

        {/* 🪐 --- SCÈNE 2 : AURA-7 --- */}
        {stage === 'aura7' && <Aura7 />}

        {/* EFFETS DYNAMIQUES */}
        <EffectComposer>
          <Bloom luminanceThreshold={stage === 'aura7' ? 1.2 : 0.9} mipmapBlur intensity={stage === 'aura7' ? 0.5 : 1.5} />
          {/* On enlève la vignette seulement sur Aura7 */}
          <Vignette eskil={false} offset={0.3} darkness={stage === 'aura7' ? 0 : 1.3} />
          <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={new THREE.Vector2(0.003, 0.003)} />
        </EffectComposer>
      </Canvas>
    </>
  );
}