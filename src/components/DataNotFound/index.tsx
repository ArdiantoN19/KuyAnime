import { FolderOpen } from "@phosphor-icons/react/dist/ssr";
import { FunctionComponent } from "react";

const DataNotFound: FunctionComponent = () => {
  return (
    <div className="w-full min-h-[80dvh] grid place-items-center">
      <div className="">
        <FolderOpen size={100} className="text-teal-400 mx-auto" />
        <h2 className="text-2xl font-bold">Oops, Data Not Found</h2>
      </div>
    </div>
  );
};

export default DataNotFound;
