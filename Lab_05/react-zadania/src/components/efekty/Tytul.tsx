import { useEffect, useState } from "react";

const Tytul = () => {
  const [tekst, setTekst] = useState("");

  useEffect(() => {
    document.title = tekst || "Zadania React";
  }, [tekst]);

  return (
    <div>
      <h2>Tytuł strony</h2>

      <input
        placeholder="Wpisz tytuł strony"
        value={tekst}
        onChange={(e) => setTekst(e.target.value)}
      />
    </div>
  );
};

export default Tytul;
