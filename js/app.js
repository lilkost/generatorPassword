// arr element's create password
const arrNumbers = [1,2,3,4,5,6,7,8];
const arrLetters = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+',
    '[', ']', '{', '}', ';', ':', '?', '~'
];

// node 
const passwordTextNode = document.getElementById('passwordText');
const generatePasswordNode = document.getElementById('generatePassword');
const passwordComplexityNode = document.querySelectorAll('.password__complexity span');
const btnCopyNode = document.getElementById('btnCopy');

const inputRangeNode = document.getElementById('inputRange');
const allBtnFilterLetersNode = document.querySelectorAll('.filter-btn-leters');
const allBtnFilterSymbolNode = document.querySelectorAll('.filter-btn-number-symbol');
const passwordListNode = document.querySelector('.password-list');
const btnClearHisoryNode = document.getElementById('btnClearHistry');
const notHistoryPassword = document.querySelector('.not-history-password');

// глобальный объект для доступа к данным
window.allSetings = {
    countElement: 1,
    symbol: false,
    numbers: false,
    uppercaseLetters: false,
    lowercaseLetters: false,
}

// input change value
inputRangeNode.addEventListener('change', (e)=> {
    const count = Number(e.target.value);
    window.allSetings.countElement = count;
});

// change lower || upper case 
allBtnFilterLetersNode.forEach(btn=> {
    changeWindowAllSettingsValue(btn, allBtnFilterLetersNode);
});

function changeWindowAllSettingsValue(btn, arr) {
    btn.addEventListener('click', (e)=> {
        arr.forEach(b=> {
            b.classList.remove('is-active');
        });

        btn.classList.add('is-active');

        const atribute = String(btn.getAttribute('data-filter-btn'));
        
        if(atribute === 'uppercase' || atribute === 'lowercase') {
            if(atribute === 'uppercase') {
                window.allSetings.uppercaseLetters = true;
                window.allSetings.lowercaseLetters = false;
            }
            else {
                window.allSetings.uppercaseLetters = false;
                window.allSetings.lowercaseLetters = true;
            }
        } else {
            if(atribute === 'symbols') {
                window.allSetings.symbol = true;
                window.allSetings.numbers = false;
            }else {
                window.allSetings.symbol = false;
                window.allSetings.numbers = true;
            }
        }
        
    });
}

//change number || symbol
allBtnFilterSymbolNode.forEach(btn=> {
    changeWindowAllSettingsValue(btn, allBtnFilterSymbolNode)
});

// generatePassword
generatePasswordNode.addEventListener('click', ()=> {
    generatePassword();
});

function generatePassword() {
    let resultText = '';
    let arr = [];
    // eсли все значеия по умолчанию равны false, тогда будет генерироватся общий массив с помощью
    if(window.allSetings.numbers === false && window.allSetings.symbol === false) {
        arr = arrNumbers.concat(arrLetters);

        for(let i = 0; i < window.allSetings.countElement; i++) {
            resultText += arr[Math.floor(Math.random() * arr.length)]
        }
    }

    // eсли выбрано значение number
    if(window.allSetings.numbers === true && window.allSetings.symbol === false) {
        arr = arrNumbers;
    
        for(let i = 0; i < window.allSetings.countElement; i++) {
            resultText += arr[Math.floor(Math.random() * arr.length)]
        }
    }

    // eсли выбрано значение symbol
    if(window.allSetings.numbers === false && window.allSetings.symbol === true) {
        arr = arrLetters;
        
        for(let i = 0; i < window.allSetings.countElement; i++) {
            resultText += arr[Math.floor(Math.random() * arr.length)]
        }
    }

    resultText = String(resultText);

    // если выбран верхний регистр
    if(window.allSetings.uppercaseLetters === true && window.allSetings.lowercaseLetters === false) {
        resultText = resultText.toUpperCase();
    }
    // если выбран нижний регистр
    if(window.allSetings.uppercaseLetters === false && window.allSetings.lowercaseLetters === true) {
        resultText = resultText.toLowerCase();
    }
    const hardPassword = checkPasswords(resultText);
    
    switch (hardPassword) {
        case 'Простой':
            passwordComplexityNode.forEach(line=> {
                line.classList.remove('line-bg');
            })
            passwordComplexityNode[0].classList.add('line-bg')
            break;
        case 'Средний':
            passwordComplexityNode.forEach(line=> {
                line.classList.remove('line-bg');
            })
            passwordComplexityNode[0].classList.add('line-bg')
            passwordComplexityNode[1].classList.add('line-bg')
            passwordComplexityNode[2].classList.add('line-bg')
            break;
        case 'Сложный':
            passwordComplexityNode.forEach(line=> {
                line.classList.remove('line-bg');
            })
            passwordComplexityNode[0].classList.add('line-bg')
            passwordComplexityNode[1].classList.add('line-bg')
            passwordComplexityNode[2].classList.add('line-bg')
            passwordComplexityNode[3].classList.add('line-bg')
            break;
    }

    passwordTextNode.innerText = resultText;

    createElement(resultText);
    appendLocalStorage(resultText);
}

