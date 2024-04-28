type squareProps = {
  value: string;
  handleClick: () => void;
};

const Square = ({ value, handleClick }: squareProps) => {
  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
};

export default Square;
