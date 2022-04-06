import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      totalExpenses: 0,
    };
  }

  render() {
    const { email } = this.props;
    const { totalExpenses } = this.state;
    return (
      <header>
        <div id="header-email-field-div">
          <span>Email:</span>
          <span data-testid="email-field">{email}</span>
        </div>
        <div id="header-total-field-div">
          <span />
          <span data-testid="total-field">{totalExpenses}</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  // expenses: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  // expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

// {
//   user: {
//     email: '',
//   },
//   wallet: {
//     currencies: [],
//     expenses: []
//   }
// }
