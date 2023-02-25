import { useRouter } from "next/router";

const AllVideos = () => {
  const router = useRouter();
  const { page } = router.query;
  return (
    <div>
      成功访问到了第{page}页视频
    </div>
  )
}

export default AllVideos;