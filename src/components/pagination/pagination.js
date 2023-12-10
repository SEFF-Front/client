import { useEffect, useState } from 'react';
import './pagination.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
function Pagination({ total, limit, pages, currentPage: activePage, onPageChange }) {
	const [currentPage, setCurrentPage] = useState(activePage);
	useEffect(() => {
		setCurrentPage(1);
	}, [total, limit]);

	const pageNumbers = Array.from({ length: pages }, (_, index) => index + 1);
	const changeByNumber = (pageNumber) => {
		setCurrentPage(pageNumber);
		onPageChange(pageNumber);
	};
	const nextPage = () => {
		if (currentPage < pages) {
			setCurrentPage(currentPage + 1);
			onPageChange(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
			onPageChange(currentPage - 1);
		}
	};

	return (
		<nav>
			<ul className="pagination justify-content-end">
				<li className="arrow">
					<span style={{ cursor: 'pointer' }} className="arrow" onClick={prevPage}>
						<FontAwesomeIcon icon={faChevronLeft} />
					</span>
				</li>
				{pageNumbers.map((pgNumber) => (
					<li
						key={pgNumber}
						className={`page-itm  rounded-circle border-1 border-warning border ${
							currentPage == pgNumber
								? 'actve'
								: 'border border-light rounded-circle border-1'
						} `}
					>
						<span
							onClick={() => changeByNumber(pgNumber)}
							// className={`page-itm`}
							className={`page-itm ${currentPage == pgNumber ? 'actve' : ''} `}
						>
							{pgNumber}
						</span>
					</li>
				))}
				<li className="arrow me-3">
					<span style={{ cursor: 'pointer' }} className="arrow" onClick={nextPage}>
						<FontAwesomeIcon icon={faChevronRight} />
					</span>
				</li>
			</ul>
		</nav>
	);
}
export default Pagination;
