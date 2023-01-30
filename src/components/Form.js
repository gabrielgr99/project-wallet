import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setExpenses } from '../actions';

class Form extends Component {
  getFormData = (event) => {
    const { value, name } = event.target;
    const { valuesToEdit, setValuesToEdit, idGenerator, editting } = this.props;
    if (editting) {
      setValuesToEdit({ ...valuesToEdit, [name]: value }, editting);
    } else {
      setValuesToEdit({ ...valuesToEdit, id: idGenerator(), [name]: value }, editting);
    }
  };

  setExpensesOnState = async () => {
    const {
      getExpenses,
      getTotalValue,
      setValuesToEdit,
      valuesToEdit,
      idGenerator } = this.props;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    getExpenses({ ...valuesToEdit, exchangeRates: data });
    getTotalValue();
    setValuesToEdit({
      id: idGenerator(),
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { currencies, valuesToEdit, editting, editExpense } = this.props;
    return (
      <form onChange={ this.getFormData }>
        <label htmlFor="value-input">
          Despesa:
          <input
            type="number"
            name="value"
            value={ valuesToEdit.value }
            data-testid="value-input"
          />
          R$
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            name="description"
            value={ valuesToEdit.description }
            data-testid="description-input"
          />
        </label>
        <label htmlFor="currency">
          Selecione a Moeda:
          <select name="currency" id="currency">
            {currencies.map((curr) => (
              <option key={ curr } value={ curr }>
                {curr}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method-input">
          Método de Pagamento:
          <select
            name="method"
            id="method-input"
            value={ valuesToEdit.method }
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Tipo de Despesa:
          <select
            name="tag"
            id="tag-input"
            data-testid="tag-input"
            value={ valuesToEdit.tag }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        {
          editting ? (
            <button type="reset" onClick={ () => editExpense(valuesToEdit.id) }>
              Editar despesa
            </button>
          ) : (
            <button type="reset" onClick={ this.setExpensesOnState }>
              Adicionar despesa
            </button>
          )
        }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getExpenses: (expense) => dispatch(setExpenses(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  getExpenses: PropTypes.func.isRequired,
  getTotalValue: PropTypes.func.isRequired,
  valuesToEdit: PropTypes.objectOf(PropTypes.any).isRequired,
  setValuesToEdit: PropTypes.func.isRequired,
  editting: PropTypes.bool.isRequired,
  idGenerator: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};
