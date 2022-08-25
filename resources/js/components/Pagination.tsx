import { usePagination, DOTS } from './usePagination';
const Pagination = (props: any) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }




    let lastPage = paginationRange[paginationRange.length - 1];

    const onPrevious = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const onNext = () => {
        if (currentPage < lastPage) onPageChange(currentPage + 1);
    };
    return (
        <nav className="pagination" role="navigation" aria-label="pagination">
            <a className={`pagination-previous ${currentPage == 1 && 'is-disabled'}`}
                onClick={onPrevious}>Previous</a>
            <a className={`pagination-next ${currentPage == lastPage && 'is-disabled'}`}
                onClick={onNext}>Next</a>
            <ul className="pagination-list">
                {paginationRange.map((pageNumber: any, i: number) => {
                    if (pageNumber === DOTS) {
                        return (
                            <li key={i}>
                                <span className="pagination-ellipsis">&hellip;</span>
                            </li>
                        )
                    }
                    return (
                        <li key={i}>
                            <a
                                className={`pagination-link ${currentPage == pageNumber && 'is-current'}`}
                                onClick={() => onPageChange(pageNumber)}
                            >
                                {pageNumber}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Pagination;
