export const sortByLastUpdated = (list: any[]) => {
  list.sort(
    (r1, r2) =>
      new Date(r1.lastUpdated).valueOf() - new Date(r2.lastUpdated).valueOf()
  );
};
export const sortByCreatedAt = (list: any[]) => {
  list.sort((s1, s2) => {
    return new Date(s2.createdAt).valueOf() - new Date(s1.createdAt).valueOf();
  });
};

export const isToday = (someDate: Date) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};
