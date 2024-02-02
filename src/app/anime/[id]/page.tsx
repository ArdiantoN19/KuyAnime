import { getDetailAnime } from "@/lib/api/services";
import { DetailAnimeType } from "@/types/anime";
import { FunctionComponent } from "react";
import Recommendation from "@/components/utils/Recommendation";
import DetailAnime from "./Detail";

interface PageProps {
  params: {
    id: string;
  };
}

const Page: FunctionComponent<PageProps> = async ({ params }) => {
  const { id } = params;
  const detailAnime: DetailAnimeType = await getDetailAnime(Number(id));
  return (
    <>
      <DetailAnime detailAnime={detailAnime} />
      <Recommendation />
    </>
  );
};

export default Page;
