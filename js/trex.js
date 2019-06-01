(function () {

    var nuvens = [];
    var cactos = [];
    var pauseGame = false;
    var pontos = 0;
    var pontuacaoMaxima = 0;
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
        let i = 0
        let loopCactos = setInterval(() => {
            if (i < 1) {
                cactos.push(new Cacto(deserto))
            } else {
                clearInterval(loopCactos)
            }
            i++
        }, 1003)
    }
    function dayNight() {
        let diaNoite = false
        setInterval(() => {
            if (diaNoite) {
                document.body.style.backgroundColor = '#000000'
                diaNoite = false
            } else {
                document.body.style.backgroundColor = '#fffff'
                diaNoite = true
            }
        }, 60000)
    }

    function pausa(){
       
        if (pauseGame == false) {
            clearInterval(gameLoop);
            pauseGame = true;
        } else {
            gameLoop = setInterval(run, 1000/FPS);
            pauseGame = false;
        }
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
                pausa()
            }
        })

        window.addEventListener("keydown", function (e) {
            if (e.key == "ArrowUp" ){
                if(start == false){
                    start = true
                    gameLoop = setInterval(run, 999/FPS);
                }
            }
        });
        
    }

    function Cacto(){
        this.sprites = {
            0: { pos: '-228px' },
            1: { pos: '-262px' },
            2: { pos: '-296px' },
            3: { pos: '-332px' },
            4: { pos: '-382px' },
            5: { pos: '-407px' }
        }

        this.passoCacto = 2 ;
        this.nCactos = Math.random() * 4;
        this.element = document.createElement('div');
        this.element.className = 'gCacto';
        
        this.cactos = [];

        this.redefinirGrupo();

        this.element.style.right = (Math.random() * window.innerWidth + 100) * -1 + 'px';
        deserto.element.appendChild(this.element);
    }

    Cacto.prototype.redefinirGrupo= function(){
        
            this.nCactos = Math.random() * 4
            this.cactos.forEach((ele) => {
                ele.remove()
            })
            this.cactos = []
            for (let i = 0; i < this.nCactos; i++) {
                let imgCacto = parseInt(Math.random() * 4)
                let element = document.createElement('div')
                element.className = 'cacto'
                element.style.backgroundPositionX = this.sprites[`${imgCacto}`].pos
    
                if (imgCacto == 0 || imgCacto == 1 || imgCacto == 2) {
                    element.style.height = '37px'
                    element.style.width = '17px'
                    element.style.top= '40px'
                }
    
                this.element.appendChild(element)
                this.cactos.push(element)
            }
        
    }
    Cacto.prototype.mover = function(){
        if (parseInt(this.element.style.right) > window.innerWidth+50) {
            this.element.style.right = '-500px'
            this.redefinirGrupo()
        }
        this.element.style.right = parseFloat(this.element.style.right) + this.passoCacto + 'px'
        
        
    }
    function Passarinho(){
        this.sprites = {
                   'a0': { pos: '-133px' },
                   'a1': { pos: '-180px' }
               
           };
           this.element = document.createElement("div");
           this.element.className = "passarinho";
           this.element.style.backgroundPositionX = this.sprites.a0;
           this.element.style.right = '-200px'
           document.body.appendChild(this.element);
   
       }
   
    Passarinho.prototype.show = function(){}
 
    function Placar(){
        this.maxima = pontuacaoMaxima;
        this.pontos = 0;
        
        this.sprites = {
            'n0': { pos: '-484px' },
            'n1': { pos: '-495px' },
            'n2': { pos: '-504px' },
            'n3': { pos: '-514px' },
            'n4': { pos: '-524px' },
            'n5': { pos: '-534px' },
            'n6': { pos: '-544px' },
            'n7': { pos: '-554px' },
            'n8': { pos: '-564px' },
            'n9': { pos: '-574px' },
            'hi': { pos: '-584px' }
        }
        this.element =  document.createElement("div");
        this.element.className = "placar";
       // this.element.appendChild(this.element);
        
    }

    Placar.prototype.conta = function (){
        tempo =  tempo + 1 ;
        if(tempo%30==0){
            pontos = pontos +1;
            //converteNumero(pontos);
        }

        if(tempo%3000==0){
            gameLoop = setInterval(run, 1000/(FPS/10));
            console.log(gameLoop);
        }

        this.element.style.backgroundPositionX = this.sprites.n2;
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
            //console.log((cactos[0].element.style.right));
        
    }

    function Nuvem () {
        this.element = document.createElement("div");
        this.element.className = "nuvem";
        this.element.style.right = "0px";
        this.element.style.top = Math.floor(Math.random()*121) + "px";
        
        deserto.element.appendChild(this.element);
    }

    Nuvem.prototype.mover = function () {
        this.element.style.right = (parseInt(this.element.style.right) + 1) + "px";
    }

   
    function run () {
        dino.correr();
        deserto.mover();
        placar.conta();
        dayNight();
       
        cactos.forEach(function (n) {
            n.mover();
        });



        if(nuvens.length<13){
            if (Math.floor(Math.random()*1040) <= PROB_NUVEM) {
                nuvens.push(new Nuvem());
            }
            
            nuvens.forEach(function (n) {
                n.mover();
            });

        }

        else{
            (nuvens[0].element).parentNode.removeChild((nuvens[0].element));
            nuvens.shift(); 
            (nuvens[0].element).parentNode.removeChild((nuvens[0].element));
            nuvens.shift();     
        }

        

        //Em caso de game over
        //clearInterval(gameLoop);
    }
    init();
    butoes();
    dayNight();
})();