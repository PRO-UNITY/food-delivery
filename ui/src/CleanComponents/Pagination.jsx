import Pagination from "react-bootstrap/Pagination";


const PaginationCard = (props) => {
  const { currentPage, setCurrentPage, totalPages } = props;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage <= 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Pagination className="mt-4">
      <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1} />
      {[...Array(totalPages).keys()].map((page) => (
        <Pagination.Item
          key={page + 1}
          active={page + 1 === currentPage}
          onClick={() => handlePageChange(page + 1)}
        >
          {page + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

export default PaginationCard;
