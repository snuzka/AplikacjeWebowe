import { useState } from "react";

const Formularz = () => {
  const [tekst, setTekst] = useState<string>("");

  return (
    <div>
      <h2>Formularz</h2>

      <div>
        <input
          type="text"
          value={tekst}
          onChange={(e) => setTekst(e.target.value)}
        />
      </div>

      <br />

      <div>{tekst}</div>
    </div>
  );
};

export default Formularz;
