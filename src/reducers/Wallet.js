import {
  UPDATE_CURRENCIES,
  UPDATE_EXPENSES,
  CALCULATE_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalExpenses: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case UPDATE_CURRENCIES:
    return { ...state, currencies: action.payload };
  case UPDATE_EXPENSES:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case CALCULATE_EXPENSES:
    return { ...state,
      totalExpenses: (
        state.totalExpenses + Number(action.payload)),
    };
  default:
    return state;
  }
}

export default wallet;
