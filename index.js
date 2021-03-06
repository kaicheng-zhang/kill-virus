let config = {
    // 游戏的状态  0:游戏未开始  1：游戏进行中   2: 游戏结束
    status: 0,
    // 病毒生成的时间间隔
    interval:2800,
    // 病毒动画的速度
    speed:1,
    // 一轮分数过关最高值
    max: 2
}

// 得分
let score = 0;

// 开始页面
let startAlert = document.querySelector('#start-alert')
// logo
let gameDesc = document.querySelector('.game-desc')

let footer = document.querySelector('#start-alert footer')

startAlert.onclick = function(){
    // console.log('游戏开始')

    gameDesc.classList.add('slide-up')
    footer.classList.add('slide-down')

    setTimeout(function(){
        startAlert.style.display = 'none'
    },500)
    startGame()

    // 更新游戏状态
    config.status = 1;
}

var timer,updater;
function startGame(){

    timer = setInterval(function(){
        makeVirus()
    },config.interval)

    updater = setInterval(function(){
        update()
    },16)
    
}

let game = document.querySelector('#game')

let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

// 获得游戏场景
let stage = document.querySelector("#stage")

// ui层
let uiLayer = document.querySelector('#ui')

let virues = []
// 生成病毒元素
function makeVirus(){
    let virus = document.createElement('div')
    virus.setAttribute('class','virus')
    let p = document.createElement('p')
    p.classList.add('letter')

    virus.appendChild(p)

    // 设置病毒的颜色
    switch(Math.floor(Math.random() * 6)){
        case 0:
            p.style.backgroundImage = 'radial-gradient(rgba(255,150,150,0),rgba(255,0,0,1))';
            p.style.boxShadow = '0 0 15px #f00';break;
        case 1:
            p.style.backgroundImage = 'radial-gradient(rgba(0, 255, 0, 0),rgba(0,255,0,1))';
            p.style.boxShadow = '0 0 15px #f00'; break;
        case 2:
            p.style.backgroundImage = 'radial-gradient(rgba(0, 0, 255, 0),rgba(0,0,255,1))';
            p.style.boxShadow = '0 0 15px #f00'; break;
        case 3:
            p.style.backgroundImage = 'radial-gradient(rgba(255, 255, 0, 0),rgba(255,255,0,1))';
            p.style.boxShadow = '0 0 15px #f00'; break;
        case 4:
            p.style.backgroundImage = 'radial-gradient(rgba(0, 255, 255, 0),rgba(0,255,255,1))';
            p.style.boxShadow = '0 0 15px #f00'; break;
        case 5:
            p.style.backgroundImage = 'radial-gradient(rgba(255, 0, 255, 0),rgba(255,0,255,1))';
            p.style.boxShadow = '0 0 15px #f00'; break;
    }


    let letter = letters[Math.floor(Math.random() * 26)]
    p.innerHTML = letter;

    virus.style.left = Math.random() * (stage.offsetWidth - 100) + 'px'

    virus.letter = letter;

    game.appendChild(virus)

    virues.push(virus)
}

let winH = stage.offsetHeight;

window.onresize = function(){
    winH = stage.offsetHeight;
}

// update 动画，刷新元素的位置
function update(){

    for(let i = 0;i < virues.length;i++){
        let virus = virues[i];
        let step = config.speed;
        //病毒下落越低，速度越来越快的功能，每下落三分之一窗口高度，速度增加一倍
        switch(true){
            case virus.offsetTop< Math.round(winH/3):
                step = config.speed;
                break;
            case virus.offsetTop< Math.round(winH*2/3):
                step = config.speed*2;
                break;
            case virus.offsetTop<winH:
                step = config.speed*3;
                break;
        }
        virus.style.top = virus.offsetTop + step + 'px';

        if(virus.offsetTop > (winH - 200) && !uiLayer.warning ){
            showWarning()
            uiLayer.warning = true;
        }else if(virus.offsetTop >= winH){
            // game over
            gameOver()
        }
    }
}

function showWarning(){
    let warningLayer = document.createElement('div')
    warningLayer.setAttribute('class','warning')
    uiLayer.appendChild(warningLayer)
}

let gameOverAlert = document.querySelector('#game-over-alert')
// 游戏结束
function gameOver(){
    clearInterval(timer)
    clearInterval(updater)
    config.status = 2;
    gameOverAlert.style.display = 'block'
}


let scoreLabel = document.getElementById('score-label')

let xmEffect = document.querySelector('#xm')

// 监听键盘事件
window.addEventListener('keyup',function(e){
    let key = e.key;

    for(let i = 0;i < virues.length;i++){
        let virus = virues[i]

        if(virus.letter.toLowerCase() === key.toLocaleLowerCase() && config.status === 1){

            // 切换病毒
            let dieImg = document.createElement('img')
            game.appendChild(dieImg)
            dieImg.src = './imgs/virus-die.png'
            dieImg.style.position = 'absolute'
            dieImg.style.left = virus.offsetLeft + 'px'
            dieImg.style.top = virus.offsetTop + 'px'
            dieImg.classList.add('fade-out')

            setTimeout(function(){
                game.removeChild(dieImg)
            },1000)
            game.removeChild(virus)
            virues.splice(i,1)
    
            uiLayer.warning = false;
            //有警告页面（class=”warning“）出现，则删除该页面
            if (uiLayer.contains(document.querySelector('.warning'))){
                uiLayer.removeChild(document.querySelector('.warning'));
            }
    
            score++;
            scoreLabel.innerHTML = score

            // 播放消灭音效
            xmEffect.currentTime = 0;
            xmEffect.play()
    
    
            //分数到达本关卡最高值，进入通关页面，进入下一关
            if (score>=config.max){
                gamePass()
            }
        }
    }
})

let gamePassAlert = document.querySelector('#game-pass-alert')
// 游戏结束
function gamePass(){
    clearInterval(timer)
    clearInterval(updater)
    config.status = 2;
    gamePassAlert.style.display = 'block';
}


// 重玩
let restartBtn = document.querySelector('#restart-btn')
restartBtn.onclick = function(){
    gameOverAlert.style.display = 'none';
    console.log('reset game')
    resetGame()
}

function resetGame(){
    config.status = 1;
    score = 0;
    scoreLabel.innerHTML = score;
    game.innerHTML = ''
    virues = []
    //有警告页面（class=”warning“）出现，则删除该页面
    if (uiLayer.contains(document.querySelector('.warning'))){
        uiLayer.removeChild(document.querySelector('.warning'));
    }
    uiLayer.warning = false;
    config.speed=1;
    startGame()
}

//下一关
let passBtn = document.querySelector('#pass-btn')
passBtn.onclick = function(){
    gamePassAlert.style.display = 'none';
    console.log('pass game')
    passGame()
}

function passGame(){
    let speedIncrease = parseInt(document.getElementById('speedOffset').value);
    document.getElementById('speedOffset').value="25";//恢复默认速度增加百分比
    config.status = 1;
    score = 0;
    scoreLabel.innerHTML = score;
    game.innerHTML = ''
    virues = []
    //有警告页面（class=”warning“）出现，则删除该页面
    if (uiLayer.contains(document.querySelector('.warning'))){
        uiLayer.removeChild(document.querySelector('.warning'));
    }
    uiLayer.warning = false;
    config.speed=config.speed*(1+speedIncrease/100);
    startGame()
}
