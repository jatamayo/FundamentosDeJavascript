const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const ultimoNivel = 10;
//
const btnEmpezar = document.getElementById('btnEmpezar');


class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this);
        this.inicializar();
        this.generarArray();
        setTimeout(()=>{
            this.siguienteNivel();
        }, 1000)
    }

    inicializar() {
        this.elegirColor = this.elegirColor.bind(this);
        this.siguienteNivel = this.siguienteNivel.bind(this);
        this.toogleBtnEmpeza();
        this.nivel = 1;
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }
    toogleBtnEmpeza(){
        if(btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide');
        }else{
            btnEmpezar.classList.add('hide');
        }
    }
    generarArray() {
        this.secuencia = new Array(ultimoNivel).fill(0).map(n => Math.floor(Math.random() * 4));
    }
    siguienteNivel(){
        this.subnivel = 0;
        this.iluminarSecuencia();
        this.agregarEventosClick();
    }
    tranformarNumeroAColor(numero){
        switch(numero){
            case 0:
                return 'celeste';
            case 1:
                return 'violeta';
            case 2:
                return 'naranja';
            case 3:
                return 'verde';
        }
    }
    tranformarColorANumero(nombre){
        switch(nombre){
            case 'celeste':
                return 0;
            case 'violeta':
                return 1;
            case 'naranja':
                return 2;
            case 'verde':
                return 3;
        }
    }
    apagarColor(color){
        this.colores[color].classList.remove('light');
    }
    iluminarColor(color) {
        this.colores[color].classList.add('light');
        setTimeout(()=>this.apagarColor(color), 350)
    }
    iluminarSecuencia(){
        for(let x = 0; x < this.nivel; x++){
            let color = this.tranformarNumeroAColor(this.secuencia[x]);
            setTimeout(() => this.iluminarColor(color), 1000 * x);
        }
    }
    agregarEventosClick(){
        this.colores.celeste.addEventListener('click', this.elegirColor);
        this.colores.verde.addEventListener('click', this.elegirColor);
        this.colores.violeta.addEventListener('click', this.elegirColor);
        this.colores.naranja.addEventListener('click', this.elegirColor);
    }
    eliminareventosClick(){
        this.colores.celeste.removeEventListener('click', this.elegirColor);
        this.colores.verde.removeEventListener('click', this.elegirColor);
        this.colores.violeta.removeEventListener('click', this.elegirColor);
        this.colores.naranja.removeEventListener('click', this.elegirColor);   
    }
    elegirColor(evento){
        const nombreColor = evento.target.dataset.color;
        const numeroColor = this.tranformarColorANumero(nombreColor);
        this.iluminarColor(nombreColor);
        if(numeroColor === this.secuencia[this.subnivel]){
            this.subnivel ++;
            if(this.subnivel === this.nivel){
                this.nivel ++;
                this.eliminareventosClick();
                if(this.nivel === (ultimoNivel+1)){
                    // Gano
                    this.ganoJuego();
                }else{
                    setTimeout(this.siguienteNivel, 1500);
                }
            }
        }else{
            // Perdio
            this.perdioJuego();
        }
    }
    ganoJuego(){
        swal('Simon Dice', 'Felicidades, ganaste el juego!', 'success')
        .then(()=>{
            this.inicializar();
        })
    }
    perdioJuego(){
        swal('Simon Dice', 'Lo siento, perdiste :(!', 'error')
        .then(()=>{
            this.eliminareventosClick();
            this.inicializar();
        })
    }
}

function empezarJuego() {
    window.juego = new Juego()
}