import { ClockIcon } from "@heroicons/react/20/solid";
import * as htmlToText from "html-to-text";
import wordsCount from "words-count";

export default function WordCount({ main }: { main: string }) {
  const options = {
    wordwrap: 80,
  }
  const text = htmlToText.convert(main, options)
  const count = wordsCount(text)
  const time = Math.floor(count / 200)
  return <div className="flex items-center gap-2 text-gray-500 text-sm my-4"><ClockIcon className="h-4 w-4 text-indigo-500" />本文共有{count}字，预计阅读时间{time}分钟</div>;
}
