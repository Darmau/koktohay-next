import { useRouter } from "next/router";

const ArticlesByYears = () => {
  const router = useRouter();
  const { year } = router.query;
  return (
    <div>
      以下是{year}年的文章
    </div>
  )
}

export default ArticlesByYears;