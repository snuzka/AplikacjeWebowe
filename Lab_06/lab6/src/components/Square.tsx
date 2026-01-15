interface SquareProps {
  id: number;
}

const Square: React.FC<SquareProps> = () => {
  return (
    <div style={{ width: 80, height: 80, backgroundColor: "green" }}></div>
  );
};

export default Square;
