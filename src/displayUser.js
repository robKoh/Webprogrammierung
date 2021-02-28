fetch("/displayUser")
  .then((response) =>
    response.ok ? response.json() : (window.location.href = "/")
  )
  .then((json) => {
    const spanElement = document.getElementById("display_user");
    if (json.tempUser.username === "") {
      alert("Benutzer konnte nicht angezeigt werden.");
    } else {
      const text = document.createTextNode(json.tempUser.username);
      spanElement.appendChild(text);

      for (var element = 0; element <= json.tempUser.checkbox.length; ++element) {
        if (json.tempUser.checkbox[element] === true) {
          let checkbox = document.getElementById("checkbox" + element);
          checkbox.checked = true;
        }
      };
      
      for (var element = 0; element <= json.commentSection.length; ++element) {
        const olElement = document.getElementById("comment" + element);
        
        if (Array.isArray(json.commentSection[element])) {
          
          json.commentSection[element].forEach( elem => {
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