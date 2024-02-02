"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { FunctionComponent, useReducer } from "react";

interface PaginationProps {
  handleNextPage: () => void;
  handlePrevPage: () => void;
  page: number;
  hasNextPage: boolean;
  lastVisiblePage: number;
}

const Page: FunctionComponent<PaginationProps> = ({
  handleNextPage,
  handlePrevPage,
  page,
  hasNextPage,
  lastVisiblePage,
}) => {
  return (
    <div className="flex justify-center gap-x-5 items-center my-10">
      <button
        className="button flex items-center gap-x-2"
        onClick={handlePrevPage}
        disabled={page === 1}
      >
        <ArrowLeft /> Prev
      </button>
      <p className="">
        <span className="text-teal-500">{page}</span> / {lastVisiblePage}
      </p>
      <button
        className="button flex items-center gap-x-2"
        onClick={handleNextPage}
        disabled={hasNextPage}
      >
        Next <ArrowRight />
      </button>
    </div>
  );
};

export default Page;
