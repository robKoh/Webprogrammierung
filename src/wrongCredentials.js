fetch("/displayAlertCredentials")
  .then((response) => 
    response.ok ? setAlert() : null
  )
  
function setAlert() {
    alert("Sie müssen einen Benutzername und ein Passwort eingeben!");
}

