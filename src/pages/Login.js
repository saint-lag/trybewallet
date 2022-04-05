import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import addEmail from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      btnDisabled: true,
      inputs: {
        email: '',
        password: '',
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.inputChecker = this.inputChecker.bind(this);
  }

  handleChange(event) {
    const { inputs } = this.state;
    const { name, value } = event.target;
    this.setState(
      {
        inputs: { ...inputs, [name]: value },
      },
      () => this.inputChecker(),
    );
  }

  handleClick() {
    const { add, history } = this.props;
    const { inputs } = this.state;
    const { email } = inputs;

    add(email);
    history.push('/carteira');
  }

  inputChecker() {
    const { inputs } = this.state;
    const { email, password } = inputs;

    const re = /\S+@\S+\.\S+/;
    const MINIMUN_PASSWORD_LENGTH = 6;

    const emailValidation = re.test(email);
    const passwordValidation = password.length >= MINIMUN_PASSWORD_LENGTH;
    const approved = emailValidation && passwordValidation;

    if (approved) {
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
    const { btnDisabled } = this.state;
    return (
      <main>
        <form>
          <input
            onChange={ (event) => this.handleChange(event) }
            data-testid="email-input"
            name="email"
          />
          <input
            onChange={ (event) => this.handleChange(event) }
            data-testid="password-input"
            name="password"
          />
          <button
            disabled={ btnDisabled }
            onClick={ () => this.handleClick() }
            type="button"
          >
            Entrar
          </button>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  add: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  add: (email) => dispatch(addEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
