let e = document.getElementById('high_score');
e.innerText = '점수: ' + localStorage.getItem('word_last_score') + '점' + "\n" + '최고 기록: ' + localStorage.getItem('word_high_score_' + localStorage.getItem('word_mode')) + '점';