import getLabel from "@/function/GetLabel";
import { Labels } from "@/function/Types";
import { LanguageIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";

const labels: Labels = {
  "zh-CN": {
    button: "English",
  },
  en: {
    button: "中文",
  },
};

const SwitchLanguage = () => {
  const router = useRouter();
  const label = getLabel(labels, router.locale);
  const { locale } = router;
  const newLang = locale === "zh-CN" ? "en" : "zh-CN";

  return (
    <Link
      data-umami-event="Switch Language"
      href={router.asPath}
      locale={newLang}
      className="flex leading-7 lg:inline-flex items-center lg:rounded-md lg:border border-gray-300 bg-white px-3 py-2 text-sm font-medium lg:leading-4 text-gray-700 lg:shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      title={locale === "zh-CN" ? "Switch to English" : "切换到中文"}
    >
      <LanguageIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
      {label.button}
    </Link>
  );
};

export default SwitchLanguage;
