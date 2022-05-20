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

function onInputPaste(){
    setTimeout(function () {
        notify("Processing");
        setTimeout(parse, 500);
    }, 500);
}

function handleFileSelect(event) {
    readFile(event.files[0]);
}

function readFile(file) {
    const reader = new FileReader();
    reader.onload = afterFileRead;
    reader.readAsText(file);

    notify("Reading ...");
}

function afterFileRead(event) {

    txtInput.value = event.target.result;

    setTimeout(function () {
        notify("Processing");
        setTimeout(parse, 500);
    }, 500);
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
    notification.style.visibility = VISIBLE;
    notificationText.innerHTML = message || EMPTY;
    $(".alert").fadeTo(2000, 500).slideUp(500, function () {
        $(".alert").slideUp(500);
    });
}

function removeDuplicate(inputArray){
    return Array.from(new Set(inputArray)).join(CR_LF);
}