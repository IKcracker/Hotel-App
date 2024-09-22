const Pagination = ({ totalRooms, roomsPerPage, currentPage, setCurrentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRooms / roomsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination">
            {pageNumbers.map(number => (
                <button 
                    key={number} 
                    onClick={() => setCurrentPage(number)} 
                    className={currentPage === number ? 'active' : ''}
                >
                    {number}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
