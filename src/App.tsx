import { Canvas } from "@react-three/fiber";
import { Card } from "./components/card";
import { Grid } from "@react-three/drei";
import { CARDS } from "./data";

function App() {
  return (
    <main>
      <Card card={CARDS["AMELIA"]} />
      {/** FIND A CSS WAY TO EXECUTE THIS */}
      <Canvas style={{ position: "fixed" }}>
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
    </main>
  );
}

export default App;
