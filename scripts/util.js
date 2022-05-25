/*
 * Copyright 2022 Liju Jayakumar. All Rights Reserved.
*/

/*jshint esversion: 6 */

// reCAPTCHA v3
function onSubmit(token) {
    document.getElementById("demo-form").submit();
}

function onFileDrop(event) {

    event.preventDefault();
    readFile(event.dataTransfer.files[0]);
}

function onInputPaste() {
    process();
}

function handleFileSelect(event) {
    readFile(event.files[0]);
}

function readFile(file) {
    console.time("readFile");
    const reader = new FileReader();
    reader.onload = afterFileRead;
    reader.readAsText(file);

    notify("Reading ...");
}

function afterFileRead(event) {

    txtInput.value = event.target.result;
    console.timeEnd("readFile");

    process();
}

function download(selector) {

    let textToDownload = document.querySelector(selector).value;

    if (textToDownload) {
        let blob = new Blob([textToDownload], { type: DOWNLOAD_FILE_TYPE });

        let downloadLink = document.createElement("a");
        downloadLink.download = `${DOWNLOAD_FILE_NAME}_${(new Date()).toISOString().replace(/z|t/gi, ' ').trim()}.txt`;
        downloadLink.innerHTML = "download";

        if (window.webkitURL != null) {
            downloadLink.href = window.webkitURL.createObjectURL(blob);
        }
        else {
            downloadLink.href = window.URL.createObjectURL(blob);
            // downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }

        downloadLink.click();
    }

    notify("Download Completed");
}

function copy(selector) {

    let textarea = document.querySelector(selector);
    textarea.select();
    textarea.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(textarea.value);

    notify("Copied to Clipboard");
}

function notify(message) {

    console.warn(message);
    notification.style.visibility = VISIBLE;
    notificationText.innerHTML = message || EMPTY;
    $(".alert").fadeTo(2000, 500).slideUp(500, function () {
        $(".alert").slideUp(500);
    });
}



function getProviderName(number) {

    let provider_specific_part = parseInt(number.slice(0, 5));

    for (let [name, starts_with] of PROVIDERS) {
        if (starts_with.includes(provider_specific_part)) {
            return SPACE + TAB + name;
        }
    }
    return SPACE + TAB;
}

function process() {
    setTimeout(function () {
        notify("Processing");
        setTimeout(parse, 500);
    }, 500);
}