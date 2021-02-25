fetch("/displayUser")
  .then((response) =>
    response.ok ? response.json() : (window.location.href = "/")
  )
  .then((json) => {
    const spanElement = document.getElementById("display_user");

    json.forEach((dataItem) => {
      if (dataItem === null) {
        alert("Benutzer konnte nicht angezeigt werden.");
      } else {
        var text = document.createTextNode(dataItem);
        spanElement.appendChild(text);
      }
    });

    if (json.length === 0) {
        var text = document.createTextNode("Unbekannt");
        spanElement.appendChild(text);
    }
});