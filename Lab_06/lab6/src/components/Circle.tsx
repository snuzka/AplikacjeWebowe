interface CircleProps {
  id: number;
}

const Circle: React.FC<CircleProps> = () => {
  return (
    <div
      style={{
        width: 80,
        height: 80,
        borderRadius: "50%",
        backgroundColor: "red",
      }}
    ></div>
  );
};

export default Circle;
