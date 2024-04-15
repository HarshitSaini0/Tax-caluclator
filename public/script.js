const myForm = document.getElementById('the-form');
const errorSymbol = document.getElementById('error-sym');
const errorCircle = document.getElementById('error-cir');
const inputElements = document.querySelectorAll('.input-fields-1');


function calAfterAmount(grossAnnualIncome, extraIncome, deduction) {
    const afterAmount = (grossAnnualIncome + extraIncome - deduction);
    return afterAmount;
}

function isTaxable(afterAmount) {
    // Overall income (after deductions) under 8 (≤) Lakhs is not taxed. 
    const theResult = afterAmount <= 800000;
    return !theResult;
}


/*
- 30% for people with age < 40
- 40% for people with age ≥ 40 but < 60
- 10% for people with age ≥ 60
*/
function theTax(afterAmount, age) {
    // afterAmount = grossAnnualIncome+extraIncome-deduction
    if (age < 40) {
        return afterAmount * 0.3; // 30%

    } else if (age >= 40 && age < 60) {
        return afterAmount * 0.4; // 40%

    } else {
        return afterAmount * 0.1; // 10%
    }

}

function isAInt(str) {
    str = str.trim();

    if (str === "") {
        return false;
    }

    // 3. Regular expression for common numeric formats (decimal, hexadecimal, etc.)
    const numberRegex = /^\d+\.?\d+$/;

    // 4. Test using the regular expression
    return numberRegex.test(str);
}
function changeToRed() {
    errorSymbol.setAttribute('class', 'error-span font-red')
    errorCircle.setAttribute('class', 'error f-center mouse-pointer b-red')
}
function changeToBlack() {
    errorSymbol.setAttribute('class', 'error-span font-black')
    errorCircle.setAttribute('class', 'error f-center mouse-pointer b-black')
}

function changeBorderToRed(element) {
    element.classList.remove('input-b-black')
    element.classList.add('input-b-red')
}

function theValidation(element) {
    const isANumber = isAInt(element.value);
    console.log(isANumber);
    if (!isANumber) {
        changeBorderToRed(element);
        changeToRed();
        popup("Enter numbers only")
        return -1;
    }
    return 0;

}

async function popup(content) {
    const popup = document.getElementById('top-popup');
    popup.innerHTML = content;
    popup.classList.remove('op-0');
    popup.classList.add('op-1');
    popup.classList.add('animate-in');
    await new Promise(resolve => {
        setTimeout(resolve, 4000);
    });
    popup.classList.remove('animate-in');
    popup.classList.add('animate-out');
    await new Promise(resolve => {
        setTimeout(resolve, 280);
    });
    popup.classList.remove('animate-out');
    popup.classList.remove('op-1');
    popup.classList.add('op-0');
    // await new Promise()

}

myForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const myArray = [];
    // const grossAnnualIncomeInput = document.getElementById('1');
    // const extraIncomeInput = document.getElementById('2');
    // const ageGroupInput = document.getElementById('3');
    // const deductionInput = document.getElementById('4');
    let myCounter = 0;
    for (let i = 1; i <= 4; i++) {
        const elementID = String(i);
        console.log(elementID);
        const theElement = document.getElementById(elementID);
        console.log(theElement);
        myCounter += theValidation(theElement);
        myArray.push(parseInt(theElement.value));
    }
    console.log(myCounter)
    if (myCounter < 0) {
        return;
    }
    else {
        const theAmount = calAfterAmount(myArray[0], myArray[1], myArray[3]);
        const hasTax = isTaxable(theAmount);
        if (hasTax) {
            const tax = theTax(theAmount, myArray[2]);
            const FinalIncome = theAmount - tax;
            console.log(FinalIncome);
        } else {
            console.log(theAmount);
        }
    }

}
);

inputElements.forEach(element => {
    element.addEventListener('click', (event) => {
        changeToBlack();
        element.classList.remove('input-b-red')
        element.classList.add('input-b-black')
    })
})





