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
    var auto_output = document.querySelector('#auto-output-text');

    output.value = '';
    for (let i = 0; i < patters.length; i++) {
        var pattern = patters[i].value;
        const regex = new RegExp(pattern, 'gm')
        let m;

        while ((m = regex.exec(inputText)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            m.forEach((match) => {
                var phone_number = match.replace(/ /g, "");
                output.value += `${phone_number}` + '\r\n';

                for (let index = 0; index < 10; index++) {
                    var auto_gen_number = phone_number.slice(0, -1) + index;

                    if (auto_gen_number != phone_number)
                        auto_output.value += `${auto_gen_number}` + '\r\n';
                }
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
    document.querySelector('#auto-output-text').value = '';
    document.querySelector('#fileInput').value = '';

    showHideDownload();
}

function download(selector) {

    var textToDownload = document.querySelector(selector).value;

    if (textToDownload) {
        var blob = new Blob([textToDownload], { type: 'text/plain' });

        var downloadLink = document.createElement("a");
        downloadLink.download = `phone_numbers_${Date.now()}.txt`;
        downloadLink.innerHTML = "download";

        if (window.webkitURL != null) {
            downloadLink.href = window.webkitURL.createObjectURL(blob);
        }
        else {
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }

        downloadLink.click();
    }
}

function showHideDownload() {
    document.querySelector('#output-download').style.visibility = document.querySelector('#output-text').value ? 'visible' : 'hidden';;
    document.querySelector('#auto-output-download').style.visibility = document.querySelector('#auto-output-text').value ? 'visible' : 'hidden';;

}