// examination complexity password 
function checkPasswords(password) {
    var password = password; // Берем пароль из формы
    var s_letters = "qwertyuiopasdfghjklzxcvbnm"; // Буквы в нижнем регистре
    var b_letters = "QWERTYUIOPLKJHGFDSAZXCVBNM"; // Буквы в верхнем регистре
    var digits = "0123456789"; // Цифры
    var specials = "!@#$%^&*()_-+=\|/.,:;[]{}"; // Спецсимволы
    var is_s = false; // Есть ли в пароле буквы в нижнем регистре
    var is_b = false; // Есть ли в пароле буквы в верхнем регистре
    var is_d = false; // Есть ли в пароле цифры
    var is_sp = false; // Есть ли в пароле спецсимволы
    for (var i = 0; i < password.length; i++) {
      /* Проверяем каждый символ пароля на принадлежность к тому или иному типу */
        if (!is_s && s_letters.indexOf(password[i]) != -1) is_s = true;
        else if (!is_b && b_letters.indexOf(password[i]) != -1) is_b = true;
        else if (!is_d && digits.indexOf(password[i]) != -1) is_d = true;
        else if (!is_sp && specials.indexOf(password[i]) != -1) is_sp = true;
    }
    var rating = 0;
    var text = "";
    if (is_s) rating++; // Если в пароле есть символы в нижнем регистре, то увеличиваем рейтинг сложности
    if (is_b) rating++; // Если в пароле есть символы в верхнем регистре, то увеличиваем рейтинг сложности
    if (is_d) rating++; // Если в пароле есть цифры, то увеличиваем рейтинг сложности
    if (is_sp) rating++; // Если в пароле есть спецсимволы, то увеличиваем рейтинг сложности
    /* Далее идёт анализ длины пароля и полученного рейтинга, и на основании этого готовится текстовое описание сложности пароля */
    if (password.length < 6 && rating < 3) text = "Простой";
    else if (password.length < 6 && rating >= 3) text = "Средний";
    else if (password.length >= 8 && rating < 3) text = "Средний";
    else if (password.length >= 8 && rating >= 3) text = "Сложный";
    else if (password.length >= 6 && rating == 1) text = "Простой";
    else if (password.length >= 6 && rating > 1 && rating < 4) text = "Средний";
    else if (password.length >= 6 && rating == 4) text = "Сложный";
    return text;
}

// copy node text
btnCopyNode.addEventListener('click', ()=> copyPassword(passwordTextNode.innerText));

function copyPassword(node) {
    const text = node;
    if(text === 'password') return;

    navigator.clipboard.writeText(text).then(function() {
        console.log('Текст успешно скопирован в буфер обмена');
    }, function(err) {
        console.error('Произошла ошибка при копировании текста: ', err);
    });
}

// create element 
function createElement(text) {
    const li = document.createElement('li');
    const div = document.createElement('div');
    const p = document.createElement('p');
    const span = document.createElement('span');
    const button = document.createElement('button');

    li.classList.add('password-item');
    div.classList.add('password-item__box');
    button.classList.add('password-item__btn-copy');

    button.addEventListener('click', ()=> {
        copyPassword(text)
    });

    p.innerText = text;
    span.innerText = text;

    div.append(span);
    div.append(p);

    li.append(div);
    li.append(button);
    
    passwordListNode.append(li);

    notHistoryPassword.style.display = 'none';
}
// append localStorage
function appendLocalStorage(text) {
    if(localStorage.getItem("list")) {
        localStorage.setItem("list", `${localStorage.getItem("list")} ${text}`);
    }else {
        localStorage.setItem("list", text);
    }
}

// check in localstorage 
checkLocalStorage();

function checkLocalStorage() {
    if(!localStorage.getItem("list")) return;

    const arrText = localStorage.getItem("list").split(' ');

    arrText.forEach(item=> {
        createElement(item);
    });
}

//clear password history
btnClearHisoryNode.addEventListener('click', ()=> clearHistory());

function clearHistory() {
    localStorage.removeItem("list");
    const items = document.querySelectorAll('.password-item');

    if(!items) return;

    items.forEach(item=> {
        item.remove();
    });

    notHistoryPassword.style.display = 'block';
}