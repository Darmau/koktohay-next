import useCustomReplace from "@/components/useCustomeReplace";

export default function Body({ html }: { html: string }) {
  const parsedHtml = useCustomReplace({ html });
  return <div>{parsedHtml}</div>;
}
