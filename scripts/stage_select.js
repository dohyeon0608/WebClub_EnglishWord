let buttons = document.getElementsByClassName('stage_button');

window.onload = function () {
    for(let button of buttons) {
        if(button instanceof HTMLButtonElement) {
            button.onclick = function () {
                let stage = 0;
                switch (button.id) {
                    case 'stg_easy': stage = 0; break;
                    case 'stg_normal': stage = 1; break;
                    case 'stg_hard': stage = 2; break;
                    case 'stg_custom': stage = 3; break;
                }
                window.location.href = 'game.html?mode=' + stage;
            }
        }
    }
}