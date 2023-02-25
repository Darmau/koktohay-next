import { useRouter } from "next/router";

const ArticlesByCategory = () => {
  const router = useRouter();
  const { name, page } = router.query;

  return (
    <div>
      这是{page}页的{name}分类下的文章
    </div>
  )
}

export default ArticlesByCategory;