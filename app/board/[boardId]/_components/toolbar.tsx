export const Toolbar = () => {
  return (
    <div className="absolute left-2 top-[50%] -translate-y-[50%] flex flex-col gap-y-4 ">
      <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
        <div>Pencil</div>
        <div>Square</div>
        <div>Circle</div>
        <div>Pencil</div>
      </div>
      <div className="bg-white rounded-md flex flex-col p-1.5 items-center shadow-md">
        <div>Undo</div>
        <div>Redo</div>
        {/* <div>Clear</div> */}
      </div>
    </div>
  );
};
