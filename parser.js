/*
 * Copyright 2022 Liju Jayakumar. All Rights Reserved.
*/

function clean_up(inputText) {

    inputText = inputText.replace(/S/g, "5");

    return inputText;
}

function parse() {

    var inputText = clean_up(document.querySelector('#input-text').value);
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

    showHideDownload();
}

function handleFileSelect(event) {
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(event.files[0])
}

function handleFileLoad(event) {
    document.querySelector('#input-text').value = event.target.result;
}

function clearAll() {

    document.querySelector('#input-text').value = '';
    document.querySelector('#output-text').value = '';
    document.querySelector('#fileInput').value = '';

    showHideDownload();
}

function download() {
    var textToDownload = document.querySelector('#output-text').value;

    if (textToDownload) {
        var textFileAsBlob = new Blob([textToDownload], { type: 'text/plain' });
        var downloadLink = document.createElement("a");
        downloadLink.download = `phone_numbers_${Date.now()}.txt`;
        downloadLink.innerHTML = "Download File";
        if (window.webkitURL != null) {
            // Chrome allows the link to be clicked
            // without actually adding it to the DOM.
            downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        }
        else {
            // Firefox requires the link to be added to the DOM
            // before it can be clicked.
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }

        downloadLink.click();

    }
}

function showHideDownload() {
    const visible = document.querySelector('#output-text').value ? 'visible' : 'hidden';
    document.querySelector('#output-download').style.visibility = visible;
}