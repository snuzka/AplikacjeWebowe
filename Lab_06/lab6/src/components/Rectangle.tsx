interface RectProps {
  id: number;
}

const Rectangle: React.FC<RectProps> = () => {
  return (
    <div style={{  width: 160, height: 80, backgroundColor: "blue", }}>
    </div>
  );
};

export default Rectangle;
