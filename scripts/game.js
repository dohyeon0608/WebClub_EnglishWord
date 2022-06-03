let answer = '';
let score = 5;
let stage = localStorage.getItem('word_stage');

const highScoreAddress = 'word_high_score_' + stage;

let highScore = localStorage.getItem(highScoreAddress) ?? 5;

if(stage === null) {
    window.location.href = 'select_stage.html'
}

const easy = `chicken: 닭
egg: 달걀, 계란
fool: 바보
april: 4월`;

const normal = `on ~ing: ~하자 마자
however: 하지만
do one's best: 최선을 다하다
regret: 후회하다`;

const hard = `offer: 제공하다
fluid: 유체, 유동체, 유동체의
glance: 흘긋보다, 흘긋봄
witness: 목격자, 증인, 목격하다, 증언하다
official: 공식의, 심판
proportion: 비율, 부분, 균형
elaborate: 정교한, 공들인
habitat: 서식지, 주거지
splendid: 훌륭한, 멋진
posture: 자세
cure: 치료하다, 고치다, 치유법
immune: 면역성의
therapy: 치료, 요법
stroke: 타격, 뇌졸증`;

let db = {
};

function getWord(string) {
    for(let line of string.split('\n')) {
        let l = line.split(': ');
        db[l[0]] = l[1];
    }

}

let selectButton = document.getElementsByClassName('choice');
let scoreElement = document.getElementById('score');
let highScoreElement = document.getElementById('high_score');

for(let button of selectButton) {
    if(button instanceof HTMLButtonElement) {
        button.onclick = function () {
            if(button.innerHTML === answer) {
                score++;
                // console.log('정답: ' + answer);
            } else {
                score--;
                if(score < 0) {
                    game_over();
                }
                // console.log('오답: ' + answer);
            }
            if(highScore < score) {
                highScore = score;
            }
            reset();
        };
    }
}

function game_over() {
    localStorage.setItem(highScoreAddress, highScore)
    window.location.href = "game_over.html";
}

function reset() {
    let index = Math.floor(Math.random() * Object.keys(db).length);
    let question = (Object.keys(db))[index];
    let answers = Object.values(db);
    answer = answers[index];

    let answer_index = Math.floor(Math.random() * 4);

    let i = 0;
    for(let button of selectButton) {
        if(button instanceof HTMLButtonElement) {
            let text = answers[Math.floor(Math.random() * answers.length)];
            if(i === answer_index) {
                if(answers.includes(answer)) {
                    button.innerText = text = answer;
                } else button.innerText = text;
            } else {
                button.innerText = text;
            }
            let index = answers.indexOf(text);
            // console.log(answers);
            if (index !== -1) {
                answers.splice(index, 1);
            }
            i++;
        }
    }
    document.getElementById('word_box').innerText = question;
    // console.log('reset function called. (new value : ' + answer)
    scoreElement.innerText = '점수: ' + score;
    highScoreElement.innerText = '현재 난이도 최고 기록: ' + highScore;

}

let h2 = document.body.querySelector('h2');
h2.innerText = '현재 난이도는 ' + localStorage.getItem('word_stage') + '입니다';

window.onload = function() {
    switch(stage) {
        case '0':
            getWord(easy);
            break;
        case '1':
            getWord(normal);
            break;
        case '2':
            getWord(hard);
            break;
        default:
    }
    reset();
};

// let test = 100;
//
// setInterval(() => {
//     let str = test.toFixed();
//     let len = str.length;
//
//     let second = str.substring(0, len-1);
//
//     h2.innerText = '남은 시간: ' + ((second === '')? '0' : second )+ '.' + str.substring(len-1, len);
//     test--;
// }, 100);