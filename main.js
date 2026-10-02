gsap.registerPlugin(ScrollTrigger);
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
/* confetti */
const cf=$('#cf'),cx=cf.getContext('2d');let P=[],run=false;
function fit(){cf.width=innerWidth;cf.height=innerHeight}fit();addEventListener('resize',fit);
function burst(x=innerWidth/2,y=innerHeight/2,n=120){const c=['#c9a45c','#faf9f6','#1b3a8f','#4f7be8','#fff'];for(let i=0;i<n;i++){const a=Math.random()*6.28,s=3+Math.random()*9;P.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-5,r:3+Math.random()*4,c:c[i%5],l:1,rot:Math.random()*6})}if(!run){run=true;tick()}}
function tick(){cx.clearRect(0,0,cf.width,cf.height);P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.18;p.vx*=.99;p.l-=.008;p.rot+=.1;cx.globalAlpha=Math.max(p.l,0);cx.fillStyle=p.c;cx.save();cx.translate(p.x,p.y);cx.rotate(p.rot);cx.fillRect(-p.r,-p.r/2,p.r*2,p.r);cx.restore()});P=P.filter(p=>p.l>0&&p.y<cf.height+20);if(P.length)requestAnimationFrame(tick);else run=false}
/* stars */
(function(){const c=$('#stars'),x=c.getContext('2d');let w,h,S=[];function rs(){w=c.width=innerWidth;h=c.height=innerHeight;S=Array.from({length:110},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.4+.2,a:Math.random()}))}rs();addEventListener('resize',rs);
(function f(){if(!$('#open'))return;x.clearRect(0,0,w,h);S.forEach(s=>{s.a+=.02;x.globalAlpha=.4+.4*Math.sin(s.a);x.fillStyle='#faf9f6';x.beginPath();x.arc(s.x,s.y-(performance.now()/90*s.r)%h+(s.y<(performance.now()/90*s.r)%h?h:0),s.r,0,6.3);x.fill()});requestAnimationFrame(f)})()})();

/* Audio Setup */
const bgAudio = $('#bg-audio');
const voiceAudio = $('#voice-audio');
let bgStarted = false;

bgAudio.src = D.song.src;
voiceAudio.src = D.voice.src;
$('#song-title').textContent = D.song.title;
$('#song-artist').textContent = D.song.artist;
$('#song-quote').textContent = D.song.text;

const mPlayer = $('#music-player');
const mToggle = $('#music-toggle');
const mVinyl = $('.vinyl');
const mWave = $('.waveform');
const mBtn = $('#play-song-btn');

function playBgMusic() {
  if (!bgStarted) { bgStarted = true; bgAudio.currentTime = D.song.songStart || 0; }
  bgAudio.play().then(() => {
    mPlayer.classList.remove('hidden');
    mVinyl.classList.add('playing');
    mWave.classList.add('playing');
    mToggle.textContent = '⏸';
  }).catch(()=>{});
}

function stopBgMusic() {
  bgAudio.pause();
  mVinyl.classList.remove('playing');
  mWave.classList.remove('playing');
  mToggle.textContent = '▶';
}

mToggle.onclick = () => {
  if (bgAudio.paused) playBgMusic();
  else stopBgMusic();
};

mBtn.onclick = () => {
    playBgMusic();
    mBtn.style.opacity = 0;
    setTimeout(() => mBtn.style.display = 'none', 500);
};

/* opening */
const ol=$$('#open p');const o=gsap.timeline({delay:.6});
ol.forEach((p,i)=>o.to(p,{opacity:1,y:0,duration:1.4},i*1.8).fromTo(p,{y:14},{y:0,duration:1.4},i*1.8));
o.to('#begin',{opacity:1,duration:1.2},ol.length*1.8);
$('#begin').onclick=()=>{
  burst(innerWidth/2,innerHeight*.7,60);
  gsap.to('#open',{opacity:0,duration:1.6,onComplete:()=>{
    $('#open').remove();
    document.body.classList.remove('lock');
    ScrollTrigger.refresh();
  }});
  setTimeout(()=>{
    const hint = $('#secret-hint');
    hint.classList.add('show');
    setTimeout(()=>hint.classList.remove('show'), 6000);
  }, 4000);
};

