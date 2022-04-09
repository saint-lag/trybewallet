import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import fetchCurrencies from '../services/api';
import { updateCurrencies } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
    };
  }

  async componentDidMount() {
    const { addCurrencies } = this.props;

    const currencies = await fetchCurrencies();

    addCurrencies(currencies);
    this.setState({
      currencies,
    });
  }

  render() {
    const { currencies } = this.state;
    return (
      <>
        <Header />
        <form>
          <label htmlFor="value-input">
            Valor:
            <input id="value-input" data-testid="value-input" />
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input id="description-input" data-testid="description-input" />
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select
              type="select"
              id="currency-input"
              data-testid="currency-input"
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
            <select id="method-input" data-testid="method-input">
              <option value="cash">Dinheiro</option>
              <option value="credit-card">Cartão de crédito</option>
              <option value="debit-card">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Categoria:
            <select id="tag-input" data-testid="tag-input">
              <option value="food">Alimentação</option>
              <option value="leisure">Lazer</option>
              <option value="job">Trabalho</option>
              <option value="transport">Transporte</option>
              <option value="health">Saúde</option>
            </select>
          </label>
        </form>
      </>
    );
  }
}

Wallet.propTypes = {
  addCurrencies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});
const mapDispatchToProps = (dispatch) => ({
  addCurrencies: (currencies) => dispatch(updateCurrencies(currencies)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
