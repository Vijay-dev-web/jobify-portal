import { useAllJobsContext } from "../pages/AllJobs";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { useLocation, useNavigate } from "react-router-dom";

const PaginationContainer = () => {
  const { data } = useAllJobsContext();
  const { totalPages, currentPage } = data;
  const paginationArray = Array.from({ length: totalPages }, (_, index) => index + 1);

  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const handlePageChange = (page) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', page);
    navigate(`${pathname}?${searchParams.toString()}`)   }

  return (
    <Wrapper>
      <button className="btn prev-btn" onClick={() => {
        const prevPage = currentPage === 1 ? 1 : currentPage - 1;
        handlePageChange(prevPage)
      }}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
       {
        paginationArray.map((page) => {
          return (
            <button 
            key={page}
            className={`btn page-btn ${page === currentPage && 'active'}`}
            onClick={() => {handlePageChange(page)}}
            >
              {page}
            </button>
          )
        })
       }
      </div>        
      <button className="btn next-btn" onClick={() => {
        const nextPage = currentPage === paginationArray.length ? paginationArray.length : currentPage + 1;
        handlePageChange(nextPage);
      }}>
        next
        <HiChevronDoubleRight />
      </button> 
    </Wrapper>
  );
}

export default PaginationContainer;
