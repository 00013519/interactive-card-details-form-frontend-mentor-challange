
const inputs = {
     name : document.getElementById('name'),
     number : document.getElementById('number'),
     month : document.getElementById('month'),
     year : document.getElementById('year'),
     cvc : document.getElementById('cvc')
}
const errors = {
     name : document.getElementById('name-error'),
     number : document.getElementById('number-error'),
     date : document.getElementById('date-error'),
     cvc : document.getElementById('cvc-error')
}
const btn_confirm = document.getElementById('btn-confirm')
const card_form = document.getElementById('card-form')
const form_completed = document.getElementById('form-completed')
btn_confirm.addEventListener('click', () => {
     reset_errors()
     validate()
     if(correctInfo){
          card_form.style.display = 'none'
          form_completed.style.display = 'block'
     }
})
let correctInfo = true
let red = '1px solid hsl(0, 100%, 66%)';
let blank = "Can't be blank"
let numberOnly = "Wrong format, numbers only"
let invalidNumber = "Invalid card number"
let invalidDate = "Invalid expiry date"
let invalidCvc = "Invalid cvc number"


const validate = () => {
     for( const prop in inputs){
          let a = inputs[prop].value.trim()
          if(a.length < 1){
               border_color(prop, red)
               error_texts(prop, blank)
               correctInfo = false
          }
     }
     let numbersRegExp = /[0-9]/g
     let input_num = inputs.number.value.trim()
     if(!numbersRegExp.test(input_num)  && input_num.length > 0){
          error_texts('number', numberOnly)
          border_color('number', red)
          correctInfo = false
     } else if ([...input_num.matchAll(numbersRegExp)].length != 15 && input_num.length > 0){
          error_texts('number', invalidNumber)    
          border_color('number', red)      
          correctInfo = false
     }
     let input_month = inputs.month.value.trim()
     if((input_month > 12 || input_month < 1) && input_month.length > 0){
          error_texts('date', invalidDate)
          border_color('month', red)
          correctInfo = false
     }
     let input_year = inputs.year.value.trim()
     if(!numbersRegExp.test(input_year) && input_year.length > 0){
          error_texts('date', numberOnly)
          border_color('year', red)
          correctInfo = false
     } else if(input_year.length != 2 && input_year.length > 0){
          error_texts('date', invalidDate)
          border_color('year', red)
     }
     let input_cvc = inputs.cvc.value.trim()
     if(!numbersRegExp.test(input_cvc) && input_cvc.length > 0){
          error_texts('cvc', numberOnly)
          border_color('cvc', red)
          correctInfo = false
     } else if(input_cvc.length != 3 && input_cvc.length > 0){
          error_texts('cvc', invalidCvc)
          border_color('cvc', red)
          correctInfo = false
     }




     
}
function reset_errors() {
     for (const prop in inputs){
          border_color(prop, '')
     }
     for (const prop in errors){
          error_texts(prop, '')
     }
     correctInfo = true
}
function border_color(input, color) {
     inputs[input].style.border = color
}
function error_texts(input, text) {
     if(input == 'month' || input == 'year'){
          input = 'date'
     }
     errors[input].innerText = text
}