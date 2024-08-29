const API_KEY="7605140816c14a6aaad827686ddcb0a3";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=>fetchNews("AI"));

function reload(){
   window.location.reload();
}
async function fetchNews(query){
   const res=await fetch(`${url}${query}&apikey=${API_KEY}`);
   const data=await res.json();
  
   
   if(data && data.articles && !data.articles.length){
      const cardcontainer=document.querySelector('.cards-container');
      cardcontainer.innerHTML=" ";
      cardcontainer.innerHTML="<h1 style='color:red; font-style:italic;'>oops! search not found...</h1>";
   }
   else{
      bindData(data.articles);
   }

}

function bindData(articles){
   const cardContainer=document.getElementById("cards-container");
   const newscardtemplate=document.getElementById("template-news-card");

   cardContainer.innerHTML=" ";// check this line later.

   articles.forEach(article => {
      if(!article.urlToImage) return;
      const cardclone=newscardtemplate.content.cloneNode(true);// check this line also doubt..
      fillDataIncard(cardclone,article);
      cardContainer.appendChild(cardclone);
   });
   
   function fillDataIncard(cardclone, article){
      const newsimg=cardclone.querySelector('#news-img');
      const newstitle=cardclone.querySelector('#news-title');
      const newssrc=cardclone.querySelector('#news-source');
      const newssdesc=cardclone.querySelector('#news-desc');
      const date= new Date(article.publishedAt).toLocaleString("en-US",{
         timeZone:"Asia/jakarta"
      });

         newsimg.src=article.urlToImage;
         newsimg.addEventListener("click",()=>{
            window.open(article.url,"_blank");
         });
      
     
      newstitle.innerHTML=article.content;
      newssrc.innerHTML=`${article.source.name}: ${date}`;
      newssdesc.innerHTML=article.description;
      
   }
}

let currentsel=null;
function onNavitemclick(id){
  fetchNews(id);
  const navitem=document.getElementById(id);
  currentsel?.classList.remove('active'); // doubt here.
  currentsel=navitem;
  currentsel.classList.add('active');
  
}

const searchbutton=document.getElementById('search-button');
const searchText=document.getElementById('search-text');

searchbutton.addEventListener('click',()=>{
   const query=searchText.value;
   if(!query) return;
   fetchNews(query);
   currentsel?.classList.remove('active');
   currentsel=null;

})
