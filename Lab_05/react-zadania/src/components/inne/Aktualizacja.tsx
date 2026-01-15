import { useState } from "react";

type Produkt = {
  nazwa: string;
  cena: number;
};

const Aktualizacja = () => {
  const [produkt, setProdukt] = useState<Produkt>({
    nazwa: "Pomidor",
    cena: 50,
  });

  const zmienCene = () => {
    setProdukt((prev) => ({
      ...prev,
      cena: prev.cena * 2,
    }));
  };

  return (
    <div>
      <h2>Aktualizacja produktu</h2>

      <div>
        Aktualnie {produkt.nazwa} kosztuje {produkt.cena}
      </div>
      <br />
      <button onClick={zmienCene}>Zmień cenę</button>
    </div>
  );
};

export default Aktualizacja;
