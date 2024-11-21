
import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handleInput = (value) => {
    setInput((prev) => prev + value);
  };

  const calculate = () => {
    try {
      const res = evaluateExpression(input);
      setResult(res);
    } catch (error) {
      setResult('Error');
    }
  };

  const clearInput = () => {
    setInput('');
    setResult(null);
  };

  const evaluateExpression = (expression) => {
    const operators = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => (b !== 0 ? a / b : 'Error'),
    };

    const tokens = expression.split(/(\D)/); // Split by operators
    let result = parseFloat(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const nextNum = parseFloat(tokens[i + 1]);

      if (operators[operator] && !isNaN(nextNum)) {
        result = operators[operator](result, nextNum);
      } else {
        throw new Error('Invalid Expression');
      }
    }

    return result;
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          <div>{input}</div>
          <div className="result">{result !== null ? `= ${result}` : ''}</div>
        </div>
        <div className="buttons">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
            <button key={num} onClick={() => handleInput(num.toString())}>
              {num}
            </button>
          ))}
          {['+', '-', '*', '/'].map((op) => (
            <button key={op} onClick={() => handleInput(op)}>
              {op}
            </button>
          ))}
          <button onClick={clearInput}>C</button>
          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;