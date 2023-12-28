const monthCode = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

const form = document.getElementById("form")
const dderr = document.getElementById("dd-error")
const mmerr = document.getElementById("mm-error")
const yyerr = document.getElementById("yyyy-error")
const daysResult = document.getElementById("days-result")
const monthsResult = document.getElementById("months-result")
const yearsResult = document.getElementById("years-result")

const animate = (valueRef, elemRef) => {
    var Cont = { val: 0 }
    TweenLite.to(Cont, 1.5, {
        val: valueRef,
        roundProps: "val",

        onUpdate: function () {
            elemRef.innerHTML = Cont.val;
        }
    });
}


const validate = (e) => {
    e.preventDefault();
    const day = parseInt(document.getElementById("day").value)
    const month = parseInt(document.getElementById("month").value)
    const year = parseInt(document.getElementById("year").value)
    let isValid = true;
    //Validation
    if (day > 31 || ([4, 6, 9, 11].includes(month) && day > 30) || (month === 2 && year % 4 !== 0 && day > 28) || (month === 2 && year % 4 === 0 && day > 29)) {
        dderr.textContent = "Must be a valid date"
        dderr.className = "error"
        isValid = false
    }

    if (month > 12) {
        mmerr.textContent = "Must be a valid month"
        mmerr.className = "error"
        isValid = false
    }

    if (year > 2023) {
        yyerr.textContent = "Must be in the past"
        yyerr.className = "error"
        isValid = false
    }

    if (isValid) {
        let inputDate = `${year.toString()}-${month.toString()}-${day.toString()}`
        let result = getAgeDetails(dayjs(inputDate), dayjs())
        animate(result.years, yearsResult)
        animate(result.months, monthsResult)
        animate(result.days, daysResult)

        // yearsResult.textContent = result.years
        // monthsResult.textContent = result.months
        // daysResult.textContent = result.days
    }
}

const getAgeDetails = (oldDate, newDate) => {
    const years = newDate.diff(oldDate, 'year');
    const months = newDate.diff(oldDate, 'month') - years * 12;
    const days = newDate.diff(oldDate.add(years, 'year').add(months, 'month'), 'day');

    return {
        years,
        months,
        days,
        allDays: newDate.diff(oldDate, 'day'),
    };
};

form.addEventListener("submit", validate)
