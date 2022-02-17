document.getElementById("calculateBtn").addEventListener('click', function () {
    // calling getReadyInputValue function for get input 
    const income = getReadyInputValue("incomeField", true)
    const expenses = totalExpenses()
    console.log(expenses);
    const balance = balanceCount(income, expenses);

    if (isNaN(income)||income<0) {
        error("incomeError", true)
    }
    else if (isNaN(expenses)) {
        error("expensesError", true)
        error("incomeError", false)
    }
    else if (income < expenses) {
        error("calculateError", true)
        error("expensesError", false)
        error("incomeError", false)
        // document.getElementById("calculateError").style.display="block"
    }
    else {
        // setting expenses and balance
        document.getElementById("totalExpenses").innerText = expenses
        document.getElementById("totalBalance").innerText = balance
        //    hiding error message
        error("incomeError", false)
        error("expensesError", false)
        error("calculateError", false)
        // clearing input field 

        clearInputFields("foodField")
        clearInputFields("rentField")
        clearInputFields("clothField")
    }

})
/*--------------
  getReadyInputValue is here 
  --------------*/
function getReadyInputValue(id, isInput) {
    const field = document.getElementById(id);
    if (isInput) {
        const fieldValue = parseFloat(field.value)
        return fieldValue;
    }
    else {
        const innerNum = parseFloat(id.innerText)
        return innerNum;
    }
}
/*--------------
  totalEXpenses is here 
  --------------*/
function totalExpenses() {
    const food = getReadyInputValue("foodField", true);
    const rent = getReadyInputValue("rentField", true);
    const cloth = getReadyInputValue("clothField", true);
    if (food>=0 && rent>=0 &&cloth>=0) {
        const total = food + rent + cloth;
        return total
    }
}
/*--------------
  balanceCount is here 
  --------------*/
function balanceCount(have, spent) {
    const balance = have - spent
    return balance
}
/*--------------
  error is handling is here 
  --------------*/
function error(id, doBlock) {
    if (doBlock) {
        document.getElementById(id).style.display = "block"
    }
    else {

        document.getElementById(id).style.display = "none"
    }
}
/*--------------
  clear is here 
  --------------*/
function clearInputFields(id) {
    document.getElementById(id).value = ""
}
function savingAmountUpdate(income) {

    const savingField = document.getElementById("savingField");
    const savingNum = parseFloat(savingField.value)
    if (savingNum>0) {
        const savingAmount = (savingNum / 100) * income
        return savingAmount;
    }
    else{
        error("minus",true);
        error("cantSave", false)
    }
        
    
}
document.getElementById("savingBtn").addEventListener("click", function () {
    const balance = document.getElementById("totalBalance");
    const balanceNum = parseFloat(balance.innerText)
    console.log(balanceNum);
    const savingAmount = document.getElementById("savingAmount")
    if (balanceNum <= 0) {
        error("saveError", true)
    }

    else {

        const remainingBalance = document.getElementById("RemainingBalance")
        const income = getReadyInputValue("incomeField", true)
        const getSavingAmount = savingAmountUpdate(income)
        if (balanceNum >= getSavingAmount) {
            savingAmount.innerText = getSavingAmount
            remainingBalance.innerText = balanceNum - getSavingAmount;
        
        }
        else {
            error("cantSave", true)
        }
        error("saveError", false)
        clearInputFields("incomeField")
        clearInputFields("savingField")    
    }

})
