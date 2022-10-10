import { KeywordOccurrence } from "./KeywordOccurrence.js";
import { Keyword } from "./Keyword.js";

// ---------------------------------------- KEYWORDS IN MODAL -------------------------------------------------
var alertsCont=document.querySelector(".alertsCont");

var keywordList=[];
var div2=document.querySelector(".mK");
var ul=document.createElement("ul");
ul.className="list-group";
div2.appendChild(ul);

fetch("https://localhost:5001/Keyword/GetKeywords")
.then (p=>
    {
        p.json().then(data =>{
            data.forEach(k=>{
                var kw = new Keyword(k.word, k.lowestPrice, k.highestPrice, k.location, k.minNumOfLikes);
                keywordList.push(kw);
            
                var li =document.createElement("li");
                li.className="list-group-item list-group-item-light";
                li.innerHTML=k.word;
                li.style.textAlign="center";
                ul.appendChild(li);
            })
        })
    })

// --------------------------------- KEYWORD OCCURRENCE IN OFFCANVAS -----------------------------------------------
var keywordOccurrenceList=[]; // ovde imam sve pojave do sada
fetch("https://localhost:5001/KeywordOccurrence/GetKeywordOccurrences")
.then (p=>
    {
        p.json().then(data =>{
            data.forEach(k=>{
                var keywordOccurrence =new KeywordOccurrence(k.id, k.word, k.authorName, k.title, k.text, k.price, k.location, k.contactNumber, k.email, k.link, k.likes, k.sentiment, k.date);
                keywordOccurrenceList.push(keywordOccurrence);
                var d1 = new Date();
                var d2 = new Date(k.date);
                
                if(d2.getDate() == d1.getDate())
                {
                    var div1=document.querySelector(".notif");

                    var message= "New occurrence for word "+ k.word
                    + ". Check out the post where it was found: ";
                    var alertic=document.createElement("div");
                    alertic.className="alert alert-primary";
                    alertic.role="alert";
                    alertic.innerHTML=message;
                    div1.appendChild(alertic);

                    var a=document.createElement("a");
                    a.className="alert-link";
                    a.innerHTML="link to post";
                    a.href=k.link;
                    alertic.appendChild(a);
                }
            })
        })
        
    })





