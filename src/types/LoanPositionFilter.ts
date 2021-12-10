export type LoanPositionFilter = {
  id: string;
  ownerId: string;
  collateralId: string;
  debitAmount: string;
  collateralAmount: string;
  createdAt: Date;
  updatedAt: Date;
  and: LoanPositionFilter;
  or: LoanPositionFilter;
  not: LoanPositionFilter;
};
