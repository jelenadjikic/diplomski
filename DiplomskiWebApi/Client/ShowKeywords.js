import { Keyword } from "./Keyword.js";
import { KeywordOccurrence } from "./KeywordOccurrence.js";

export class ShowKeywords{
    constructor()
    {
        this.keywordList=[];
        this.keywordOccurrenceList=[];

        this.cont=null;
        
        this.alertsCont=null;
        this.contShow=null;
        this.contForm=null;
        this.contResults=null;
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

    drawRow(host)
    {
        let row=document.createElement("div");
        row.className="Row";
        host.appendChild(row);
        return row;  
    }

    draw(host)
    {
        this.cont=document.createElement("div");
        this.cont.className="ContShowKeywords";
        host.appendChild(this.cont);

        this.alertsCont=document.createElement("div");
        this.alertsCont.className="alertsCont";
        this.cont.appendChild(this.alertsCont);

        this.drawShow();
    }

    drawShow(){
        this.contShow=document.createElement("div");
        this.contShow.className="contShow";
        this.cont.appendChild(this.contShow);

        this.contForm=document.createElement("div");
        this.contForm.className="contForm";
        this.contShow.appendChild(this.contForm);

        let row=this.drawRow(this.contForm);
        let labelShow=document.createElement("label");
        labelShow.innerHTML="Choose product you would like to see found posts for: ";
        labelShow.className="labela";
        row.appendChild(labelShow);

        // select the word
        row=this.drawRow(this.contForm);
        let selectForShow=document.createElement("select");
        selectForShow.className="form-select";
        row.appendChild(selectForShow);
        
        let op;
        op=document.createElement("option");
        op.innerHTML="Choose product";
        op.value=" ";
        selectForShow.appendChild(op);  

        let listaOfWords=[];
        this.keywordList.forEach(kw=>{
            if(!listaOfWords.includes(kw.word))
            {
                listaOfWords.push(kw.word);
                op=document.createElement("option");
                op.innerHTML=kw.word;
                op.value=kw.word;
                selectForShow.appendChild(op);    
            }
        })

        // Soritranje - PRICE
        row=this.drawRow(this.contForm);
        labelShow=document.createElement("label");
        labelShow.innerHTML="Sort by: ";
        labelShow.className="labela";
        row.appendChild(labelShow);

        row=this.drawRow(this.contForm);

        // price asc
        var div=document.createElement("div");
        div.className="form-check form-check-inline";
        row.appendChild(div);

        var r1=document.createElement("input");
        r1.className="form-check-input";
        r1.type="radio";
        r1.name="inlineRadioOptions";
        r1.id="inlineRadio1";
        r1.value="priceAsc";
        div.appendChild(r1);

        var labelr1=document.createElement("label");
        labelr1.innerHTML="price asc";
        labelr1.className="form-check-label";
        labelr1.style.color="white";
        div.appendChild(labelr1);

        // price desc
        div=document.createElement("div");
        div.className="form-check form-check-inline";
        row.appendChild(div);

        var r2=document.createElement("input");
        r2.className="form-check-input";
        r2.type="radio";
        r2.name="inlineRadioOptions";
        r2.id="inlineRadio2";
        r2.value="priceDesc";
        div.appendChild(r2);

        var labelr2=document.createElement("label");
        labelr2.innerHTML="price desc";
        labelr2.className="form-check-label";
        labelr2.style.color="white";
        div.appendChild(labelr2);

        // Soritranje - DATUM
        
        // date asc
        div=document.createElement("div");
        div.className="form-check form-check-inline";
        row.appendChild(div);

        r1=document.createElement("input");
        r1.className="form-check-input";
        r1.type="radio";
        r1.name="inlineRadioOptions";
        r1.id="inlineRadio1";
        r1.value="dateAsc";
        div.appendChild(r1);

        labelr1=document.createElement("label");
        labelr1.innerHTML="date asc";
        labelr1.className="form-check-label";
        labelr1.style.color="white";
        div.appendChild(labelr1);

        // price desc
        div=document.createElement("div");
        div.className="form-check form-check-inline";
        row.appendChild(div);

        r2=document.createElement("input");
        r2.className="form-check-input";
        r2.type="radio";
        r2.name="inlineRadioOptions";
        r2.id="inlineRadio2";
        r2.value="dateDesc";
        div.appendChild(r2);

        labelr2=document.createElement("label");
        labelr2.innerHTML="date desc";
        labelr2.className="form-check-label";
        labelr2.style.color="white";
        div.appendChild(labelr2);

        // button
        row=this.drawRow(this.contForm);
        let buttonShow=document.createElement("button");
        buttonShow.className="btn btn-light";
        buttonShow.innerHTML="Show found posts";
        row.appendChild(buttonShow);

        var keywordFromShow="";
        let selectedSort="noSort";
        buttonShow.onclick=(ev)=>
        { 
            let optionEl = this.cont.querySelector(".form-select"); 
            keywordFromShow=optionEl.options[optionEl.selectedIndex].value;

            var radioButtons = document.querySelectorAll('input[name="inlineRadioOptions"]');
            for (var radioButton of radioButtons) {
                if (radioButton.checked) {
                    selectedSort= radioButton.value;
                    break;
                }
            }   

            console.log(selectedSort)
            this.sortByPriceOrDate(keywordFromShow, selectedSort);
        }
    }

    sortByPriceOrDate(keywordFromShow, selectedSort){
        if(selectedSort=="priceAsc")
            this.keywordOccurrenceList.sort( this.comparePriceASC );
        else if (selectedSort=="priceDesc")
            this.keywordOccurrenceList.sort( this.comparePriceDESC );
        else if(selectedSort=="dateAsc")
            this.keywordOccurrenceList.sort( this.compareDateASC );
        else if (selectedSort=="dateDesc")
            this.keywordOccurrenceList.sort( this.compareDateDESC );

            
        this.findResults(keywordFromShow)   
        this.showProgress(keywordFromShow)  
    }

    comparePriceASC(a,b){
        if ( a.price < b.price ){
            return -1;
        }
        if ( a.price > b.price ){
            return 1;
        }
            return 0;  
    }

    comparePriceDESC(a,b){
        if ( a.price < b.price ){
            return 1;
        }
        if ( a.price > b.price ){
            return -1;
        }
            return 0;  
    }
    
    compareDateASC(a,b){
        if ( a.date < b.date ){
            return -1;
        }
        if ( a.date > b.date ){
            return 1;
        }
            return 0;  
    }

    compareDateDESC(a,b){
        if ( a.date < b.date ){
            return 1;
        }
        if ( a.date > b.date ){
            return -1;
        }
            return 0;  
    }

    findResults(keywordFromShow){
        this.deleteChildrenFromParent("Results","contShow");
        this.contResults=document.createElement("div");
        this.contResults.className="Results";
        this.contShow.appendChild(this.contResults);

        var divZaTebelu=document.createElement("div");
        divZaTebelu.className="divZaTabelu";
        this.contResults.appendChild(divZaTebelu);

        var table = document.createElement('table');
        table.className="table table-striped";
        divZaTebelu.appendChild(table);

        var thead = document.createElement('thead');
        thead.className="thead";
        table.appendChild(thead);

        var tr = document.createElement('tr');
        tr.className="tr";
        thead.appendChild(tr);

        var listaZaHead=["#","author","price", "contact", "email", "link","likes","date found"];
        listaZaHead.forEach(el=>{
            var th = document.createElement('th');
            th.className="th";
            th.innerHTML=el;
            tr.appendChild(th);
        })

        var tbody = document.createElement('tbody');
        tbody.className="tbody";
        table.appendChild(tbody);

        var num=1;
        this.keywordOccurrenceList.forEach(k=>{
            if(k.word==keywordFromShow)
            {
                var tr = document.createElement('tr');
                tr.className="tr";
                tbody.appendChild(tr);

                var td=document.createElement('td');
                td.className="td";
                td.innerHTML=num++;
                tr.appendChild(td);

                td=document.createElement('td');
                td.className="td";
                td.innerHTML=k.authorName;
                tr.appendChild(td);

                td=document.createElement('td');
                td.className="td";
                td.innerHTML=k.price + "$";
                tr.appendChild(td);

                td=document.createElement('td');
                td.className="td";
                td.innerHTML=k.contactNumber;
                tr.appendChild(td);

                td=document.createElement('td');
                td.className="td";
                td.innerHTML=k.email;
                tr.appendChild(td);

                td=document.createElement('td');
                td.className="td";
                td.innerHTML= '<a href="'+k.link+'"> link to post </a>';
                tr.appendChild(td);

                td=document.createElement('td');
                td.className="td";
                td.innerHTML=k.likes;
                tr.appendChild(td);

                td=document.createElement('td');
                td.className="td";
                td.innerHTML=k.date.toString().slice(0, 10);
                tr.appendChild(td);
            }
        })
    }

    showProgress(keywordFromShow){

        var p1=0,p2=0,p3=0,pall=0;
        var x1=0,x2=0,x3=0;
        
        this.deleteChildrenFromParent("progress","Results");
        var divProgress=document.createElement("div");
        divProgress.className="progress";
        this.contResults.appendChild(divProgress);

        var d = new Date();
        var d1=d.getDate();
        var d2=d.getDate() -1;
        var d3=d.getDate() -2;
        this.keywordOccurrenceList.forEach(kw=>{
            if(kw.word==keywordFromShow)
            {
                var d0 = new Date(kw.date);
                if(d0.getDate() == d.getDate())
                    {
                        p1++;
                        d1=d0;
                    }
                else if(d0.getDate() == d.getDate() -1 )
                    {
                        p2++;
                        d2=d0;
                    }
                else if(d0.getDate() == d.getDate() -2)
                    {
                        p3++;
                        d3=d0;
                    }
         }})

        pall=p1+p2+p3;
        x1=(p1*100)/pall;
        var div=document.createElement("div");
        div.className="progress-bar progress-bar-striped";
        div.role="progressbar";
        div.style.width=x1.toString() +"%";
        div.innerHTML= d1.toString().slice(4, 10) + "- " + p1.toString() + " posts";
        divProgress.appendChild(div);
 
        x2=(p2*100)/pall;
        div=document.createElement("div");
        div.className="progress-bar progress-bar-striped bg-success";
        div.role="progressbar";
        div.style.width=x2.toString() +"%";
        div.innerHTML= d2.toString().slice(4, 10)+ "- " + p2.toString() + " posts";
        divProgress.appendChild(div);
        
        x3=(p3*100)/pall;
        div=document.createElement("div");
        div.className="progress-bar progress-bar-striped bg-danger";
        div.role="progressbar";
        div.style.width=x3.toString() +"%";
        div.innerHTML= d3.toString().slice(4, 10)+ "- " + p3.toString() + " posts";
        divProgress.appendChild(div);

    }
}