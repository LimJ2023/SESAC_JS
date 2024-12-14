import React from 'react'

function Pagination({ currentPage, totalCount, pageSize, onPageChange }) {
    const totalPages = Math.ceil(totalCount / pageSize);
    
    return (
        <div className="flex justify-center gap-2 mt-4">
            {currentPage > 1 && (
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    className="px-3 py-1 border rounded"
                >
                    이전
                </button>
            )}
            
            {[...Array(Math.min(5, totalPages))].map((_, index) => {
                const pageNumber = currentPage - 2 + index;
                if (pageNumber > 0 && pageNumber <= totalPages) {
                    return (
                        <button
                            key={pageNumber}
                            onClick={() => onPageChange(pageNumber)}
                            className={`px-3 py-1 border rounded ${
                                currentPage === pageNumber ? 'bg-blue-500 text-white' : ''
                            }`}
                        >
                            {pageNumber}
                        </button>
                    );
                }
                return null;
            })}
            
            {currentPage < totalPages && (
                <button 
                    onClick={() => onPageChange(currentPage + 1)}
                    className="px-3 py-1 border rounded"
                >
                    다음
                </button>
            )}
        </div>
    );
}

export default Pagination