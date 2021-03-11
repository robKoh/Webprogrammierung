fetch("/comment")
  .then((response) => response.json())
  .then((json) => {
    if (json.usr !== undefined) {
      for (var element = 0; element <= json.usr.checkbox.length; ++element) {
        if (json.usr.checkbox[element] === true) {
          let checkbox = document.getElementById("checkbox" + element);
          checkbox.checked = true;
        }
      }
    }

    for (var element = 0; element < json.cmt.length; ++element) {
      const olElement = document.getElementById("comment" + element);

      if (Array.isArray(json.cmt[element])) {
        const section = json.cmt[element];
        for (var i = 0; i < section.length; ++i) {
          let liElement = document.createElement("li");
          liElement.innerText = section[i];
          if (json.usr !== undefined && json.usr.ownComments[element].includes(i)) {
            liElement.style.color = "red";
          }
          olElement.appendChild(liElement);
        }
      }
    }
  });
