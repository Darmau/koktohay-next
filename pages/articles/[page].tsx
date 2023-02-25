import { useRouter } from "next/router";

const AllArticles = () => {
  const {query: {page}, locale} = useRouter()
  return (
    <div>
      成功访问到了第{page}页，本页为{locale}页面
    </div>
  )
}

export default AllArticles;