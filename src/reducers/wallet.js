import { SET_CURRENCIES, SET_EXPENSES, SET_NEW_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_CURRENCIES:
    return {
      currencies: Object.keys(action.currencies)
        .filter((currency) => currency !== 'USDT'),
      expenses: [],
    };
  case SET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case SET_NEW_EXPENSES:
    return {
      ...state,
      expenses: action.expenses,
    };
  default:
    return state;
  }
}

export default wallet;
