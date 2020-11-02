window.onload = function () {
    // HTML Selections
    let html_reponsesHistory = document.getElementById('reponsesHistory');
    let html_colorsPicker = document.getElementById('colorsPicker');
    let html_currentReponse = document.getElementById('currentReponse');
    let html_colorCheck = document.getElementById('colorCheck');
    let html_removeLastButton = document.getElementById('removeLast');
    let html_sendResponseButton = document.getElementById('sendResponse');

    // Colors
    let colors = ["green","yellow","red","blue","orange","purple"];

    // CircleColor Object/Class
    class CircleColorCollection{
        constructor(){
            this.colorToFindCollection = [];
            this.pickerCollection = [];
            this.responseCollection = [];
            this.historyCollection = [];
            this.goodAtGoodPlace = 0;
            this.goodAtWrongPlace = 0;
            this.solutionBlueprint = {}; // contain colors of colorToFindCollection and their occrences.
        }

        //functions
        addPicker(color,size,HTMLElem,clickable = false){
            let picker = new CircleColor(color,size,HTMLElem,clickable);
            picker.hookItTo(HTMLElem);
            this.pickerCollection.push(picker);
        }

        addResponse(response){
            this.responseCollection.push(response);
        }

        removeResponse(){
            if(this.responseCollection.length > 0){
                let removedResponse = this.responseCollection.pop();
                removedResponse.htmlElem.parentNode.removeChild(removedResponse.htmlElem);
            }
        }
        clearResponse(){
            this.responseCollection = [];
        }

        addHistory(history){
            let line = document.createElement('div');
            let result = document.createElement('div');
            line.setAttribute('class', 'col-sm-12 d-flex align-items-center p-4');
            result.setAttribute('class', 'col-sm-12 d-flex align-items-center p-4');
            result.style.fontWeight = 'bold';
            this.historyCollection.push(history);
            history.forEach((elem)=>{
                elem.hookItTo(line);
            });
            result.innerHTML = this.goodAtGoodPlace+' at the good place and '+this.goodAtWrongPlace+' at the wrong place';
            html_reponsesHistory.appendChild(line);
            html_colorCheck.appendChild(result);
            if(this.goodAtGoodPlace == 4) alert('You win !');
        }

        // Getters

        getPickerCollection(){
            return this.pickerCollection;
        }
        getResponseCollection(){
            return this.responseCollection;
        }
        getHistoryCollection(){
            return this.historyCollection;
        }

        // Build colorToFindCollection

        buildColorToFindCollection(){
            for(let i=0;i<4;i++){
                this.colorToFindCollection.push(new CircleColor(colors[Math.floor(Math.random()*6)],0,null,false));
            }
            //console.log(this.colorToFindCollection); // show soluce in console to test
            this.buildSolutionBlueprint();
        }
        buildSolutionBlueprint(){
            this.colorToFindCollection.forEach((colorToFind) =>{
                this.solutionBlueprint[colorToFind.color] = this.colorToFindCollection.filter(a => a.color == colorToFind.color).length;
            });
            //console.log(this.solutionBlueprint); // display blueprint
        }

        checkResponse(){
            if(this.responseCollection.length == 4){
                this.goodAtGoodPlace = 0;
                this.goodAtWrongPlace = 0;
                let blueprintCheck = {};
                Object.assign(blueprintCheck,this.solutionBlueprint);

                this.responseCollection.forEach((response,index) => {
                    if(response.color == this.colorToFindCollection[index].color){
                        ++this.goodAtGoodPlace;
                        --blueprintCheck[response.color];
                        //console.log(blueprintCheck);
                    }
                    else if (blueprintCheck[response.color] > 0){
                        ++this.goodAtWrongPlace;
                        --blueprintCheck[response.color];
                    }
                });

                this.addHistory(this.responseCollection);
                this.clearResponse();
                /* console.log(blueprintCheck);
                console.log(this.goodAtGoodPlace);
                console.log(this.goodAtWrongPlace); */
            }
        }
    }

    class CircleColor{
        constructor(color,size,HTMLElem,clickable){
            this.color = color;
            this.build(color,size,clickable);
            if(HTMLElem)this.hookItTo(HTMLElem);
        }
        build(color,size,clickable){
            this.htmlElem = document.createElement('div');
            this.htmlElem.style.backgroundColor = color;
            this.htmlElem.id = 'pick_'+color;
            this.htmlElem.style.borderRadius = '50%';
            this.htmlElem.style.width = size+'px';
            this.htmlElem.style.height = size+'px';
            this.htmlElem.setAttribute('class','mx-auto')
            if(clickable)this.htmlElem.addEventListener('click', (ev)=> this.colorClick(ev));
        }      
        hookItTo(HTMLElem){
            HTMLElem.appendChild(this.htmlElem);
        }
        colorClick(event){
            if(colorCollection.getResponseCollection().length < 4){
                colorCollection.addResponse(new CircleColor(event.target.id.split('_')[1],50,html_currentReponse,false));
            }
        }
    }

    let colorCollection = new CircleColorCollection();
    colorCollection.buildColorToFindCollection();

    // Build HTML colorPicks
        for(i=0;i<6;i++){
            colorCollection.addPicker(colors[i],50,html_colorsPicker,true);
        }

    // Buttons EventListener
        html_removeLastButton.addEventListener('click', () => colorCollection.removeResponse());
        html_sendResponseButton.addEventListener('click', () => colorCollection.checkResponse());

}