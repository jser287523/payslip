import React from 'react';
import chai from 'chai';
import sinon from 'sinon';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Payslip } from '../src/pages/Payslip';

configure({ adapter: new Adapter() });
const spy = sinon.spy(() => {});
const  { expect } = chai;

describe('PaySlip Page', () => {
  const PaySlip = shallow(<Payslip generatePayslip={spy}/>);

  it('should render a form', () => {
      expect(PaySlip.find('form').length).to.equal(1);
  });

  it('should render <Field/>', () => {
    expect(PaySlip.find('Field').length).to.equal(5);
  });

  it('should render table', () => {
    expect(PaySlip.find('table').length).to.equal(1);
  });
  
  it('should render table', () => {
    const event = { preventDefault() {} };
    PaySlip.instance().handleSubmit(event);

    expect(spy.calledOnce).to.equal(true);
  });

  it('should render table with payslip data', () => {
    const props = {
        generatePayslip: spy,
        payslips :[
            {   amountSuper:"$3,941",
                incomeGross:"$195,102",
                incomeNet:"$109,510",
                name:"test",
                paymentStart:"May 2018",
                taxGross:"$85,591",
            }
        ]
    };
    const PaySlip = shallow(<Payslip { ...props } />);

    expect(PaySlip.find('.payslip-row').length).to.equal(1);
  });

});