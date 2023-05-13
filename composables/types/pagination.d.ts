
interface IApiPageResult<T> {
  data: T[],
  page: number,
  pageSize: number,
  totalPage: number,
  total: number,
}

type IBlogInfo = {
  id: string,
  title: string,
  date: string,
  category: string,
};

interface IBlog extends IBlogInfo {
  content?: string,
};


