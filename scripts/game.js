let answer = '';
let score = 0;

function error(message = "알 수 없는 오류가 발생했습니다. 나중에 다시 시도해주세요.") {
    alert(message);
    window.location.href = 'select_stage.html'
}

let maxLife = 5;
let life = 3;

const urlStr = window.location;
const url = new URL(urlStr);
let urlParameter = url.searchParams
let isLoaded = false;
let mode = urlParameter.get('mode');
let suheang = urlParameter.get('suheang') ?? 'false';
suheang = suheang === 'true';

if(mode === null) {
    error();
}

const highScoreAddress = 'word_high_score_' + mode;
let highScore = localStorage.getItem(highScoreAddress) ?? 0;

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

let wrong_asw_record = {

};

let selectButton = document.getElementsByClassName('choice');
let scoreElement = document.getElementById('score');
let highScoreElement = document.getElementById('high_score');
let wordBoxElement = document.getElementById('word_box');

let max_combos = 0;
let combos = 0;

function update_heart() {
    for(let i = 0; i < maxLife; i++) {
        let img = document.getElementById('heart' + i);
        if(i < life) {
            if(img instanceof HTMLImageElement) img.src = 'resources/heart.png';
        } else {
            if(img instanceof HTMLImageElement) img.src = 'resources/dead_heart.png';
        }
    }
}

function game_over() {
    localStorage.setItem(highScoreAddress, highScore)
    localStorage.setItem('word_last_score', score);
    localStorage.setItem('word_last_stage', mode);
    localStorage.setItem('word_last_wrong', JSON.stringify(wrong_asw_record));
    localStorage.setItem('word_last_combo', max_combos);
    window.location.href = "game_over.html";
}

function error_alert(message) {
    alert('오류가 발생했습니다.' + "\n" + message);
    window.location.href = 'index.html'
}

function answer_correct() {
    score++;
    combos++;
    if(combos > max_combos) max_combos = combos;
    if(combos % 10 === 0 && combos > 0) {
        if(life <= maxLife - 1) {
            life++;
            // let img = document.getElementById('heart' + (maxLife - ++life + 1));
            // if(img instanceof HTMLImageElement) img.src = '../resources/heart.png';
        }
    }
}

function answer_wrong() {
    combos = 0;
    life--;
    // let img = document.getElementById('heart' + (maxLife - 1 - (maxLife - life--)));
    // if(img instanceof HTMLImageElement) img.src = '../resources/dead_heart.png';
    if(suheang) {
        wrong_asw_record[db[word]] = ((wrong_asw_record[word]) ?? 0) + 1
    } else {
        wrong_asw_record[word + '\n' + db[word]] = ((wrong_asw_record[word]) ?? 0) + 1
    }

}

function update_combo_text() {
    let comboElement = document.getElementById('combo');
    if(combos >= 3) {
        let msg = combos + ' COMBO';
        if(combos % 10 === 0) msg += '\n목숨 +1';
        comboElement.innerText = msg;
    } else {
        comboElement.innerText = '';
    }
}

function on_click(data) {
    if(!isLoaded) {
        alert('로딩 중입니다! 잠시만 기다려주세요!');
        return;
    }
    if(data === answer) {
        answer_correct()
    } else {
        answer_wrong()
        // console.log('오답: ' + answer);
        // console.log('정답: ' + button.innerHTML)
    }
    if(highScore < score) {
        highScore = score;
    }
    if(life < 1) {
        game_over();
    }
    update_combo_text();
    update_heart();
    reset();
}


window.onload = function() {
    if(suheang){
        word_txt = loadFile('resources/words/suheang_temporary');
        console.log(suheang);
        document.getElementById('word_box').id = 'word_box_long';
    } else {
        word_txt = loadFile('resources/words/word_lib');
    }

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
        if(typeof db[l[0]] !== "undefined") {
            console.log('중복 이슈 (' + line_number + '줄): ' + l[0]);
        }
        db[l[0]] = l[1].replace('\r', '');
    }

    if(db.length < 4) {
        error_alert('파일 로드에 실패했습니다: 단어가 너무 적습니다! 4개 이상의 단어를 작성해주세요,');
    }

    life = maxLife;

    for(let i = 0; i < maxLife; i++) {
        let img = document.createElement('img');
        img.src = 'resources/heart.png';
        img.width = 50;
        img.height = 50;
        img.id = 'heart' + i
        document.getElementById('hearts').append(img);
    }

    if(!isLoaded) {
        if(mode === '1' || mode === '2') {
            document.getElementById('word_padding').remove();
        } else if(mode === '0') {
            document.getElementById('meaning_box').remove();
        } else {
            error("알 수 없는 모드입니다. 정상적으로 접근해주세요.");
        }
    }

    reset();

    for(let button of selectButton) {
        if(button instanceof HTMLButtonElement) {
            button.onclick = function() {
                on_click(button.innerHTML)
            };
        }
    }

    isLoaded = true;
};

