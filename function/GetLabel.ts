import { Labels } from "@/function/Types";

function getLabel(labels: Labels, locale: string | undefined) {
  const lang = locale === undefined ? 'zh-CH' : locale;
  return labels[lang]
}

export default getLabel;