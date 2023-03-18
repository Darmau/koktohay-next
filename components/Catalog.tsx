import getLabel from "@/function/GetLabel";
import generateId from "@/function/StringID";
import { Labels } from "@/function/Types";
import { ChevronDoubleRightIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import parse, {
  Element,
  HTMLReactParserOptions
} from "html-react-parser";
import Link from "next/link";
import { useRouter } from "next/router";
function isTextNode(node: any): node is Text {
  return node.type === "text";
}

let catalogs = 0;

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element) {
      if (domNode.name === "h1") {
        catalogs++;
        return (
          <li>
            <Link
              className="hover:underline hover:decoration-2 hover:decoration-blue-500 hover:underline-offset-4"
              href={`#${generateId(
                isTextNode(domNode.children[0]) ? domNode.children[0].data : ""
              )}`}
            >
              {isTextNode(domNode.children[0]) ? domNode.children[0].data : ""}
            </Link>
          </li>
        );
      } else if (domNode.name === "h2") {
        catalogs++;
        return (
          <li className="flex items-center">
            <ChevronRightIcon className="h-4 w-4" />
            <Link
              className="text-sm hover:underline hover:decoration-2 hover:decoration-blue-500 hover:underline-offset-4"
              href={`#${generateId(
                isTextNode(domNode.children[0]) ? domNode.children[0].data : ""
              )}`}
            >
              {isTextNode(domNode.children[0]) ? domNode.children[0].data : ""}
            </Link>
          </li>
        );
      } else if (domNode.name === "h3") {
        catalogs++;
        return (
          <li className="flex items-center">
            <ChevronDoubleRightIcon className="h-4 w-4" />
            <Link
              className="pl-2 text-sm hover:underline hover:decoration-2 hover:decoration-blue-500 hover:underline-offset-4"
              href={`#${generateId(
                isTextNode(domNode.children[0]) ? domNode.children[0].data : ""
              )}`}
            >
              {isTextNode(domNode.children[0]) ? domNode.children[0].data : ""}
            </Link>
          </li>
        );
      } else return <></>;
    }
  },
};

export default function Catalog({ main }: { main: string }) {
  const { locale } = useRouter();
  const label = getLabel(labels, locale);
  const catelogList = parse(main, options);

  return (
    <nav className="flex w-full h-fit bg-white border border-gray-200 rounded-md">
      <div className="px-4 py-5 w-full sm:p-6">
        <p className="text-sm font-bold tracking-widest text-gray-900 uppercase">
          {label.title}
        </p>
        <hr className="mt-5 border-gray-200" />

        <ul className="mt-5 text-base text-gray-700 font-bold space-y-4">
          {catalogs > 0 ? catelogList : <p>{label.noCatalog}</p>}
        </ul>
      </div>
    </nav>
  );
}

const labels: Labels = {
  "zh-CN": {
    title: "目录",
    noCatalog: "本文没有目录",
  },
  en: {
    title: "Catelog",
    noCatalog: "No catalog in this article",
  },
};
