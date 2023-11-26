import { useState } from 'react';
import './pagination.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
function Pagination({Array,displayedArr,itemPerPage}){
    const [currentPage, setCurrentPage] = useState(1); 
    const [recordsPerPage] = useState(itemPerPage);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = Array.slice(indexOfFirstRecord, 
      indexOfLastRecord);
      const nPages = Math.ceil(Array.length / recordsPerPage)
      const pageNumbers = [...Array(nPages + 1).keys()].slice(1)
      const nextPage = () => {
        if(currentPage !== nPages) 
            setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if(currentPage !== 1) 
            setCurrentPage(currentPage - 1)
    }
    displayedArr = currentRecords;
    return(
        <nav>
            <ul className='pagination justify-content-end'>
                <li className="arrow">
                    <a className="arrow"
                    onClick={prevPage}
                    href="#">
                    
                    <FontAwesomeIcon icon={faChevronLeft} />
                    </a>
                </li>
                {pageNumbers.map(pgNumber => (
                <li key={pgNumber}
                className= {`page-itm  rounded-circle border-1 border-warning border ${currentPage == pgNumber ? 'actve' : 'border border-light rounded-circle border-1'} `}  >
                
                    <a onClick={() => setCurrentPage(pgNumber)}
                    className= {`page-itm ${currentPage == pgNumber ? 'actve' : ''} `}
                    href='#'>
                    
                    {pgNumber}
                    </a>
                </li>
                ))}
                <li className="arrow me-3">
                    <a className="arrow"
                    onClick={nextPage}
                    href='#'>
                    
                    <FontAwesomeIcon icon={faChevronRight} />
                    </a>
                </li>
            </ul>
        </nav>

    )
}
export default Pagination