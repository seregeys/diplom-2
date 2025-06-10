import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from '../../Redux/Actions/Actions';
import { ThemeContext } from '../../themes/themeContext'; 
import { useNavigate } from "react-router-dom";
import './Pagination.css';

type PaginationProps = {
  itemsPerPage: number;
  totalItems: number;
  searchTerm: string;
  fetchMovies: (searchTerm: string, year?: string, genre?: string, page?: number) => void;
  paginate: (pageNumber: number) => void; 
};

const Pagination: React.FunctionComponent<PaginationProps> = ({ itemsPerPage, totalItems, searchTerm, fetchMovies }) => {
  const { theme } = useContext(ThemeContext);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = React.useState(1);
  const navigate = useNavigate();

  const paginate = (pageNumber: number) => {
    const validPageNumber = Math.min(Math.max(1, pageNumber), totalPages);
    fetchMovies(searchTerm, undefined, undefined, validPageNumber);
    setCurrentPage(validPageNumber);
    navigate(`/?page=${validPageNumber}`);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  return (
    <nav>
      <ul className='pagination' style={{ background: theme.background, color: theme.foreground }}>
        <li className='page-item'>
          <button 
            className='page-link' 
            onClick={() => paginate(1)} 
            disabled={currentPage === 1}
            aria-label="Первая страница"
          >
            &#171; 
          </button>
        </li>

        <li className='page-item'>
          <button 
            className='page-link' 
            onClick={handlePrev} 
            disabled={currentPage === 1}
            aria-label="Предыдущая страница"
          >
            &#8249; 
          </button>
        </li>

        <li className='page-item'>
          <span className='page-link current-page'>
            {currentPage} / {totalPages}
          </span>
        </li>

        <li className='page-item'>
          <button 
            className='page-link' 
            onClick={handleNext} 
            disabled={currentPage === totalPages}
            aria-label="Следующая страница"
          >
            &#8250; 
          </button>
        </li>

        <li className='page-item'>
          <button 
            className='page-link' 
            onClick={() => paginate(totalPages)} 
            disabled={currentPage === totalPages}
            aria-label="Последняя страница"
          >
            &#187; 
          </button>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = (state:any) => ({
  searchTerm: state.searchTerm,
});

const mapDispatchToProps = {
  fetchMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);