import { useState } from "react";

const Logowanie = () => {
  const [login, setLogin] = useState("");
  const [haslo, setHaslo] = useState("");
  const [powtorzHaslo, setPowtorzHaslo] = useState("");

  const wszystkieWypelnione = login && haslo && powtorzHaslo;
  const haslaZgodne = haslo === powtorzHaslo;

  const kliknij = () => {
    if (!haslaZgodne) {
      alert("Hasła nie są zgodne");
    } else {
      alert("Zalogowano poprawnie");
    }
  };

  return (
    <div>
      <h2>Logowanie</h2>

      <div>
        <label>Nazwa użytkownika: </label>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>

      <br />

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

      <button disabled={!wszystkieWypelnione} onClick={kliknij}>
        Logowanie
      </button>
    </div>
  );
};

export default Logowanie;
