export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_CURRENCIES = 'UPDATE_CURRENCIES';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
export const CALCULATE_EXPENSES = 'CALCULATE_EXPENSES';

export const updateEmail = (payload) => ({
  type: UPDATE_EMAIL, payload,
});
export const updateCurrencies = (payload) => ({
  type: UPDATE_CURRENCIES, payload,
});
export const updateExpenses = (payload) => ({
  type: UPDATE_EXPENSES, payload,
});
export const calculateExpenses = (payload) => ({
  type: CALCULATE_EXPENSES, payload,
});
