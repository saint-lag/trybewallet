import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, totalExpenses } = this.props;
    return (
      <header>
        <div id="header-email-field-div">
          <span>Email:</span>
          <span data-testid="email-field">{email}</span>
        </div>
        <div id="header-total-field-div">
          <span />
          <span data-testid="total-field">
            {totalExpenses ? totalExpenses.toFixed(2) : 0}
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  totalExpenses: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: state.wallet.totalExpenses,
});

export default connect(mapStateToProps)(Header);
