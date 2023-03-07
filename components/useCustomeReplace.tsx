import generateId from "@/function/StringID";
import {
  InformationCircleIcon,
  LinkIcon,
  RocketLaunchIcon,
} from "@heroicons/react/20/solid";
import parse, {
  attributesToProps,
  domToReact,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

type Picture = {
  src: string;
  alt: string;
};
type Pictures = Picture[];

function isTextNode(node: any): node is Text {
  return node.type === "text";
}

function useCustomReplace({ html }: { html: string }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [pictureIndex, setPictureIndex] = useState(0);
  const pictures:Pictures = []

  const openLightbox = (index: number) => {
    setPictureIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const handleReplace = (domNode: any) => {
    if (domNode instanceof Element) {
      switch (domNode.name) {
        case "p":
          return (
            <p className="text-base leading-8 text-gray-700 mt-4 mb-6">
              {domToReact(domNode.children, options)}
            </p>
          );

        // 图片会将src传入lightbox组件，然后在lightbox组件中使用react-image-lightbox组件
        case "img":
          const index = pictures.length;
          const newPicture: Picture = {
            src: domNode.attribs.src,
            alt: domNode.attribs.alt ?? "image",
          };
          pictures.push(newPicture)

          return (
            <div className="relative group">
              <Image
                className="rounded-lg bg-gray-50 object-cover mb-4 cursor-pointer"
                src={domNode.attribs.src}
                width={1280}
                height={720}
                alt={domNode.attribs.src ?? "image"}
                onClick={() => openLightbox(index)}
              />
            </div>
          );

        // 标题样式 id将由标题进行md5加密返回
        case "h1":
          return (
            <h2
              id={generateId(
                isTextNode(domNode.children[0]) ? domNode.children[0].data : ""
              )}
              className="text-2xl font-medium leading-8 text-gray-900 mt-12 mb-4 sm:text-3xl"
            >
              {domToReact(domNode.children, options)}
            </h2>
          );
        case "h2":
          return (
            <h3
              id={generateId(
                isTextNode(domNode.children[0]) ? domNode.children[0].data : ""
              )}
              className="text-xl font-medium leading-7 text-gray-900 mt-10 mb-4 sm:text-2xl"
            >
              {domToReact(domNode.children, options)}
            </h3>
          );
        case "h3":
          return (
            <h4
              id={generateId(
                isTextNode(domNode.children[0]) ? domNode.children[0].data : ""
              )}
              className="text-lg leading-8 text-gray-700 my-4 sm:text-xl"
            >
              {domToReact(domNode.children, options)}
            </h4>
          );
        case "h4":
          return (
            <h5
              id={generateId(
                isTextNode(domNode.children[0]) ? domNode.children[0].data : ""
              )}
              className="text-base leading-7 font-medium my-4 text-gray-900"
            >
              {domToReact(domNode.children, options)}
            </h5>
          );

        // 链接样式 对于内部链接使用next/link，对于外部链接使用a标签
        case "a": {
          const domain = process.env.NEXT_HOSTNAME;
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

        case "pre":
          return <>{domToReact(domNode.children, options)}</>;

        case "code":
          if (domNode.attribs.class) {
            const lang = domNode.attribs.class.split("-")[1];
            const codeString = isTextNode(domNode.children[0])
              ? domNode.children[0].data
              : "";
            return (
              <SyntaxHighlighter
                language={lang}
                style={atomOneDark}
                showLineNumbers
                className="my-4 rounded-md"
              >
                {codeString}
              </SyntaxHighlighter>
            );
          } else {
            return (
              <code className="bg-gray-100 p-1 rounded text-sm font-mono break-words">
                {domToReact(domNode.children, options)}
              </code>
            );
          }

        case "strong":
          return (
            <strong className="font-bold">
              {domToReact(domNode.children, options)}
            </strong>
          );

        case "ul":
          return (
            <ul className="list-disc list-inside my-8 space-y-2">
              {domToReact(domNode.children, options)}
            </ul>
          );

        case "ol":
          return (
            <ol className="list-decimal list-inside my-8 space-y-2">
              {domToReact(domNode.children, options)}
            </ol>
          );

        case "blockquote":
          return (
              <blockquote className="pl-8 border-l border-violet-600 text-xl font-semibold leading-8 tracking-tight text-gray-900">
                {domToReact(domNode.children, options)}
              </blockquote>
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

        // 处理表格
        case "table":
          return (
            <div className="mb-4 flow-root">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200 rounded-lg">
                    <table className="min-w-ful">
                      {domToReact(domNode.children, options)}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          );

        case "thead":
          return (
            <thead className="bg-gray-50 border-b border-gray-300">
              {domToReact(domNode.children, options)}
            </thead>
          );

        case "tbody":
          return (
            <tbody className="bg-white divide-y divide-gray-200">
              {domToReact(domNode.children, options)}
            </tbody>
          );

        case "tr":
          return (
            <tr className="divide-x divide-gray-200">
              {domToReact(domNode.children, options)}
            </tr>
          );

        case "th":
          return (
            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
              {domToReact(domNode.children, options)}
            </th>
          );

        case "td":
          return (
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {domToReact(domNode.children, options)}
            </td>
          );

        case "iframe":
          const props = attributesToProps(domNode.attribs);
          props.className = "w-full";
          return <iframe {...props} />;

        default:
          return undefined;
      }
    }
  };

  const options: HTMLReactParserOptions = {
    replace: handleReplace,
  };

  return (
    <>
      <Lightbox
        slides={pictures}
        open={lightboxOpen}
        close={closeLightbox}
        plugins={[Thumbnails]}
        index={pictureIndex}
      />
      {parse(html, options)}
    </>
  );
}

export default useCustomReplace;
