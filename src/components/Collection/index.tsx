import { ResponseCollectionType } from "@/types/collection";
import React, { FunctionComponent } from "react";
import CollectionCard from "./CollectionCard";

interface CollectionProps {
  datas: ResponseCollectionType[];
}

const Collection: FunctionComponent<CollectionProps> = ({ datas }) => {
  return (
    <div className="mt-5 mb-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-4 md:gap-5">
        {datas.map((anime: ResponseCollectionType, index) => (
          <div key={index}>
            <CollectionCard {...anime} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
