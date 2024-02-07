import { getDetailAnime } from "@/lib/api/services";
import { DetailAnimeType } from "@/types/anime";
import { FunctionComponent } from "react";
import Recommendation from "@/components/utils/Recommendation";
import DetailAnime from "@/components/utils/Detail";
import Comment from "@/components/Comment";

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
      <Comment anime_mal_id={detailAnime.mal_id} />
      <Recommendation />
    </>
  );
};

export default Page;
