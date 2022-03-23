import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ onPageChange, pageCount, currentPage }) => {
  return (
    <div>
      <div className="d-flex justify-content-end mt-3">
        <ReactPaginate
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
          breakLabel="..."
          nextLabel="Next"
          onPageChange={onPageChange}
          pageCount={pageCount}
          initialPage={currentPage - 1}
          previousLabel="Previous"
          disableInitialCallback={true}
        />
      </div>
    </div>
  );
};

export default Pagination;
