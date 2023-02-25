import { useRouter } from "next/router";

const AlbumsByCategory = () => {
  const router = useRouter();
  const { name, page } = router.query;
  return (
    <div>
      这是{page}页的{name}分类下的摄影作品
    </div>
  )
}

export default AlbumsByCategory;