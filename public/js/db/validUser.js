function test(){
        console.log("valide")
        setTimeout(5000);
        var fName = document.reg.fName.value;
        var lName = document.reg.lName.value;
        var email = document.reg.email.value;
        var day = document.reg.dd.value;
        var month = document.reg.mm.value;
        var year = document.reg.yyyy.value;
        var birth = day + "/" + month + "/" + year;
        var pwd = document.reg.pwd.value;
        var pwd1 = document.reg.pwd1.value;

        if (pwd != pwd1) {
            alert("La password confermata è diversa da quella scelta, controllare.");
            // document.modulo.conferma.value = "";
            // document.modulo.conferma.focus();
            // return false;
            }
}