/* pinned sequence */
function seq(id,lines,opts={}){const s=$(id);s.innerHTML=(opts.bg?`<div class="bgi"><img src="${IMG[opts.bg]}" alt=""></div>`:'')+lines.map(l=>`<div class="ln ${l.c||''}">${l.t}</div>`).join('');
const els=$$(id+' .ln');const tl=gsap.timeline({scrollTrigger:{trigger:s,start:'top top',end:'+='+(lines.length*90)+'%',scrub:.8,pin:true}});
if(opts.bg)tl.fromTo(id+' .bgi img',{scale:1.3},{scale:1,duration:lines.length*2.2,ease:'none'},0);
els.forEach((e,i)=>{const t=i*2;tl.fromTo(e,{opacity:0,y:30,filter:'blur(10px)'},{opacity:1,y:0,filter:'blur(0px)',duration:.8},t);if(i<els.length-1&&!lines[i].keep)tl.to(e,{opacity:0,y:-20,duration:.6},t+1.4)})}
/* film (sticky photo) scenes */
function film(id,items,num){const s=$(id);const host=document.createElement('div');s.appendChild(host);
host.innerHTML=items.map((m,i)=>`<div class="mom"><div class="stick"><div class="ph"><img src="${IMG[m.img]}" alt=""></div><div class="leak"></div>${m.art?'<span class="art">✦ artistic</span>':''}<div class="mt ${num?'':'cap'}">${num?`<small>0${i+1}</small>`:''}<h3>${m.t||m.h}</h3>${m.p?`<p>${m.p}</p>`:''}${m.d?`<em>${m.d}</em>`:''}</div></div></div>`).join('');
$$(id+' .mom').forEach(mo=>{const im=mo.querySelector('img'),tx=mo.querySelector('.mt'),lk=mo.querySelector('.leak');
gsap.timeline({scrollTrigger:{trigger:mo,start:'top bottom',end:'bottom top',scrub:true}})
.fromTo(im,{scale:1.3,filter:'blur(14px)',yPercent:-4},{scale:1.02,filter:'blur(0px)',yPercent:4,duration:.55,ease:'none'},0)
.fromTo(tx,{opacity:0,y:50},{opacity:1,y:0,duration:.18},.3).fromTo(lk,{opacity:.1},{opacity:.5,duration:.4},.2)
.to(im,{scale:1.1,duration:.45,ease:'none'},.55).to(tx,{opacity:0,y:-30,duration:.15},.86)})}
/* build */
seq('#intro',D.intro.map(t=>({t})).concat([{t:'HAPPY BIRTHDAY',c:'big'},{t:D.name+' ❤️',c:'nm'}]),{bg:'pt'});
film('#person',D.person,false);
film('#moments',D.moments,true);
film('#real',D.real,false);
/* moments progress */
(function(){const n=D.moments.length,pr=$('#prog'),ct=$('#cnt');pr.insertAdjacentHTML('beforeend',D.moments.map((_,i)=>`<b style="top:calc(${i/(n-1)*100}% - 4px)"></b>`).join(''));
ScrollTrigger.create({trigger:'#moments .mom',endTrigger:'#moments .mom:last-child',start:'top 60%',end:'bottom 40%',
 onToggle:s=>{pr.classList.toggle('on',s.isActive);ct.classList.toggle('on',s.isActive)},
 onUpdate:s=>{gsap.set('#prog i',{scaleY:s.progress});const a=Math.min(n-1,Math.round(s.progress*(n-1)));$$('#prog b').forEach((b,i)=>b.classList.toggle('a',i<=a));ct.textContent='0'+(a+1)+' / 0'+n}})})();
