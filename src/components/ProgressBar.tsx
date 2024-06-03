const ProgressBar = ({ rate }: { rate: number }) => {
  return (
    <div className="w-[2.5rem] h-[0.375rem] rounded-3xl relative bg-[#F6F6F6] mx-auto">
      <div style={{ width: `${rate}%` }} className={`h-full rounded-3xl absolute ml-0 bg-[#DECAFF] z-10`}></div>
    </div>
  );
};

export default ProgressBar;
