fetch("/displayUser")
  .then((response) =>
    response.ok ? response.json() : (window.location.href = "/")
  )
  .then((json) => {
    const spanElement = document.getElementById("display_user");
    
    if (json.username === "") {
      alert("Benutzer konnte nicht angezeigt werden.");
    } else {
      var text = document.createTextNode(json.username);
      spanElement.appendChild(text);
    }
  });
