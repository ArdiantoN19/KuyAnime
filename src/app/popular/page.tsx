"use client";

import AnimeList from "@/components/AnimeList";
import AnimeHeader from "@/components/AnimeList/AnimeHeader";
import Pagination from "@/components/Pagination";
import { getTopAnime } from "@/lib/api/services";
import { AnimeDatasType, initialAnimeValue } from "@/types/anime";
import {
  FunctionComponent,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { PageReducer } from "../state/pagination/reducer";
import {
  handleNextPage,
  handlePrevPage,
  initialState,
} from "../state/pagination/action";

const Page: FunctionComponent = () => {
  const [topAnimes, setTopAnimes] = useState<AnimeDatasType>(initialAnimeValue);
  const [state, dispatch]: [any, any] = useReducer<typeof PageReducer>(
    PageReducer,
    initialState
  );

  useEffect(() => {
    (async () => {
      const response = await getTopAnime({ page: state.page });
      if (response.data.length) {
        setTopAnimes(response);
      }
    })();
  }, [state.page]);

  const hasNextPage = useMemo(
    () => state.page === topAnimes.pagination.last_visible_page,
    [state.page, topAnimes.pagination.last_visible_page]
  );

  return (
    <section className="container">
      <AnimeHeader
        title="Top Popular"
        description="Find the best and popular anime here!"
      />
      <AnimeList datas={topAnimes.data} />
      <Pagination
        handleNextPage={() => handleNextPage(dispatch)}
        handlePrevPage={() => handlePrevPage(dispatch)}
        page={state.page}
        hasNextPage={hasNextPage}
        lastVisiblePage={topAnimes.pagination.last_visible_page}
      />
    </section>
  );
};

export default Page;
