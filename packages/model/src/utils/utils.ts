// PLAN: some targets are more important than others?
//  const sortTargets = (list) => {
//     list.sort((r1, r2) => new Date(r1.lastUpdated) - new Date(r2.lastUpdated));
//   };
  
 export const sortByLastUpdated = (list: any[]) => {
    list.sort((r1, r2) => new Date(r1.lastUpdated).valueOf() - new Date(r2.lastUpdated).valueOf());
  };
  
//   const sortByCreatedAt = (list) => {
//     // console.log('list before:', list.map(s=>s.createdAt));
//     list.sort((s1, s2) => {
//       // console.log('analysing:', s1.createdAt, s2.createdAt);
//       return new Date(s2.createdAt) - new Date(s1.createdAt);
//     });
//     // console.log('list after:', list.map(s=>s.createdAt));
//   };
  
//   const sort = (list, comp) => {
//     list.sort((r1, r2) => comp(r1) > comp(r2));
//   };
  
//   const isToday = (someDate) => {
//     const today = new Date();
//     return someDate.getDate() === today.getDate() &&
//       someDate.getMonth() === today.getMonth() &&
//       someDate.getFullYear() === today.getFullYear();
//   };
  
  

  