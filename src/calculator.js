import readlineSync from "readline-sync";

function gatherOperandsAndOperator() {
  const firstOperand = Number(readlineSync.question("First number: "));
  const operator = readlineSync.question("Operand: ");
  const secondOperand = Number(readlineSync.question("Second number: "));

  if (Number.isNaN(firstOperand) || Number.isNaN(secondOperand)) {
    console.clear();
    console.log("type of operand should be: number");
    return gatherOperandsAndOperator();
  }

  return [firstOperand, operator, secondOperand];
}

function makeCalculation(operandsAndOperator) {
  const [operand1, operator, operand2] = operandsAndOperator;

  const mathActions = {
    "+": operand1 + operand2,
    "-": operand1 - operand2,
    "*": operand1 * operand2,
    "/": operand2 === 0 ? "error" : operand1 / operand2,
    "**": operand1 ** operand2,
  };

  if (!mathActions[operator]) {
    return "operator error";
  }

  return mathActions[operator];
}

function isPlayerAgree() {
  const answear = readlineSync.question("Do you want to proceed?(Yes/No): ");
  return answear.toLowerCase() === "yes" ? true : false;
}

function calculator() {
  const calculationResults = [];
  return () => {
    let proceedCalculation;

    do {
      proceedCalculation = false;
      const [operand1, operator, operand2] = gatherOperandsAndOperator();
      const answear = makeCalculation([operand1, operator, operand2]);

      calculationResults.push(
        `${operand1} ${operator} ${operand2} = ${answear}`,
      );

      console.clear();
      console.log(`${calculationResults.join("\n")}\n`);
      console.log(`The answear is: ${answear}`);
      proceedCalculation = isPlayerAgree();
    } while (proceedCalculation);
  };
}

const play = calculator();

play();
