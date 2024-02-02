import { scrollTop } from "@/utils";

export const initialState = {
  page: 1,
};

export enum ActionTypeEnum {
  NEXT_PAGE = "NEXT_PAGE",
  PREV_PAGE = "PREV_PAGE",
}

export type ActionType = {
  type: ActionTypeEnum;
};

export const handleNextPage = (dispatch: any) => {
  dispatch({ type: ActionTypeEnum.NEXT_PAGE });
  scrollTop();
};

export const handlePrevPage = (dispatch: any) => {
  dispatch({ type: ActionTypeEnum.PREV_PAGE });
  scrollTop();
};
