
interface QTableRequestProps {
  pagination: {
    page: number,
    rowsPerPage: number,
    sortBy: string,
    descending: boolean,
  },
  filter?: any,
  getCellValue: (col: any, row: any) => any;
}
  