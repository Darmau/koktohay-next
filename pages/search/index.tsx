import getLabel from "@/function/GetLabel";
import { Labels } from "@/function/Types";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Highlight,
  Hits,
  InstantSearch,
  SearchBox,
} from "react-instantsearch-dom";

const searchUrl = process.env.NEXT_PUBLIC_SEARCH_URL || "http://localhost:7700";
const searchToken = process.env.NEXT_PUBLIC_SEARCH_KEY;

// 生成搜索实例
const searchClient = instantMeiliSearch(searchUrl, searchToken, {
  placeholderSearch: false,
  finitePagination: true,
});

const Search = () => {
  const { locale } = useRouter();
  const label = getLabel(labels, locale);
  // 定义indexName，用于切换搜索对象
  const indexNames = [
    { id: "article", title: label.article },
    { id: "album", title: label.album },
    { id: "video", title: label.video },
  ];
  const [searchIndex, setSearchIndex] = useState(indexNames[0].id);

  // 定义命中的搜索项
  const Hit = ({ hit }: any) => (
    <Link
    href={`/${locale}${searchIndex}/${hit.url}`}
      key={hit.id}
      className="px-4 py-2"
      data-umami-event="Enter Search Result"
    >
      <div className="text-base">
        <Highlight attribute="title" hit={hit} />
      </div>
      <div className="text-sm text-gray-600">
        <Highlight attribute="description" hit={hit} />
      </div>
    </Link>
  );

  return (
    <main className="">
      <div className="p-8">
        <div className="mb-4 flex items-center space-x-4 space-y-0">
          {indexNames.map((indexName, index) => (
            <div key={index} className="flex items-center">
              <input
                id={indexName.id}
                name="notification-method"
                type="radio"
                checked={searchIndex === indexName.id}
                onChange={() => setSearchIndex(indexName.id)}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label
                htmlFor={indexName.id}
                className="ml-3 block text-sm font-medium leading-6 text-gray-900"
              >
                {indexName.title}
              </label>
            </div>
          ))}
        </div>
        <InstantSearch indexName={searchIndex} searchClient={searchClient}>
          <SearchBox />
          <Hits hitComponent={Hit} />
        </InstantSearch>
      </div>
    </main>
  );
};

export default Search;

const labels: Labels = {
  "zh-CN": {
    article: "文章",
    album: "摄影",
    video: "视频",
  },
  en: {
    article: "Article",
    album: "Album",
    video: "Video",
  },
};
