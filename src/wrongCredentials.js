fetch("/displayAlertCredentials")
  .then((response) => 
    response.ok ? setAlert() : (window.location.href = "/")
  )
  
function setAlert() {
    alert("Sie müssen einen Benutzername und ein Passwort eingeben!");
}

