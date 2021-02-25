fetch("/displayUser")
  .then((response) =>
    response.ok ? response.json() : (window.location.href = "/")
  )
  .then((json) => {
    const spanElement = document.getElementById("display_user");
    let jsonName = JSON.parse(json); 
    
    if (jsonName.username === "") {
      alert("Benutzer konnte nicht angezeigt werden.");
    } else {
      var text = document.createTextNode(jsonName.username);
      spanElement.appendChild(text);
    }
  });
