(function () {

    var nuvens = [];
    var pause = false
    var pontos = 0;
    var placar;
    var start = false
    const FPS = 300;
    const PROB_NUVEM = 5;
    var gameLoop;
    var deserto;
    var dino;
    tempo = 0;

    function init () {
        deserto = new Deserto();
        dino = new Dino();
        placar =  new Placar();
        gameLoop = setInterval(run, 1000/FPS);
        dayNight();
    }

    function butoes(){
        window.addEventListener("keydown", function (e) {
            if (e.key == "ArrowUp" && dino.status==0) dino.status = 1;
        });

        window.addEventListener('keydown', function (e) {
            if (e.key == 'ArrowDown') dino.status = 3
        })
        window.addEventListener('keyup', function (e) {
            if (dino.status == 3) dino.status = 0
        })
        window.addEventListener('keypress', (e) => {
            if (e.key == 'p') {
                //falta implementar
                console.log("p");
            }
        })
    }

    function dayNight(){
        let diaNoite = false
        setInterval(() => {
            if (diaNoite) {
                document.body.style.backgroundColor = '#fffff'
                diaNoite = false
            } else {
                document.body.style.backgroundColor = '#00000'
                diaNoite = true
            }
        }, 60000)
    }

  



    function Cacto(){
        this.sprites = {
            '1':'-766px',
            '2':'-810px',
            '3':'-678px'
        };
    }

    function Passarinho(){

     this.sprites = {
                0: { pos: '-133px' },
                1: { pos: '-180px' }
            
        };


    }

    Passarinho.prototype.show = function(){}

    function Placar(){
        this.sprites = {
            'n0': { pos: '-484px' },
            'n1': { pos: '-495px' },
            'n2': { pos: '-504px' },
            'n3': { pos: '-514px' },
            'n4': { pos: '-524px' },
            'n5': { pos: '-534px' },
            'n6': { pos: '-544px' },
            'n7': { pos: '-554px' },
            8: { pos: '-564px' },
            9: { pos: '-574px' },
            hi: { pos: '-584px' }
        }
        this.element =  document.createElement("div");
        this.element.className = "placar";
        document.body.appendChild(this.element);
    }

    Placar.prototype.conta = function (){
        tempo =  tempo + 1 ;
        if(tempo%30==0){
            pontos = pontos +1;
            //converteNumero(pontos);
        }

        if(tempo%3000==0){
            //pontos = pontos +1;
            gameLoop = setInterval(run, 1000/FPS) + (FPS/100);
            console.log(gameLoop);
        }

        this.element.style.backgroundPositionX = this.sprites.n1;
    }

    function converteNumero(num){
        console.log(num);
        //implementar ainda 

    }
    

    function Deserto () {
        this.element = document.createElement("div");
        this.element.className = "deserto";
        document.body.appendChild(this.element);

        this.chao = document.createElement("div");
        this.chao.className = "chao";
        this.chao.style.backgroundPositionX = "0px";
        this.element.appendChild(this.chao);
    }

    Deserto.prototype.mover = function() {
        this.chao.style.backgroundPositionX = (parseInt(this.chao.style.backgroundPositionX) - 1) + "px";
    }

    function Dino () {
        this.sprites = {
            'correr1':'-766px',
            'correr2':'-810px',
            'pulando':'-678px',
            'agachando1': '-941px',
            'agachando2':'-1000px'
            
        };
        this.status = 0; // 0:correndo; 1:subindo; 2: descendo; 3: agachado
        this.alturaMaxima = "80px";
        this.element = document.createElement("div");
        this.element.className = "dino";
        this.element.style.backgroundPositionX = this.sprites.correr1;
        this.element.style.bottom = "0px";
        deserto.element.appendChild(this.element);
    }   
    
    Dino.prototype.correr = function () {
        if (this.status == 0) {
            this.element.style.backgroundPositionX = (this.element.style.backgroundPositionX == this.sprites.correr1)?this.sprites.correr2:this.sprites.correr1;
        }
        else if (this.status == 1) {
            this.element.style.backgroundPositionX = this.sprites.pulando;
            this.element.style.bottom = (parseInt(this.element.style.bottom) + 1) + "px";
            if (this.element.style.bottom == this.alturaMaxima) this.status = 2;
        }
        else if (this.status == 2) {
            this.element.style.bottom = (parseInt(this.element.style.bottom) - 1) + "px";
            if (this.element.style.bottom == "0px") this.status = 0;
        }
        else if (this.status == 3) {
            this.element.style.backgroundPositionX = (this.element.style.backgroundPositionX == this.sprites.agachando1)?this.sprites.agachando2:this.sprites.agachando1;
            
            
        }
    }

    function Nuvem () {
        this.element = document.createElement("div");
        this.element.className = "nuvem";
        this.element.style.right = "0px";
        this.element.style.top = Math.floor(Math.random()*120) + "px";
        deserto.element.appendChild(this.element);
    }

    Nuvem.prototype.mover = function () {
        this.element.style.right = (parseInt(this.element.style.right) + 1) + "px";
    }

    function run () {
        dino.correr();
        deserto.mover();
        placar.conta();
        if (Math.floor(Math.random()*1000) <= PROB_NUVEM) {
            nuvens.push(new Nuvem());
        }
        nuvens.forEach(function (n) {
            n.mover();
        });
        //Em caso de game over
        //clearInterval(gameLoop);
    }
    init();
    butoes();
})();