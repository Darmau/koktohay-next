import getLabel from "@/function/GetLabel";
import { Labels } from "@/function/Types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// 计算运行天数
function calculateDays() {
  const ONE_DAY = 1000 * 60 * 60 * 24; // 一天的毫秒数
  const startDate = new Date(2022, 9, 8); // 月份是从0开始的，所以要减去1
  const endDate = new Date();

  const days = Math.floor((endDate.getTime() - startDate.getTime()) / ONE_DAY);

  return days;
}

const plausibleUrl = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const plausibleToken = process.env.NEXT_PUBLIC_PLAUSIBLE_TOKEN;
const siteId = process.env.NEXT_PUBLIC_PLAUSIBLE_SITE_ID;

const SectionStats = () => {
  const [realtimeVisitor, setRealtimeVisitor] = useState("");
  const [onemonthVisitor, setOnemonthVisitor] = useState(0);
  const [onemonthPageView, setOnemonthPageView] = useState(0);
  const { locale } = useRouter();
  const label = getLabel(labels, locale);

  useEffect(() => {
    async function fetchData() {
      const realtime = await fetch(
        `${plausibleUrl}/api/v1/stats/realtime/visitors?site_id=${siteId}`,
        {
          headers: new Headers({
            Authorization: `Bearer ${plausibleToken}`,
          }),
        }
      );
      const realtimeData = await realtime.json();
      setRealtimeVisitor(realtimeData);

      const onemonth = await fetch(
        `${plausibleUrl}/api/v1/stats/aggregate?site_id=${siteId}&period=6mo&metrics=visitors,pageviews`,
        {
          headers: new Headers({
            Authorization: `Bearer ${plausibleToken}`,
          }),
        }
      );
      const onemonthData = await onemonth.json();
      setOnemonthVisitor(onemonthData.results.visitors.value);
      setOnemonthPageView(onemonthData.results.pageviews.value);
    }
    fetchData();
  }, []);

  return (
    <div className="relative -z-10 mt-16 mb-16 px-6 lg:px-8 py-16 sm:py-24">
      <div className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 transform-gpu justify-center overflow-hidden blur-3xl sm:right-[calc(50%-6rem)] sm:top-auto sm:bottom-0 sm:translate-y-0 sm:justify-end">
        <svg
          viewBox="0 0 1108 632"
          aria-hidden="true"
          className="w-[69.25rem] flex-none"
        >
          <path
            fill="url(#191ef669-4d29-44ea-9496-5d65eb27150d)"
            fillOpacity=".25"
            d="M235.233 229.055 57.541 310.091.83.615l234.404 228.44L555.251 83.11c-65.036 115.261-134.286 322.756 109.01 230.655C968.382 198.638 1031-19.583 1092.23 172.304c48.98 153.51-34.51 321.107-82.37 385.717L810.952 307.442 648.261 631.576 235.233 229.055Z"
          />
          <defs>
            <linearGradient
              id="191ef669-4d29-44ea-9496-5d65eb27150d"
              x1="1220.59"
              x2="-85.053"
              y1="198.898"
              y2="-7.05"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9089FC" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {label.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">{label.slogan}</p>
        </div>
        <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col bg-gray-400/5 p-8">
            <dt className="text-sm font-semibold leading-6 text-gray-600">
              {label.realtime}
            </dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-blue-600">
              {realtimeVisitor}
            </dd>
          </div>
          <div className="flex flex-col bg-gray-400/5 p-8">
            <dt className="text-sm font-semibold leading-6 text-gray-600">
              {label.onemonthVisitor}
            </dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
              {onemonthVisitor}
            </dd>
          </div>
          <div className="flex flex-col bg-gray-400/5 p-8">
            <dt className="text-sm font-semibold leading-6 text-gray-600">
              {label.onemonthPageView}
            </dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
              {onemonthPageView}
            </dd>
          </div>
          <div className="flex flex-col bg-gray-400/5 p-8">
            <dt className="text-sm font-semibold leading-6 text-gray-600">
              {label.runtime}
            </dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
              {calculateDays()}
              {label.day}
            </dd>
          </div>
        </dl>
      </div>
      {/* 装饰元素 */}
      <div className="absolute left-1/2 right-0 top-full -z-10 hidden -translate-y-1/2 transform-gpu overflow-hidden blur-3xl sm:block">
        <svg
          viewBox="0 0 1155 678"
          aria-hidden="true"
          className="w-[72.1875rem]"
        >
          <path
            fill="url(#23e1b96e-c791-45fa-975a-a04d29498207)"
            fillOpacity=".3"
            d="M317.219 518.975 203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079Z"
          />
          <defs>
            <linearGradient
              id="23e1b96e-c791-45fa-975a-a04d29498207"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9089FC" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default SectionStats;

const labels: Labels = {
  "zh-CN": {
    title: "站点统计",
    slogan: "争取一直更新下去",
    realtime: "当前在线",
    onemonthVisitor: "本月总访客",
    onemonthPageView: "本月总浏览",
    runtime: "本站已运行",
    day: "天",
  },
  en: {
    title: "Site Stats",
    slogan: "Keep updating",
    realtime: "Realtime",
    onemonthVisitor: "Current Month Visitors",
    onemonthPageView: "Current Month Page Views",
    runtime: "Runtime",
    day: " Days",
  },
};
