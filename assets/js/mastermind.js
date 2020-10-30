window.onload = function () {
    // HTML pick
    let html_reponsesHistory = document.getElementById('reponsesHistory');
    let html_colorsPicker = document.getElementById('colorsPicker');
    let html_currentReponse = document.getElementById('currentReponse');
    let html_colorPick_array = document.querySelectorAll('.colorPick');
    let colors = ["green","yellow","red","blue","orange","purple"];

    console.log(html_colorPick_array);
    // Add HTML colorPick
    html_colorPick_array.forEach(function(colorPick,i){
        colorPick.style.backgroundColor = colors[i];
        colorPick.id = 'pick_'+colors[i];
        colorPick.style.borderRadius = '50%';
        colorPick.style.width = '50px';
        colorPick.style.height = '50px';
    });
}