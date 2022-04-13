function createPDF(){
    var doc = new jsPDF()
    var email = document.getElementById("email").value
    doc.text(email, 10, 10)
    doc.save("YourPDF.pdf")
}
function dosPaginasPDF(){
    var doc = new jsPDF()
    var email = document.getElementById("email2").value
    var password = documegitnt.getElementById("password").value
    doc.text(20, 20, email)
    doc.addPage()
    doc.text(20, 20, password)
    doc.save("YourPDF2.pdf")
}

