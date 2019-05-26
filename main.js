const citiesOfRegion = {
    center: ['', 'Cherkasy', 'Dnipro', 'Kropyvnytskyi', 'Poltava', 'Vinnytsia', 'Zhytomyr', 'Not in the list'],
    North: ['', 'Chernihiv', 'Sumy', 'Not in the list'],
    East: ['', 'Donetsk', 'Kharkiv', 'Luhansk', 'Not in the list'],
    South: ['', 'Kherson', 'Mykolaiv', 'Odesa', 'Zaporizhzhia', 'Not in the list'],
    West: ['', 'Chernivtsi', 'Ivano-Frankivsk', 'Khmelnytskyi',
        'Lutsk', 'Lviv', 'Rivne', 'Ternopil', 'Uzhhorod', 'Not in the list']
};

const { formReg } = document;
const { name } = formReg;
const { prefer } = formReg;
const { tel } = formReg;
const { regions } = formReg;
const { cities } = formReg;
const { button } = formReg;

function checkInputName() {
    name.classList.remove('valid');
    name.classList.remove('inValid');
    isValidForm();
}

function checkInputTelephone() {
    tel.classList.remove('inValid');
    tel.classList.remove('valid');
    isValidForm();
}

function validateName() {
    const fullName = name.value.trim().split(' ');
    const { length } = fullName;
    const pattern = /[A-Z][a-zA-Z][^#&<>"~;$^%{}?]{1,20}$/;

    if (length > 1 && length < 4) {
        return fullName.every(word => pattern.test(word));
    }
}

function addColorInputName() {
    if (validateName()) {
        name.classList.add('valid');
        return;
    }

    name.classList.add('inValid');
}

function validateTel() {
    return /^\+?3?8?(0\d{9})$/.test(tel.value);
}

function addColorInputTel() {
    if (validateTel()) {
        tel.classList.add('valid');
        return;
    }

    tel.classList.add('inValid');
}

function showSelectCities() {
    const valueSelectRegions = regions.value;
    const region = citiesOfRegion[valueSelectRegions];

    while (cities.hasChildNodes()) {
        cities.removeChild(cities.firstChild);
    }

    if (region) {
        const newCities = region.map(city => {
            const tegOption = document.createElement('option');
            tegOption.textContent = city;
            tegOption.setAttribute('value', city);
            return tegOption;

        });

        cities.append(...newCities);
    }

    isValidForm();
}

function chooseCities() {
    isValidForm();
}

function hideDomElements() {
    tel.disabled = !tel.disabled;
    regions.disabled = !regions.disabled;
    cities.disabled = !cities.disabled;

    isValidForm();
}

function isValidForm() {
    if (prefer.checked && validateName()) {
        button.disabled = false;
        return;
    }

    if (
        validateName()
        && validateTel()
        && regions.value
        && (cities.value ||
        regions.value === 'Kyiv')
    ) {
        button.disabled = false;
        return;
    }

    button.disabled = true;
}

function addFormListeners() {
    name.addEventListener('input', checkInputName);
    name.addEventListener('blur', addColorInputName);
    prefer.addEventListener('click', hideDomElements);
    tel.addEventListener('input', checkInputTelephone);
    tel.addEventListener('blur', addColorInputTel);
    regions.addEventListener('change', showSelectCities);
    cities.addEventListener('change', chooseCities);
}

document.addEventListener('DOMContentLoaded', () => {
    addFormListeners();
});
