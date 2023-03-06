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

const SectionStats = () => {
  const [realtimeVisitor, setRealtimeVisitor] = useState("");
  const [onemonthVisitor, setOnemonthVisitor] = useState(0);
  const [onemonthPageView, setOnemonthPageView] = useState(0);
  const plausibleUrl = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const plausibleToken = process.env.NEXT_PUBLIC_PLAUSIBLE_TOKEN;
  const siteId = process.env.NEXT_PUBLIC_PLAUSIBLE_SITE_ID;

  const { locale } = useRouter();
  const label = getLabel(labels, locale)

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
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {label.title}
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              {label.slogan}
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">

            <div className="flex flex-col bg-gray-400/5 p-8">
              <dt className="text-sm font-semibold leading-6 text-gray-600">
                {label.realtime}
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-indigo-600">
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
               {calculateDays()}{label.day}
              </dd>
            </div>

          </dl>
        </div>
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
    day: "天"
  },
  "en": {
    title: "Site Stats",
    slogan: "Keep updating",
    realtime: "Realtime",
    onemonthVisitor: "Current Month Visitors",
    onemonthPageView: "Current Month Page Views",
    runtime: "Runtime",
    day: "Days"
  }
}