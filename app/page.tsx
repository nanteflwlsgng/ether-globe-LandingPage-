// src/app/page.tsx
import Experience from "./components/Experience";

export default function Home() {
  return (
    <main className="w-full h-screen">
      {/* Notre scène 3D prendra 100% de ce conteneur principal */}
      <Experience />
    </main>
  );
}