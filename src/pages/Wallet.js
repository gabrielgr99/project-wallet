import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, setNewExpenses } from '../actions';
import Form from '../components/Form';
import Table from '../components/Table';

class Wallet extends React.Component {
  state = {
    totalValue: 0,
    valuesToEdit: {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    },
    editting: false,
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  getTotalValue = () => {
    const { expenses } = this.props;
    let total = 0;
    expenses.forEach((expense) => {
      total
      += Number(expense.value) * Number(expense.exchangeRates[expense.currency].ask);
    });
    this.setState((prevState) => ({ ...prevState, totalValue: total }));
  }

  // Gera o id das despesas para substituir os ids que já foram apagados
  idGenerator = () => {
    const { expenses } = this.props;
    for (let id = 0; id <= expenses.length; id += 1) {
      if (expenses.every((expense) => expense.id !== id)) {
        return id;
      }
    }
  };

  setValuesToEdit = (expense, editting = false) => {
    this.setState((prevState) => (
      { ...prevState, valuesToEdit: expense, editting }));
  }

  editExpense = (id) => {
    const { expenses, getNewExpenses } = this.props;
    const { valuesToEdit } = this.state;
    const resetFormData = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    const newExpenses = expenses.map((expense) => {
      let expenseEdited;
      if (expense.id === id) {
        expenseEdited = valuesToEdit;
      } else {
        expenseEdited = expense;
      }
      return expenseEdited;
    });
    getNewExpenses(newExpenses);
    this.setState((prevState) => (
      { ...prevState, valuesToEdit: resetFormData, editting: false }));
  }

  render() {
    const { email, currencies } = this.props;
    const { totalValue, valuesToEdit, editting } = this.state;
    return (
      <section
        className="bg-gray-200 h-[100vh] w-[100vw]"
      >
        <header className="flex justify-between items-center p-[15px] bg-gray-800">
          <div
            className="flex flex-col w-max bg-gray-800 text-white text-[18px] px-[10px]
            rounded font-bold"
          >
            <p data-testid="header-currency-field">Total</p>
            <p data-testid="total-field">{ `R$ ${totalValue.toFixed(2)}` }</p>
          </div>
          <div
            data-testid="email-field"
            className="flex text-[25px] h-max items-center text-white"
          >
            { email }
            <img
              src="https://img.icons8.com/ios/40/ffffff/gender-neutral-user--v4.png"
              alt="Ícone de perfil"
              className="ml-[10px]"
            />
          </div>
        </header>
        <Form
          currencies={ currencies }
          valuesToEdit={ valuesToEdit }
          getTotalValue={ this.getTotalValue }
          setValuesToEdit={ this.setValuesToEdit }
          editting={ editting }
          idGenerator={ this.idGenerator }
          editExpense={ this.editExpense }
        />
        <Table
          getTotalValue={ this.getTotalValue }
          setValuesToEdit={ this.setValuesToEdit }
          idGenerator={ this.idGenerator }
        />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  getNewExpenses: (newExpenses) => dispatch(setNewExpenses(newExpenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  getCurrencies: PropTypes.func.isRequired,
  getNewExpenses: PropTypes.func.isRequired,
};
