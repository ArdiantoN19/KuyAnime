"use client";

import { ResponseCollectionType } from "@/types/collection";
import React, { FunctionComponent, useEffect } from "react";
import CollectionCard from "./CollectionCard";
import { getCollections } from "@/lib/api/services";
import DataNotFound from "@/components/DataNotFound";

const Collection: FunctionComponent = () => {
  const [datas, setDatas] = React.useState<ResponseCollectionType[]>([]);
  useEffect(() => {
    (async () => {
      const collections = await getCollections();
      setDatas(collections);
    })();
  }, []);

  if (!datas.length) {
    return <DataNotFound />;
  }

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
