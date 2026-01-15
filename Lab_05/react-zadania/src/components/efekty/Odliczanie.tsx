import { useEffect, useState } from "react";

const Odliczanie = () => {
  const [czas, setCzas] = useState(15.0);
  const [dziala, setDziala] = useState(false);

  useEffect(() => {
    if (!dziala) return;

    const interval = setInterval(() => {
      setCzas((prev) => {
        if (prev <= 0.1) {
          clearInterval(interval);
          return 0;
        }
        return Number((prev - 0.1).toFixed(1));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [dziala]);

  const kliknij = () => {
    setDziala((prev) => !prev);
  };

  const zakonczone = czas === 0;

  return (
    <div>
      <h2>Odliczanie</h2>

      <div>{czas.toFixed(1)} s</div>
      <br />
      <button disabled={zakonczone} onClick={kliknij}>
        {zakonczone ? "Odliczanie zakończone" : dziala ? "STOP" : "START"}
      </button>
    </div>
  );
};

export default Odliczanie;
