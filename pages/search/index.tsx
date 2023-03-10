import { useEffect, useState } from "react";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Index,
  connectStateResults,
  Snippet,
  Highlight,
  Configure,
  connectSearchBox,
} from "react-instantsearch-dom";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { htmlToText } from "html-to-text";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const searchClient = instantMeiliSearch(
  "http://103.20.60.60:7700",
  "b8d0b233c9c7c3d6e1d8e5668f64f5abca18e081f815324ea1afbf37d9010053",
  {
    finitePagination: true,
  }
);

const CustomSearchBox = connectSearchBox(
  ({ currentRefinement, refine, className }) => (
    <div className={`relative ${className}`}>
      <MagnifyingGlassIcon
        className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
        aria-hidden="true"
      />
      <input
        className="h-12 w-full border-0 bg-transparent pl-11 pr-4
        text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
        type="text"
        placeholder="Search..."
        value={currentRefinement}
        onChange={(event) => refine(event.currentTarget.value)}
      />
    </div>
  )
);

export default function Search() {
  const [query, setQuery] = useState("");

  return (
    <div className="h-96 p-16">
      <InstantSearch searchClient={searchClient} indexName="article">
        <CustomSearchBox defaultRefinement={query} />

        <Hits hitComponent={Hit} />
      </InstantSearch>
    </div>
  );

  function Hit({ hit }) {
    return (
      <div className="max-w-lg mx-auto border-b border-gray-200 py-4 text-gray-900">
        <Link href={`/article/${hit.url}`} className="hover:underline">
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </Link>
      </div>
    );
  }
}
