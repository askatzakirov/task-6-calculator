class my_calculator {
  constructor(previous_operand, current_operand) {
    this.previous_operand = previous_operand
    this.current_operand = current_operand
    this.clear_data()
  }

  clear_data() {
    this.current_Operand = ''
    this.previous_Operand = ''
    this.operation = undefined
  }

  delete_by_one() {
    this.current_Operand = this.current_Operand.toString().slice(0, -1)
  }

  append(number) {
    if (number === '.' && this.current_Operand.includes('.')) return
    this.current_Operand = this.current_Operand.toString() + number.toString()
  }

  choose_Operation(oper) {
    if (this.current_Operand === '') return
    if (this.previous_Operand !== '') {
      this.calculate()
    }
    this.oper = oper
    this.previous_Operand = this.current_Operand
    this.current_Operand = ''
  }

  calculate() {
    let result
    const previous = parseFloat(this.previous_Operand)
    const current = parseFloat(this.current_Operand)
    if (isNaN(previous) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        result = previous + current
        break
      case '-':
        result = previous - current
        break
      case '*':
        result = previous * current
        break
      case '/':
        result = previous / current
        break
      default:
        return
    }
    this.current_Operand = result
    this.operation = undefined
    this.previous_Operand = ''
  }

  get_display(number) {
    const num_string = number.toString()
    const integer = parseFloat(num_string.split('.')[0])
    const decimal = num_string.split('.')[1]
    let integer
    if (isNaN(integer)) {
      integer = ''
    } else {
      integer = integer.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimal != null) {
      return `${integer}.${decimal}`
    } else {
      return integer
    }
  }

  display() {
    this.current_operand.innerText =
      this.get_display(this.current_Operand)
    if (this.operation != null) {
      this.previous_operand.innerText =
        `${this.get_display(this.previous_Operand)} ${this.operation}`
    } else {
      this.previous_operand.innerText = ''
    }
  }
}


const num_buttons = document.querySelectorAll('[data-number]')
const operation_buttons = document.querySelectorAll('[data-operation]')
const equals_buttons = document.querySelector('[data-equals]')
const clear_button = document.querySelector('[data-delete]')
const all_clear_button = document.querySelector('[data-all-clear]')
const previous_operand = document.querySelector('[data-previous-operand]')
const current_operand = document.querySelector('[data-current-operand]')

const calc = new my_calculator(previous_operand, current_operand)

num_buttons.forEach(button => {
  button.addEventListener('click', () => {
    calc.append(button.innerText)
    calc.display()
  })
})

operation_buttons.forEach(button => {
  button.addEventListener('click', () => {
    calc.choose_Operation(button.innerText)
    calc.display()
  })
})

equals_buttons.addEventListener('click', button => {
  calc.calculate()
  calc.display()
})

all_clear_button.addEventListener('click', button => {
  calc.clear_data()
  calc.display()
})

clear_button.addEventListener('click', button => {
  calc.delete_by_one()
  calc.display()
})