/* love cards */
$('#loves .grid').innerHTML=D.loves.map((l,i)=>`<button class="lc" data-i="${i}"><span>♡</span>${l.k}</button>`).join('');
const cv=document.createElement('div');cv.id='cv';document.body.appendChild(cv);
function hearts(p){for(let i=0;i<14;i++){const h=document.createElement('div');h.className='fh';h.textContent='❤';
h.style.cssText=`left:${10+Math.random()*80}%;top:85%;color:${i%2?'#c9a45c':'#faf9f6'}`;
(p||document.body).appendChild(h);gsap.to(h,{y:-300-Math.random()*300,x:(Math.random()-.5)*80,opacity:0,duration:2+Math.random()*1.5,delay:Math.random()*.6,onComplete:()=>h.remove()})}}
$$('.lc').forEach(b=>b.onclick=()=>{const l=D.loves[b.dataset.i];cv.innerHTML=`<img src="${IMG[l.i]}" alt=""><h3>${l.k}</h3><p>${l.m}</p><button>Close</button>`;cv.style.display='flex';gsap.fromTo(cv,{clipPath:'circle(0% at 50% 60%)'},{clipPath:'circle(150% at 50% 60%)',duration:.9});gsap.from('#cv>*',{y:30,opacity:0,stagger:.12,delay:.3});hearts();cv.querySelector('button').onclick=()=>gsap.to(cv,{opacity:0,duration:.4,onComplete:()=>{cv.style.display='none';gsap.set(cv,{opacity:1})}})});

/* 24 Reasons */
let ridx = 0;
const rtBox = $('#reason-card');
const rCnt = $('#reason-counter');
const rTxt = $('#reason-text');
rtBox.onclick = () => {
  if(ridx >= D.reasons.length) return;
  rtBox.style.pointerEvents = 'none';
  gsap.to(rTxt, {opacity: 0, scale: 0.95, duration: 0.2, onComplete: () => {
    rTxt.textContent = D.reasons[ridx];
    rCnt.textContent = `Reason ${ridx + 1} of 24`;
    if(document.body.appendChild) { hearts(rtBox); }
    gsap.fromTo(rTxt, {opacity: 0, scale: 1.05}, {opacity: 1, scale: 1, duration: 0.4, onComplete: () => {
      ridx++;
      rtBox.style.pointerEvents = 'auto';
    }});
  }});
};

/* letter */
const env=$('.env');let typed=false;
env.onclick=()=>{if(typed)return;typed=true;env.classList.add('o');const pa=$('#paper');pa.style.display='block';setTimeout(()=>{pa.scrollIntoView({behavior:'smooth',block:'center'});let pi=0;const next=()=>{if(pi>=D.letter.length)return;const p=document.createElement('p');pa.appendChild(p);const t=D.letter[pi++];let c=0;const iv=setInterval(()=>{p.textContent=t.slice(0,++c);if(c>=t.length){clearInterval(iv);setTimeout(next,450)}},28)};next()},900)};

/* Voice Message */
const vBtn = $('#voice-btn');
const vPl  = $('#voice-player');
const vSub = $('#voice-subs');
const vT   = $('.voice-time');
const subs = D.voice.script.split(' / ');
let vSubTimer = null;
$('#voice-title').textContent = D.voice.title;
vBtn.onclick = () => {
  if (voiceAudio.paused) {
    if(!voiceAudio.src) return; 
    bgAudio.volume = 0.2; 
    voiceAudio.play();
    vPl.classList.add('playing');
    vBtn.textContent = '⏸';
    let sIdx = 0;
    const showSub = () => {
      if(sIdx < subs.length){
        gsap.to(vSub, {opacity: 0, duration: 0.2, onComplete: () => {
          vSub.textContent = subs[sIdx++];
          gsap.to(vSub, {opacity: 1, duration: 0.3});
        }});
        vSubTimer = setTimeout(showSub, ((voiceAudio.duration/subs.length)*1000 || 3000) * 0.85);
      }
    };
    if (!vSub.textContent) showSub();
  } else {
    voiceAudio.pause();
    bgAudio.volume = 1;
    vPl.classList.remove('playing');
    vBtn.textContent = '▶';
    clearTimeout(vSubTimer);
  }
};
voiceAudio.ontimeupdate = () => {
  const m = Math.floor(voiceAudio.currentTime / 60);
  const s = Math.floor(voiceAudio.currentTime % 60).toString().padStart(2, '0');
  vT.textContent = `${m}:${s}`;
};
voiceAudio.onended = () => {
  bgAudio.volume = 1;
  vPl.classList.remove('playing');
  vBtn.textContent = '▶';
  gsap.to(vSub, {opacity: 0, duration: 1});
};

