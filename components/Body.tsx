import useCustomReplace from "@/hooks/useCustomeReplace";

export default function Body({ html }: { html: string }) {
  const parsedHtml = useCustomReplace({ html });
  return <div>{parsedHtml}</div>;
}
