var numeral = require('numeral');
var moment = require('moment');
import TaxCalc from '../lib/TaxCalc';
import { put, select } from 'redux-saga/effects';
import { LOAD_DEFAULT_SUCCESS, GENERATE_PAYSLIP_SUCCESS } from '../state/employee';

export function* loadDefault(action) {
    let profile = {
        firstName: 'John',
        lastName: 'Doe',
        annualSalary: 80000,
        superRate: 9.5,
        paymentStart: '2016-06'
    }
    yield put({ type: LOAD_DEFAULT_SUCCESS, payload: profile });
}

export function* generatePayslip(action) {
    const form = yield select(state => state.form.empform.values);
    let taxcalc = TaxCalc.new(form.superRate)
    let rpt = taxcalc.genReport(form.annualSalary)

    let monthly = {
        amountSuper: Math.round(rpt.amountSuper / 12),
        incomeGross: Math.round(rpt.incomeGross / 12),
        incomeTotal: Math.round(rpt.incomeTotal / 12),
        taxGross: Math.round(rpt.taxGross / 12),
        taxSuper: Math.round(rpt.taxSuper / 12),
        taxTotal: Math.round(rpt.taxTotal / 12),
        incomeNet: Math.round(rpt.incomeNet / 12)
    }
    let payslip = {
        name: form.firstName + ' ' + form.lastName,
        paymentStart: moment(form.paymentStart).format("MMMM YYYY"),
        incomeGross: numeral(monthly.incomeGross).format('$0,0'),
        taxGross: numeral(monthly.taxGross).format('$0,0'),
        incomeNet: numeral(monthly.incomeNet).format('$0,0'),
        amountSuper: numeral(monthly.amountSuper).format('$0,0')
    }

    yield put({ type: GENERATE_PAYSLIP_SUCCESS, payload: payslip });
}

