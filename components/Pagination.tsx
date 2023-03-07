import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

// 接收三个参数：当前页、总条目、一页的条目数
interface PaginationProps {
  currentPage: number;
  totalEntries: number;
  itemPerPage?: number;
}

const Pagination = ({
  currentPage = 1,
  totalEntries = 1,
  itemPerPage = 10,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalEntries / itemPerPage)

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  let pagesToRender: (number | string)[] = [];

  // 总页数小于2个的时候不显示组件。
  if (totalPages < 2) {
    return <div></div>; 
  }

  // 根据总页数生成一个数组，数组中的每一个元素将被渲染成一个页码，链接到对应页面。
  if (totalPages >= 2 && totalPages <= 7) {
    pagesToRender = pageNumbers;
  } else if (currentPage <= 3) {
    pagesToRender = [...pageNumbers.slice(0, 3), '...', ...pageNumbers.slice(-3)];
  } else if (currentPage > totalPages - 3) {
    pagesToRender = [...pageNumbers.slice(0, 3), '...', ...pageNumbers.slice(-3)];
  } else {
    pagesToRender = [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
    if (currentPage > 4) {
      pagesToRender = [1, '...', ...pagesToRender.slice(1)];
    }
    if (currentPage < totalPages - 3) {
      pagesToRender = [...pagesToRender.slice(0, -1), '...', totalPages];
    }
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white mt-8 py-8">
      {/* 移动端 */}
      <div className="flex flex-1 justify-between sm:hidden">
        <div className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <Link className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" href={`?page=${currentPage - 1}`}>
            前一页
          </Link>
        </div>
        <div className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" href={`?page=${currentPage + 1}`}>
            下一页
          </a>
        </div>
      </div>

      {/* 电脑端 */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            当前为 <span className="font-medium">{(currentPage - 1) * itemPerPage + 1}</span> 至 <span className="font-medium">{Math.min(currentPage * itemPerPage, totalEntries)}</span> 条，共计
            <span className="font-medium">{totalEntries}</span>条
          </p>
        </div>

        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <Link href={`?page=${currentPage - 1}`}
              className={currentPage === 1 
              ? `relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-300 pointer-events-none	` 
              : `relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20`}>
              <span className="sr-only">上一页</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
            {pagesToRender.map((pageNumber, i) => {
              // 对于非页码的“..."设置不同的样式，不可点击，没有hover样式
              return typeof pageNumber === 'number' ? (
              <Link
                key={i}
                href={`?page=${pageNumber}`}
                className={`page-item ${pageNumber === currentPage ? 
                  'relative z-10 inline-flex items-center border border-blue-500 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 focus:z-20' : 
                  'relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20'} ${typeof pageNumber === 'string' ? 'disabled' : ''
                  }`}>
                {pageNumber}
              </Link>
            ) : 
              <div className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500"
              key={i}
              >...</div>
          }
            )}
            <Link href={`?page=${currentPage + 1}`}
              className={currentPage === totalPages
              ? `relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-300 pointer-events-none`
              : `relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20`}>
              <span className="sr-only">下一页</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
          </nav>
        </div>

      </div>

    </div>
  );
}

export default Pagination;