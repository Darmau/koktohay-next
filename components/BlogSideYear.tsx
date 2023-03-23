import getLabel from "@/function/GetLabel";
import { Labels } from "@/function/Types";
import Link from "next/link";
import { useRouter } from "next/router";

export default function BlogSideYear() {
  const { locale } = useRouter();
  const label = getLabel(labels, locale);

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900">{label.title}</h2>

      <div className="flex flex-wrap mt-5 gap-2.5">
        {years.map((item) => (
          <Link href={`/articles/year/${item}`} className="inline-block" key={item}>
            <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 transition-all duration-200 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
              {item}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

const years = ['2023', '2021', '2020', '2019']

const labels: Labels = {
  "zh-CN": {
    title: "发布时间",
  },
  en: {
    title: "By Year",
  },
};
