import getLabel from "@/pages/function/GetLabel";
import { ContentList, ContentsProps, Labels } from "@/pages/function/Types";
import Link from "next/link";
import { useRouter } from "next/router";

export default function BlogSideCategory({ category }: ContentsProps) {
  const { locale } = useRouter();
  const label = getLabel(labels, locale);

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900">{label.title}</h2>

      <ul className="flex flex-col gap-4 mt-5">
      {category.map((item: ContentList, index: number) => (
        <li key={index}>
          <Link 
          href={`/category/article/${item.attributes.url}/1`}
          className="text-base font-medium text-gray-500 transition-all duration-200 hover:text-gray-900"
          >
            {item.attributes.title}
          </Link>
        </li>
        ))}
      </ul>
    </div>
  );
}

const years = ['2023', '2021', '2020', '2019']

const labels: Labels = {
  "zh-CN": {
    title: "文章分类",
  },
  en: {
    title: "Category",
  },
};
