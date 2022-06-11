export const createExpiryDate = (days: number) => {
  const myCurrentDate = new Date();
  const myFutureDate = new Date(myCurrentDate);
  myFutureDate.setDate(myFutureDate.getDate() + days);

  return myFutureDate;
};
