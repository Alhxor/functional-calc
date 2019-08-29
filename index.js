const Expression = require('./Expression');

const getBaseFunctions = () => ({
    '+': (x, ...rest) => rest.reduce((res, operand) => res + operand, x),
    '-': (x, ...rest) => rest.reduce((res, operand) => res - operand, x),
    '*': (x, ...rest) => rest.reduce((res, operand) => res * operand, x),
    '/': (x, ...rest) => rest.reduce((res, operand) => res / operand, x),
    '^': (x, ...rest) => rest.reduce((res, operand) => Math.pow(res, operand), x),
});

const compose = (...fns) =>
    arg => fns.reduce((composed, fn) => fn(composed), arg);

const getProcessArgumentsAsString = () => [...process.argv]
                                            .slice(2)
                                            .join('');

const getCalculatorInputValidator = () => /^[0-9.+\-/*^]+$/

const clear = () => console.clear();
const log = (...messages) => console.log(...messages);
const display = target => message => target(message)

const validateInput = regexToMatch =>
    inputString => {
        if (regexToMatch.test(inputString))
            return inputString;
        throw new Error(`Invalid input: ${inputString}`); // is there a better way?
    }

const getInput = compose(
    getProcessArgumentsAsString(),
    validateInput(getCalculatorInputValidator())
);

const stringToExpression = operationsMap =>
    inputString => new Expression(inputString, operationsMap);

const expressionToString = Expression => Expression.toString();
const evaluateExpression = Expression => Expression.evaluate();

const calculate = compose(  // calculate("2+2")
    stringToExpression(getBaseFunctions()),
    evaluateExpression
);

compose(
    clear,
    getInput,
    calculate,
    display(log)
)();
