import {
  InstantSearch,
  SearchBox,
  Highlight,
  Hits,
} from "react-instantsearch-dom";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import Link from "next/link";
import { Labels } from "@/function/Types";
import { useRouter } from "next/router";
import getLabel from "@/function/GetLabel";
import { useState } from "react";

type Props = {
  onClose: () => void;
};

const searchUrl = process.env.NEXT_PUBLIC_SEARCH_URL || "http://localhost:7700";
const searchToken = process.env.NEXT_PUBLIC_SEARCH_KEY;

// 生成搜索实例
const searchClient = instantMeiliSearch(searchUrl, searchToken, {
  placeholderSearch: false,
  finitePagination: true,
});

const Search = ({ onClose }: Props) => {
  const { locale } = useRouter();
  const label = getLabel(labels, locale);
  // 定义indexName，用于切换搜索对象
  const indexNames = [
    { id: "article", title: label.article },
    { id: "album", title: label.album },
    { id: "video", title: label.video },
  ];
  const [searchIndex, setSearchIndex] = useState(indexNames[0].id);

  // 点击背景关闭搜索
  const handleBackgroundClick = (e: { target: any; currentTarget: any }) => {
    if (e.target === e.currentTarget) onClose();
  };

  // 点击搜索结果进行页面跳转后关闭搜索
  const handleResultClick = () => {
    onClose();
  };

  // 定义命中的搜索项
  const Hit = ({ hit }: any) => {
    const language = hit.locale === "zh-CN" ? "" : "en/";
    return (
      <Link
        href={`/${language}${searchIndex}/${hit.url}`}
        key={hit.id}
        className="px-4 py-2"
        onClick={handleResultClick}
        data-umami-event="Enter Search Result"
      >
        <div className="text-base">
          <Highlight attribute="title" hit={hit} />
        </div>
        <div className="text-sm text-gray-600">
          <Highlight attribute="description" hit={hit} />
        </div>
      </Link>
    )
  };

  return (
    <div
      className="fixed inset-0 w-screen h-screen pt-32 z-50 bg-gray-900/30"
      onClick={handleBackgroundClick}
    >
      <div className="mx-auto max-w-3xl max-h-80p lg:w-7/12 transform divide-y flex flex-col divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all p-8">
        <div className="space-y-4 mb-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
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
    </div>
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
