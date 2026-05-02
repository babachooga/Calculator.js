import readlineSync from 'readline-sync'
import * as unary from './math.js'

function isUnaryOperator(operator) {
  const UnaryOperators = ['!', 'fib']
  return UnaryOperators.includes(operator)
}

function gatherOperandsAndOperator() {
  const firstOperand = Number(readlineSync.question('First number: '))
  const operator = readlineSync.question('Operand: ')
  const secondOperand = isUnaryOperator(operator)
    ? undefined
    : Number(readlineSync.question('Second number: '))

  if (Number.isNaN(firstOperand) || Number.isNaN(secondOperand)) {
    console.clear()
    console.log('type of operand should be: number')
    return gatherOperandsAndOperator()
  }

  return [firstOperand, operator, secondOperand]
}

function makeCalculation(operandsAndOperator) {
  const [operand1, operator, operand2] = operandsAndOperator

  const mathActions = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '**': (a, b) => a ** b,
    '!': unary.factorial,
  }

  if (!mathActions[operator]) {
    return 'operator error'
  }

  return isUnaryOperator(operator)
    ? mathActions[operator](operand1)
    : mathActions[operator](operand1, operand2)
}

function isPlayerAgree() {
  const answear = readlineSync.question('Do you want to proceed?(Yes/No): ')
  return answear.toLowerCase() === 'yes' ? true : false
}

function calculator() {
  const calculationResults = []
  return () => {
    let proceedCalculation

    do {
      proceedCalculation = false

      const [operand1, operator, operand2] = gatherOperandsAndOperator()
      const answear = makeCalculation([operand1, operator, operand2])

      const historyEntry = operand2
        ? `${operand1} ${operator} ${operand2} = ${answear}`
        : `${operand1} ${operator} = ${answear}`

      calculationResults.push(historyEntry)

      console.clear()
      console.log(`${calculationResults.join('\n')}\n`)
      console.log(`The answear is: ${answear}`)

      proceedCalculation = isPlayerAgree()
    } while (proceedCalculation)
  }
}

const play = calculator()

export default play
