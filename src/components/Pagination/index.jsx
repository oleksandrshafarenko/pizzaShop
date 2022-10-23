import React from "react";
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'

const Pagination = ({valuePdge, pageQuantity, onClickSelectPage }) => {
const currentPage = 1

    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(event) => onClickSelectPage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={pageQuantity}
            forcePage={currentPage - 1}
        />
    )
}

export default Pagination
//onPageChange={(event) => onChangePage(event.selected + 1)}