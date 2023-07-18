import React from 'react';
import { useState } from 'react';
import Data from './data.json';

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const nPage = Math.ceil(Data.length / recordsPerPage);
  console.log(nPage);

  const superPreviousPage = () => {
    setCurrentPage(1);
  };

  const prePage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < nPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const superNextPage = () => {
    setCurrentPage(nPage);
  };

  const getItems = () => {
    const firstIndex = (currentPage - 1) * recordsPerPage;
    const lastIndex = firstIndex + recordsPerPage;
    return Data.slice(firstIndex, lastIndex);
  };


  const pageRange = 5;
  let startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  let endPage = Math.min(nPage, startPage + pageRange - 1);

  if (endPage - startPage < pageRange - 1) {
    startPage = Math.max(1, endPage - pageRange + 1);
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Innings</th>
            <th>Overs</th>
            <th>Ball Number</th>
            <th>Batter</th>
            <th>Bowler</th>
            <th>Non-Striker</th>
            <th>Extra Type</th>
            <th>Batsman Run</th>
            <th>Extras Run</th>
          </tr>
        </thead>
        <tbody>
          {/* Render the data for the current page */}
          {getItems().map((d, i) => (
            <tr key={i}>
              <td>{d.ID}</td>
              <td>{d.innings}</td>
              <td>{d.overs}</td>
              <td>{d.ballnumber}</td>
              <td>{d.batter}</td>
              <td>{d.bowler}</td>
              <td>{d['non-striker']}</td>
              <td>{d.extra_type}</td>
              <td>{d.batsman_run}</td>
              <td>{d.extras_run}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disable' : ''}`}>
            <button className="page-link"  onClick={superPreviousPage}>
              &laquo;&laquo;
            </button>
          </li>

          <li className={`page-item ${currentPage === 1 ? 'disable' : ''}`}>
            <button className="page-link" onClick={prePage}>
              &laquo;
            </button>
          </li>


          {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((n) => (
            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={n}>
              <button
                className="page-link"
                style={currentPage === n ? { backgroundColor: '#007BFF', color: 'white' } : {}}
                onClick={() => setCurrentPage(n)}
              >
                {n}
              </button>
            </li>
          ))}

          <li className={`page-item ${currentPage === nPage ? 'disable' : ''}`}>
            <button className="page-link" onClick={nextPage}>
              &raquo;
            </button>
          </li>

          <li className={`page-item ${currentPage === nPage ? 'disable' : ''}`}>
            <button className="page-link" onClick={superNextPage}>
              &raquo;&raquo;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
