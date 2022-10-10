import { Keyword } from "./Keyword.js";
import { KeywordOccurrence } from "./KeywordOccurrence.js";
import { ShowKeywords } from "./ShowKeywords.js";

// ------------------------------------- KEYWORDS -----------------------------------------------
var ak = new ShowKeywords();
var keywordList=[];
fetch("https://localhost:5001/Keyword/GetKeywords")
.then (p=>
    {
        p.json().then(data =>{
            data.forEach(k=>{
                var kw = new Keyword(k.word, k.lowestPrice, k.highestPrice, k.location, k.minNumOfLikes);
                ak.addKeywordToKeywordList(kw);
                keywordList.push(kw);
            })
        })
    })


// ------------------------------------- KEYWORD OCCURRENCE -----------------------------------------------
var keywordOccurrenceList=[];
fetch("https://localhost:5001/KeywordOccurrence/GetKeywordOccurrences")
.then (p=>
    {
        p.json().then(data =>{
            data.forEach(k=>{
                var keywordOccurrence =new KeywordOccurrence(k.id, k.word, k.authorName, k.title, k.text, k.price, k.location, k.contactNumber, k.email, k.link, k.likes, k.sentiment, k.date);
                ak.addKeywordOccurrenceToKeywordOccurrenceList(keywordOccurrence);
                keywordOccurrenceList.push(keywordOccurrence);
            })
            ak.draw(document.body);
        })     
    })



