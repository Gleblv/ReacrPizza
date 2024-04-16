import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';

import { setCurrentPage } from '../../redux/slices/filterSlice';

import styles from './Pagination.module.scss';

const Pagination: React.FC = () => {
  const dispatch = useDispatch();

  const { currnetPage } = useSelector((state: any) => state.filter);

  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
        pageRangeDisplayed={5}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
        forcePage={currnetPage - 1}
      />
    </>
  );
};

export default Pagination;
