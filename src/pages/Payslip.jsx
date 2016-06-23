
import flow from 'lodash/flow';
import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { loadDefault, generatePayslip } from '../state/employee';
var numeral = require('numeral');
var moment = require('moment');
import csvGen from '../lib/csv_generator';

class Payslip extends React.Component {

  componentDidMount() {
    this.props.loadDefault();
  }

  downloadCsv() {
    var data = [['Name', 'pay period', 'gross income', 'income tax', 'net income', 'super']];

    for (var j = 1; j <= this.props.payslips.length; ++j) {
      let p = this.props.payslips[j - 1];
      console.log(p)
      data.push([p.name, p.paymentStart, p.incomeGross, p.taxGross, p.incomeNet, p.amountSuper]);
    }

    let csv = csvGen.new(data, 'payslips_export.csv', ',', true);
    csv.download(true);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.generatePayslip()
    this.forceUpdate()
  }

  render() {

    return (
      <form onSubmit={this.handleSubmit.bind(this) }>
        <div>
          <div className="container">
            <div className="spacer">
              <div className="row">
                <div className="col-lg-8  col-lg-offset-2">
                  <h3>Employee profile</h3>


                  <div>
                    <label>First Name</label>
                    <div>
                      <Field name="firstName" component="input" className="form-control" type="text" placeholder="First Name"/>
                    </div>
                  </div>
                  <div>
                    <label>Last Name</label>
                    <div>
                      <Field name="lastName" component="input" className="form-control" type="text" placeholder="Last Name"/>
                    </div>
                  </div>
                  <div>
                    <label>Annual Salary</label>
                    <div>
                      <Field name="annualSalary" component="input" className="form-control" type="number" placeholder="Annual Salary"/>
                      <kbd>Monthly Gross Income: {this.props.emp.values && this.props.emp.values.annualSalary ? numeral(this.props.emp.values.annualSalary / 12).format('$0,0') : ''}</kbd>
                    </div>
                  </div>
                  <br/>
                  <div>
                    <label>Super Rate</label>
                    <div>
                      <div className="input-group">
                        <Field name="superRate" component="input" className="form-control" type="number" step="0.01" placeholder="Super Rate" aria-describedby="basic-addon2"/>
                        <span className="input-group-addon" id="basic-addon2">%</span>
                      </div>
                    </div>
                  </div>
                  <br/>
                  <div>
                    <label>Pay period</label>
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
                  <h3>Employee monthly payslip</h3>


                  <div className="well">

                    <table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>pay period</th>
                          <th>gross income</th>
                          <th>income tax</th>
                          <th>net income</th>
                          <th>super</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.payslips.map((p, index) => {

                          return <tr key={index}>
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

                  <div>
                    <button type="button" onClick={this.downloadCsv.bind(this) }>
                      Export to CSV
                    </button>

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
  emp: state.form.empform,
  payslips: state.employee.payslips
});

const actionsToProps = dispatch => ({
  loadDefault: () => dispatch(loadDefault()),
  generatePayslip: () => dispatch(generatePayslip()),
  downloadCsv: () => dispatch(downloadCsv())
});

Payslip.defaultProps = { emp: {}, payslips: [] };

const decorators = flow([
  reduxForm({
    form: 'empform'
  }),
  connect(stateToProps, actionsToProps)
]);

export default decorators(Payslip);