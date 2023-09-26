export const getTime = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const result = `${year}년-${month}월-${date}일`;
  return result;
};
