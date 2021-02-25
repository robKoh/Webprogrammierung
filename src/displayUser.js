fetch("/displayUser")
  .then((response) =>
    response.ok ? response.json() : (window.location.href = "/")
  )
  .then((json) => {
    const spanElement = document.getElementById("display_user");
    const jsonName = JSON.parse(json); 
    
    if (jsonName === "") {
      alert("Benutzer konnte nicht angezeigt werden.");
    } else {
      var text = document.createTextNode(jsonName);
      spanElement.appendChild(text);
    }
  });

  if (json.length === 0) {
      var text = document.createTextNode("Unbekannt");
      spanElement.appendChild(text);
  }
