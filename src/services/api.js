const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';
const DELETE_CURRENCIES = ['USDT'];

export const fetchCurrencies = async () => {
  try {
    const response = await fetch(ENDPOINT);
    const data = await response.json()
      .then((currencies) => Object.keys(currencies));

    if (DELETE_CURRENCIES.length > 0) {
      DELETE_CURRENCIES.forEach((currency) => {
        const index = data.findIndex((i) => i === currency);
        data.splice(index, 1);
      });
    }

    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchEverything = async () => {
  try {
    const response = await fetch(ENDPOINT);
    const data = await response.json();

    if (DELETE_CURRENCIES.length > 0) {
      DELETE_CURRENCIES.forEach((currency) => delete data[currency]);
    }

    return data;
  } catch (err) {
    throw new Error(err);
  }
};
