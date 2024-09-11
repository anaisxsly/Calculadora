
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.getAttribute('data-value');
            
            if (e.target.id === 'clear') {
                currentInput = '';
                display.textContent = '0';
            } else if (e.target.id === 'delete') {
                currentInput = currentInput.slice(0, -1);
                display.textContent = currentInput || '0';
            } else if (e.target.id === 'equals') {
                try {
                    if (currentInput.includes('Math.sqrt(') && !currentInput.endsWith(')')) {
                        currentInput += ')';
                    }
                    const evaluatedExpression = currentInput.replace(/x/g, '*');
                    display.textContent = evaluateExpression(evaluatedExpression) || '0';
                    currentInput = display.textContent;
                } catch {
                    display.textContent = 'Error';
                }
            } else {
                if (value) {
                    if (value === '√') {
                        if (/\d$/.test(currentInput)) {
                            currentInput += '*Math.sqrt(';
                        } else {
                            currentInput += 'Math.sqrt(';
                        }
                        display.textContent = currentInput.replace(/Math\.sqrt\(/g, '√(');
                    } else if (value === '%') {
                        currentInput += '/100';
                    } else if (value === 'x') {
                        currentInput += 'x';
                    } else {
                        if (/\d$/.test(currentInput) && value === '(') {
                            currentInput += '*(';
                        } else {
                            currentInput += value;
                        }
                    }
                    display.textContent = currentInput.replace(/Math\.sqrt\(/g, '√(').replace(/\*/g, 'x');
                }
            }
        });
    });

    function evaluateExpression(expression) {
        return Function(`'use strict'; return (${expression})`)();
    }
});
