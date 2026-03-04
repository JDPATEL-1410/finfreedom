// Currency formatting
export const formatCurrency = (value: number): string => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
    if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
    return `₹${Math.round(value).toLocaleString('en-IN')}`;
};

export const formatCurrencyFull = (value: number): string => {
    return `₹${Math.round(value).toLocaleString('en-IN')}`;
};

// SIP Calculator
export function calculateSIP(monthly: number, ratePA: number, years: number) {
    const n = years * 12;
    const r = ratePA / 100 / 12;
    const futureValue = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const invested = monthly * n;
    const gains = futureValue - invested;
    return { futureValue, invested, gains };
}

// Lumpsum Calculator
export function calculateLumpsum(principal: number, ratePA: number, years: number) {
    const futureValue = principal * Math.pow(1 + ratePA / 100, years);
    const gains = futureValue - principal;
    return { futureValue, invested: principal, gains };
}

// SWP Calculator
export function calculateSWP(corpus: number, monthlyWithdrawal: number, ratePA: number, years: number) {
    const n = years * 12;
    const r = ratePA / 100 / 12;
    let balance = corpus;
    const timeline: { month: number; balance: number; withdrawal: number }[] = [];
    for (let i = 1; i <= n; i++) {
        balance = balance * (1 + r) - monthlyWithdrawal;
        if (i % 12 === 0) {
            timeline.push({ month: i / 12, balance: Math.max(0, balance), withdrawal: monthlyWithdrawal });
        }
        if (balance <= 0) break;
    }
    const totalWithdrawn = monthlyWithdrawal * n;
    return { finalBalance: Math.max(0, balance), totalWithdrawn, timeline };
}

// Retirement Calculator
export function calculateRetirement(
    currentAge: number,
    retirementAge: number,
    monthlyExpenses: number,
    inflationRate: number,
    expectedReturn: number,
    postRetirementReturn: number,
    lifeExpectancy: number
) {
    const yearsToRetirement = retirementAge - currentAge;
    const retirementYears = lifeExpectancy - retirementAge;
    const monthlyExpensesAtRetirement = monthlyExpenses * Math.pow(1 + inflationRate / 100, yearsToRetirement);
    const retirementCorpus =
        (monthlyExpensesAtRetirement * 12 * (1 - Math.pow(1 + (postRetirementReturn - inflationRate) / 100, -retirementYears))) /
        ((postRetirementReturn - inflationRate) / 100);
    const monthlySIPNeeded =
        (retirementCorpus * (expectedReturn / 100 / 12)) /
        ((Math.pow(1 + expectedReturn / 100 / 12, yearsToRetirement * 12) - 1) * (1 + expectedReturn / 100 / 12));
    return { retirementCorpus, monthlySIPNeeded, monthlyExpensesAtRetirement, yearsToRetirement, retirementYears };
}

// Goal Planning Calculator
export function calculateGoal(
    targetAmount: number,
    years: number,
    expectedReturn: number
) {
    const r = expectedReturn / 100 / 12;
    const n = years * 12;
    const monthlySIP = (targetAmount * r) / ((Math.pow(1 + r, n) - 1) * (1 + r));
    const lumpsumNeeded = targetAmount / Math.pow(1 + expectedReturn / 100, years);
    return { monthlySIP, lumpsumNeeded };
}

// Inflation Calculator
export function calculateInflation(currentValue: number, inflationRate: number, years: number) {
    const futureValue = currentValue * Math.pow(1 + inflationRate / 100, years);
    const effectivePurchasingPower = currentValue / Math.pow(1 + inflationRate / 100, years);
    return { futureValue, effectivePurchasingPower, lossOfPTPower: currentValue - effectivePurchasingPower };
}

// Generate year-by-year data for charts
export function generateYearlyData(
    monthly: number,
    ratePA: number,
    years: number,
    type: 'sip' | 'lumpsum' = 'sip'
) {
    const data = [];
    for (let year = 1; year <= years; year++) {
        const result =
            type === 'sip'
                ? calculateSIP(monthly, ratePA, year)
                : calculateLumpsum(monthly, ratePA, year);
        data.push({
            year,
            invested: Math.round(result.invested),
            value: Math.round(result.futureValue),
            gains: Math.round(result.gains),
        });
    }
    return data;
}
