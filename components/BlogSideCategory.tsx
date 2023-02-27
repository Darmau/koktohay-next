import getLabel from "@/pages/api/GetLabel";
import { ContentList, ContentsProps, Labels } from "@/pages/api/Types";
import Link from "next/link";
import { useRouter } from "next/router";

export default function BlogSideCategory({ category }: ContentsProps) {
  const { locale } = useRouter();
  const label = getLabel(labels, locale);

  return (
    <div>
      <p className="text-lg font-bold text-gray-900">{label.title}</p>

      <div className="flex flex-wrap mt-5 gap-2.5">
        {category.map((item: ContentList) => (
          <Link href="#" className="inline-block" key={item.id}>
            <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 transition-all duration-200 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
              {item.attributes.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

const labels: Labels = {
  "zh-CN": {
    title: "分类",
  },
  en: {
    title: "Category",
  },
};
