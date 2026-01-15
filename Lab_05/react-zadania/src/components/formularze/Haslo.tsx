import { useState } from "react";

const Haslo = () => {
  const [haslo, setHaslo] = useState("");
  const [powtorzHaslo, setPowtorzHaslo] = useState("");

  let komunikat = "";

  if (!haslo && !powtorzHaslo) {
    komunikat = "Proszę wprowadzić hasło";
  } else if (haslo !== powtorzHaslo) {
    komunikat = "Hasła nie są zgodne";
  }

  return (
    <div>
      <h2>Hasło</h2>

      <div>
        <label>Hasło: </label>
        <input
          type="text"
          value={haslo}
          onChange={(e) => setHaslo(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>Powtórz Hasło: </label>
        <input
          type="text"
          value={powtorzHaslo}
          onChange={(e) => setPowtorzHaslo(e.target.value)}
        />
      </div>

      <br />

      <div>{komunikat}</div>
    </div>
  );
};

export default Haslo;
