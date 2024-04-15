const useControls = (
  setCurrentPage: (value: number) => void,
  currentPage: number,
  pageNumbers: number[],
) => {
  const handlePageNumberClick = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0 + window.innerHeight, left: 0, behavior: 'smooth' });
  };

  const handlePrevClick = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0 + window.innerHeight, left: 0, behavior: 'smooth' });
    }
  };

  const handleNextClick = (): void => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0 + window.innerHeight, left: 0, behavior: 'smooth' });
    }
  };

  return { handlePageNumberClick, handlePrevClick, handleNextClick };
};

export default useControls;
