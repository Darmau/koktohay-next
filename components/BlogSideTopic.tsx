import CDN from "@/function/CDN";
import getLabel from "@/function/GetLabel";
import { ContentList, ContentsProps, Labels } from "@/function/Types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function BlogSideTopic({ topics }: ContentsProps) {
  const { locale } = useRouter();
  const label = getLabel(labels, locale);

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900">{label.title}</h2>

      <ul className="flex flex-wrap mt-5 gap-2.5">
        {topics.map((item: ContentList, index: number) => (
          <li
            key={index}
            className="w-full relative overflow-hidden transition-all duration-200 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-start lg:items-start">
              <Image
                className="object-cover w-20 h-20 rounded-lg shrink-0"
                src={CDN(item.attributes.cover.data.attributes.url)}
                width={80}
                height={80}
                alt="cover"
              />
              <div className="ml-5">
                <h3>
                  <Link
                    href={`/articles/topic/${item.attributes.url}`}
                    title=""
                    className="text-lg leading-7 font-bold text-gray-900 mt-2.5"
                  >
                    {item.attributes.title}
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </Link>
                </h3>
                <small className="text-sm text-gray-600">
                  {item.attributes.description}
                </small>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const labels: Labels = {
  "zh-CN": {
    title: "专题",
  },
  en: {
    title: "Topic",
  },
};
