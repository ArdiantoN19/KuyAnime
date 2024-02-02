import { handlePrevPage } from "@/app/state/pagination/action";
import AnimeList from "@/components/AnimeList";
import AnimeHeader from "@/components/AnimeList/AnimeHeader";
import { searchAnime } from "@/lib/api/services";
import { FunctionComponent } from "react";
import PaginationComponent from "./Pagination";
import { AnimeDatasType } from "@/types/anime";

interface PageProps {
  params: {
    keyword: string;
  };
  searchParams: {
    page: string;
  };
}

const Page: FunctionComponent<PageProps> = async ({ params, searchParams }) => {
  const { keyword }: { keyword: string } = params;
  const decodeKeyword = decodeURI(keyword);
  const page: number = Number(searchParams.page);
  const animes: AnimeDatasType = await searchAnime(
    `${decodeKeyword}&page=${page}`
  );

  return (
    <section className="container">
      <AnimeHeader
        title="You're looking for Anime"
        keyword={`${decodeKeyword}...`}
        description="Search for your favorite anime here!"
      />
      <AnimeList datas={animes.data} />
      <PaginationComponent
        lastVisiblePage={animes.pagination.last_visible_page}
        pageNow={page}
      />
    </section>
  );
};

export default Page;
