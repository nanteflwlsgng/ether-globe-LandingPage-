// src/components/FlightController.tsx
import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

export default function FlightController() {
  // useScroll nous donne accès aux infos du scroll actuel
  const scroll = useScroll();
  // useThree nous donne accès à la caméra de la scène
  const { camera } = useThree();

  // useFrame s'exécute à chaque rafraîchissement d'écran (ex: 60 fois par seconde)
  useFrame(() => {
    // scroll.offset est une valeur entre 0 (tout en haut) et 1 (tout en bas)
    // On calcule la position Z : on part de 5 et on plonge jusqu'à -100
    const zPosition = 5 - scroll.offset * 105; 
    
    // On met à jour la position de la caméra en douceur
    camera.position.z = zPosition;
  });

  return null; // Ce composant ne rend rien visuellement, c'est juste le "cerveau"
}