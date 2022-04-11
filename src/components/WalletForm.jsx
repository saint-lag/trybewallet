import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, fetchEverything } from '../services/api';
import { updateCurrencies, updateExpenses, calculateExpenses } from '../actions';

const METHOD_INPUT = 'method-input';
const CURRENCY_INPUT = 'currency-input';
const TAG_INPUT = 'tag-input';
const VALUE_INPUT = 'value-input';
const DESCRIPTION_INPUT = 'description-input';

class WalletForm extends React.Component {
  constructor() {
    super();
    const resettedValues = {
      [CURRENCY_INPUT]: 'USD',
      [METHOD_INPUT]: 'Dinheiro',
      [TAG_INPUT]: 'Alimentação',
      [VALUE_INPUT]: '',
      [DESCRIPTION_INPUT]: '',
    };
    this.state = {
      currencies: [],
      formInput: resettedValues,
      btnDisabled: true,
      resettedValues,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCurrentExpense = this.getCurrentExpense.bind(this);
    this.getCurrentExpenseValue = this.getCurrentExpenseValue.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  async componentDidMount() {
    const { addCurrencies } = this.props;

    const currencies = await fetchCurrencies();

    addCurrencies(currencies);
    this.setState({
      currencies,
    });
  }

  getCurrentExpense(exchangeRates) {
    const { expenses } = this.props;
    const { formInput } = this.state;
    const EXPENSES_LENGTH = expenses.length;
    const deepCopyFormInput = JSON.parse(JSON.stringify(formInput));
    const currentExpense = {
      value: deepCopyFormInput[VALUE_INPUT],
      description: deepCopyFormInput[DESCRIPTION_INPUT],
      method: deepCopyFormInput[METHOD_INPUT],
      tag: deepCopyFormInput[TAG_INPUT],
      currency: deepCopyFormInput[CURRENCY_INPUT],
    };

    currentExpense.id = EXPENSES_LENGTH;
    currentExpense.exchangeRates = exchangeRates;

    return currentExpense;
  }

  getCurrentExpenseValue(currentExpense) {
    const { value, currency, exchangeRates } = currentExpense;
    const { ask } = exchangeRates[currency];
    return ask * Number(value);
  }

  resetForm() {
    const { formInput, resettedValues } = this.state;
    Object.keys(formInput).forEach((input) => {
      if (document.getElementById(input).type !== 'select-one') {
        document.getElementById(input).value = '';
      }
    });
    document.getElementById(CURRENCY_INPUT).value = resettedValues[CURRENCY_INPUT];
    document.getElementById(METHOD_INPUT).value = resettedValues[METHOD_INPUT];
    document.getElementById(TAG_INPUT).value = resettedValues[TAG_INPUT];

    this.setState({
      btnDisabled: true,
      formInput: resettedValues,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { addExpenses, totalExpenses } = this.props;
    const exchangeRates = await fetchEverything();
    const currentExpense = this.getCurrentExpense(exchangeRates);

    addExpenses(currentExpense);
    totalExpenses(this.getCurrentExpenseValue(currentExpense));
    this.resetForm();
  }

  handleChange({ target }) {
    const { value, id } = target;
    const { formInput } = this.state;
    this.setState({
      formInput: { ...formInput, [id]: value },
    });
    if (document.getElementById(VALUE_INPUT).value.length > 0) {
      this.setState({
        btnDisabled: false,
      });
    } else {
      this.setState({
        btnDisabled: true,
      });
    }
  }

  render() {
    const { currencies, btnDisabled } = this.state;
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            id="value-input"
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            id="description-input"
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select
            type="select"
            id="currency-input"
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {currencies.map((currency) => (
              <option key={ currency } value={ currency }>
                {currency}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method-input">
          Método:
          <select
            id="method-input"
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria:
          <select
            id="tag-input"
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          type="button"
          disabled={ btnDisabled }
          onClick={ (event) => this.handleSubmit(event) }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  addCurrencies: PropTypes.func,
  addExpenses: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});
const mapDispatchToProps = (dispatch) => ({
  addCurrencies: (currencies) => dispatch(updateCurrencies(currencies)),
  addExpenses: (expenses) => dispatch(updateExpenses(expenses)),
  totalExpenses: (expenses) => dispatch(calculateExpenses(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
