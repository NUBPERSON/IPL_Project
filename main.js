const request=require('request');
const cheerio=require('cheerio');
//const colors = require('colors');


const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";
request(url,cb);
function cb(err,code,data){
    if(err)
      console.log(err);
    else
       mainpage(data);  
}

function mainpage(data){
const selectorTool =cheerio.load(data);
let allarr=selectorTool('.match-score-block');
//console.log(allarr.length);

for(let i=0;i<allarr.length;i++){
    let link=selectorTool(allarr[i]).find('a').attr('href');
     link=link.substring(27,link.length-18);
     let finallink="https://www.espncricinfo.com"+link+"full-scorecard";
     request(finallink,cb1);
}
}

function cb1(err,code,data){
    if(err)
      console.log(err);
     else
      scorecardpage(data); 
}
function scorecardpage(data){
    let selectorTool=cheerio.load(data);
    let tablearr=selectorTool('.table.batsman tbody');
   //console.log(tablearr.length);
   let empty="";
   for(let i=0;i<30;i++)
     empty+=" ";
   console.log("Batsman"+empty+ "runs");
    for(let i=0;i<tablearr.length;i++){

       let tablerowarr=selectorTool(tablearr[i]).find('tr');
       for(let j=0;j<tablerowarr.length-1;j=j+2){
           let len=40;
            
           let data=selectorTool(tablerowarr[j]).find('td');
           len-=selectorTool(data[0]).text().length;
           let blank="";
           for(let q=0;q<len;q++)
              blank+=" ";
       console.log( selectorTool(data[0]).text() +blank + selectorTool(data[2]).text());
      
       }
       console.log("");
    }
    console.log("");
    console.log("");
    
    let tablearr1=selectorTool('.table.bowler tbody');
   //console.log(tablearr.length);
    empty="";
   for(let i=0;i<30;i++)
     empty+=" ";
   console.log("Bowler"+empty+ "wickets");
    for(let i=0;i<tablearr1.length;i++){
     
       let tablerowarr=selectorTool(tablearr1[i]).find('tr');
    
       for(let j=0;j<tablerowarr.length;j++){
        let len=40;
           let data=selectorTool(tablerowarr[j]).find('td');
           if(data.length>=4){
            len-=selectorTool(data[0]).text().length;
            let blank="";
            for(let q=0;q<len;q++)
               blank+=" ";
       console.log( selectorTool(data[0]).text() +blank+ selectorTool(data[4]).text());
       
    }
       }
       console.log("");
    }
    console.log("");
    console.log("");
    console.log("");
    console.log("");
}