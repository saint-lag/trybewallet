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
      // currencies: [],
    };
  }

  async componentDidMount() {
    const { addCurrencies } = this.props;

    const currencies = await fetchCurrencies();

    console.log(currencies);

    addCurrencies(currencies);
    this.setState({
      // currencies,
    });
  }

  render() {
    return (
      <>
        <Header />
        <h1>TODO: ADD CURRENCIES</h1>
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
