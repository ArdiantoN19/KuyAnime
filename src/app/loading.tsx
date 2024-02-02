import { FunctionComponent } from "react";

const Loading: FunctionComponent = () => {
  return (
    <div className="min-h-[90dvh] grid place-items-center">
      <div className="loader"></div>
    </div>
  );
};

export default Loading;
