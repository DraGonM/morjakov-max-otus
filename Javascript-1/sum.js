const sum = (number) => {
    let total = 0;

    var add = (numberToAdd) => {
        if (numberToAdd === undefined)
            return total;

        total += numberToAdd;
        return add;
    }
    
    return add(number);
}

// tests
console.log(sum(3)(4)());
console.log(sum(5)(2)(6)());
console.log(sum());