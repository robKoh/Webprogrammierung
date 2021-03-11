fetch("/comment")
  .then((response) => (response.ok ? response.json() : (window.location.href = "/comment.html")))
  .then((json) => {
    if (json.usr !== undefined) {
      for (var element = 0; element <= json.usr.checkbox.length; ++element) {
        if (json.usr.checkbox[element] === true) {
          let checkbox = document.getElementById("checkbox" + element);
          checkbox.checked = true;
        }
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
  });
