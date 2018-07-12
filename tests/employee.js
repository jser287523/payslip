import chai from 'chai';
import employee, {
    LOAD_DEFAULT_SUCCESS,
    GENERATE_PAYSLIP_SUCCESS
} from '../src/state/employee';

const  { expect } = chai;
const defaultState = {payslips: [], profile: null};

describe('Employee reducer', () => {
  it('when LOAD_DEFAULT_SUCCESS action called', () => {
      const payload = {
        type: LOAD_DEFAULT_SUCCESS,
        payload : []
    };
    expect(employee(defaultState, payload)).deep.equal({
        payslips : [],
        profile : [],
    });
  });

  it('when GENERATE_PAYSLIP_SUCCESS action called', () => {
    const payloadData = {
      type: GENERATE_PAYSLIP_SUCCESS,
      payload : {       
                    amountSuper:"$3,941",
                    incomeGross:"$195,102",
                    incomeNet:"$109,510",
                    name:"test",
                    paymentStart:"May 2018",
                    taxGross:"$85,591",
                }  
    }
  expect(employee(defaultState, payloadData).payslips).deep.equal(payloadData.payload);
})
});

