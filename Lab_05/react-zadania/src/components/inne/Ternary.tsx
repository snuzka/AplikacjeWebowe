const Ternary = () => {
  const a: boolean = true;
  const b: boolean = false;

  return (
    <div>
      <h2>Ternary</h2>

      <div>
        {a ? "Stwierdzenie a jest prawdziwe" : "Stwierdzenie a jest fałszywe"}
      </div>

      <br />

      <div>
        {b ? "Stwierdzenie b jest prawdziwe" : "Stwierdzenie b jest fałszywe"}
      </div>
    </div>
  );
};

export default Ternary;
