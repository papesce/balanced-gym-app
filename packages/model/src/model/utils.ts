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

export const sortByOrder = (list: any[]) => {
  list.sort((s1, s2) => s1.order - s2.order);
};


// PLAN: some targets are more important than others?
export const sortTargets = (list: any[]) => {
  list.sort(
    (r1, r2) =>
      new Date(r1.lastUpdated).valueOf() - new Date(r2.lastUpdated).valueOf()
  );
};

export const isToday = (someDate: Date) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};
