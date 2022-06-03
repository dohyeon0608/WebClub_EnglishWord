let e = document.getElementById('high_score');
e.innerText = '최고 기록: ' + localStorage.getItem('word_high_score_' + localStorage.getItem('word_stage')) + '점';