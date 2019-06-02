(function () {

    var nuvens = [];
    var cactos = [];
    var passarinhos = [];
    var pauseGame = false;
    var pontos = 0;
    var hiPontos = 0;
    var placar;
    var start = false
    const FPS = 300;
    const PROB_NUVEM = 5;
    var gameLoop;
    var deserto;
    var dino;
    tempo = 0;

    function init() {
        deserto = new Deserto();
        dino = new Dino();
        placar = new Placar();
        hiPontos = 0;
        for (let i = 0; i < 1; i++) {
            passarinhos.push(new Passarinho());
        }
        for (let i = 0; i < 1; i++) {
            cactos.push(new Cacto(deserto));
        }

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

    function pausa() {

        if (pauseGame == false) {
            clearInterval(gameLoop);
            clearInterval(passarinhos.movendo);
            pauseGame = true;
        } else {
            gameLoop = setInterval(run, 1000 / FPS);
            pauseGame = false;
        }
    }

    function butoes() {
        window.addEventListener("keydown", function (e) {
            if (e.key == "ArrowUp" && dino.status == 0) dino.status = 1;
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
            if (e.key == "ArrowUp") {
                if (start == false) {
                    start = true
                    gameLoop = setInterval(run, 999 / FPS);
                }
            }
        });

    }

    function Cacto() {
        this.sprites = {
            0: { pos: '-228px' },
            1: { pos: '-262px' },
            2: { pos: '-296px' },
            3: { pos: '-332px' },
            4: { pos: '-382px' },
            5: { pos: '-407px' }
        }

        this.passoCacto = 2;
        this.nCactos = Math.random() * 4;
        this.element = document.createElement('div');
        this.element.className = 'gCacto';

        this.cactos = [];

        this.redefinirGrupo();
        this.element.style.right = (Math.random() * window.innerWidth + 200) * -1 + 'px';
        deserto.element.appendChild(this.element);
    }

    Cacto.prototype.redefinirGrupo = function () {

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
                element.style.height = '37px';
                element.style.width = '17px';
                element.style.top = '40px';
            }

            this.element.appendChild(element)
            this.cactos.push(element)
        }

    }
    Cacto.prototype.mover = function () {
        if (parseInt(this.element.style.right) > window.innerWidth + 100) {
            this.element.style.right = '-500px'
            this.redefinirGrupo()
        }
        this.element.style.right = parseFloat(this.element.style.right) + this.passoCacto + 'px'


    }
    function Passarinho() {
        this.sprites = {
            0: { pos: '-133px' },
            1: { pos: '-180px' }

        };
        this.element = document.createElement("div");
        this.element.className = "passarinho";
        this.element.style.backgroundPositionX = this.sprites['0'].pos;
        this.element.style.right = '-200px'
        this.passo = 5;
        this.movendo = null;
        this.tick = 0;
        document.body.appendChild(this.element);
        this.status = 0;
    }

    Passarinho.prototype.correr = function () {
        if (this.status == 0) {
            this.element.style.backgroundPositionX = (this.element.style.backgroundPositionX == this.sprites['0'].pos) ? this.sprites['1'].pos : this.sprites['0'].pos;
        }
    }

    Passarinho.prototype.mover = function () {
        this.movendo = setInterval(() => {

            if (parseInt(this.element.style.right) > window.innerWidth + 100) {
                this.element.style.top = Math.floor(Math.random() * (deserto.element.offsetHeight - 50)) + "px";
                this.element.style.right = "-200px"
            }
            if (this.tick / 1000000 == 1) {
                this.passo += 0.5
                this.tick = 0
            }

            this.element.style.right = (parseFloat(this.element.style.right) + this.passo) + "px"
        }, 10000000 / FPS)
    }

    function Placar() {
        this.sprites = {
            0: { pos: '-484px' },
            1: { pos: '-495px' },
            2: { pos: '-504px' },
            3: { pos: '-514px' },
            4: { pos: '-524px' },
            5: { pos: '-534px' },
            6: { pos: '-544px' },
            7: { pos: '-554px' },
            8: { pos: '-564px' },
            9: { pos: '-574px' },
            max: { pos: '-584px' }
        }

        this.maxPontos = hiPontos
        this.pontozao = document.createElement('div')
        this.pontozao.className = 'pontuacaoMaxima'
        if (this.maxPontos == 0) {
            this.pontozao.style.display = 'none'
        }
        deserto.element.appendChild(this.pontozao)

        this.element = document.createElement('div')
        this.element.className = 'pontuacao'
        deserto.element.appendChild(this.element)
        this.digts = []
        this.vMax = []

        for (let i = 0; i < 6; i++) {
            let div = document.createElement('div')
            div.className = 'pontos'
            div.style.backgroundPositionX = this.sprites[Object.keys(this.sprites)[i]]
            this.element.appendChild(div)

            this.digts.push(div)
            this.digts[i].style.backgroundPositionX = this.sprites['0'].pos
        }
        for (let i = 0; i < 7; i++) {
            let div = document.createElement('div')
            div.className = 'pontos'
            if (i == 0) {
                div.style.backgroundPositionX = this.sprites.max.pos
                div.style.width = '25px'
                this.pontozao.appendChild(div)
                this.vMax.push(div)
            } else {
                div.style.backgroundPositionX = this.sprites[Object.keys(this.sprites)[i]]
                this.pontozao.appendChild(div)
                this.vMax.push(div)
                this.vMax[i].style.backgroundPositionX = this.sprites['0'].pos
            }
        }

        this.displayPontos(true);
    }
    Placar.prototype.displayPontos = function (pontozao = false){
        if (pontozao) {
            let str = `${this.maxPontos}`

            let j = this.vMax.length - 1
            for (let i = str.length - 1; i > -1; i-- , j--) {
                let num = str[i]
                this.vMax[j].style.backgroundPositionX = this.sprites[num].pos
            }
        }
        let str = `${pontos}`

        let j = this.digts.length - 1
        for (let i = str.length - 1; i > -1; i-- , j--) {
            let num = str[i]
            this.digts[j].style.backgroundPositionX = this.sprites[num].pos
        }
    }



    Placar.prototype.conta = function () {
        tempo = tempo + 1;
        if (tempo % 30 == 0) {
            pontos = pontos + 1;
        }

        if (tempo % 3000 == 0) {

            gameLoop = (setInterval(run, 100) * 1.01);
            console.log(gameLoop);
        }
    }


    function Deserto() {
        this.element = document.createElement("div");
        this.element.className = "deserto";
        document.body.appendChild(this.element);

        this.chao = document.createElement("div");
        this.chao.className = "chao";
        this.chao.style.backgroundPositionX = "0px";
        this.element.appendChild(this.chao);
    }

    Deserto.prototype.mover = function () {
        this.chao.style.backgroundPositionX = (parseInt(this.chao.style.backgroundPositionX) - 1) + "px";
    }

    function Dino() {
        this.sprites = {
            'correr1': '-766px',
            'correr2': '-810px',
            'pulando': '-678px',
            'agachando1': '-941px',
            'agachando2': '-1000px'

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
            this.element.style.backgroundPositionX = (this.element.style.backgroundPositionX == this.sprites.correr1) ? this.sprites.correr2 : this.sprites.correr1;

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
            this.element.style.backgroundPositionX = (this.element.style.backgroundPositionX == this.sprites.agachando1) ? this.sprites.agachando2 : this.sprites.agachando1;
        }

    }

    function position(el) {
        var rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    function Nuvem() {
        this.element = document.createElement("div");
        this.element.className = "nuvem";
        this.element.style.right = "0px";
        this.element.style.top = Math.floor(Math.random() * 121) + "px";
        deserto.element.appendChild(this.element);
    }

    Nuvem.prototype.mover = function () {
        this.element.style.right = (parseInt(this.element.style.right) + 1) + "px";
    }

    function restart() {

        dGameOver.removeChild(dRestart);
        dGameOver.removeChild(dText);
        deserto.element.removeChild(dGameOver);
        deserto.element.remove()
        if (pontos > hiPontos) {
            hiPontos = pontos
        }
        pontos = 0;
        tempo = 0;
        cactos.forEach(function (n) {
            (n.element).parentNode.removeChild(n.element)
        });


        nuvens.forEach(function (n) {
            (n.element).parentNode.removeChild(n.element)
        });

        start = false
        cactos = []
        passarinhos = []
        nuvens = []
        init();
    }
    function gameOver() {
        clearInterval(gameLoop);
        clearInterval(passarinhos.movendo);
        passarinhos.forEach(function (n) {
            (n.element).parentNode.removeChild(n.element)
        });
        dGameOver = document.createElement('div')
        dGameOver.className = 'gameOver'
        dRestart = document.createElement('div')
        dRestart.className = 'btnRestart'
        dText = document.createElement('div')
        dText.className = 'textGameOver'

        dGameOver.appendChild(dText)
        dGameOver.appendChild(dRestart)
        dRestart.onclick = () => restart()
        deserto.element.appendChild(dGameOver)


    }
    function colidiuC(A, B) {
        //((A.left + 6)>= (B.left ) && ( (B.top+50) <= (A.top))) ||
        if ((A.left + 6) >= (B.left) && ((B.top) <= (A.top + 3))) {
            gameOver();
        }
    }

    function colidiuP(A, B) {
        if ((A.left + 20) >= (B.left) && ((A.top) >= (B.top - 30))) {
            gameOver();
        }
    }
    function run() {
        dino.correr();
        deserto.mover();
        placar.conta();
        placar.displayPontos();
        dayNight();
        cactos.forEach(function (n) {
            n.mover();
        });

        if (nuvens.length < 13) {
            if (Math.floor(Math.random() * 1040) <= PROB_NUVEM) {
                nuvens.push(new Nuvem());
            }
            nuvens.forEach(function (n) {
                n.mover();
            });
        }
        else {
            (nuvens[0].element).parentNode.removeChild((nuvens[0].element));
            nuvens.shift();
            (nuvens[0].element).parentNode.removeChild((nuvens[0].element));
            nuvens.shift();
        }

        passarinhos.forEach(function (n) {
            n.correr();
            n.mover();
        });

        var positionDino = position(dino.element);
        var positionCacto = position(cactos[0].element);
        var posPassarinho = position(passarinhos[0].element);

        colidiuC(positionDino, positionCacto);
        colidiuP(positionDino, posPassarinho);

    }
    init();
    butoes();
    dayNight();
   
})();