import { useState } from "react";

const Licznik = () => {
  const [licznik, setLicznik] = useState<number>(0);

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

export default Licznik;
