const screens = {
 opening: document.getElementById("opening"),
 birthday: document.getElementById("birthday"),
 prayer: document.getElementById("prayer"),
 finale: document.getElementById("finale")
};
const music = document.getElementById("music");
const musicControl = document.getElementById("musicControl");
const helloText = document.getElementById("helloText");

function showScreen(name){
  Object.values(screens).forEach(s=>s.classList.remove("active"));
  screens[name].classList.add("active");
}

async function playMusic(){
  try{await music.play(); musicControl.textContent="🔊 Musik";}
  catch(e){musicControl.textContent="▶️ Putar Musik";}
}
window.addEventListener("load", playMusic);
document.addEventListener("pointerdown", ()=>{if(music.paused) playMusic();},{once:true});
musicControl.addEventListener("click", async ()=>{
  if(music.paused){await playMusic()}else{music.pause();musicControl.textContent="🔇 Musik"}
});

const colors=["#ff8fbd","#ffd978","#bca2ff","#8ce2d5","#ffb28d","#fff0f6"];
function confetti(layerId,count=150){
  const layer=document.getElementById(layerId);
  for(let i=0;i<count;i++){
    const p=document.createElement("i");p.className="confetti-piece";
    p.style.left=Math.random()*100+"%";
    p.style.background=colors[Math.floor(Math.random()*colors.length)];
    p.style.animationDelay=Math.random()*1+"s";
    p.style.animationDuration=2.5+Math.random()*2+"s";
    p.style.transform=`rotate(${Math.random()*360}deg)`;
    layer.appendChild(p);setTimeout(()=>p.remove(),6000);
  }
}

document.getElementById("lightBtn").addEventListener("click",()=>{
  helloText.style.transition="1s";helloText.style.opacity="0";helloText.style.transform="scale(.7)";
  setTimeout(()=>{
    showScreen("birthday");
    confetti("confetti",190);
    makePolaroids();
  },650);
});

function makePolaroids(){
  const root=document.getElementById("polaroids");
  root.innerHTML="";
  const positions=[
    ["3%","34%","-12deg"],["15%","57%","9deg"],["28%","33%","-7deg"],
    ["58%","34%","8deg"],["72%","56%","-10deg"],["84%","33%","7deg"],
    ["5%","70%","7deg"],["23%","76%","-8deg"],["63%","75%","10deg"],["82%","69%","-6deg"]
  ];
  const photos = Array.from({length:10}, (_,i)=>`photos/photo${i+1}.jpg`);
  positions.forEach((pos,i)=>{
    const card=document.createElement("div");card.className="polaroid";
    card.style.left=pos[0];card.style.top=pos[1];card.style.setProperty("--r",pos[2]);card.style.animationDelay=(i*.08)+"s";
    card.innerHTML=`<img src="${photos[i]}" alt="Foto Caca ${i+1}" loading="eager"><span>Cacakuu ♡</span>`;
    root.appendChild(card);
  });
}

const prayers=[
 "Semoga setiap langkahmu selalu menemukan jalan menuju bahagia. 🤍",
 "Semoga senyummu tidak pernah kehabisan alasan untuk hadir.",
 "Semoga semua doa yang diam-diam kamu simpan, satu per satu dijawab dengan cara paling indah.",
 "Semoga di usia 21 ini, hatimu semakin tenang, rezekimu semakin luas, dan mimpimu semakin dekat.",
 "Semoga kamu selalu dikelilingi cinta yang tulus, orang-orang baik, dan hari-hari yang membuatmu bersyukur.",
 "Dan semoga… aku selalu punya kesempatan untuk melihat senyum itu dari dekat. 💗",
 "Selamat ulang tahun, Caca. Terima kasih lahir di dunia ini. I Love you, More than Everything. ♡"
];

document.getElementById("prayerBtn").addEventListener("click",()=>{
  showScreen("prayer");
  runPrayers();
});

function runPrayers(){
  const text=document.getElementById("prayerText"),dots=document.getElementById("prayerDots");
  dots.innerHTML=prayers.map((_,i)=>`<i class="${i===0?'active':''}"></i>`).join("");
  let i=0;
  text.textContent=prayers[0];
  const timer=setInterval(()=>{
    i++;
    if(i>=prayers.length){clearInterval(timer);document.getElementById("lastBtn").classList.add("show");return}
    text.style.animation="none";void text.offsetWidth;text.style.animation="prayerFade .9s";
    text.textContent=prayers[i];
    [...dots.children].forEach((d,n)=>d.classList.toggle("active",n===i));
  },6500);
}

document.getElementById("lastBtn").addEventListener("click",()=>{
  showScreen("finale");
  confetti("finalConfetti",260);
  setTimeout(()=>confetti("finalConfetti",150),1800);
});
