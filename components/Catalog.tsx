import getLabel from "@/pages/function/GetLabel";
import generateId from "@/pages/function/StringID";
import { Labels } from "@/pages/function/Types";
import { useQuery } from "@apollo/client";
import parse, {
  attributesToProps,
  domToReact,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import Link from "next/link";
import { useRouter } from "next/router";

function isTextNode(node: any): node is Text {
  return node.type === "text";
}

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element) {
      if (domNode.name === "h1") {
        return (
          <li>
            <Link
              className="hover:underline hover:decoration-2 hover:decoration-sky-500 hover:underline-offset-4"
              href={`#${generateId(
                isTextNode(domNode.children[0]) ? domNode.children[0].data : ""
              )}`}
            >
              {isTextNode(domNode.children[0]) ? domNode.children[0].data : ""}
            </Link>
          </li>
        );
      } else if (domNode.name === "h2") {
        return (
          <li>
            -
            <Link
              className="pl-2 text-sm hover:underline hover:decoration-2 hover:decoration-sky-500 hover:underline-offset-4"
              href={`#${generateId(
                isTextNode(domNode.children[0]) ? domNode.children[0].data : ""
              )}`}
            >
              {isTextNode(domNode.children[0]) ? domNode.children[0].data : ""}
            </Link>
          </li>
        );
      } else if (domNode.name === "h3") {
        return (
          <li>
            --
            <Link
              className="pl-2 text-sm hover:underline hover:decoration-2 hover:decoration-sky-500 hover:underline-offset-4"
              href={`#${generateId(
                isTextNode(domNode.children[0]) ? domNode.children[0].data : ""
              )}`}
            >
              {isTextNode(domNode.children[0]) ? domNode.children[0].data : ""}
            </Link>
          </li>
        );
      } else if (domNode.name === "h4") {
        return (
          <li>
            ---
            <Link
              className="pl-2 text-sm hover:underline hover:decoration-2 hover:decoration-sky-500 hover:underline-offset-4"
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

  return (
    <nav className="flex w-full h-fit bg-white border border-gray-200 rounded-md lg:sticky lg:top-16">
      <div className="px-4 py-5 w-full sm:p-6">
        <p className="text-sm font-bold tracking-widest text-gray-900 uppercase">
          {label.title}
        </p>
        <hr className="mt-5 border-gray-200" />

        <ul className="mt-5 text-base text-gray-700 font-medium space-y-4">
          {parse(main, options)}
        </ul>
      </div>
    </nav>
  );
}

const labels: Labels = {
  "zh-CN": {
    title: "目录",
  },
  en: {
    title: "Catelog",
  },
};
