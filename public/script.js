/*
    Here will be all elements that are used Calculator
    Like pop-ups, result-box, fields itself
    ?? They will be used for DOM manipulation

*/
const myForm = document.getElementById('the-form');
const errorSymbol = document.getElementById('error-sym');
const errorCircle = document.getElementById('error-cir');
const inputElements = document.querySelectorAll('.input-fields-1');
const FinalIncomeValueElement = document.getElementById('d-amount');
const resPopUp = document.getElementById('res-pop-up');
const closeButton = document.getElementById('close-btn-01');

//Calculates the Total amount of income after deductions
function calAfterAmount(grossAnnualIncome, extraIncome, deduction) {
    const afterAmount = (grossAnnualIncome + extraIncome - deduction);
    return afterAmount;
}

// Overall income (after deductions) under 8 (≤) Lakhs is not taxable.
function isTaxable(afterAmount) {
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
//For checking is passed value is a number or not ?
function isAInt(str) {
    str = str.trim();

    if (str === "") {
        return false;
    }

    //  Regular expression for common numeric formats (decimal)
    const numberRegex = /^\d+\.?\d+$/;

    // Test using the regular expression
    return numberRegex.test(str);
}

/*
!!changeToRed()
    it is for changing the error symbol and circle to red
!!changeToBlack()
    it is for changing the error symbol and circle to black / normal

*/
function changeToRed() {
    errorSymbol.setAttribute('class', 'error-span font-red')
    errorCircle.setAttribute('class', 'error f-center mouse-pointer b-red')
}
function changeToBlack() {
    errorSymbol.setAttribute('class', 'error-span font-black')
    errorCircle.setAttribute('class', 'error f-center mouse-pointer b-black')
}


/*
!!changeBorderToRed()
    it is for changing the input border to red
!!changeBorderToBlack()
    it is for changing the input border to black / normal

*/
function changeBorderToRed(element) {
    element.classList.remove('input-b-black')
    element.classList.add('input-b-red')
}
function changeBorderToBlack(element){
    return function(){
        changeToBlack();
        element.classList.remove('input-b-red')
        element.classList.add('input-b-black')
    }
}

/*

Simply to check the input we are getting from
 input-field in a number or not and applying 
 style according to that.
*/
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
/*
This adds a popup element to top of view port 
param content :- The content to be displayed in popup
it returns the a promise which is resolved after 4 seconds
and then the popup is removed from view port
(to display 'enter numbers only' if entered anything else)

*/
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
/*
This adds a popup element to center of view port 
It is to show about the result of the calculation

It is to be used when the result is to be displayed

*/

async function popInResElement(){
    resPopUp.classList.add('op-1');
    resPopUp.classList.remove('op-0');
   resPopUp.classList.add('animate-in-1')
   await new Promise(resolve => {
       setTimeout(resolve, 280);
    });
    resPopUp.classList.remove('animate-in-1')

}
/*
This removes the popup element from center of view port 
That shows about the result of the calculation

The function is called when we click button that popup card that is to be removed

*/
async function popOutResElement(){
    resPopUp.classList.add('animate-out-1');
    await new Promise(resolve => {
        setTimeout(resolve, 280);
    });
    resPopUp.classList.remove('animate-out-1');
    resPopUp.classList.remove('op-1');
    resPopUp.classList.add('op-0');
}

//Simple function uses regular expression to add commas in resultant income
function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  
// The main logic that do calculation and other stuff 

/*
Here i could also use 
    !! const grossAnnualIncomeInput = document.getElementById('1');
    !! const extraIncomeInput = document.getElementById('2');
    !! const ageGroupInput = document.getElementById('3');
    !! const deductionInput = document.getElementById('4');
But i used array for my ease

*/
myForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const myArray = [];
    
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

            FinalIncomeValueElement.innerHTML = numberWithCommas(FinalIncome);
            popInResElement();
            
           
        } else {
            FinalIncomeValueElement.innerHTML = numberWithCommas(theAmount);
            popInResElement();
        }
    }

}
);
/*
Simple ,like if input field border and error symbol was red 
it changes it back to black/normal 
when we click on that field which is with red borders

*/
inputElements.forEach(element => {
    element.addEventListener('click', changeBorderToBlack(element))
})

/*
calls the popOutResElement() when we click on close button from popup of result

*/


closeButton.addEventListener('click',()=>{
    popOutResElement();
})




