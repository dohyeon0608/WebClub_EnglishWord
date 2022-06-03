let button = document.getElementById('load_file');

// window.onload = load;
//
// function load() {
//     // if(button instanceof HTMLButtonElement) {
//     //     button.onclick = function (event) {
//     //         // let text = prompt('불러올 파일 명');
//     //         // button.innerText = '테스트: ' + text;
//     //         event.preventDefault();
//     //
//     //     }
//     // }
//     if(!(File && FileReader && FileList && Blob)) {
//         alert("Not Supported File API");
//     }
//
//
//     document.getElementById("inputFile").onchange = function (event) {
//         let files = event.target.files;
//         console.log(files);
//
//         const reader = new FileReader();
//         reader.onload = function (event) {
//             console.log(event.target.result)
//         }
//         reader.readAsText(files[0], 'UTF-8')
//     };
// }