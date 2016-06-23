/* eslint func-names: "off" */

import { takeEvery } from 'redux-saga';
import { LOAD_DEFAULT, GENERATE_PAYSLIP } from '../state/employee';
import { loadDefault, generatePayslip } from './employee';

export default function* rootSaga() {
    yield [
        takeEvery(LOAD_DEFAULT, loadDefault),
        takeEvery(GENERATE_PAYSLIP, generatePayslip)
    ];
}
