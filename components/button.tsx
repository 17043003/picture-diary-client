type ButtonProps = {
  buttonName: string;
  clickHandler: () => void;
};

const Button: React.FC<ButtonProps> = ({ buttonName, clickHandler }) => {
  return (
    <div
      className='text-2xl inline mx-4 font-bold text-violet-700 bg-red-500 rounded-lg p-2 hover:bg-red-700 cursor-pointer'
      onClick={clickHandler}
    >
      {buttonName}
    </div>
  );
};

export default Button;
