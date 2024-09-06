function cambioCalendario() {
    const year = document.getElementById('year').value;
    
    const month = parseInt(document.getElementById('month').value);

    if(year === "" || isNaN(month)){
        llenadoCalendario(new Array(5).fill(null))
    }else{
        const fechas = obtenerFechas(year, month);
        const semanas = obtenerSemanas(fechas);
        llenadoCalendario(semanas);
        
    }
}

document.getElementById('year').addEventListener('change', cambioCalendario);
document.getElementById('month').addEventListener('change', cambioCalendario);

function obtenerFechas(año, mes) {
    const fechas = []
    const fechaInicio = new Date(año, mes, 1)
    const fechaFin = new Date(año, mes + 1, 0)

    for(let dia = fechaInicio.getDate(); dia <= fechaFin.getDate(); dia++){
        fechas.push(new Date(año, mes, dia))
    }
    return fechas
}


function obtenerSemanas(fechas){
    fechaDia = []

    for(i=0; i < fechas.length; i++){
        diaSemana = fechas[i].getDay();
        diaSemana = diaSemana === 0 ? 7 : diaSemana;
        
        fechaDia.push({
            'fecha': fechas[i],
            'diaSemana': diaSemana
        })
    }
    const semanas = [];
    let semanaActual = new Array(7).fill(null);

    for(i=0; i < fechaDia.length; i++ ){
        const dia = fechaDia[i];
        semanaActual[dia.diaSemana - 1] = dia.fecha;

        if (dia.diaSemana === 7){
            semanas.push(semanaActual);
            semanaActual = new Array(7).fill(null);
        }
    }
    if (semanaActual.some(dia => dia !== null)) {
        semanas.push(semanaActual);
    }
    return semanas
}


function llenadoCalendario(semanas){
    const body = document.getElementById('calendario');
    
    const contenidoHTML = semanas.map(semana => `
        <tr>
            <td>${semana[0] ? semana[0].getDate() : '' }</td>
            <td>${semana[1] ? semana[1].getDate() : '' }</td>
            <td>${semana[2] ? semana[2].getDate() : '' }</td>
            <td>${semana[3] ? semana[3].getDate() : '' }</td>
            <td>${semana[4] ? semana[4].getDate() : '' }</td>
            <td>${semana[5] ? semana[5].getDate() : '' }</td>
            <td>${semana[6] ? semana[6].getDate() : '' }</td></tr>`).join("")

    body.innerHTML = contenidoHTML
}
