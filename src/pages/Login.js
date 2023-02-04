import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setEmail } from '../actions/index';
import imgBank from '../assets/bank.jpg';

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
    const inputClass = `p-2 border-b border-gray-800 focus:outline-none focus:border-black
    focus:border-b-2 bg-transparent font-normal drop-shadow`;
    const labelClass = 'my-[20px] font-bold';

    return (
      <div className="flex bg-gray-400 h-[100vh] w-[100vw]">
        <img
          src={ imgBank }
          alt="imagem de banco"
          width="50%"
          className="drop-shadow-[5px_0px_5px_rgba(0,0,0,0.25)] object-cover"
        />
        <section
          className="flex flex-col rounded drop-shadow-md items-center text-gray-900
          text-[17px] p-[20px] drop-shadow-xl bg-gray-200 h-max m-auto"
        >
          <a
            href="https://icons8.com/icon/MSUWfu9MhE92/enter"
            rel="noreferrer"
            target="_blank"
          >
            <img
              src="https://img.icons8.com/puffy/64/111827/experimental-enter-2-puffy.png"
              alt="Ícone de login"
            />
          </a>
          <label htmlFor="email-input" className={ labelClass }>
            Email
            <br />
            <input
              data-testid="email-input"
              className={ inputClass }
              type="email"
              onChange={ this.validateLogin }
            />
          </label>
          <label htmlFor="password-input" className={ labelClass }>
            Senha
            <br />
            <input
              data-testid="password-input"
              className={ inputClass }
              type="password"
              minLength={ 6 }
              onChange={ this.validateLogin }
            />
          </label>
          <button
            type="button"
            className="bg-gray-900 rounded py-2 my-[10px] w-full
            text-gray-100 disabled:bg-gray-700 disabled:text-gray-400 drop-shadow"
            disabled={ !(validEmail && validPassword) }
            onClick={ this.submitEmail }
          >
            Entrar
          </button>
        </section>
      </div>
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
