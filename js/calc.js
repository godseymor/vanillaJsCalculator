'use strict';

(function () {
    const inputNode = document.querySelector('.header__input');

    const buttons = document.querySelectorAll('.inputValue');

    const percentBtn = document.querySelector('.percent');
    const equalsBtn = document.querySelector('.equals');
    const clearBtn = document.querySelector('.clear');

    // keyCode : [value, operator]
    const availableKeys = {
        48: ['0', false], // 0
        49: ['1', false], // 1
        50: ['2', false], // 2
        51: ['3', false], // 3
        52: ['4', false], // 4
        53: ['5', false], // 5
        54: ['6', false], // 6
        55: ['7', false], // 7
        56: ['8', false], // 8
        57: ['9', false], // 9
        40: ['(', true], // (
        41: [')', true], // )
        42: ['*', true], // *
        43: ['+', true], // +
        45: ['-', true], // -
        46: ['.', false], // .
        47: ['/', true]
    };

    const calculationError = 'Calculation Error';

    let calcState = {
        currentValue: 0,
        defaultState: true
    };

    document.addEventListener('keypress', function (evt) {
        if (availableKeys[evt.which]) {
            addValue(
                availableKeys[evt.which][0],
                availableKeys[evt.which][1]
            );
        } else if (evt.which === 37) {
            calcPercents();
        } else if (evt.which === 13) {
            calculate();
        } else {
            evt.preventDefault();
        }
    });

    document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 8) {
            clearLastSymbol();
        }
    });

    buttons.forEach(function (button) {
        button.addEventListener('click', function (evt) {
            addValue(evt.target.value);
        })
    });

    percentBtn.addEventListener('click', calcPercents);
    clearBtn.addEventListener('mousedown', clear);
    equalsBtn.addEventListener('click', calculate);

    /**
     * Функция добавления значения в инпут
     * 
     * @param {string} val - добавляемое число
     * @param {boolean} oper - значение == оператор или нет
     */

    function addValue(val, oper) {
        calcState.currentValue = inputNode.value;
        if (calcState.defaultState) {
            if (!oper) {
                inputNode.value = '';
                calcState.currentValue = '';
            }
            calcState.defaultState = false;
        }
        calcState.currentValue += val;
        inputNode.value = calcState.currentValue;
    };

    function calcPercents() {
        try {
            inputNode.value /= 100;
        } catch (err) {
            inputNode.value = calculationError;
            console.log(err);
        }
    };

    function clear() {
        inputNode.value = '0';
        calcState.defaultState = true;
    };

    function clearLastSymbol() {
        inputNode.value = inputNode.value.slice(0, -1);
        calcState.defaultState = false;
    }

    function calculate() {
        try {
            inputNode.value = parseFloat(eval(inputNode.value));
            calcState.defaultState = true;
        } catch (err) {
            inputNode.value = calculationError;
            calcState.defaultState = true;
            console.log(err);
        }
    };
})();