function validUsr() {
    let fName = document.regForm.fName.value;
    let lName = document.regForm.lName.value;
    let email = document.regForm.email.value;
    let date = document.regForm.date.value;
    let pwd = document.regForm.pwd.value;
    let pwd1 = document.regForm.pwd1.value;

    if (pwd != pwd1) {
        console.log("not ok")
        alert("La password non corrisponde");
        document.regForm.pwd1 = "";
        document.regForm.pwd1.focus();
        // return false;
    }else if( pwd == pwd1){
        console.log("ok")
        window.location.href = "/welcome";
    }
}