import React from "react";
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'

const Pagination = ({valuePage, pageQuantity, onClickSelectPage }) => {
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
            forcePage={valuePage - 1}
        />
    )
}

export default Pagination
//onPageChange={(event) => onChangePage(event.selected + 1)}