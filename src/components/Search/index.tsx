"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, FunctionComponent, useEffect, useRef } from "react";

const Search: FunctionComponent = () => {
  const pathname = usePathname();
  const keyword =
    (pathname.startsWith("/search") && pathname.split("/")[2]) || "";
  const decodeKeyword = decodeURI(keyword);

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = decodeKeyword;
    }
  }, [decodeKeyword]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    if (
      inputRef.current &&
      inputRef.current.value &&
      inputRef.current.value.trim() !== ""
    ) {
      router.push(`/search/${inputRef.current.value.trim()}?page=1`);
    } else {
      false;
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full md:w-auto">
      <input
        type="text"
        placeholder="search..."
        className="px-3 py-2 border-0 bg-white outline-none rounded w-full md:w-auto"
        ref={inputRef}
        id="search"
      />
      <button type="submit" className="absolute top-2 right-2 bg-white pl-2">
        <MagnifyingGlass size={24} />
      </button>
    </form>
  );
};

export default Search;
