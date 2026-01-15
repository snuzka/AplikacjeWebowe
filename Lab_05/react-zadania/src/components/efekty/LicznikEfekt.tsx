import { useState, useEffect } from "react";

const LicznikEfekt = () => {
  const [licznik, setLicznik] = useState<number>(0);

  useEffect(() => {
    console.log("Hello world");
  }, []);

    useEffect(() => {
    console.log(`Licznik zwiększył się do ${licznik}`);
  }, [licznik]);

  return (
    <div>
      <h2>Licznik</h2>
      <div>Wartość: {licznik}</div>

      <button onClick={() => setLicznik(licznik + 1)}>
        Dodaj
      </button>
    </div>
  );
};

export default LicznikEfekt;
