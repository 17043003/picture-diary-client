export type ButtonProps = {
  buttonName: string;
  bgColor: string;
  textColor: string;
  clickHandler: () => void;
};

const Button: React.FC<ButtonProps> = ({ buttonName, bgColor, textColor, clickHandler }) => {
  return (
    <div
      className={`text-2xl inline mx-4 font-bold text-${textColor}-700 bg-${bgColor}-500 rounded-lg p-2 hover:bg-${bgColor}-700 cursor-pointer`}
      onClick={clickHandler}
    >
      {buttonName}
    </div>
  );
};

export default Button;