/* gift */
$('#open-gift').onclick=function(){$('.box').classList.add('o');this.style.display='none';const g=$('.glow');gsap.timeline().to(g,{opacity:1,boxShadow:'0 0 120px 80px #fff',duration:.5}).to(g,{opacity:0,duration:.8});setTimeout(()=>burst(innerWidth/2,innerHeight*.45,160),400);$('#gmsg').textContent=D.gift;gsap.to('#gmsg',{opacity:1,y:-6,delay:1,duration:1.4})};
/* cake */
const ck=$('#cake');[-34,-12,12,34].forEach((x,i)=>{ck.insertAdjacentHTML('beforeend',`<div class="cd" style="left:calc(50% + ${x}px)"><div class="fm"></div></div><div class="sm" style="left:calc(50% + ${x}px)"></div>`)});
$('#blow').onclick=function(){this.style.display='none';gsap.to('.fm',{scale:0,opacity:0,duration:.4,stagger:.15});gsap.fromTo('.sm',{opacity:.8,y:0},{opacity:0,y:-90,scale:3,duration:2,stagger:.15,delay:.3});setTimeout(()=>burst(innerWidth/2,innerHeight*.5,200),900);$('#wish').textContent=D.wish;gsap.to('#wish',{opacity:1,delay:1.2,duration:1.5})};

/* Promises */
const promCnt = $('.promises-container');
promCnt.innerHTML = D.promises.map((p,i) => `<div class="promise-card">${p}</div>`).join('');
const pb = $$('.promise-card');
ScrollTrigger.create({
  trigger: '#promises-section',
  start: 'top 40%',
  onEnter: () => {
    gsap.to(pb, {y:0, opacity:1, duration:1, stagger:0.8, ease: "power2.out"});
  }
});

/* Hidden Heart */
const sHeart = $('#secret-heart');
const sModal = $('#secret-modal');
sHeart.onclick = () => {
  sModal.classList.add('show');
  burst(innerWidth/2, innerHeight/3, 80);
};
$('#close-secret').onclick = () => {
  sModal.classList.remove('show');
};

/* climax + final */
seq('#climax',D.climax.map(t=>({t})).concat([{t:`<img src="${IMG[D.climaxImg]}" alt="" style="width:min(70vw,320px);aspect-ratio:3/4;object-fit:cover;border-radius:160px 160px 14px 14px;border:1px solid var(--gold)">`}]));
const fin=$('#fin');const fl=['p1','c4','c2','pt'];
fin.innerHTML=fl.map((k,i)=>`<img class="fp" src="${IMG[k]}" alt="" style="${['left:5%;top:7%','right:5%;top:12%','left:6%;bottom:8%','right:6%;bottom:10%'][i]};transform:rotate(${[-8,7,6,-6][i]}deg)">`).join('')+
`<h1 style="font-size:clamp(40px,12vw,96px);letter-spacing:.06em;line-height:1.05;position:relative">HAPPY<br>BIRTHDAY</h1><h2 style="font-style:italic;color:var(--gold);font-size:clamp(36px,10vw,72px);margin:14px 0;position:relative">${D.name}</h2><div style="font-size:26px">❤️</div><p style="font-family:var(--serif);font-size:clamp(20px,5vw,28px);margin-top:18px;max-width:420px;position:relative">${D.final[0]}</p><p style="font-family:var(--serif);font-style:italic;font-size:clamp(28px,7vw,44px);margin-top:20px;opacity:0" id="iloveyou">${D.final[1]}</p>`;
fl.forEach((_,i)=>gsap.to(`#fin .fp:nth-of-type(${i+1})`,{y:'+=14',duration:2.5+i*.4,yoyo:true,repeat:-1,ease:'sine.inOut'}));
ScrollTrigger.create({trigger:'#fin',start:'top 50%',once:true,onEnter:()=>{burst(innerWidth/2,innerHeight*.35,200);gsap.to('#iloveyou',{opacity:1,duration:2,delay:2});setTimeout(()=>burst(innerWidth*.2,innerHeight*.5,80),1500);setTimeout(()=>burst(innerWidth*.8,innerHeight*.5,80),2200)}});
