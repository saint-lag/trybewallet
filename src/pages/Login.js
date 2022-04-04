import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      redirectToWallet: false,
      btnDisabled: true,
      inputs: {
        email: '',
        password: '',
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.inputChecker = this.inputChecker.bind(this);
    this.stateChanger = this.stateChanger.bind(this);
  }

  async handleChange(event) {
    await this.stateChanger(event);
    this.inputChecker();
  }

  handleClick() {
    this.setState(() => ({ redirectToWallet: true }));
  }

  async stateChanger(event) {
    const { inputs } = this.state;
    const { name, value } = event.target;
    this.setState(() => ({
      inputs: { ...inputs, [name]: value },
    }));
  }

  inputChecker() {
    const { inputs } = this.state;
    const { email, password } = inputs;

    console.log(inputs);

    const re = /\S+@\S+\.\S+/;
    const MINIMUN_PASSWORD_LENGTH = 6;

    const emailValidation = re.test(email);
    const passwordValidation = password.length >= MINIMUN_PASSWORD_LENGTH;
    const approved = emailValidation && passwordValidation;

    console.log(approved);

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
    const { btnDisabled, redirectToWallet } = this.state;
    return (
      <main>
        {redirectToWallet && <Redirect to="/carteira" />}
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

export default Login;
