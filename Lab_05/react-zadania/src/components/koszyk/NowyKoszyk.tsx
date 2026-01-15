import Produkt from "./Produkt";

const Produkty = [
  "Jabłko",
  "Gruszka",
  "Wojanek",
  "Piwo",
  "Kabanosy",
];

const NowyKoszyk = () => {
  return (
    <div>
      <h2>Nowy Koszyk</h2>

      {Produkty.map((nazwa, index) => (
        <Produkt key={index} nazwa={nazwa} />
      ))}
    </div>
  );
};

export default NowyKoszyk;
