// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'UPDATE_CURRENCIES':
    return { ...state, currencies: action.currencies };
  default:
    return state;
  }
}

export default wallet;
