let answer = '';
let score = 0;
let mode = localStorage.getItem('word_mode');
if(mode === null) {
    window.location.href = 'select_stage.html'
}

let maxLife = 5;
let life = 3;

let isLoaded = false;

const highScoreAddress = 'word_high_score_' + mode;
let highScore = localStorage.getItem(highScoreAddress) ?? 5;

// const word_txt = `
// rewarding: 만족감을 주는, 보람 있는`;

function loadFile(filePath) {
    let result = null;
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", filePath, false);
    xmlHttp.send();
    if (xmlHttp.status === 200) {
        result = xmlHttp.responseText;
    }
    return result;
}

let word_txt;

let db = {
};

let selectButton = document.getElementsByClassName('choice');
let scoreElement = document.getElementById('score');
let highScoreElement = document.getElementById('high_score');
let wordBoxElement = document.getElementById('word_box');

function game_over() {
    localStorage.setItem(highScoreAddress, highScore)
    localStorage.setItem('word_last_score', score);
    window.location.href = "game_over.html";
}

function error_alert(message) {
    alert('오류가 발생했습니다.' + "\n" + message);
    window.location.href = 'index.html'
}

window.onload = function() {
    word_txt = loadFile('../resources/words/eng_suneung_6')
    if(word_txt === null) {
        error_alert('파일 로드에 실패했습니다: 알 수 없는 파일.');
    }

    let line_number = 0;
    for(let line of word_txt.split('\n')) {
        line_number++
        let l = line.split(': ');
        if(l.length !== 2) {
            error_alert('파일 로드에 실패했습니다: 구문 오류' + "\n" + '>  ' + line + ' (' + line_number + '번째 줄)');
        }
        db[l[0]] = l[1].replace('\r', '');
    }

    if(db.length < 4) {
        error_alert('파일 로드에 실패했습니다: 단어가 너무 적습니다! 4개 이상의 단어를 작성해주세요,');
    }

    life = maxLife;

    for(let i = 0; i < maxLife; i++) {
        let img = document.createElement('img');
        img.src = '../resources/heart.png';
        img.width = 50;
        img.height = 50;
        img.id = 'heart' + i
        document.getElementById('hearts').append(img);
    }
    reset();

    if(!isLoaded) {
        if(mode === '1' || mode === '2') {
            document.getElementById('word_padding').remove();
        } else {
            document.getElementById('meaning_box').remove();
        }
    }

    for(let button of selectButton) {
        if(button instanceof HTMLButtonElement) {
            button.onclick = function () {
                if(!isLoaded) {
                    alert('로딩 중입니다! 잠시만 기다려주세요!');
                    return;
                }
                if(button.innerHTML === answer) {
                    score++;
                    // console.log('정답: ' + answer);
                } else {
                    let img = document.getElementById('heart' + (maxLife - 1 - (maxLife - life--)));
                    if(img instanceof HTMLImageElement) img.src = '../resources/dead_heart.png';
                    if(life < 1) {
                        game_over();
                    }
                    // console.log('오답: ' + answer);
                    // console.log('정답: ' + button.innerHTML)
                }
                if(highScore < score) {
                    highScore = score;
                }
                reset();
            };
        }
    }

    isLoaded = true;
};