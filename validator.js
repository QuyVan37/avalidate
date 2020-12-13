
function Validator(options) {

    var selectorRules = {};


    // Ham xu li validate
    function validate(inputElement, rule) {
        // value : inputElement.value
        // test func: rule.test
        var errorMessage;
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        //lay tat ca cac rules cua selector
        var rules = selectorRules[rule.selector];
        //lap va kiem tra tung rule
        for (var i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value)
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid')

        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid')
        }

        return !errorMessage
    }


    var formElement = document.querySelector(options.form);
    if (formElement) {
        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true;
            //lap qua tung rule va valid
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule)
                if (!isValid) {
                    isFormValid = false;
                }
            })

            if (isFormValid) {
                // Truong hop submit bang API
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var fromvalues = Array.from(enableInputs).reduce(function (values, input) {
                        return (values[input.name] = input.value) && values;
                    },{});
                    options.onSubmit(fromvalues);
                } 
                // Submit form mac dinh cua form
                else{
                    formElement.submit();
                }

            }
        }

    }

    // Lap qua cac rule va xu li (blur, input ....)
    options.rules.forEach(function (rule) {
        //Luu lai cac rules
        if (Array.isArray(selectorRules[rule.selector])) {
            selectorRules[rule.selector].push(rule.test);
        } else {
            selectorRules[rule.selector] = [rule.test];
        }
        selectorRules[rule.selector]

        var inputElement = formElement.querySelector(rule.selector)
        if (inputElement) {
            // xử lí khi đã blur ra khỏi input
            inputElement.onblur = function () {

                validate(inputElement, rule)

            }

            // Xử lí khi đang nhập.
            inputElement.oninput = function () {
                var errorElement = inputElement.parentElement.querySelector('.form-message');
                errorElement.innerText = '';
                inputElement.parentElement.classList.remove('invalid')

            }
        }
    })

}
// dinh nghi rules
// Nguyên tắc lỗi.
//1. có lỗi => trả lỗi
//2. Không lỗ => không trả gì cả.
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message || 'Please input this filed';
        }
    }
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value) ? undefined : message || 'This field must be email';
        }
    }
}
Validator.minLength = function (selector, length, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= length ? undefined : message || `Required min length is ${length}`;
        }
    }
}
Validator.isConfirm = function (selector, confirmSlecletor, message){
    return {
        selector: selector,
        test: function(value){
            var valueOfConfirmSelector = document.querySelector(confirmSlecletor).value;
            return value == valueOfConfirmSelector ? undefined : message || 'Your input no correct!'
        }
    }

}

