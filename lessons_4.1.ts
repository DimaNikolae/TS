interface ICalculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
    multiply(a: number, b: number): number;
    divide(a: number, b: number): number;
    percent(value: number, percent: number): number;
  }
  
  class Calculator implements ICalculator {
    add(a: number, b: number): number {
      return a + b;
    }
  
    subtract(a: number, b: number): number {
      return a - b;
    }
  
    multiply(a: number, b: number): number {
      return a * b;
    }
  
    divide(a: number, b: number): number {
      if (b === 0) {
        throw new Error("Ділення на нуль неможливе.");
      }
      return a / b;
    }
  
    percent(value: number, percent: number): number {
      return (value * percent) / 100;
    }
  
    calculate(operation: string, ...params: number[]): number {
      switch (operation.toLowerCase()) {
        case "add":
          return this.add(params[0], params[1]);
        case "subtract":
          return this.subtract(params[0], params[1]);
        case "multiply":
          return this.multiply(params[0], params[1]);
        case "divide":
          return this.divide(params[0], params[1]);
        case "percent":
          return this.percent(params[0], params[1]);
        default:
          throw new Error("Невідома операція.");
      }
    }
  }
  
  const calculator = new Calculator();
  
  console.log("Додавання (5 + 3):", calculator.add(5, 3));
  
  console.log("Віднімання (10 - 7):", calculator.subtract(10, 7));
  
  console.log("Множення (4 * 6):", calculator.multiply(4, 6));
  
  console.log("Ділення (20 / 4):", calculator.divide(20, 4));
  
  console.log("20% від 150:", calculator.percent(150, 20));
  
  console.log("Додавання через calculate (10 + 5):", calculator.calculate("add", 10, 5));
  console.log("Множення через calculate (3 * 3):", calculator.calculate("multiply", 3, 3));
  console.log("Відсоток через calculate (25% від 200):", calculator.calculate("percent", 200, 25));