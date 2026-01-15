import { useState } from "react";

interface Student {
  imie: string;
  nazwisko: string;
  rocznik: number;
}

type Props = {
  onDodaj: (student: Student) => void;
};

const Dodawanie = ({ onDodaj }: Props) => {
  const [imie, setImie] = useState("");
  const [nazwisko, setNazwisko] = useState("");
  const [rocznik, setRocznik] = useState("");

  const dodaj = () => {
    if (!imie || !nazwisko || !rocznik) {
      alert("Uzupełnij wszystkie pola");
      return;
    }

    const rocznikNumber = Number(rocznik);
    if (isNaN(rocznikNumber)) {
      alert("Rocznik musi być liczbą");
      return;
    }

    onDodaj({
      imie,
      nazwisko,
      rocznik: rocznikNumber,
    });

    setImie("");
    setNazwisko("");
    setRocznik("");
  };

  return (
    <div>
      <h3>Dodaj studenta</h3>

      <input
        placeholder="Imię"
        value={imie}
        onChange={(e) => setImie(e.target.value)}
      />

      <input
        placeholder="Nazwisko"
        value={nazwisko}
        onChange={(e) => setNazwisko(e.target.value)}
      />

      <input
        placeholder="Rocznik"
        value={rocznik}
        onChange={(e) => setRocznik(e.target.value)}
      />

      <button onClick={dodaj}>Dodaj</button>
    </div>
  );
};

export default Dodawanie;
