import { ActionType, ActionTypeEnum, initialState } from "./action";

export const PageReducer = (state: typeof initialState, action: ActionType) => {
  const copyState = { ...state };
  switch (action.type) {
    case ActionTypeEnum.NEXT_PAGE:
      copyState.page += 1;
      return copyState;
    case ActionTypeEnum.PREV_PAGE:
      if (copyState.page > 1) {
        copyState.page -= 1;
      } else {
        copyState.page = 1;
      }
      return copyState;
    default:
      return copyState;
  }
};
