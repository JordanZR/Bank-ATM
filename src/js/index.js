
function validarMonto(op){
        var monto = parseFloat(document.getElementById('monto').value)
        var saldo = parseFloat(localStorage.getItem('saldo'))
        var constraints = {
            monto: {
                presence: true,
                format:{
                    pattern: /([\d]+.{1}[\d]{2})/
                }
            }
        };
        var _monto = document.getElementById("monto").value
        var val = validate({monto: _monto}, constraints)
        if(val == undefined){
            if(monto > saldo && op > 0){
                swal("Oops", "El monto ingresado es superior al saldo disponible", "error")
            }else{
                //swal("Perfecto", "El monto ingresado es valido", "success").then(()=>{
                    //dep_retirar(op, monto, saldo)
                //})
                swal({
                    title: "Perfecto",
                    text: "El monto ingresado es valido. Desea un comprobante?",
                    icon: "success",
                    buttons: true,
                    dangerMode: false,
                })
                    .then((eleccion) => {
                        if (eleccion) {
                            swal("Haga click en OK para descargar su comprobante", {
                                icon: "success",
                            }).then(()=>{
                                var id = Math.floor(Math.random()*10000);
                                comprobante(op, monto, saldo, id)
                                dep_retirar(op, monto, saldo, id)
                            })
                        }else {
                            swal("Gracias por cuidar el medio ambiente!").then(()=>{
                                var id = Math.floor(Math.random()*10000);
                                dep_retirar(op, monto, saldo, id)
                            })
                        }
                    });
            }
        }else{
            swal( "Oops" ,  "El monto ingresado no es valido, debe tener el formato: 0.00" ,  "error" )
        }
}

function dep_retirar(op, monto, saldo, id){
    var descrip
    if(op == 0){
        saldo = saldo + monto
        saldo = parseFloat(saldo).toFixed(2)
        descrip = "Deposito"
    }else if(op == 2){
        saldo = saldo - monto
        saldo = parseFloat(saldo).toFixed(2)
        descrip = "Pago"
    }else{
        saldo = saldo - monto
        saldo = parseFloat(saldo).toFixed(2)
        descrip = "Retiro"
    }
    localStorage.setItem('saldo', saldo)
    document.getElementById('saldo').innerHTML = "Saldo: $" + saldo
    document.getElementById('monto').value = ""

    //Guardando la transaccion
    var contador = parseInt(localStorage.getItem("contador"))
    if(contador == 0){
        contador = 1
    }

    var tiempoTranscurrido = Date.now();
    var hoy = new Date(tiempoTranscurrido);

    var transaccion = {
        "id": id,
        "monto": monto,
        "descripcion": descrip,
        "fecha": hoy.toLocaleDateString()
    }
    localStorage.setItem("transaccion" + contador, JSON.stringify(transaccion))
    console.log(JSON.parse(localStorage.getItem("transaccion" + contador)))

    contador = contador + 1
    localStorage.setItem("contador", contador)
}

function comprobante(op, monto, saldo, id){
    var doc = new jsPDF()
    var descr, text
    switch (op){
        case 0:
            descr = "Deposito"
            saldo = saldo + monto
            break;
        case 1:
            descr = "Retiro"
            saldo = saldo - monto
            break;
        case 2:
            descr = "Pago servicio"
            saldo = saldo - monto
            break;
    }
    text = "ID: " + id + " Tipo: " + descr + " Monto: $" + monto + " Saldo: $" + parseFloat(saldo).toFixed(2)
    doc.text(text, 10, 10)
    doc.save("Comprobante_" + id + ".pdf")
}

function seccion(op){
    localStorage.setItem("seccion", op)
}

