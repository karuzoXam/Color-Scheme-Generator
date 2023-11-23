const fetchBtn = document.getElementById('fetch-color-btn');
const form = document.getElementById('form');
const colorContainer = document.getElementById('color-container');
const hexCodeContainer = document.getElementById('hex-code-container');

const fetchColors = function (colorValue = '#000000', mode = 'monochrome') {
    const hexString = colorValue.slice(1);

    fetch(`https://www.thecolorapi.com/scheme?hex=${hexString}&mode=${mode}&count=5`)
        .then(res => res.json())
        .then(data => {
            clearContainers();
            const colorsArr = data.colors;

            colorsArr.forEach((color, i) => {
                renderColorEl(i, data.colors[i].hex.value);
                renderHexCodes(i, data.colors[i].hex.value);
            });
        })
}

const getColors = function () {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const colorValue = document.getElementById('color-picker').value;
        const mode = document.getElementById('select-option').value;

        fetchColors(colorValue, mode)
        form.reset();
    })
}

const clearContainers = function () {
    colorContainer.innerHTML = '';
    hexCodeContainer.innerHTML = '';
}

const renderColorEl = function (index, hexVal) {
    const html = `
    <div class="color-box box-${index + 1}" 
         style="background-color: ${hexVal}">
    </div>`
    colorContainer.insertAdjacentHTML('beforeend', html);
}

const renderHexCodes = function (index, hexVal) {
    const html = `<div class="hex-code"><p class="hex-code-${index + 1}">${hexVal}</p></div>`;
    hexCodeContainer.insertAdjacentHTML('beforeend', html);
}

const init = function () {
    fetchColors();
    getColors();
}
init();


