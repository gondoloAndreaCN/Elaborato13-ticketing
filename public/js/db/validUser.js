function validUsr() {
    setTimeout(5000);
    var fName = document.reg.fName.value;
    var lName = document.reg.lName.value;
    var email = document.reg.email.value;
    var date = document.reg.date.value;
    var pwd = document.reg.pwd.value;
    var pwd1 = document.reg.pwd1.value;

    if (pwd != pwd1) {
        alert("La password confermata è diversa da quella scelta, controllare.");
        document.reg.pwd1.value = "";
        document.reg.pwd1.focus();
        return false;
    }

}