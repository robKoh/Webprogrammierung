function logItem(param) {
    console.log("Info: " + param);
}

function submitTextChange() {
    document.getElementById("textAlt").innerHTML = "Dies ist ein anderer Text.";
}

// Liste-Bereich
var count = 0;

function neuerBegriff() {
    var inputWord = document.getElementById("begriffe").value;
    if (count == 0) {
        if (inputWord != "") {
            var ulElement = document.createElement("ul");
            var liElement = document.createElement("li");
            var listeBereich = document.getElementById("liste");
            liElement.innerText = inputWord;
            ulElement.appendChild(liElement);
            listeBereich.appendChild(ulElement);
        }
    } else {
        if (inputWord != "") {
            var liElement = document.createElement("li");
            var listeBereich = document.getElementById("liste");
            var ulElementCollection = listeBereich.getElementsByTagName("ul");
            var ulElement = ulElementCollection[ulElementCollection.length - 1]
            liElement.innerText = inputWord;
            ulElement.appendChild(liElement);
        }
    }
    count++;
}

function deleteBegriff() {
    var listeBereich = document.getElementById("liste");
    var liArray = listeBereich.getElementsByTagName("li");
    liArray[liArray.length - 1].remove();
    liArray[liArray.length - 1] = null;
}