import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setNewExpenses } from '../actions';

class Expense extends Component {
  componentDidMount() {
    const { getTotalValue } = this.props;
    getTotalValue();
  }

  deleteExpense = (id) => {
    const {
      expenses,
      getNewExpenses, getTotalValue, setValuesToEdit, idGenerator } = this.props;
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    getNewExpenses(newExpenses);
    getTotalValue();
    setValuesToEdit({
      id: idGenerator(),
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  render() {
    const { expense, setValuesToEdit } = this.props;
    return (
      <tr
        className="bg-white text-center h-[50px] hover:bg-gray-200
         border-gray-300 border duration-150 text-gray-700"
      >
        <td>{ expense.description }</td>
        <td>{ expense.tag }</td>
        <td>{ expense.method }</td>
        <td>{ Number(expense.value).toFixed(2) }</td>
        <td>{ expense.exchangeRates[expense.currency].name.split('/')[0] }</td>
        <td>{ Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }</td>
        <td>
          { (expense.value * expense.exchangeRates[expense.currency].ask).toFixed(2) }
        </td>
        <td>Real</td>
        <td className="text-gray-100">
          <button
            type="button"
            data-testid="edit-btn"
            onClick={ () => setValuesToEdit(expense, true) }
            className="bg-gray-700 px-[5px] rounded-l-[4px] hover:bg-blue-900
            duration-150"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={ () => this.deleteExpense(expense.id) }
            data-testid="delete-btn"
            className="bg-gray-900 px-[5px] rounded-r-[4px] hover:bg-cyan-900
            duration-150"
          >
            Del
          </button>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getNewExpenses: (newExpenses) => dispatch(setNewExpenses(newExpenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Expense);

Expense.propTypes = {
  expense: PropTypes.objectOf(PropTypes.any).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  getNewExpenses: PropTypes.func.isRequired,
  getTotalValue: PropTypes.func.isRequired,
  setValuesToEdit: PropTypes.func.isRequired,
  idGenerator: PropTypes.func.isRequired,
};
