import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setEmail } from '../actions/index';

class Login extends React.Component {
  state = {
    validEmail: '',
    validPassword: '',
  }

  validateLogin = (event) => {
    const { target } = event;

    if (target.type === 'email') {
      this.setState({
        validEmail: target.value.match(/\S+@\S+\.\S+/) !== null && target.value,
      });
    } else {
      const minLength = 6;
      this.setState({
        validPassword: target.value.length >= minLength && target.value,
      });
    }
  }

  submitEmail = () => {
    const { getEmail } = this.props;
    const { validEmail } = this.state;
    getEmail(validEmail);
  }

  render() {
    const { validEmail, validPassword } = this.state;
    return (
      <section>
        <h2>Login</h2>
        <label htmlFor="email-input">
          Email:
          <input
            data-testid="email-input"
            type="email"
            onChange={ this.validateLogin }
          />
        </label>
        <label htmlFor="password-input">
          Senha:
          <input
            data-testid="password-input"
            type="password"
            minLength={ 6 }
            onChange={ this.validateLogin }
          />
        </label>
        <Link to="/carteira">
          <button
            type="button"
            disabled={ !(validEmail && validPassword) }
            onClick={ this.submitEmail }
          >
            Entrar
          </button>
        </Link>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getEmail: (email) => dispatch(setEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  getEmail: PropTypes.func.isRequired,
};
