function validateInputForm() {
    const inputUsername = document.getElementById("username");
    const inputPassword = document.getElementById("password");

    if (inputUsername.value === "" || inputPassword.value === "" ) {
        setAlert();
    }
}

function setAlert() {
    alert("Sie müssen einen Benutzername und ein Passwort eingeben!");
}

