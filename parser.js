/*
 * Copyright 2022 Liju Jayakumar. All Rights Reserved.
*/

function clean(inputText) {
    inputText = inputText.replace(/S/g, "5");

    return inputText;
}

function parse() {

    var inputText = clean(document.querySelector('#input-text').value);
    var patters = document.querySelector('#input-patterns').options;
    var output = document.querySelector('#output-text');

    output.value = '';
    for (let i = 0; i < patters.length; i++) {
        var pattern = patters[i].value;
        const regex = new RegExp(pattern, 'gm')
        let m;

        while ((m = regex.exec(inputText)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            // The result can be accessed through the `m`-variable.
            m.forEach((match) => {
                var phone_number = match.replace(/ /g, "");
                output.value += `${phone_number}` + '\r\n';
            });
        }
    }
}

function handleFileSelect(event) {
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(event.files[0])
}

function handleFileLoad(event) {
    console.log(event);
    document.querySelector('#input-text').value = event.target.result;
}