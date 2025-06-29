import { Canvas } from "@react-three/fiber";
import { Card } from "./components/Card";
import { Grid } from "@react-three/drei";
import { CARDS } from "./data";
import { useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence } from "motion/react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { ChevronLeftIcon, ChevronRightIcon, Link } from "lucide-react";
import { useOrientation } from "./hooks";

function App() {
  const [card, setCard] = useState("amelia");
  const { orientation } = useOrientation();
  const debugMode = false;

  const previous = () => {
    setCard(card === "amelia" ? "ganyu" : "amelia");
  };

  const next = () => {
    setCard(card === "amelia" ? "ganyu" : "amelia");
  };

  useEffect(() => {
    document.body.style.setProperty(
      "--background-color",
      CARDS[card].backgroundColor,
    );
    document.body.style.setProperty(
      "--headsup-color",
      CARDS[card].sectionColor,
    );
  }, [card]);

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
          sectionColor={CARDS[card].sectionColor}
          cellColor={CARDS[card].cellColor}
          followCamera={false}
        />
      </Canvas>
      <main>
        <div className="card-selector">
          {Object.keys(CARDS).map((c) => {
            const entry = CARDS[c];
            return (
              <button
                key={entry.key}
                className={card === entry.key ? "selected" : ""}
                onClick={() => setCard(c)}
              >
                <img src={entry.preview} alt={entry.name} />
              </button>
            );
          })}
        </div>
        <div
          className="card-container"
          style={
            {
              "--card-count": Object.keys(CARDS).length,
            } as CSSProperties
          }
        >
          <button className="card-changer" onClick={previous}>
            <ChevronLeftIcon />
          </button>
          <div className="card-carousel">
            <h2 className="card-name">{CARDS[card].name}</h2>
            <AnimatePresence>
              <Card key={card} index={0} card={CARDS[card]} />
            </AnimatePresence>
          </div>
          <button className="card-changer" onClick={next}>
            <ChevronRightIcon />
          </button>
        </div>
      </main>
      <aside className="heads-up">
        <div className="doobly-doo">
          <h1>Ambi Coscard</h1>
          <p>
            Inspired by effects from{" "}
            <a href="https://www.joshdance.com/100/day50/" target="_blank">
              Joshdance
            </a>{" "}
            and{" "}
            <a href="https://poke-holo.simey.me/" target="_blank">
              simeydotme's
            </a>{" "}
            Holographic Effects. <br />
            <br />
            Hover over the cards to see the effects and click to check out the
            back!
            <br />
            <br />
            Still in progress.
          </p>
          <div className="links">
            <a
              aria-label="GitHub repository"
              href="https://ambi.moe"
              target="_blank"
            >
              <Link />
            </a>
            <a
              aria-label="GitHub repository"
              href="https://github.com/iequivocality/ambicoscard"
              target="_blank"
            >
              <SiGithub />
            </a>
          </div>
        </div>
        {debugMode && (<div className="debug">
          <div>Gamma: {orientation.relative.gamma}</div>
          <div>Beta: {orientation.relative.beta}</div>
          <div>Alpha {orientation.relative.alpha}</div>
        </div>)}
      </aside>
    </>
  );
}

export default App;
