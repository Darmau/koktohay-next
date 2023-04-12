import Apollo from "@/public/img/apollo.svg";
import Next from "@/public/img/next.svg";
import Node from "@/public/img/node.svg";
import Strapi from "@/public/img/strapi.svg";
import Tailwind from "@/public/img/tailwind.svg";
import {
  ArrowPathIcon,
  BoltIcon,
  FingerPrintIcon,
  GlobeAsiaAustraliaIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    name: "速度第一",
    description:
      "有了Next.js的图片处理，Vercel的CDN，以及SSG，不考虑大陆网络的情况下，本站加载速度可以说是飞快。",
    icon: BoltIcon,
  },
  {
    name: "逆潮流开放",
    description:
      "尽管中国人对建墙这件事有着延续两千年的喜好，我依然歌颂自由和开放。本站拥有RSS输出和优秀的SEO支持。",
    icon: GlobeAsiaAustraliaIcon,
  },
  {
    name: "持续迭代",
    description: "我将继续优化设计和功能，测试版将在beta.darmau.design发布",
    icon: ArrowPathIcon,
  },
  {
    name: "隐私很重要",
    description:
      "作为一个个人网站，没有必要因为用了一些第三方产品导致获取大量我自己看不到也用不到的数据。本站访问统计、评论全部为自部署，不会获取任何隐私信息。",
    icon: FingerPrintIcon,
  },
];

export default function About() {
  return (
    <main className="isolate py-12 md:py-16">
      {/* Hero section */}
      <div className="relative pt-14">
        <div className="py-24 sm:py-32">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <svg
              className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
              viewBox="0 0 1155 678"
            >
              <path
                fill="url(#9b2541ea-d39d-499b-bd42-aeea3e93f5ff)"
                fillOpacity=".3"
                d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
              />
              <defs>
                <linearGradient
                  id="9b2541ea-d39d-499b-bd42-aeea3e93f5ff"
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
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                关于本站
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                我是李大毛，设计师和前端开发，伪全栈。现居成都。
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                曾经我有个基于Ghost的博客《城中村群租房》。因为我想找个地方展示我的摄影作品，加上离开了深圳，城中村名不副实。于是开发了这个网站。
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                我喜欢阅读历史和地理类的书，对新疆、伊斯兰颇有了解。还喜欢骑着摩托到处跑。
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                如果你喜欢我的博客，请一定在评论里留言。
              </p>
            </div>
          </div>
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
            <svg
              className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
              viewBox="0 0 1155 678"
            >
              <path
                fill="url(#b9e4a85f-ccd5-4151-8e84-ab55c66e5aa1)"
                fillOpacity=".3"
                d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
              />
              <defs>
                <linearGradient
                  id="b9e4a85f-ccd5-4151-8e84-ab55c66e5aa1"
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
      </div>

      {/* Logo cloud */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
            本站采用的技术
          </h2>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <Image
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src={Next}
              alt="next"
              width={180}
              height={60}
            />
            <Image
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src={Strapi}
              alt="Strapi"
              width={180}
              height={60}
            />
            <Image
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src={Apollo}
              alt="Apollo"
              width={180}
              height={60}
            />
            <Image
              className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
              src={Node}
              alt="Node.js"
              width={180}
              height={60}
            />
            <Image
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
              src={Tailwind}
              alt="tailwind"
              width={180}
              height={60}
            />
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-24 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            Design and Develop
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Tech Matters
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            感谢科技的进步，AI让我比预期更快地实现复杂功能，本站开发中大量使用了AI提供的灵感和思路。
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* CTA section */}
      <div className="relative -z-10 mt-32 mb-16 px-6 lg:px-8">
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
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Keep in Touch
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
            技术交流、合作机会，或者其他事情，欢迎通过右下角各种渠道或者下方按钮和我联系
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/contact"
              className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              与我联系
            </Link>
          </div>
        </div>
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
    </main>
  );
}
