import Pagination from "@/components/Pagination"

const Test = () => {
  return (
    <Pagination 
      currentPage={6}
      totalEntries={67}
      itemPerPage={10}
    />
  )
}

export default Test