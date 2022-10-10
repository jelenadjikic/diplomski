import { Keyword } from "./Keyword.js";
import { AddingKeyword } from "./AddingKeyword.js";

// ------------------------------------- KEYWORDS -----------------------------------------------
var ak = new AddingKeyword();
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
            ak.draw(document.body);
        })
    })

