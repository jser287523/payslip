import { createAction } from 'redux-actions';

export const LOAD_DEFAULT = 'LOAD_DEFAULT';
export const LOAD_DEFAULT_SUCCESS = 'LOAD_DEFAULT_SUCCESS';
export const GENERATE_PAYSLIP = 'GENERATE_PAYSLIP'
export const GENERATE_PAYSLIP_SUCCESS = 'GENERATE_PAYSLIP_SUCCESS'

export default function reducer(state = {payslips: [], profile: null}, action) {
    switch (action.type) {
        case LOAD_DEFAULT_SUCCESS:
            return {
            ...state,
                profile: action.payload
            };
        case GENERATE_PAYSLIP_SUCCESS:
            state.payslips.push(action.payload)
            return {
            ...state,
                payslips: state.payslips
            }; 
        default:
            return state;
    }
}

export const loadDefault = createAction(LOAD_DEFAULT);
export const generatePayslip = createAction(GENERATE_PAYSLIP);

