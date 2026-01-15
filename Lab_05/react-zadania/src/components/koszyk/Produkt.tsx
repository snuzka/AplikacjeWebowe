type ProduktProps = {
  nazwa: string;
};

const Produkt = ({ nazwa }: ProduktProps) => {
  return <div>{nazwa}</div>;
};

export default Produkt;
