"use client";

import Pagination from "@/components/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FunctionComponent, useCallback, useState } from "react";

interface PaginationProps {
  lastVisiblePage: number;
  pageNow: number;
}

const PaginationComponent: FunctionComponent<PaginationProps> = ({
  lastVisiblePage,
  pageNow,
}) => {
  const [page, setPage] = useState<number>(pageNow);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string): string => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams]
  );

  const handleNextPage = () => {
    const queryString = createQueryString("page", String(page + 1));
    setPage((prev) => prev + 1);
    router.push(queryString);
  };

  const handlePrevPage = () => {
    const queryString = createQueryString("page", String(page - 1));
    setPage((prev) => {
      if (prev > 1) return prev - 1;
      return prev;
    });
    router.push(queryString);
  };

  return (
    <Pagination
      handleNextPage={handleNextPage}
      handlePrevPage={handlePrevPage}
      page={page}
      hasNextPage={page === lastVisiblePage}
      lastVisiblePage={lastVisiblePage}
    />
  );
};

export default PaginationComponent;
