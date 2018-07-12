import React from 'react';
import flow from 'lodash/flow';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { generatePayslip } from '../state/employee';
var numeral = require('numeral');

export class Payslip extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.generatePayslip()
    this.forceUpdate()
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <div>
          <div className="container">
            <div className="spacer">
              <div className="row">
                <div className="col-lg-8  col-lg-offset-2">
                  <h3>Employee Detail</h3>
                  <div>
                    <label>First Name</label>
                    <div>
                      <Field name="firstName" component="input" className="form-control" type="text" placeholder="First-Name"/>
                    </div>
                  </div>
                  <div>
                    <label>Last Name</label>
                    <div>
                      <Field name="lastName" component="input" className="form-control" type="text" placeholder="Last-Name"/>
                    </div>
                  </div>
                  <div>
                    <label>Annual Salary</label>
                    <div>
                      <Field name="annualSalary" component="input" className="form-control" type="number" placeholder="Annual-Salary"/>
                      <kbd>Monthly Gross Income: {this.props.emp.values && this.props.emp.values.annualSalary ? numeral(this.props.emp.values.annualSalary / 12).format('$0,0') : ''}</kbd>
                    </div>
                  </div>
                  <br/>
                  <div>
                    <label>Super-Rate</label>
                    <div>
                      <div className="input-group">
                        <Field name="superRate" component="input" className="form-control" type="number" step="0.01" placeholder="Super Rate" aria-describedby="basic-addon2"/>
                        <span className="input-group-addon" id="basic-addon2">%</span>
                      </div>
                    </div>
                  </div>
                  <br/>
                  <div>
                    <label>Pay-period</label>
                    <div>
                      <Field name="paymentStart" component="input" className="form-control" type="month" placeholder="Pay period"/>
                    </div>
                  </div>

                  <div>
                    <button type="submit">
                      Generate Payslip
                    </button>

                  </div>

                  <br/>
                  <br/>
                  <h3>Employee monthwise payslip</h3>


                  <div className="well">

                    <table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>pay-period</th>
                          <th>gross-income</th>
                          <th>income-tax</th>
                          <th>net-income</th>
                          <th>super-amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.payslips.map((p, index) => {

                          return <tr key={index} className="payslip-row">
                            <td>{p.name}</td>
                            <td>{p.paymentStart }</td>
                            <td>{p.incomeGross }</td>
                            <td>{p.taxGross }</td>
                            <td>{p.incomeNet }</td>
                            <td>{p.amountSuper }</td>
                          </tr>
                        }) }


                      </tbody>
                    </table>

                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

const stateToProps = state => ({
  initialValues: state.employee.profile,
  emp: state.form.payform,
  payslips: state.employee.payslips
});

const actionsToProps = dispatch => ({
  loadDefault: () => dispatch(loadDefault()),
  generatePayslip: () => dispatch(generatePayslip())
});

Payslip.defaultProps = { emp: {}, payslips: [] };

const decorators = flow([
  reduxForm({
    form: 'payform'
  }),
  connect(stateToProps, actionsToProps)
]);

export default decorators(Payslip);
