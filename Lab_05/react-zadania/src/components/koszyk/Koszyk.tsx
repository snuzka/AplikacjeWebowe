import Produkt from "./Produkt";

const Koszyk = () => {
  return (
    <div>
      <h2>Koszyk</h2>

      <Produkt nazwa="Jabłko" />
      <Produkt nazwa="Gruszka" />
      <Produkt nazwa="Wojanek" />
      <Produkt nazwa="Piwo" />
      <Produkt nazwa="Zupka chińska" />
    </div>
  );
};

export default Koszyk;
