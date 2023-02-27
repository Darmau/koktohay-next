import getLabel from "@/pages/api/GetLabel";
import { ContentList, ContentsProps, Labels } from "@/pages/api/Types";
import Link from "next/link";
import { useRouter } from "next/router";

export default function BlogSideTopic({ category }: ContentsProps) {
  const { locale } = useRouter();
  const label = getLabel(labels, locale);

  return (
    <div>
      <p className="text-lg font-bold text-gray-900">{label.title}</p>

      <div className="flex flex-wrap mt-5 gap-2.5">
        {category.map((item: ContentList) => (
          <div
          className="relative overflow-hidden transition-all duration-200 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:bg-gray-50 hover:-translate-y-1">
          <div className="p-4">
            <div className="flex items-start lg:items-center">
              <img className="object-cover w-20 h-20 rounded-lg shrink-0"
                src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/sidebar-popular-posts/2/thumbnail-3.png" alt="" />
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-900">
                  April 09, 2022
                </p>
                <p className="text-lg leading-7 font-bold text-gray-900 mt-2.5">
                  <a href="#" title="">
                    How a visual artist redefines success in graphic design
                    <span className="absolute inset-0" aria-hidden="true"></span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        ))}
      </div>
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