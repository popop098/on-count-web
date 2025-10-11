import { memo } from "react";

const ContainerBox = memo(({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full flex flex-col gap-10 items-center">{children}</div>
    </div>
  );
});

ContainerBox.displayName = "ContainerBox";

export default ContainerBox;
