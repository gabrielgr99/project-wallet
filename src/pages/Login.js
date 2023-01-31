import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    const { getEmail, history } = this.props;
    const { validEmail } = this.state;
    getEmail(validEmail);
    history.push('/carteira');
  }

  render() {
    const { validEmail, validPassword } = this.state;
    return (
      <section
        className="flex flex-col border-2 rounded border-white drop-shadow-md
        backdrop-blur backdrop-grayscale items-center text-white text-[20px]
        backdrop-contrast-50 drop-shadow-[5px_5px_5px_rgba(0,0,0,0.5)] p-[20px]"
      >
        <h2 className="text-center text-[30px] my-[10px]">Login</h2>
        <label htmlFor="email-input" className="my-[20px] font-bold">
          Email
          <br />
          <input
            data-testid="email-input"
            className="p-2 border-b border-white focus:outline-none focus:border-white
            focus:border-b-2 bg-transparent font-normal"
            type="email"
            onChange={ this.validateLogin }
          />
        </label>
        <label htmlFor="password-input" className="my-[20px] font-bold">
          Senha
          <br />
          <input
            data-testid="password-input"
            className="p-2 border-b border-white focus:outline-none focus:border-white
            focus:border-b-2 bg-transparent font-normal"
            type="password"
            minLength={ 6 }
            onChange={ this.validateLogin }
          />
        </label>
        <button
          type="button"
          className="bg-gray-900 rounded py-2 my-[10px] w-full
          text-gray-100 disabled:bg-gray-700 disabled:text-gray-400"
          disabled={ !(validEmail && validPassword) }
          onClick={ this.submitEmail }
        >
          Entrar
        </button>
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
  history: PropTypes.func.isRequired,
};
