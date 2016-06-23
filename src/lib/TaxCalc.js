/***
 * Tax Calculating.
 *
 * Minor error checking.
 * */
function TaxCalc(conf) {
    this.TAX = conf.TAX;
    this.HRI = conf.HRI;
    this.SUPER_RATE = conf.superAnnRate / 100;
    this.SUPER_TAX = conf.superAnnTax / 100;
    this.INC_SUPER = conf.INC_SUPER || false

    if (this.TAX[0].from !== 0)
        throw new Error(
            'Tax bracket has to start from zero. Currently at ' +
            this.TAX[0].from
        );
}

/***
 * Calculate superannuation amount.
 * */
TaxCalc.prototype.superAnnuation = function (incomeTotal) {
    if (incomeTotal < 1)
        return 0;
    return incomeTotal * this.SUPER_RATE;
};

/***
 * Calculate tax amount from superannuation amount.
 * */
TaxCalc.prototype.taxSuperAnnuation = function (amountSuper) {
    if (amountSuper < 1)
        return 0;
    return amountSuper * this.SUPER_TAX;
};

/***
 * Calculate gross income.
 * */
TaxCalc.prototype.incomeGross = function (incomeTotal) {
    if (incomeTotal < 1)
        return 0;
    return incomeTotal - this.superAnnuation(incomeTotal);
};

/***
 * Helper function for brackets search.
 *
 * Find object in array of objects where obj[x].from is within
 * range of lim. Starting at end of array; highest from-amount.
 * */
TaxCalc.prototype._getFromBracket = function (arr, lim) {
    var i;

    for (i = arr.length - 1; i >= 0; --i) {
        if (lim >= arr[i].from)
            break;
    }
    /* If no bracket found return null, which denotes error. */
    if (i < 0)
        return null;
    return arr[i];
};

/***
 * Calculate base income tax.
 *
 * @incomeGross Amount after deducting superannuation amount.
 * */
TaxCalc.prototype.taxGross = function (incomeGross) {
    var tax = this._getFromBracket(this.TAX, incomeGross);
    /* !tax aka null/error. This should likely be reported somehow. */
    if (!tax)
        return 0;
    var amountOver = incomeGross - (tax.from - 1);
    return tax.base + (amountOver * tax.rate);
};


/***
 * Generate tax report object.
 * */
TaxCalc.prototype.genReport = function (incomeTotal) {
    var report = {
        incomeTotal: incomeTotal,
        amountSuper: this.superAnnuation(incomeTotal),
        incomeGross: this.INC_SUPER ? this.incomeGross(incomeTotal) : incomeTotal
    };

    report.taxGross = this.taxGross(report.incomeGross);
    report.taxSuper = this.taxSuperAnnuation(report.amountSuper);

    report.taxTotal = report.taxGross + report.taxSuper;
        
    report.incomeNet =  report.incomeGross - report.taxGross
    
    // console.log(report)
       
    return report;
};

var TAX_RES_2014_15 = [
    { from: 0, rate: 0.000, base: 0 },
    { from: 18201, rate: 0.190, base: 0 },
    { from: 37001, rate: 0.325, base: 3572 },
    { from: 80001, rate: 0.370, base: 17547 },
    { from: 180001, rate: 0.450, base: 54547 }
];

TaxCalc.new = function (superAnnRate) {
    var conf = {
        TAX: TAX_RES_2014_15,
        superAnnRate: 9.5,
        superAnnTax: 15
    }
    if (superAnnRate)
        conf.superAnnRate = superAnnRate
    return new TaxCalc(conf)
}

export default TaxCalc