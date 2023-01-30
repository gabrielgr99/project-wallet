import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Expense from './Expense';

class Table extends Component {
  componentDidUpdate() {
    const { getTotalValue } = this.props;
    getTotalValue();
  }

  render() {
    const {
      expenses,
      getTotalValue,
      setValuesToEdit,
      idGenerator } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense) => (
              <Expense
                key={ expense.id }
                expense={ expense }
                getTotalValue={ getTotalValue }
                setValuesToEdit={ setValuesToEdit }
                idGenerator={ idGenerator }
              />
            ))
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  getTotalValue: PropTypes.func.isRequired,
  setValuesToEdit: PropTypes.func.isRequired,
  idGenerator: PropTypes.func.isRequired,
};
