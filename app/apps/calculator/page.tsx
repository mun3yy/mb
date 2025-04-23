"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [firstOperand, setFirstOperand] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false)

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(String(digit))
      setWaitingForSecondOperand(false)
    } else {
      setDisplay(display === "0" ? String(digit) : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay("0.")
      setWaitingForSecondOperand(false)
      return
    }

    if (!display.includes(".")) {
      setDisplay(display + ".")
    }
  }

  const clearDisplay = () => {
    setDisplay("0")
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecondOperand(false)
  }

  const handleOperator = (nextOperator) => {
    const inputValue = Number.parseFloat(display)

    if (firstOperand === null) {
      setFirstOperand(inputValue)
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator)
      setDisplay(String(result))
      setFirstOperand(result)
    }

    setWaitingForSecondOperand(true)
    setOperator(nextOperator)
  }

  const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand
      case "-":
        return firstOperand - secondOperand
      case "*":
        return firstOperand * secondOperand
      case "/":
        return firstOperand / secondOperand
      default:
        return secondOperand
    }
  }

  const performCalculation = () => {
    if (operator === null || waitingForSecondOperand) {
      return
    }

    const inputValue = Number.parseFloat(display)
    const result = calculate(firstOperand, inputValue, operator)

    setDisplay(String(result))
    setFirstOperand(result)
    setOperator(null)
    setWaitingForSecondOperand(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black/[0.96]">
      <div className="w-full max-w-md bg-gray-900 rounded-lg overflow-hidden shadow-lg">
        <div className="p-4 bg-gray-800">
          <div className="text-right text-white text-3xl font-mono p-2 h-16 flex items-center justify-end overflow-hidden">
            {display}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-1 p-2">
          <Button variant="outline" className="bg-gray-700 text-white hover:bg-gray-600" onClick={clearDisplay}>
            C
          </Button>
          <Button
            variant="outline"
            className="bg-gray-700 text-white hover:bg-gray-600"
            onClick={() => setDisplay(String(Number.parseFloat(display) * -1))}
          >
            +/-
          </Button>
          <Button
            variant="outline"
            className="bg-gray-700 text-white hover:bg-gray-600"
            onClick={() => setDisplay(String(Number.parseFloat(display) / 100))}
          >
            %
          </Button>
          <Button
            variant="outline"
            className="bg-purple-700 text-white hover:bg-purple-600"
            onClick={() => handleOperator("/")}
          >
            ÷
          </Button>

          {[7, 8, 9].map((num) => (
            <Button
              key={num}
              variant="outline"
              className="bg-gray-800 text-white hover:bg-gray-700"
              onClick={() => inputDigit(num)}
            >
              {num}
            </Button>
          ))}

          <Button
            variant="outline"
            className="bg-purple-700 text-white hover:bg-purple-600"
            onClick={() => handleOperator("*")}
          >
            ×
          </Button>

          {[4, 5, 6].map((num) => (
            <Button
              key={num}
              variant="outline"
              className="bg-gray-800 text-white hover:bg-gray-700"
              onClick={() => inputDigit(num)}
            >
              {num}
            </Button>
          ))}

          <Button
            variant="outline"
            className="bg-purple-700 text-white hover:bg-purple-600"
            onClick={() => handleOperator("-")}
          >
            -
          </Button>

          {[1, 2, 3].map((num) => (
            <Button
              key={num}
              variant="outline"
              className="bg-gray-800 text-white hover:bg-gray-700"
              onClick={() => inputDigit(num)}
            >
              {num}
            </Button>
          ))}

          <Button
            variant="outline"
            className="bg-purple-700 text-white hover:bg-purple-600"
            onClick={() => handleOperator("+")}
          >
            +
          </Button>

          <Button
            variant="outline"
            className="bg-gray-800 text-white hover:bg-gray-700 col-span-2"
            onClick={() => inputDigit(0)}
          >
            0
          </Button>

          <Button variant="outline" className="bg-gray-800 text-white hover:bg-gray-700" onClick={inputDecimal}>
            .
          </Button>

          <Button
            variant="outline"
            className="bg-purple-700 text-white hover:bg-purple-600"
            onClick={performCalculation}
          >
            =
          </Button>
        </div>
      </div>
    </div>
  )
}
