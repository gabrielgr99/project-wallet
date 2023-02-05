import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Expense from './Expense';
import './Table.css';

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
      <div className="max-h-[500px] overflow-y-auto w-max mx-auto mt-[50px] shadow-lg">
        <table>
          <thead className="bg-gray-800 text-white rounded-t sticky top-0">
            <tr>
              <th className="py-[10px] w-[400px] rounded-tl-lg">Descrição</th>
              <th className="w-[110px]">Tag</th>
              <th className="w-[140px]">Pagamento</th>
              <th className="w-[100px]">Valor</th>
              <th className="w-[170px]">Moeda</th>
              <th className="w-[90px]">Câmbio</th>
              <th className="w-[120px]">Valor convertido</th>
              <th className="w-[90px]">Moeda corrente</th>
              <th className="rounded-tr-lg w-[130px]">Editar/Excluir</th>
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
      </div>
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
