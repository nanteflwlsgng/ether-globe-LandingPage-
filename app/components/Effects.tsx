// src/components/Effects.tsx
import { 
    Bloom as OriginalBloom, 
    ChromaticAberration as OriginalCA, 
    Vignette as OriginalVignette 
  } from "@react-three/postprocessing";
  import React from "react";
  
  // On utilise React.ReactElement au lieu de JSX.Element !
  export const Bloom = OriginalBloom as (props: React.ComponentProps<typeof OriginalBloom>) => React.ReactElement;
  
  export const ChromaticAberration = OriginalCA as (props: React.ComponentProps<typeof OriginalCA>) => React.ReactElement;
  
  export const Vignette = OriginalVignette as (props: React.ComponentProps<typeof OriginalVignette>) => React.ReactElement;