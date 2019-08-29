class Expression {
    /**
        @param input : string
        @param symbols : HashMap
    */
    constructor(input, operations) {
        this.operations = {...operations};

        const symbols = Object.keys(operations);
        let nextOperation = null;

        for (let symbol of symbols) {
            if (input.includes(symbol)) {
                nextOperation = symbol;
                break;
            }
        }

        if (!nextOperation) { // base case
            this.value = Number(input);
        } else { // recursive case
            this.operation = nextOperation;
            this.children = input.split(nextOperation)
                                 .map(childInput =>
                                     new Expression(childInput, operations));
        }
    }

    evaluate() {
        if (!this.children)
            return this.value;
        return this.operations[this.operation](
            ...this.children.map(child => child.evaluate())
        );
    }

    toString() {
        if (!this.children)
            return `${this.value}`;
        return `${this.children
                    .map(child => child.toString())
                    .join(this.operation)
                }`;
    }
}

module.exports = Expression;
