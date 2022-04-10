export const REQUEST_EXCHANGE_RATES = 'REQUEST_EXCHANGE_RATES';
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_CURRENCIES = 'UPDATE_CURRENCIES';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
export const GET_EXCHANGE_RATES = 'GET_EXCHANGE_RATES';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const updateEmail = (payload) => ({
  type: UPDATE_EMAIL, payload,
});
export const updateCurrencies = (payload) => ({
  type: UPDATE_CURRENCIES, payload,
});
export const updateExpenses = (payload) => ({
  type: UPDATE_EXPENSES, payload,
});
export const requestExchangeRates = () => ({
  type: REQUEST_EXCHANGE_RATES,
});
export const getExchangeRates = (payload) => ({
  type: GET_EXCHANGE_RATES,
  payload,
});
export const failedRequst = (payload) => ({
  type: FAILED_REQUEST,
  payload,
});
export function fetchExchangeRates() {
  const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';
  const DELETE_CURRENCIES = ['USDT'];
  return (dispatch) => {
    dispatch(requestExchangeRates());
    try {
      const response = fetch(ENDPOINT);
      const data = response.json();

      console.log(data);

      if (DELETE_CURRENCIES.length > 0) {
        DELETE_CURRENCIES.forEach((currency) => {
          delete data[currency];
        });
      }

      dispatch(getExchangeRates(data));
    } catch (error) {
      dispatch(failedRequst(error));
    }
  };
}
