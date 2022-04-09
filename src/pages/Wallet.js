import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import fetchCurrencies from '../services/api';
import { updateCurrencies, updateExpenses } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
      formInput: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const { addCurrencies } = this.props;

    const currencies = await fetchCurrencies();

    addCurrencies(currencies);
    this.setState({
      currencies,
    });
  }

  handleChange({ target }) {
    const { value, id } = target;
    this.setState({
      formInput: { ...formInput, [id]: value },
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { addExpenses, expenses } = this.props;
    const { formInput } = this.state;

    const EXPENSES_LENGTH = expenses.length;
    const currentExpense = formInput;
    currentExpense[id] = EXPENSES_LENGTH + 1;

    addExpenses(currentExpense);
  }

  render() {
    const { currencies } = this.state;
    return (
      <>
        <Header />
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
              <option value="cash">Dinheiro</option>
              <option value="credit-card">Cartão de crédito</option>
              <option value="debit-card">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Categoria:
            <select
              id="tag-input"
              data-testid="tag-input"
              onChange={ () => this.handleChange() }
            >
              <option value="food">Alimentação</option>
              <option value="leisure">Lazer</option>
              <option value="job">Trabalho</option>
              <option value="transport">Transporte</option>
              <option value="health">Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ () => this.handleSubmit() }>
            Adicionar despesa
          </button>
        </form>
      </>
    );
  }
}

Wallet.propTypes = {
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
