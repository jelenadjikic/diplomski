import { Keyword } from "./Keyword.js";
export class AddingKeyword{
    constructor()
    {
        this.keywordList=[];
        this.keywordOccurrenceList=[];

        this.cont=null;
        this.alertsCont=null;
        this.contInput=null;
    }

    addKeywordToKeywordList(k)
    {
        this.keywordList.push(k);   
    }

    addKeywordOccurrenceToKeywordOccurrenceList(k)
    {
        this.keywordOccurrenceList.push(k);   
    }

    deleteChildrenFromParent(childClass, parentClass){
        var parent=document.querySelector("." + parentClass);
            var children=document.querySelectorAll("." + childClass);
            children.forEach(child=>{
                if(child.parentNode==parent)
                {
                    parent.removeChild(child);
                }
            }) 
    }

    draw(host)
    {
        this.cont=document.createElement("div");
        this.cont.className="ContAddingKeyword";
        host.appendChild(this.cont);

        this.alertsCont=document.createElement("div");
        this.alertsCont.className="alertsCont";
        this.cont.appendChild(this.alertsCont);

        this.drawInput();
    }

    drawRow(host)
    {
        let row=document.createElement("div");
        row.className="RowAddingKeyword";
        host.appendChild(row);
        return row;  
    }

    drawInput(){
        this.contInput=document.createElement("div");
        this.contInput.className="contInput";
        this.cont.appendChild(this.contInput);

        let labela=document.createElement("label");
        labela.innerHTML="Type in the product you would like to start tracking: ";
        labela.className="labela";
        this.contInput.appendChild(labela);

        // Input word 
        let  row=this.drawRow(this.contInput);
        let textboxInputWord=document.createElement("input");
        textboxInputWord.type="string";
        textboxInputWord.className="textboxInputWord";
        textboxInputWord.placeholder="product name";
        row.appendChild(textboxInputWord);

        // Input lowest price 
        row=this.drawRow(this.contInput);
        let textboxInputLPrice=document.createElement("input");
        textboxInputLPrice.type="int";
        textboxInputLPrice.className="textboxInputLPrice";
        textboxInputLPrice.placeholder="lowest price";
        row.appendChild(textboxInputLPrice);

        // Input highest price 
        row=this.drawRow(this.contInput);
        let textboxInputHPrice=document.createElement("input");
        textboxInputHPrice.type="int";
        textboxInputHPrice.className="textboxInputHPrice";
        textboxInputHPrice.placeholder="highest price";
        row.appendChild(textboxInputHPrice);

        // Input location
        row=this.drawRow(this.contInput);
        let textboxInputLocation=document.createElement("input");
        textboxInputLocation.type="string";
        textboxInputLocation.className="textboxInputLocation";
        textboxInputLocation.placeholder="location";
        row.appendChild(textboxInputLocation);

        // Input likes - label + textbox
        row=this.drawRow(this.contInput);
        let textboxInputLikes=document.createElement("input");
        textboxInputLikes.type="int";
        textboxInputLikes.className="textboxInputLikes";
        textboxInputLikes.placeholder="min number of likes";
        row.appendChild(textboxInputLikes);

        // Button - Track keyword with typed constraints
        row=this.drawRow(this.contInput);
        let buttonInput=document.createElement("button");
        buttonInput.className="btn btn-light";
        buttonInput.innerHTML="Start tracking product";
        row.appendChild(buttonInput);

        var keywordFromInput="";
        var lPriceFromInput="";
        var hPriceFromInput="";
        var locationFromInput="";
        var likesFromInput="";

        buttonInput.onclick=(ev)=>
        { 
            if(this.cont.querySelector(".textboxInputWord").value != "")
                keywordFromInput=this.cont.querySelector(".textboxInputWord").value;
            if(this.cont.querySelector(".textboxInputLPrice").value != "")
                lPriceFromInput= parseInt(this.cont.querySelector(".textboxInputLPrice").value);
            if(this.cont.querySelector(".textboxInputHPrice").value != "")
                hPriceFromInput= parseInt(this.cont.querySelector(".textboxInputHPrice").value);
            if(this.cont.querySelector(".textboxInputLocation").value != "")
                locationFromInput= this.cont.querySelector(".textboxInputLocation").value;
            if(this.cont.querySelector(".textboxInputLikes").value != "")
                likesFromInput= parseInt(this.cont.querySelector(".textboxInputLikes").value);
  
            this.trackKeyword(keywordFromInput, lPriceFromInput, hPriceFromInput, locationFromInput, likesFromInput);
            this.cont.querySelector(".textboxInputWord").value = "";
            this.cont.querySelector(".textboxInputLPrice").value = "";
            this.cont.querySelector(".textboxInputHPrice").value = "";
            this.cont.querySelector(".textboxInputLocation").value = "";
            this.cont.querySelector(".textboxInputLikes").value = "";
            keywordFromInput="";
            lPriceFromInput="";
            hPriceFromInput="";
            locationFromInput="";
            likesFromInput="";
        }
    }

    trackKeyword(keywordFromInput,lPriceFromInput, hPriceFromInput, locationFromInput, likesFromInput){

        fetch("https://localhost:5001/Keyword/TrackKeyword/"+ keywordFromInput + "/" + lPriceFromInput + "/" + hPriceFromInput + "/" + locationFromInput + "/" + likesFromInput,
            {
                method:"POST",
                headers:
                {
                    "Content-Type":"application/json"
                }
            }).then(s=>{
                if(s.ok)
                {
                    var newKeyword=new Keyword(keywordFromInput.toLowerCase(), lPriceFromInput, hPriceFromInput, locationFromInput, likesFromInput);
                    this.keywordList.push(newKeyword);
                   
                    this.drawAlert("You started tracking product --> "+ newKeyword.word, "alert alert-success alert-dismissible fade show");
                }
                else {
                    this.drawAlert("You are already tracking this product!", "alert alert-danger alert-dismissible fade show");
                }
            })
    }

    drawAlert(message, type)
    {
        var alertic=document.createElement("div");
        alertic.className=type;
        alertic.role="alert";
        alertic.innerHTML=message;
        this.alertsCont.appendChild(alertic);

        var button1=document.createElement("button");
        button1.className="btn-close";
        button1.ariaLabel="Close";
        alertic.appendChild(button1);

        button1.onclick=(ev)=>{
            this.alertsCont.removeChild(alertic);
        }
    }

}