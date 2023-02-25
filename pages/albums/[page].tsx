import { useRouter } from "next/router";

const AllAlbums = () => {
  const router = useRouter();
  const { page } = router.query;
  return (
    <div>
      成功访问到了第{page}页摄影作品
    </div>
  )
}

export default AllAlbums;