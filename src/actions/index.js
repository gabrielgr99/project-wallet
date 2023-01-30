export const SET_EMAIL = 'SET_EMAIL';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const SET_EXPENSES = 'SET_EXPENSES';
export const SET_NEW_EXPENSES = 'SET_NEW_EXPENSES';

export const setEmail = (email) => ({
  type: SET_EMAIL,
  email,
});

export const setExpenses = (expenses) => ({
  type: SET_EXPENSES,
  expenses,
});

export const setNewExpenses = (expenses) => ({
  type: SET_NEW_EXPENSES,
  expenses,
});

export const setCurrencies = (currencies) => ({
  type: SET_CURRENCIES,
  currencies,
});

export function fetchCurrencies() {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => dispatch(setCurrencies(currencies)));
  };
}
