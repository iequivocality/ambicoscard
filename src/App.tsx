import { Canvas } from "@react-three/fiber";
import { Card } from "./components/card";
import { Grid } from "@react-three/drei";
import { CARDS } from "./data";
import type { CSSProperties } from "react";

function App() {
  return (
    <>
      <Canvas className="grid-background">
        <Grid
          position={[0, -0.01, 0]}
          rotation={[0.1744, 0, 0]}
          args={[10.5, 10.5]}
          infiniteGrid
          fadeDistance={7}
          fadeStrength={1}
          cellColor={0xffffff}
          followCamera={false}
        />
      </Canvas>
      <main>
        <div className="card-container" style={{
          "--card-count": Object.keys(CARDS).length
        } as CSSProperties}>
          {Object.keys(CARDS).map((key, index) => {
            return <Card key={key} index={index} card={CARDS[key]} />;
          })}
        </div>
      </main>
    </>
  );
}

export default App;
