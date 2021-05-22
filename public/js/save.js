window.addEventListener("load", () => {

    var script_tag = document.getElementById('qr')
    const source = script_tag.getAttribute("source");

    let canvas = document.querySelector("#mycanvas");
    let canvasCtx = canvas.getContext("2d");
    let btndownload = document.querySelector("#btndownload");
    let img = document.querySelector("#imgconverted");
    img.src = source;

    console.log("primo");
    img.addEventListener('load', () => {
        canvasCtx.drawImage(img, canvas.width / 3, canvas.height / 3);
    });
    console.log("dopo");

})
