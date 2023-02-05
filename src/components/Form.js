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
    const inputClass = `px-2 border border-gray-600 focus:outline-none h-[23px]
    focus:border-2 bg-transparent font-normal drop-shadow rounded focus:border-gray-600
    ml-[5px]`;
    const labelClass = 'mr-[10px]';
    return (
      <form
        onChange={ this.getFormData }
        className="drop-shadow-md text-gray-800 text-[17px] px-[20px] py-[15px]
        bg-white/95"
      >
        <h2 className="font-bold mb-[8px] text-[18px]">Registre a despesa</h2>
        <label htmlFor="value-input" className={ labelClass }>
          R$
          <input
            type="number"
            name="value"
            value={ valuesToEdit.value }
            data-testid="value-input"
            className={ `${inputClass} w-[100px]` }
          />
        </label>
        <label htmlFor="currency" className={ labelClass }>
          Moeda:
          <select name="currency" id="currency" className={ `ml-[5px] ${inputClass}` }>
            {currencies.map((curr) => (
              <option key={ curr } value={ curr }>
                {curr}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method-input" className={ labelClass }>
          Pagamento:
          <select
            name="method"
            id="method-input"
            value={ valuesToEdit.method }
            data-testid="method-input"
            className={ `ml-[5px] ${inputClass}` }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input" className={ labelClass }>
          Tipo de Despesa:
          <select
            name="tag"
            id="tag-input"
            data-testid="tag-input"
            value={ valuesToEdit.tag }
            className={ `ml-[5px] ${inputClass}` }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
            <option value="Outro">Outro</option>
          </select>
        </label>
        <label htmlFor="description-input" className={ labelClass }>
          Descrição:
          <input
            type="text"
            name="description"
            value={ valuesToEdit.description }
            data-testid="description-input"
            className={ `ml-[5px] ${inputClass}` }
            maxLength={ 30 }
          />
        </label>
        {
          editting ? (
            <button
              type="reset"
              onClick={ () => editExpense(valuesToEdit.id) }
            >
              <span
                className="material-symbols-outlined bg-gray-800 w-[23px] h-[23px]
                rounded text-white translate-y-[6px] flex items-center justify-center
                hover:bg-gray-600 duration-150"
              >
                edit
              </span>
            </button>
          ) : (
            <button
              type="reset"
              onClick={ this.setExpensesOnState }
              className="w-[23px] h-[23px]"
            >
              <span
                className="material-symbols-outlined bg-gray-800 w-[23px] h-[23px]
                rounded text-white translate-y-[6px] flex items-center justify-center
                hover:bg-gray-600 duration-150"
              >
                add
              </span>
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
