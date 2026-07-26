export function paginateArray<T>(arr: T[], pageNum: number, pageSize: number): T[] {
  const startIndex = (pageNum - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return arr.slice(startIndex, endIndex);
}
