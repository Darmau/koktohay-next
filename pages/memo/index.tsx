type Memo = {
  content: string;
  id: number;
  createdTs: number;
};

export default function Memo({ memos }: { memos: Memo[] }) {
  return (
    <main className="bg-white py-24 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="pt-4 pb-8 lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            碎片
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">随便说说</p>
        </div>

        <div className="mx-auto mt-8 flow-root max-w-2xl sm:mt-12 lg:mx-0 lg:max-w-none">
          <div className="gap-4 items-stretch flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {memos.map((memo) => {
              const date = new Date(memo.createdTs * 1000);
              const dateString = `${date.getFullYear()}年${
                date.getMonth() + 1
              }月${date.getDate()}日 ${date.getHours()}:${
                date.getMinutes() < 10
                  ? "0" + date.getMinutes()
                  : date.getMinutes()
              }`;
              return (
                <div key={memo.id} className="sm:inline-block sm:w-full">
                  <figure className="rounded-2xl bg-gray-50 p-8 text-sm leading-6">
                    <blockquote className="text-gray-900 text-base">
                      <p>{memo.content}</p>
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-x-4">
                      <div className="text-gray-600">{dateString}</div>
                    </figcaption>
                  </figure>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

export const runtime = 'edge';

export async function getServerSideProps() {
  const api = process.env.MEMO || "";
  const res = await fetch(api);
  const data = await res.json();
  return {
    props: {
      memos: data.data.slice(0, 60),
    },
  };
}
