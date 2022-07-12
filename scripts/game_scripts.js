let scripts = [];
let answer_index = 0;
let answers = [];
let question = 'Loading';
let word = '';

let mode2ButtonElement = document.getElementById('mode2_button');

String.prototype.shuffle = function () {
    let a = this.split(""),
        n = a.length;

    for(let i = n - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }

    return a.join("");
}

function settingButton(answers, answer_index, question) {
    let i = 0;
    for(let button of selectButton) {
        if(button instanceof HTMLButtonElement) {
            if(answers.length === 0) {
                break;
            }
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
    wordBoxElement.innerText = question;
}

// 뜻 맞추기
scripts[0] = function() {
    let index = Math.floor(Math.random() * Object.keys(db).length);
    question = (Object.keys(db))[index];
    answers = Object.values(db);
    answer = answers[index];
    word = question;

    settingButton(answers, answer_index, question);
    // console.log('reset function called. (new value : ' + answer)
}

// 글자 찾기
scripts[1] = function() {
    let meaning_box = document.getElementById('meaning_box');

    let word_number = Math.floor(Math.random() * Object.keys(db).length);
    word = (Object.keys(db))[word_number];
    meaning_box.innerText = Object.values(db)[word_number];

    let chance = 3;

    let index;

    answer = ' ';
    while (answer === ' ') {
        --chance;
        if(chance < 0) {
            answer = word.charAt(0);
            break;
        }
        index = Math.floor(Math.random() * word.length);
        answer = word.charAt(index);
    }

    question = word.substring(0, index) + '_' + word.substring(index + 1, word.length);

    answers = 'abcdefghijklmnopqrstuvwxyz'.split('');

    settingButton(answers, answer_index, question);
}

// 단어 배열
scripts[2] = function() {
    answers = [];

    let meaning_box = document.getElementById('meaning_box');

    let word_number = Math.floor(Math.random() * Object.keys(db).length);
    word = (Object.keys(db))[word_number];

    let words = word.split(' ');

    for(let i = 0; i < words.length; i++) {
        words[i] = words[i].shuffle();
    }

    question = words.join(' ')

    meaning_box.innerText = Object.values(db)[word_number];
    wordBoxElement.innerText = question;

    answer = word;

    mode2ButtonElement.onclick = function () {
        let input = document.getElementById('mode2_form');
        if(input instanceof HTMLFormElement) {
            let value = document.getElementById('mode2_input').value;
            input.reset()
            on_click(value);
        }
    }

    // for(let i = 0; i < 4; i++) {
    //     answers.push(word.shuffle());
    // }
    //
    // answers.push(word);
    //
    // settingButton(answers, answer_index, question);
}

function reset() {
    answer_index = Math.floor(Math.random() * 4);
    scoreElement.innerText = '점수: ' + score;
    highScoreElement.innerText = '현재 모드 최고 기록: ' + highScore;
    document.getElementById('left_life').innerText = life.toFixed();
    scripts[mode]();
    let input = document.getElementById('mode2');
    if(!isLoaded) {
        if(mode !== '2') {
            input.remove();
            mode2ButtonElement.remove()
        } else {
            document.getElementById('buttons').remove();
            document.getElementById('mode2_form').onkeydown = function(ev) {
                if (ev.code === "Enter") {
                    ev.preventDefault();
                    let input = document.getElementById('mode2_form');
                    let value = document.getElementById('mode2_input').value;
                    input.reset();
                    on_click(value);

                }
            }
        }
    }


}