fetch("/comment")
  .then((response) => (response.ok ? response.json() : (window.location.href = "/comment.html")))
  .then((json) => {
    console.log("Hi")
    if (json.usr.username === "") {
      alert("Benutzer konnte nicht angezeigt werden.");
    } else {
      const text = document.createTextNode(json.usr.username);

      for (var element = 0; element <= json.usr.checkbox.length; ++element) {
        if (json.usr.checkbox[element] === true) {
          let checkbox = document.getElementById("checkbox" + element);
          checkbox.checked = true;
        }
      }

      for (var element = 0; element <= json.cmt.length; ++element) {
        const olElement = document.getElementById("comment" + element);

        if (Array.isArray(json.cmt[element])) {
          json.cmt[element].forEach((elem) => {
            let liElement = document.createElement("li");
            liElement.innerText = elem;
            olElement.appendChild(liElement);
          });
        }
      }
    }
  });

function addToCommentSection(listName, value) {
  const list = document.getElementById(listName);

  let liElement = document.createElement("li");
  liElement.innerText = value;
  list.appendChild(liElement);
}
