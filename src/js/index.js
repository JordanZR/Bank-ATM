var array = []
var objeto = {}
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
            if(monto > saldo && op == 1){
                swal("Oops", "El monto ingresado es superior al saldo disponible", "error")
            }else{
                swal("Perfecto", "El monto ingresado es valido", "success").then(()=>{
                    dep_retirar(op, monto, saldo)
                })
            }
        }else{
            swal( "Oops" ,  "El monto ingresado no es valido, debe tener el formato: 0.00" ,  "error" )
        }
}

function dep_retirar(op, monto, saldo){
    var descrip
    if(op == 0){
        saldo = saldo + monto
        saldo = parseFloat(saldo).toFixed(2)
        descrip = "Deposito"
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

    var id = Math.floor(Math.random()*10000);
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

