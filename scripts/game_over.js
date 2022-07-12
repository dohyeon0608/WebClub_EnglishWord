let e = document.getElementById('high_score');
let wrongs = JSON.parse(localStorage.getItem('word_last_wrong') ?? []);
let wrongInit = false
for(let wrong in wrongs) {
    if(!wrongInit) {
        let h2 = document.createElement('h2');
        h2.innerText = '맞추지 못한 단어들';
        document.body.appendChild(h2);
        wrongInit = true
    }
    let div = document.createElement('div');
    div.className = 'wrong';
    div.innerText = wrong;
    document.body.appendChild(div);
}
// let shape = document.createElement('div');
// shape.id = 'test'
// document.body.appendChild(shape);
e.innerText = '점수: ' + localStorage.getItem('word_last_score') + '점'
    + "\n" + '최고 기록: ' + localStorage.getItem('word_high_score_' + localStorage.getItem('word_last_stage')) + '점'
    + '\n' + '최대 콤보: ' + localStorage.getItem('word_last_combo');