import {
  InformationCircleIcon,
  LinkIcon,
  RocketLaunchIcon,
} from "@heroicons/react/20/solid";
import { domToReact, Element, HTMLReactParserOptions } from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element) {
      // 开始处理
      switch (domNode.name) {
        // 标题样式

        case "p":
          return (
            <p className="text-base leading-8 text-gray-700 mt-4 mb-6">
              {domToReact(domNode.children, options)}
            </p>
          );
        // 标题样式
        case "h1":
          return (
            <h2 className="text-2xl font-medium leading-8 text-gray-900 mt-12 mb-4 sm:text-3xl">
              {domToReact(domNode.children, options)}
            </h2>
          );
        case "h2":
          return (
            <h3 className="text-xl font-medium leading-7 text-gray-900 mt-10 mb-4 sm:text-2xl">
              {domToReact(domNode.children, options)}
            </h3>
          );
        case "h3":
          return (
            <h4 className="text-lg leading-8 text-gray-700 my-4 sm:text-xl">
              {domToReact(domNode.children, options)}
            </h4>
          );
        case "h4":
          return (
            <h5 className="text-base leading-7 font-medium my-4 text-gray-900">
              {domToReact(domNode.children, options)}
            </h5>
          );

        // 链接样式 对于内部链接使用next/link，对于外部链接使用a标签
        case "a": {
          const domain = process.env.NEXT_PUBLIC_LOCALHOST;
          const url = new URL(domNode.attribs.href);
          if (url.hostname === domain) {
            return (
              <Link
                className="underline decoration-2 decoration-sky-500 underline-offset-4 hover:decoration-red-500"
                href={url.pathname}
              >
                {domToReact(domNode.children, options)}
                <RocketLaunchIcon className="inline h-4 w-4 ml-0.5 pb-px text-gray-600" />
              </Link>
            );
          } else {
            return (
              <a
                className="underline decoration-2 decoration-sky-500 underline-offset-4 hover:decoration-red-500"
                href={domNode.attribs.href}
                target="_blank"
              >
                {domToReact(domNode.children, options)}
                <LinkIcon className="inline h-4 w-4 ml-0.5 pb-px text-gray-600" />
              </a>
            );
          }
        }

        // 其他行内样式
        case "s":
          return (
            <s className="line-through decoration-red-500">
              {domToReact(domNode.children, options)}
            </s>
          );

        // case "pre":
        //   return (
        //   domToReact(domNode.children, options)
        // );

        // // 记得处理plainetext
        // case "code":
        //   if (domNode.attribs.class) {
        //     const lang = domNode.attribs.class.split("-")[1];
        //     const codeString = domNode.children[0].data;
        //     return (
        //       <SyntaxHighlighter language={lang} style={docco} showLineNumbers>
        //         {codeString}
        //       </SyntaxHighlighter>
        //     );
        //   } else {
        //     return (
        //       <code className="bg-gray-100 p-1 rounded text-sm font-mono break-words">
        //         {domToReact(domNode.children, options)}
        //       </code>
        //     );
        //   };

        case "strong":
          return (
            <strong className="font-bold">
              {domToReact(domNode.children, options)}
            </strong>
          );

        case "ul":
          return (
            <ul className="list-disc list-inside">
              {domToReact(domNode.children, options)}
            </ul>
          );

        case "ol":
          return (
            <ol className="list-decimal list-inside">
              {domToReact(domNode.children, options)}
            </ol>
          );

        case "blockquote":
          return (
            <figure className="border-l border-indigo-600 pl-8 py-1">
              <blockquote className="text-xl font-semibold leading-8 tracking-tight text-gray-900">
                {domToReact(domNode.children, options)}
              </blockquote>
            </figure>
          );

        case "hr":
          return (
            <div className="relative my-8">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm uppercase text-gray-500">
                  Continue
                </span>
              </div>
            </div>
          );

        case "figcaption":
          return (
            <figcaption className="mt-4 mb-8 flex gap-x-2 text-sm leading-6 text-gray-500">
              <InformationCircleIcon
                className="mt-0.5 h-5 w-5 flex-none text-gray-300"
                aria-hidden="true"
              />
              {domToReact(domNode.children, options)}
            </figcaption>
          );

        case "img":
          return (
            <Image
              className="rounded-xl bg-gray-50 object-cover"
              src={domNode.attribs.src}
              width={1280}
              height={720}
              alt={domNode.attribs.src ?? "image"}
            />
          );
      }
      // 处理结束

    }
  }
};

export default options;
