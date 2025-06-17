import "./index.css";

export function Card() {
  return (
    <div className="card">
      <div className="card-translator">
        <button className="card-rotator">
          <div className="card-back">
            <img src="/coscard_back.jpg" />
          </div>
          <div className="card-front">
            <img src="/coscard_front.jpg" />
            <div className="card-shine"></div>
            <div className="card-glare"></div>
          </div>
        </button>
      </div>
    </div>
  );
}
