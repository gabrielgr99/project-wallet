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
    const newExpenses = expenses.map((expense) => {
      let expenseEdited;
      if (expense.id === id) {
        expenseEdited = valuesToEdit;
      } else {
        expenseEdited = expense;
      }
      return expenseEdited;
    });
    // console.log(newExpenses);
    getNewExpenses(newExpenses);
  }

  render() {
    const { email, currencies } = this.props;
    const { totalValue, valuesToEdit, editting } = this.state;
    return (
      <section>
        <header>
          <h2>TrybeWallet</h2>
          <span data-testid="email-field">{ `Usuário: ${email}` }</span>
          <span data-testid="total-field">{ totalValue.toFixed(2) }</span>
          <span data-testid="header-currency-field">Moeda: BRL</span>
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
