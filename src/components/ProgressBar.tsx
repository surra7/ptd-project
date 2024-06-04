const ProgressBar = ({ rate }: { rate: number }) => {
  return (
    <div className="w-[2.5rem] h-[0.375rem] rounded-3xl relative bg-black-50 border-[0.0187rem] border-black-100 mx-auto">
      <div style={{ width: `${rate}%` }} className={`h-full rounded-3xl absolute ml-0 bg-primary-200 z-10`}></div>
    </div>
  );
};

export default ProgressBar;
