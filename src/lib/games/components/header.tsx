import Button from "./button";

const Header = () => {
  return (
    <div>
      <div className="flex flex-row items-center justify-between w-full h-[70px] p-[15px]">
        <Button
          backgroundColor="#FA0000"
          height={40}
          text="Exit"
          width={100}
          onClick={() => alert("Exit clicked")}
        />

        <div className="relative flex items-center h-10 w-[130px]">
          <div className="absolute inset-0 bg-[#C56101] rounded-[20px]" />

          <div className="absolute flex items-center justify-center left-[26px] top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute w-7 h-7 bg-[#FFC723] rounded-full border-2 border-transparent" />
            <div className="absolute w-[18px] h-[18px] rounded-full border border-white" />
          </div>

          <span className="relative font-bold text-white text-center text-[20px] ml-12 w-[55px]">
            350
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
