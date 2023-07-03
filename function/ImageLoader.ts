import { ImageLoaderProps } from "next/image";

export default function imageLoader({ src }: ImageLoaderProps): string {
  const darmauImageBaseUrl = "https://darmau-image-1256887306.cos.ap-hongkong.myqcloud.com";
  const darmauImageAccelerateBaseUrl = "https://darmau-image-1256887306.cos.accelerate.myqcloud.com";

  if (!src.startsWith(darmauImageBaseUrl) && !src.startsWith(darmauImageAccelerateBaseUrl)) {
    return src;
  }

  try {
    const baseUrl = "https://img.darmau.design";
    const url = new URL(src.replace(/^https?:\/\/darmau-image(.+)\.myqcloud\.com/, baseUrl));
    
    // 设置图片处理参数
    // const imageMogr2 = `imageMogr2/quality/${quality}|thumbnail/!50p|strip`;
    const imageMogr2 = `imageMogr2/thumbnail/!1500x1000r/quality/80/strip`;
    const params = url.search ? `${url.search}&${imageMogr2}` : `?${imageMogr2}`;
    url.search = params.replace(/^(\?|&)/, '?');

    // 设置图片路径参数
    url.pathname = `/${url.pathname.split("/").pop()}`;

    return url.href;
  } catch (error) {
    console.error(error);
    return src;
  }
}