const campoPesos =  document.querySelector('.campo');
const campoMoneda = document.querySelector('#moneda');
const btn = document.querySelector('#agregar');
const resultado = document.querySelector('#resultado');
let migrafica = null;


//Agregamos el boton que llamara la funcion
btn.addEventListener( 'click', () => {
    getData() // Agrega el menj error
    datosUser()
})

//llamamos la API
const getData = async () => {
    try {
        let res = await fetch ('https://mindicador.cl/api/')        
        return await res.json();

    }catch (err)  {
        resultado.innerHTML = 'Error al traer los Datos ' + err;
    }
}



//Creamos la función para obtener y retornar la Data
/*const getAndCreateDataToChart = async () => {
    try {
        let respuesta = await fetch('https://mindicador.cl/api/dolar/');
        let dataDolar = await respuesta.json();

        // Verificar si la respuesta tiene la estructura esperada
        if (!dataDolar.serie || !Array.isArray(dataDolar.serie)) {
            throw new Error('La respuesta de la API no tiene la estructura esperada');
        }

        let labels = dataDolar.serie.slice(0,10).map((entry) => entry.fecha);
        let data = dataDolar.serie.slice(0,10).map((entry) => entry.valor);

        const datasets = [
            {
                label: "Historial ultimos 10 dias ",
                borderColor: "rgb(255, 99, 132)",
                data,
            },
        ];
        return { labels, datasets };
    } catch (err) {
        console.error('Error al obtener y crear datos para la gráfica', err);
        throw err;
    }
};




//Creamos la Grafica que renderizara
const  renderGrafica = async () =>{
    const data = await getAndCreateDataToChart();
    const config = 
        {
            type: "line",
            data
        };
    const myChart = document.getElementById("myChart");
    myChart.style.backgroundColor = "white";
    migrafica = new Chart(myChart, config);
}

renderGrafica();*/


//Creamos la renderizacion
const render = (respuesta) => {  
    
    let moneda1 = (campoMoneda.value === '1') ? true : false;
    let moneda2 = (campoMoneda.value === '2') ? true : false;    
    let valorDolar = respuesta.dolar.valor;
    let valorEuro = respuesta.euro.valor;
    let peso = Number(campoPesos.value);

    if(peso === '' || isNaN(peso) ){
        alert('Ingresa un valor numerico en el campo de Peso')
        return;
    }else if(moneda1){
        resultado.innerHTML = peso * valorDolar        
    }else if(moneda2){
        resultado.innerHTML = peso * valorEuro
    }    
};

// Función para actualizar el gráfico con historial de los últimos 10 días
const updateChart = (respuesta) => {
    let moneda = campoMoneda.value;
    let historial = respuesta[moneda.toLowerCase()].serie.slice(-10); // Tomar los últimos 10 días

    let data = {
        labels: historial.map(entry => entry.fecha),
        datasets: [{
            label: `Historial de ${campoMoneda.options[campoMoneda.selectedIndex].text}`,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: historial.map(entry => entry.valor)
        }]
    };

    if (migrafica) {
        migrafica.destroy();
    }

    migrafica = new Chart(grafico, {
        type: 'line', // Cambiado a un gráfico de líneas para mostrar el historial
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

//Creamos la variable que llamara la funcion getData
const datosUser = async () => {
    const respuesta = await getData(); 
    //console.table(respuesta.dolar.fecha);   
    render(respuesta);
    
 }

 datosUser()


