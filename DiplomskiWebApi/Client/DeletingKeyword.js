import { Keyword } from "./Keyword.js";
import { KeywordOccurrence } from "./KeywordOccurrence.js";
export class DeletingKeyword{
    constructor()
    {
        this.keywordList=[];
        this.keywordOccurrenceList=[];
        
        this.cont=null;
        this.alertsCont=[];
        this.contDelete=null;
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
        this.cont.className="ContDeletingKeyword";
        host.appendChild(this.cont);

        this.alertsCont=document.createElement("div");
        this.alertsCont.className="alertsCont";
        this.cont.appendChild(this.alertsCont);
        
        this.drawDelete();
    }

    drawRow(host)
    {
        let row=document.createElement("div");
        row.className="Row";
        host.appendChild(row);
        return row;  
    }

    drawDelete(){
        this.contDelete=document.createElement("div");
        this.contDelete.className="contDelete";
        this.cont.appendChild(this.contDelete);

        let row=this.drawRow(this.contDelete);
        let labela=document.createElement("label");
        labela.innerHTML="Select product you would like to stop tracking: ";
        labela.className="labela";
        row.appendChild(labela);

        row=this.drawRow(this.contDelete);
        let selectForDelete=document.createElement("select");
        selectForDelete.className="form-select";
        row.appendChild(selectForDelete);
        
        let op;
        op=document.createElement("option");
        op.innerHTML="Choose product";
        op.value=" ";
        selectForDelete.appendChild(op);  

        let listaOfWords=[];
        this.keywordList.forEach(kw=>{
            if(!listaOfWords.includes(kw.word))
            {
                listaOfWords.push(kw.word);
                op=document.createElement("option");
                op.innerHTML=kw.word;
                op.value=kw.word;
                selectForDelete.appendChild(op);    
            }
        })
    
        row=this.drawRow(this.contDelete);
        let buttonDelete=document.createElement("button");
        buttonDelete.className="btn btn-light";
        buttonDelete.innerHTML="Stop tracking product";
        row.appendChild(buttonDelete);

        var keywordFromDelete=null;
        buttonDelete.onclick=(ev)=>
        { 
            let optionEl = this.cont.querySelector(".form-select"); 
            keywordFromDelete=optionEl.options[optionEl.selectedIndex].value;
                
            this.untrackKeyword(keywordFromDelete);
            keywordFromDelete=null;
        }

    }

    untrackKeyword(keywordFromDelete){
        fetch("https://localhost:5001/Keyword/UntrackKeyword/"+ keywordFromDelete,
        {
            method:"DELETE",
            headers:
            {
                "Content-Type":"application/json"
            }
        }).then(s=>{
            if(s.ok)
            {
                this.drawAlert("Keyword " + keywordFromDelete + " deleted!","alert alert-success alert-dismissible fade show");
            }
            else {
                this.drawAlert("Keyword " + keywordFromDelete +  " NOT deleted!","alert alert-danger alert-dismissible fade show");
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