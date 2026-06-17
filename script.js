let words=[];
let current=0;
let xp=Number(localStorage.getItem('xp')||0);

fetch('words.json').then(r=>r.json()).then(data=>{
 words=data;
 updateCard();
 makeQuiz();
});

function updateStats(){
 document.getElementById('xp').textContent=xp;
 document.getElementById('level').textContent=Math.floor(xp/100)+1;
}
updateStats();

function updateCard(){
 let w=words[current];
 document.getElementById('fr').textContent=w.fr;
 document.getElementById('en').textContent=w.en;
}

function nextCard(){
 current=Math.floor(Math.random()*words.length);
 updateCard();
}

function speak(){
 speechSynthesis.speak(new SpeechSynthesisUtterance(words[current].fr));
}

function makeQuiz(){
 let correct=words[Math.floor(Math.random()*words.length)];
 document.getElementById('question').textContent='What does: '+correct.fr+' mean?';
 let answers=[correct.en];
 while(answers.length<4){
   let a=words[Math.floor(Math.random()*words.length)].en;
   if(!answers.includes(a)) answers.push(a);
 }
 answers.sort(()=>Math.random()-0.5);
 let div=document.getElementById('answers');
 div.innerHTML='';
 answers.forEach(a=>{
   let b=document.createElement('button');
   b.textContent=a;
   b.onclick=()=>{
      if(a===correct.en){xp+=10;localStorage.setItem('xp',xp);updateStats();}
      makeQuiz();
   };
   div.appendChild(b);
 });
}

document.getElementById('search').addEventListener('input',e=>{
 let q=e.target.value.toLowerCase();
 let found=words.find(w=>w.fr.toLowerCase().includes(q)||w.en.toLowerCase().includes(q));
 if(found){
   current=words.indexOf(found);
   updateCard();
 }
});