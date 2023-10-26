
const pageNumbersGenerator = (maxPage: number, currentPage: number) => {
    let pageNumbers = [];
    if (maxPage <= 5) {
        pageNumbers = Array.from({ length: maxPage }, (_, i) => i + 1);
    } else if (currentPage <= 3) {
        console.log('lebih kecil dari 3')
        pageNumbers = [1, 2, 3, 4, 5];
    } else if (currentPage >= maxPage - 2) {
        pageNumbers = [maxPage - 4, maxPage - 3, maxPage - 2, maxPage - 1, maxPage];
    } else {
        pageNumbers = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
    }
    return pageNumbers
}

export default pageNumbersGenerator