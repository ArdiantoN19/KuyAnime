import AnimeList from "@/components/AnimeList";
import Collection from "@/components/Collection";
import Header from "@/components/Dashboard/Header";
import { getCollections } from "@/lib/api/services";
import { FunctionComponent } from "react";

const Page: FunctionComponent = async () => {
  const collections = await getCollections();
  return (
    <section className="container min-h-[90vh] mt-8">
      <Header title="My Collection" />
      <Collection datas={collections} />
    </section>
  );
};

export default Page;
