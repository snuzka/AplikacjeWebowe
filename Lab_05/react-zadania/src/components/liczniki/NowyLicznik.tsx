import { useState } from "react";
import Przycisk from "./Przycisk";

const NowyLicznik = () => {
  const [licznik, setLicznik] = useState<number>(0);

  const zwieksz = () => {
    setLicznik(licznik + 1);
  };

  return (
    <div>
      <h2>Nowy Licznik</h2>
      <div>Wartość: {licznik}</div>

      <Przycisk onClick={zwieksz} />
    </div>
  );
};

export default NowyLicznik;
