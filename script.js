// Strong Ninja: icoontjes bij de dagelijkse quests
(()=>{
const I={workout:'<path d="M3 10v4M6 7v10M18 7v10M21 10v4M6 12h12"/>',
sleep:'<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
water:'<path d="M12 3s-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11z"/>',
protein:'<path d="M12 3c-4 0-7 6-7 10a7 7 0 0 0 14 0c0-4-3-10-7-10z"/>',
stretch:'<circle cx="12" cy="5" r="2"/><path d="M4 9l8 2 8-2M12 11v5l-4 5M12 16l4 5"/>',
screen:'<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M4 4l16 16"/>'};
const add=()=>{document.querySelectorAll('#quests .q').forEach(q=>{if(q.querySelector('.ic'))return;const k=q.dataset.q||(q.querySelector('.cnt')?'water':'');if(!I[k])return;const s=document.createElement('span');s.className='ic';s.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true">'+I[k]+'</svg>';q.insertBefore(s,q.querySelector('.tx'))})};
const qs=document.getElementById('quests');if(qs){new MutationObserver(add).observe(qs,{childList:true});add()}
})();
// Strong Ninja: uitleg bij het kaaklijn-programma
(()=>{
const N={nl:'Een strakke kaaklijn komt vooral van je genen en een gezond vetpercentage. Deze oefeningen trainen je nek en houding, waardoor je kaaklijn beter uitkomt. Kauw geen uren op harde kauwgom. Pijn of klikken in je kaak? Stop en vraag raad.',
en:'A sharp jawline mostly comes from your genes and a healthy body fat level. These exercises train your neck and posture, which makes your jawline stand out more. Do not chew hard gum for hours. Pain or clicking in your jaw? Stop and ask for advice.'};
const run=()=>{const ex=document.getElementById('exList');if(!ex)return;const on=document.querySelector('.prog[data-p=jaw][aria-pressed=true]');let n=document.getElementById('jawNote');if(!on){if(n)n.remove();return}if(!n){n=document.createElement('p');n.id='jawNote';n.className='note';ex.after(n)}n.textContent=N[document.documentElement.lang==='en'?'en':'nl']};
const ex=document.getElementById('exList');if(ex){new MutationObserver(run).observe(ex,{childList:true});run()}
})();
// Strong Ninja: lichaamstype en doel kiezen met figuren
(()=>{
const K='strongninja_body';let B={};try{B=JSON.parse(localStorage.getItem(K)||'{}')}catch(e){}
if(B.goal&&!B.goals)B.goals=[B.goal];if(!Array.isArray(B.goals))B.goals=[];
window.__snBody=B;
const save=()=>{try{localStorage.setItem(K,JSON.stringify(B))}catch(e){}};
const TX={nl:{h:'Hoe ziet je lichaam er nu uit?',i:'Kies de figuur die het best bij jou past. Er is geen goed of fout, dit is gewoon je startpunt.',g:'Wat zijn je doelen? Je mag er meerdere kiezen.',now:'Nu',goal:'Doel',card:'Jouw lichaam',tip:'Je doelen: {g}. Programma\'s voor jou: {p}.',none:'Tik op Opnieuw testen om te kiezen hoe je lichaam eruitziet en wat je doel is.',
b:{slim:'Slank',avg:'Gemiddeld',ath:'Sportief',mus:'Gespierd',broad:'Breder gebouwd'},gl:{strong:'Sterker worden',abs:'Sixpack',muscle:'Meer spieren',fit:'Fitter en sneller',jaw:'Kaaklijn'},pr:{strength:'Kracht',core:'Sixpack',grow:'Groei',jaw:'Kaaklijn'}},
en:{h:'What does your body look like now?',i:'Pick the figure that fits you best. There is no right or wrong, it is just your starting point.',g:'What are your goals? You can pick more than one.',now:'Now',goal:'Goal',card:'Your body',tip:'Your goals: {g}. Programs for you: {p}.',none:'Tap Test again to pick your body type and goal.',
b:{slim:'Slim',avg:'Average',ath:'Athletic',mus:'Muscular',broad:'Broad build'},gl:{strong:'Get stronger',abs:'Six-pack',muscle:'More muscle',fit:'Fitter and faster',jaw:'Jawline'},pr:{strength:'Strength',core:'Six-pack',grow:'Grow',jaw:'Jawline'}}};
const BT={slim:[30,22,8,0],avg:[34,28,10,0],ath:[38,26,11,1],mus:[44,28,14,1],broad:[38,36,13,0]};
const GP={strong:'strength',abs:'core',muscle:'strength',fit:'grow',jaw:'jaw'},GB={strong:'ath',abs:'ath',muscle:'mus',fit:'ath'};
const fig=(k,c)=>{const[s,w,l,a]=BT[k],x1=50-s/2,x2=50+s/2,w1=50-w/2,w2=50+w/2,r=Math.min(8,w/4);
let h=`<svg viewBox="0 0 100 160" aria-hidden="true" fill="${c}"><circle cx="50" cy="16" r="10"/><rect x="45" y="24" width="10" height="10" rx="3"/><path d="M${x1} 34Q50 30 ${x2} 34L${w2} 90L${w1} 90Z" stroke="${c}" stroke-width="6" stroke-linejoin="round"/><rect x="${x1-l-1}" y="36" width="${l}" height="54" rx="${l/2}" transform="rotate(6 ${x1-l/2} 36)"/><rect x="${x2+1}" y="36" width="${l}" height="54" rx="${l/2}" transform="rotate(-6 ${x2+l/2} 36)"/><rect x="${w1+1}" y="92" width="${w/2-2}" height="62" rx="${r}"/><rect x="51" y="92" width="${w/2-2}" height="62" rx="${r}"/>`;
if(a)h+='<path d="M50 50V84M43 58H57M43 67H57M43 76H57" stroke="var(--bg)" stroke-width="2" fill="none" opacity=".7"/>';return h+'</svg>'};
const lang=()=>document.documentElement.lang==='en'?'en':'nl';
const setup=()=>{const f=document.getElementById('suForm');if(!f)return;const L=TX[lang()];let fs=document.getElementById('bodyFs');
if(!fs){fs=document.createElement('fieldset');fs.className='fs';fs.id='bodyFs';f.insertBefore(fs,document.getElementById('suErr'));fs.addEventListener('click',e=>{const b=e.target.closest('[data-bt],[data-gl]');if(!b)return;if(b.dataset.bt)B.build=b.dataset.bt;else{const k=b.dataset.gl,i=B.goals.indexOf(k);if(i<0)B.goals.push(k);else B.goals.splice(i,1);B.goal=B.goals[0]}save();setup();show()})}
fs.innerHTML=`<legend>${L.h}</legend><p class="mut">${L.i}</p><div class="bt">${Object.keys(BT).map(k=>`<button type="button" class="btc" data-bt="${k}" aria-pressed="${B.build===k}">${fig(k,B.build===k?'var(--red)':'var(--mut)')}${L.b[k]}</button>`).join('')}</div><p style="font-weight:700;margin:16px 0 0">${L.g}</p><div class="chips">${Object.keys(GP).map(k=>`<button type="button" class="chip" data-gl="${k}" aria-pressed="${B.goals.includes(k)}">${L.gl[k]}</button>`).join('')}</div>`};
const show=()=>{const L=TX[lang()],g=document.querySelector('#prog .grid2');if(!g)return;let c=document.getElementById('bodyCard');
if(!c){c=document.createElement('div');c.className='card';c.id='bodyCard';g.insertBefore(c,g.children[2]||null)}
if(!B.build)c.innerHTML=`<h3>${L.card}</h3><p class="mut">${L.none}</p>`;
else{const G=B.goals,gb=G.includes('muscle')?'mus':G.some(k=>GB[k])?'ath':B.build;c.innerHTML=`<h3>${L.card}</h3><div class="bodyduo"><div>${fig(B.build,'var(--mut)')}<b>${L.now}</b><span class="mut">${L.b[B.build]}</span></div><div>${fig(gb,'var(--red)')}<b>${L.goal}</b><span class="mut">${G.length?G.map(k=>L.gl[k]).join(', '):L.b[gb]}</span></div></div>`}
const tip=document.getElementById('tip');let t=document.getElementById('goalTip');
if(t&&!B.goals.length)t.remove();if(tip&&B.goals.length){if(!t){t=document.createElement('p');t.id='goalTip';t.className='mut';t.style.fontWeight='700';t.style.marginTop='4px';tip.after(t)}t.textContent=L.tip.replace('{g}',B.goals.map(k=>L.gl[k].toLowerCase()).join(', ')).replace('{p}',[...new Set(B.goals.map(k=>L.pr[GP[k]]))].join(', '))}};
const ob=new MutationObserver(()=>{setup();show()});
for(const id of['suTitle','strBars']){const el=document.getElementById(id);if(el)ob.observe(el,{childList:true})}
setup();show();
})();
// Strong Ninja: lichaam en doel verplicht voor je de app in gaat
(()=>{
const K='strongninja_body',M={nl:'Duid eerst aan hoe je lichaam eruitziet en minstens één doel.',en:'First pick what your body looks like and at least one goal.'};
const get=()=>{if(window.__snBody)return window.__snBody;try{return JSON.parse(localStorage.getItem(K)||'{}')}catch(e){return{}}};
document.addEventListener('submit',e=>{if(e.target.id!=='suForm')return;const B=get();if(B.build&&B.goals&&B.goals.length)return;e.preventDefault();e.stopPropagation();
const er=document.getElementById('suErr');if(er)er.textContent=M[document.documentElement.lang==='en'?'en':'nl'];const fs=document.getElementById('bodyFs');if(fs)fs.scrollIntoView({behavior:'smooth',block:'start'})},true);
let had=false;try{had=!!(JSON.parse(localStorage.getItem('strongninja')||'{}').profile)}catch(e){}
const B=get();if(had&&!(B.build&&B.goals&&B.goals.length)){const r=document.getElementById('retest');if(r)r.click()}
})();
// Strong Ninja: wedstrijd push-ups met camera-teller
(()=>{
const K='strongninja_comp';let C=[];try{C=JSON.parse(localStorage.getItem(K)||'[]')}catch(e){}
const save=()=>{try{localStorage.setItem(K,JSON.stringify(C))}catch(e){}};
const TX={nl:{h:'Wedstrijd: push-ups',i:'Hoeveel push-ups doe jij in 60 seconden? De camera telt mee. Daag je vrienden uit op hetzelfde toestel.',name:'Je naam',cam:'Start met camera',tap:'Start zonder camera',stop:'Stop',
tip:'Zet je gsm rechtop op de grond, ongeveer 2 meter naast je, zodat je zijkant volledig in beeld is. Het beeld blijft op je toestel: er wordt niets opgenomen of verstuurd.',
load:'Camera en teller laden...',noCam:'De camera werkt hier niet. Open de app in een eigen Chrome-tabblad, of tel zelf met tikken.',tapHint:'Tik op het scherm na elke push-up',
see:'Ik zie je niet goed. Zorg dat je hele zijkant in beeld is.',form:'Helemaal naar beneden en volledig omhoog, dan telt hij.',go:'GO!',done:'Tijd! {n} push-ups',board:'Scorebord',empty:'Nog geen scores. Wie begint?',player:'Speler'},
en:{h:'Competition: push-ups',i:'How many push-ups can you do in 60 seconds? The camera counts along. Challenge your friends on the same device.',name:'Your name',cam:'Start with camera',tap:'Start without camera',stop:'Stop',
tip:'Stand your phone upright on the floor, about 2 metres beside you, so your whole side is in view. The video stays on your device: nothing is recorded or sent.',
load:'Loading camera and counter...',noCam:'The camera does not work here. Open the app in its own Chrome tab, or count yourself by tapping.',tapHint:'Tap the screen after every push-up',
see:'I cannot see you well. Make sure your whole side is in view.',form:'All the way down and fully up, then it counts.',go:'GO!',done:'Time! {n} push-ups',board:'Scoreboard',empty:'No scores yet. Who goes first?',player:'Player'}};
const L=()=>TX[document.documentElement.lang==='en'?'en':'nl'];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const tr=document.getElementById('train');if(!tr)return;
const card=document.createElement('div');card.className='card comp';card.style.marginBottom='24px';
card.innerHTML='<h3 id="cH"></h3><p class="mut" id="cI" style="margin-top:0"></p><div class="crow"><input id="cName" maxlength="20" autocomplete="off"><button class="btn" id="cCam"></button><button class="btn alt" id="cTap"></button></div><p class="mut" id="cTip"></p><div class="stage" id="cStage" hidden><video id="cVid" playsinline muted></video><canvas id="cCv"></canvas><div class="cnum" id="cNum">0</div><div class="ctime" id="cTime">60</div><div class="cmsg" id="cMsg"></div></div><div class="crow"><button class="btn alt" id="cStop" hidden></button></div><h3 id="cB" style="margin-top:18px"></h3><div id="cBoard"></div>';
tr.insertBefore(card,tr.firstChild);
const $=id=>document.getElementById(id);
const texts=()=>{const t=L();$('cH').textContent=t.h;$('cI').textContent=t.i;$('cName').placeholder=t.name;$('cCam').textContent=t.cam;$('cTap').textContent=t.tap;$('cTip').textContent=t.tip;$('cStop').textContent=t.stop;$('cB').textContent=t.board;board()};
const board=()=>{const t=L(),top=[...C].sort((a,b)=>b.n-a.n).slice(0,10);$('cBoard').innerHTML=top.length?'<ol>'+top.map(s=>`<li>${esc(s.name)}<span>${s.n}</span></li>`).join('')+'</ol>':`<p class="mut">${t.empty}</p>`};
const LIBS=['https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core@4.22.0/dist/tf-core.min.js','https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter@4.22.0/dist/tf-converter.min.js','https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl@4.22.0/dist/tf-backend-webgl.min.js','https://cdn.jsdelivr.net/npm/@tensorflow-models/pose-detection@2.1.3/dist/pose-detection.min.js'];
const loadScript=src=>new Promise((res,rej)=>{if(document.querySelector('script[src="'+src+'"]'))return res();const s=document.createElement('script');s.src=src;s.onload=res;s.onerror=rej;document.head.appendChild(s)});
let det=null,stream=null,run=null;
async function detector(){if(det)return det;for(const s of LIBS)await loadScript(s);await tf.setBackend('webgl');await tf.ready();det=await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet,{modelType:poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING});return det}
const ang=(a,b,c)=>{const r=Math.atan2(c.y-b.y,c.x-b.x)-Math.atan2(a.y-b.y,a.x-b.x);let d=Math.abs(r*180/Math.PI);return d>180?360-d:d};
const EDGES=[['left_shoulder','left_elbow'],['left_elbow','left_wrist'],['right_shoulder','right_elbow'],['right_elbow','right_wrist'],['left_shoulder','right_shoulder'],['left_shoulder','left_hip'],['right_shoulder','right_hip'],['left_hip','right_hip'],['left_hip','left_knee'],['right_hip','right_knee'],['left_knee','left_ankle'],['right_knee','right_ankle']];
function stopAll(){if(run){run.alive=false;clearInterval(run.timer)}if(stream){stream.getTracks().forEach(t=>t.stop());stream=null}$('cStop').hidden=true;$('cCam').disabled=$('cTap').disabled=false}
function finish(){if(!run)return;const t=L(),n=run.n,name=($('cName').value||'').trim()||t.player;stopAll();$('cMsg').textContent=t.done.replace('{n}',n);C.push({name,n,d:new Date().toISOString().slice(0,10),cam:run.cam});save();board()}
function startClock(){const t=L();let left=60;$('cTime').textContent=left;$('cMsg').textContent=run.cam?t.form:t.tapHint;run.started=true;run.timer=setInterval(()=>{left--;$('cTime').textContent=left;if(left<=0)finish()},1000)}
function countdown(cb){let c=3;$('cNum').textContent=c;const iv=setInterval(()=>{c--;if(c>0)$('cNum').textContent=c;else{clearInterval(iv);$('cNum').textContent=L().go;setTimeout(()=>{if(run&&run.alive){$('cNum').textContent='0';cb()}},600)}},1000)}
async function start(cam){const t=L();stopAll();run={alive:true,n:0,cam,started:false,state:'up',hist:[]};$('cStage').hidden=false;$('cStop').hidden=false;$('cCam').disabled=$('cTap').disabled=true;$('cTime').textContent='60';$('cNum').textContent='';
 const v=$('cVid'),cv=$('cCv');v.hidden=cv.hidden=!cam;
 if(!cam){$('cMsg').textContent=t.tapHint;countdown(startClock);return}
 $('cMsg').textContent=t.load;
 try{if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)throw 0;stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'user',width:{ideal:640},height:{ideal:480}},audio:false});v.srcObject=stream;await v.play();await detector()}
 catch(e){stopAll();$('cStage').hidden=false;v.hidden=cv.hidden=true;$('cNum').textContent='';$('cMsg').textContent=t.noCam;return}
 if(!run||!run.alive)return;const me=run;$('cMsg').textContent='';countdown(startClock);
 const ctx=cv.getContext('2d');
 const loop=async()=>{if(!me.alive)return;try{cv.width=v.videoWidth;cv.height=v.videoHeight;const ps=await det.estimatePoses(v);ctx.clearRect(0,0,cv.width,cv.height);const p=ps[0];
  if(p){const k={};for(const q of p.keypoints)k[q.name]=q;ctx.strokeStyle='#ff4d5e';ctx.lineWidth=4;for(const[a,b]of EDGES){if(k[a]&&k[b]&&k[a].score>.3&&k[b].score>.3){ctx.beginPath();ctx.moveTo(k[a].x,k[a].y);ctx.lineTo(k[b].x,k[b].y);ctx.stroke()}}
   const side=['left','right'].map(s=>[k[s+'_shoulder'],k[s+'_elbow'],k[s+'_wrist']]).filter(a=>a.every(q=>q&&q.score>.3)).sort((a,b)=>b.reduce((x,q)=>x+q.score,0)-a.reduce((x,q)=>x+q.score,0))[0];
   if(side){const a=ang(...side);me.hist.push(a);if(me.hist.length>3)me.hist.shift();const m=me.hist.reduce((x,y)=>x+y,0)/me.hist.length;
    if(me.started){if(m<95)me.state='down';else if(m>150&&me.state==='down'){me.state='up';me.n++;$('cNum').textContent=me.n}}
    if(me.started&&$('cMsg').textContent===L().see)$('cMsg').textContent=L().form}
   else if(me.started)$('cMsg').textContent=L().see}}catch(e){}
  requestAnimationFrame(loop)};loop()}
$('cCam').onclick=()=>start(true);$('cTap').onclick=()=>start(false);$('cStop').onclick=()=>{stopAll();$('cStage').hidden=true};
$('cStage').addEventListener('click',()=>{if(run&&run.alive&&!run.cam&&run.started){run.n++;$('cNum').textContent=run.n}});
const ob=new MutationObserver(texts);const tt=document.getElementById('trTitle');if(tt)ob.observe(tt,{childList:true});texts();
})();
// Strong Ninja: wedstrijd tegen ninja-bots (computer-tegenstanders)
(()=>{
const K='strongninja_bots';let S={u:0,sel:-1};try{S=Object.assign(S,JSON.parse(localStorage.getItem(K)||'{}'))}catch(e){}
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}};
const BOTS=[10,18,26,34,42,50];
const TX={nl:{h:'Tegenstander',i:'Computer-tegenstanders: oefen tegen de ninja-bots tot er echte spelers bij komen. Versla een bot om de volgende vrij te spelen.',solo:'Alleen',n:['Rookie','Vechter','Krijger','Schaduw','Sensei','Grootmeester'],bot:'-bot',
win:'Gewonnen van {b}! {m} tegen {t}.',unlock:' Volgende bot vrijgespeeld.',lose:'{b} wint met {t} tegen {m}. Probeer opnieuw!',tie:'Gelijkspel tegen {b}: {m} tegen {t}.',all:' Je hebt alle bots verslagen!'},
en:{h:'Opponent',i:'Computer opponents: practise against the ninja bots until real players join. Beat a bot to unlock the next one.',solo:'Solo',n:['Rookie','Fighter','Warrior','Shadow','Sensei','Grandmaster'],bot:' bot',
win:'You beat {b}! {m} to {t}.',unlock:' Next bot unlocked.',lose:'{b} wins with {t} to {m}. Try again!',tie:'Draw against {b}: {m} to {t}.',all:' You beat every bot!'}};
const L=()=>TX[document.documentElement.lang==='en'?'en':'nl'];
const $=id=>document.getElementById(id);
const card=document.querySelector('.comp');if(!card||!$('cStage'))return;
const box=document.createElement('div');box.innerHTML='<p style="font-weight:800;margin:14px 0 0" id="bH"></p><p class="mut" id="bI" style="margin:2px 0 0"></p><div class="chips" id="bChips"></div><p class="cres" id="bRes"></p>';
card.insertBefore(box,$('cTip'));
const ov=document.createElement('div');ov.className='cbot';ov.id='bOv';ov.hidden=true;$('cStage').appendChild(ov);
const name=i=>L().n[i]+L().bot;
const chips=()=>{const t=L();$('bH').textContent=t.h;$('bI').textContent=t.i;
 $('bChips').innerHTML=`<button type="button" class="chip" data-bot="-1" aria-pressed="${S.sel<0}">${t.solo}</button>`+BOTS.map((n,i)=>`<button type="button" class="chip" data-bot="${i}" aria-pressed="${S.sel===i}" ${i>S.u?'disabled':''}>${name(i)} (${n})</button>`).join('')};
$('bChips').addEventListener('click',e=>{const b=e.target.closest('[data-bot]');if(!b||b.disabled)return;S.sel=+b.dataset.bot;save();chips()});
let live=false,done=false;
const reset=()=>{live=true;done=false;$('bRes').textContent='';ov.hidden=S.sel<0;if(S.sel>=0)ov.textContent=name(S.sel)+': 0'};
$('cCam').addEventListener('click',reset);$('cTap').addEventListener('click',reset);
new MutationObserver(()=>{if(!live||S.sel<0)return;const left=parseInt($('cTime').textContent,10);if(isNaN(left))return;const tg=BOTS[S.sel];ov.textContent=name(S.sel)+': '+Math.floor(tg*(60-left)/60)}).observe($('cTime'),{childList:true,characterData:true,subtree:true});
new MutationObserver(()=>{if(!live||done)return;const m=$('cMsg').textContent;if(!/^(Tijd|Time)!/.test(m)){if($('cStop').hidden&&/camera/i.test(m)){live=false;ov.hidden=true}return}
 done=true;live=false;if(S.sel<0)return;const t=L(),tg=BOTS[S.sel],mine=parseInt($('cNum').textContent,10)||0,b=name(S.sel);ov.textContent=b+': '+tg;
 let r;if(mine>tg){r=t.win;if(S.sel===S.u&&S.u<BOTS.length-1){S.u++;r+=t.unlock}else if(S.sel===BOTS.length-1)r+=t.all;save();chips()}else if(mine===tg)r=t.tie;else r=t.lose;
 $('bRes').textContent=r.replace('{b}',b).replace('{m}',mine).replace('{t}',tg)}).observe($('cMsg'),{childList:true,characterData:true,subtree:true});
new MutationObserver(chips).observe($('cH'),{childList:true});chips();
})();
// Strong Ninja: toestellen verbinden voor je de app in gaat (of weigeren)
(()=>{
const K='strongninja_dev';let D={asked:false};try{D=Object.assign(D,JSON.parse(localStorage.getItem(K)||'{}'))}catch(e){}
window.__snDev=D;const save=()=>{try{localStorage.setItem(K,JSON.stringify(D))}catch(e){}};
const TX={nl:{h:'Toestellen verbinden',i:'Heb je een hartslagband, smart bike, roeitoestel of loopband met Bluetooth? Verbind het nu. Je kan er meerdere verbinden, of dit weigeren.',add:'Toestel verbinden',no:'Nee, bedankt',skipped:'Geweigerd. Je kan later nog verbinden bij Train.',con:'Verbonden: {d}',err:'Verbind eerst een toestel of kies Nee, bedankt.'},
en:{h:'Connect devices',i:'Do you have a heart-rate strap, smart bike, rowing machine or treadmill with Bluetooth? Connect it now. You can connect several, or decline.',add:'Connect device',no:'No, thanks',skipped:'Declined. You can still connect later in Train.',con:'Connected: {d}',err:'Connect a device first or choose No, thanks.'}};
const L=()=>TX[document.documentElement.lang==='en'?'en':'nl'];
const $=id=>document.getElementById(id);const f=$('suForm');if(!f||!$('btAdd'))return;
const fs=document.createElement('fieldset');fs.className='fs';fs.id='devFs';
fs.innerHTML='<legend id="dH"></legend><p class="mut" id="dI"></p><div class="crow" style="display:flex;gap:8px;flex-wrap:wrap"><button type="button" class="btn" id="dAdd"></button><button type="button" class="btn alt" id="dNo"></button></div><p id="dMsg" style="font-weight:700;margin:10px 0 0;min-height:1.4em"></p>';
f.insertBefore(fs,$('suErr'));
const names=()=>[...document.querySelectorAll('#devs .dev header b')].map(b=>b.textContent);
const paint=()=>{const t=L();$('dH').textContent=t.h;$('dI').textContent=t.i;$('dAdd').textContent=t.add;$('dNo').textContent=t.no;$('dNo').setAttribute('aria-pressed',D.asked&&D.skip?'true':'false');
 const n=names();$('dMsg').textContent=n.length?t.con.replace('{d}',n.join(', ')):(D.asked&&D.skip?t.skipped:($('btMsg').textContent||''))};
$('dAdd').addEventListener('click',()=>{$('btAdd').click()});
$('dNo').addEventListener('click',()=>{D.asked=true;D.skip=true;save();paint();if($('suErr').textContent===L().err)$('suErr').textContent=''});
new MutationObserver(()=>{if(names().length){D.asked=true;D.skip=false;save()}paint()}).observe($('devs'),{childList:true});
new MutationObserver(paint).observe($('btMsg'),{childList:true,characterData:true,subtree:true});
new MutationObserver(paint).observe($('suTitle'),{childList:true});paint();
document.addEventListener('submit',e=>{if(e.target.id!=='suForm'||e.defaultPrevented)return;if(D.asked)return;e.preventDefault();e.stopImmediatePropagation();$('suErr').textContent=L().err;fs.scrollIntoView({behavior:'smooth',block:'start'})},true);
let had=false;try{had=!!(JSON.parse(localStorage.getItem('strongninja')||'{}').profile)}catch(e){}
if(had&&!D.asked&&$('setup').hidden){const r=$('retest');if(r)r.click()}
})();
// Strong Ninja: cameracoach met lijnen op je lichaam voor elke oefening
(()=>{
const TX={nl:{cam:'Camera',flip:'Wissel camera',done:'Klaar',load:'Camera en teller laden...',noCam:'De camera werkt hier niet. Open de app in een eigen Chrome-tabblad.',see:'Ik zie je niet goed. Zorg dat je hele lichaam in beeld is.',
reps:'Telt herhalingen via je {j}',hold:'Telt de seconden dat je de houding vasthoudt',jump:'Telt sprongen via je heupen',none:'Toont de lijnen op je lichaam, tellen doe je zelf',j:{E:'ellebogen',K:'knieën',H:'heupen'},
tip:'Zet je gsm zo dat je hele lichaam in beeld is, liefst van opzij. Het beeld blijft op je toestel: er wordt niets opgenomen of verstuurd.',s:'s'},
en:{cam:'Camera',flip:'Switch camera',done:'Done',load:'Loading camera and counter...',noCam:'The camera does not work here. Open the app in its own Chrome tab.',see:'I cannot see you well. Make sure your whole body is in view.',
reps:'Counts reps using your {j}',hold:'Counts the seconds you hold the position',jump:'Counts jumps using your hips',none:'Shows the lines on your body, you count yourself',j:{E:'elbows',K:'knees',H:'hips'},
tip:'Place your phone so your whole body is in view, ideally from the side. The video stays on your device: nothing is recorded or sent.',s:'s'}};
const L=()=>TX[document.documentElement.lang==='en'?'en':'nl'];
const R={'Push-ups':['E',95,150],'Pike push-ups':['E',95,150],'Chair dips':['E',100,150],'Squats':['K',100,160],'Lunges':['K',105,160],'Superman':['hold'],
'Crunches':['H',110,125],'Plank':['hold'],'Leg raises':['H',110,150],'Bicycle crunch':['H',100,130],'Mountain climbers':['H',100,140],'Russian twist':['none'],
'Dead hang':['hold'],'Wall angels':['E',80,150],'Cobra stretch':['hold'],'Hip flexor stretch':['hold'],'Jump rope':['jump',.12],'Calf raises':['jump',.05],
'Heavy bag rounds':['E',90,155],'Rowing':['K',90,150],'Bike intervals':['K',85,140],'Treadmill run':['none'],'Dumbbell curls':['E',60,140],'Dumbbell shoulder press':['E',100,160],
'Kettlebell swings':['H',100,160],'Pull-ups':['E',90,150],'Hanging knee raises':['H',100,150],'Band rows':['E',100,150],'Step-ups':['K',110,160],'Ab wheel rollout':['H',110,160],
'Chin tucks':['none'],'Lying neck curls':['none'],'Prone neck extensions':['none'],'Side neck raises':['none'],'Wall posture hold':['hold'],'Tongue posture hold':['hold']};
const J={E:['shoulder','elbow','wrist'],K:['hip','knee','ankle'],H:['shoulder','hip','knee']};
const EDGES=[['left_shoulder','left_elbow'],['left_elbow','left_wrist'],['right_shoulder','right_elbow'],['right_elbow','right_wrist'],['left_shoulder','right_shoulder'],['left_shoulder','left_hip'],['right_shoulder','right_hip'],['left_hip','right_hip'],['left_hip','left_knee'],['right_hip','right_knee'],['left_knee','left_ankle'],['right_knee','right_ankle'],['nose','left_shoulder'],['nose','right_shoulder']];
const LIBS=['https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core@4.22.0/dist/tf-core.min.js','https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter@4.22.0/dist/tf-converter.min.js','https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl@4.22.0/dist/tf-backend-webgl.min.js','https://cdn.jsdelivr.net/npm/@tensorflow-models/pose-detection@2.1.3/dist/pose-detection.min.js'];
const loadScript=src=>new Promise((res,rej)=>{if(document.querySelector('script[src="'+src+'"]'))return res();const s=document.createElement('script');s.src=src;s.onload=res;s.onerror=rej;document.head.appendChild(s)});
let det=null;async function detector(){if(det)return det;for(const s of LIBS)await loadScript(s);if(!window.tf||!window.poseDetection)throw 0;await tf.setBackend('webgl');await tf.ready();det=await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet,{modelType:poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING});return det}
const ang=(a,b,c)=>{let d=Math.abs((Math.atan2(c.y-b.y,c.x-b.x)-Math.atan2(a.y-b.y,a.x-b.x))*180/Math.PI);return d>180?360-d:d};
const $=id=>document.getElementById(id);const ex=$('exList');if(!ex)return;
const m=document.createElement('div');m.className='ccm';m.id='ccModal';m.hidden=true;
m.innerHTML='<div class="ccbox comp"><div class="cchead"><b id="ccName"></b><button id="ccFlip"></button><button id="ccClose" style="background:var(--red);color:#fff"></button><span id="ccMode"></span></div><div class="stage" style="margin-top:0"><video id="ccVid" playsinline muted></video><canvas id="ccCv"></canvas><div class="cnum" id="ccNum">0</div><div class="cmsg" id="ccMsg"></div></div><p class="mut" id="ccTip"></p></div>';
document.body.appendChild(m);
const ICON='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="4"/></svg>';
const addBtns=()=>{ex.querySelectorAll('.ex').forEach(row=>{if(row.querySelector('.ccb'))return;const sets=row.querySelector('.sets');if(!sets)return;const nm=row.querySelector('.nm').textContent;const w=document.createElement('div');w.className='exbtns';sets.parentNode.insertBefore(w,sets);w.appendChild(sets);const b=document.createElement('button');b.type='button';b.className='ccb';b.innerHTML=ICON+'<span>'+L().cam+'</span>';b.dataset.cc=nm;const f=sets.querySelector('.set');b.dataset.pre=f?f.dataset.s.replace(/\d+$/,''):'';w.insertBefore(b,sets)})};
new MutationObserver(addBtns).observe(ex,{childList:true});addBtns();
let st=null,facing='user';
const stop=()=>{if(!st)return;st.alive=false;if(st.stream)st.stream.getTracks().forEach(t=>t.stop());clearInterval(st.tick)};
async function open(name,pre){stop();const t=L(),r=R[name]||['none'];st={alive:true,name,pre,r,n:0,state:'up',hist:[],secs:0,base:null,stream:null};const me=st;
 m.hidden=false;$('ccName').textContent=name;$('ccFlip').textContent=t.flip;$('ccClose').textContent=t.done;$('ccTip').textContent=t.tip;
 $('ccMode').textContent=r[0]==='hold'?t.hold:r[0]==='jump'?t.jump:r[0]==='none'?t.none:t.reps.replace('{j}',t.j[r[0]]);
 $('ccNum').textContent=r[0]==='none'?'':r[0]==='hold'?'0'+t.s:'0';$('ccMsg').textContent=t.load;
 const v=$('ccVid'),cv=$('ccCv'),ctx=cv.getContext('2d');
 try{if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)throw 0;me.stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:facing,width:{ideal:640},height:{ideal:480}},audio:false});if(!me.alive){me.stream.getTracks().forEach(x=>x.stop());return}v.srcObject=me.stream;await v.play();await detector()}
 catch(e){if(me.alive)$('ccMsg').textContent=t.noCam;return}
 if(!me.alive)return;$('ccMsg').textContent='';v.style.transform=cv.style.transform=facing==='user'?'scaleX(-1)':'none';
 let ok=false;me.tick=setInterval(()=>{if(me.r[0]==='hold'&&ok){me.secs++;$('ccNum').textContent=me.secs+L().s}},1000);
 const loop=async()=>{if(!me.alive)return;try{cv.width=v.videoWidth;cv.height=v.videoHeight;const p=(await det.estimatePoses(v))[0];ctx.clearRect(0,0,cv.width,cv.height);ok=false;
  if(p){const k={};for(const q of p.keypoints)k[q.name]=q;const good=q=>q&&q.score>.3;
   ctx.lineWidth=5;ctx.strokeStyle='#ff4d5e';ctx.lineCap='round';for(const[a,b]of EDGES)if(good(k[a])&&good(k[b])){ctx.beginPath();ctx.moveTo(k[a].x,k[a].y);ctx.lineTo(k[b].x,k[b].y);ctx.stroke()}
   ctx.fillStyle='#fff';for(const q of p.keypoints)if(good(q)){ctx.beginPath();ctx.arc(q.x,q.y,5,0,7);ctx.fill()}
   const tt=L(),r=me.r;
   if(J[r[0]]){const side=['left','right'].map(s=>J[r[0]].map(n=>k[s+'_'+n])).filter(a=>a.every(good)).sort((a,b)=>b.reduce((x,q)=>x+q.score,0)-a.reduce((x,q)=>x+q.score,0))[0];
    if(side){ok=true;const a=ang(...side);me.hist.push(a);if(me.hist.length>3)me.hist.shift();const av=me.hist.reduce((x,y)=>x+y,0)/me.hist.length;
     ctx.strokeStyle='#ffd23f';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(side[0].x,side[0].y);ctx.lineTo(side[1].x,side[1].y);ctx.lineTo(side[2].x,side[2].y);ctx.stroke();
     ctx.save();ctx.translate(side[1].x,side[1].y);if(facing==='user')ctx.scale(-1,1);ctx.fillStyle='#ffd23f';ctx.font='bold 26px Inter,sans-serif';ctx.fillText(Math.round(av)+'°',12,-12);ctx.restore();
     if(av<r[1])me.state='down';else if(av>r[2]&&me.state==='down'){me.state='up';me.n++;$('ccNum').textContent=me.n}}}
   else if(r[0]==='jump'){const h=[k.left_hip,k.right_hip].filter(good),s=[k.left_shoulder,k.right_shoulder].filter(good);
    if(h.length&&s.length){ok=true;const hy=h.reduce((x,q)=>x+q.y,0)/h.length,sy=s.reduce((x,q)=>x+q.y,0)/s.length,torso=Math.abs(hy-sy)||1;
     if(me.base===null)me.base=hy;if(me.state==='up'){me.base=me.base*.9+hy*.1;if(hy<me.base-r[1]*torso)me.state='air'}else if(hy>me.base-r[1]*torso*.4){me.state='up';me.n++;$('ccNum').textContent=me.n}}}
   else ok=p.keypoints.filter(good).length>=8;
   $('ccMsg').textContent=ok?'':tt.see}else $('ccMsg').textContent=L().see}catch(e){}
  requestAnimationFrame(loop)};loop()}
function close(){if(!st)return;const done=st.r[0]==='hold'?st.secs>=5:st.n>0,pre=st.pre;stop();st=null;m.hidden=true;
 if(done&&pre){const b=document.querySelector('.set[data-s^="'+pre+'"]:not(.on)');if(b)b.click()}}
ex.addEventListener('click',e=>{const b=e.target.closest('.ccb');if(b)open(b.dataset.cc,b.dataset.pre)});
$('ccClose').onclick=close;$('ccFlip').onclick=()=>{if(!st)return;facing=facing==='user'?'environment':'user';open(st.name,st.pre)};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!m.hidden)close()});
})();
// Strong Ninja: virtuele rit (fietsen/roeien) met helling, automatische weerstand en ritrapport
(()=>{
const tr=document.getElementById('train');if(!tr)return;
const TX={nl:{h:'Virtuele rit',i:'Fiets of roei door een virtuele route. Met een smart trainer of roeitoestel past de weerstand zich aan de helling aan, en de rit gaat zo snel als jij trapt of roeit.',bike:'Fietsen',row:'Roeien',conn:'Verbind trainer of roeitoestel',start:'Start rit',stop:'Stop rit',vid:'Eigen video kiezen',
vidI:'Optioneel: kies een rit-video (mp4) van je toestel. Die speelt mee op jouw snelheid, de helling komt van de gekozen route.',kmh:'km/u',grade:'helling',res:'weerstand',dist:'km',time:'tijd',hr:'hartslag',pw:'watt',
noDev:'Geen trainer verbonden: stel je snelheid zelf in met - en +.',ctl:'Weerstand aangepast: {g}%',noCtl:'Dit toestel laat geen automatische weerstand toe. Je ziet de helling wel op het scherm.',noBt:'Bluetooth werkt hier niet. Open de app in een eigen Chrome-tabblad op Android of een computer.',
ok:'{n} verbonden',done:'Rit klaar! Je rapport staat bij Progressie.',rep:'Ritten',repEmpty:'Nog geen ritten. Start een virtuele rit bij Train.',up:'hm',avg:'gem.',max:'max',
r:{kempen:'Kempen (vlak)',ardennen:'Ardennen (heuvels)',alpen:'Alpenklim',rivier:'Rivier',meer:'Meer met wind'}},
en:{h:'Virtual ride',i:'Cycle or row through a virtual route. With a smart trainer or rowing machine the resistance follows the slope, and the ride goes as fast as you pedal or row.',bike:'Cycling',row:'Rowing',conn:'Connect trainer or rower',start:'Start ride',stop:'Stop ride',vid:'Choose own video',
vidI:'Optional: pick a ride video (mp4) from your device. It plays at your speed, the slope comes from the chosen route.',kmh:'km/h',grade:'slope',res:'resistance',dist:'km',time:'time',hr:'heart rate',pw:'watts',
noDev:'No trainer connected: set your speed yourself with - and +.',ctl:'Resistance set: {g}%',noCtl:'This device does not allow automatic resistance. You still see the slope on screen.',noBt:'Bluetooth does not work here. Open the app in its own Chrome tab on Android or a computer.',
ok:'{n} connected',done:'Ride finished! Your report is in Progress.',rep:'Rides',repEmpty:'No rides yet. Start a virtual ride in Train.',up:'m up',avg:'avg',max:'max',
r:{kempen:'Kempen (flat)',ardennen:'Ardennes (hills)',alpen:'Alpine climb',rivier:'River',meer:'Lake with wind'}}};
const L=()=>TX[document.documentElement.lang==='en'?'en':'nl'];
const ROUTES={bike:{kempen:[6000,[[0,0],[800,1],[1500,0],[2500,-1],[3200,2],[4000,0],[5000,1],[5600,0]]],ardennen:[8000,[[0,1],[700,4],[1600,7],[2400,2],[3000,-5],[3800,0],[4500,8],[5300,10],[5900,3],[6600,-6],[7400,0]]],alpen:[10000,[[0,3],[1000,6],[2500,8],[4000,9],[5500,7],[7000,10],[8500,6],[9500,2]]]},
row:{rivier:[3000,[[0,0],[1000,2],[1800,0],[2400,3]]],meer:[4000,[[0,1],[800,4],[1600,2],[2400,6],[3200,1]]]}};
const K='strongninja_rides';let RIDES=[];try{RIDES=JSON.parse(localStorage.getItem(K)||'[]')}catch(e){}
const saveR=()=>{try{localStorage.setItem(K,JSON.stringify(RIDES.slice(-30)))}catch(e){}};
const $=id=>document.getElementById(id);
let mode='bike',route='kempen',manual=20,run=null,dev=null,cp=null,data={},lastSent=null,lastT=0;
const grade=(R,d)=>{let g=0;for(const[s,v]of R[1])if(d>=s)g=v;return g};
const elevAt=(R,d)=>{let e=0,p=0;for(let x=0;x<d;x+=25){e+=grade(R,x)/100*Math.min(25,d-x)}return e};
const card=document.createElement('div');card.className='card ride';card.style.marginBottom='24px';
card.innerHTML='<h3 id="rH"></h3><p class="mut" id="rI" style="margin-top:0"></p><div class="chips" id="rMode"></div><div class="chips" id="rRoutes"></div><div class="crow" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px"><button class="btn" id="rStart"></button><button class="btn alt" id="rConn"></button><label class="btn alt pbtn" id="rVidL"><span id="rVidT"></span><input type="file" accept="video/*" id="rVid" hidden></label></div><p class="mut" id="rVidI"></p><div class="chips" id="rVids"></div><div class="ytIn" id="rYtIn" hidden><input id="rYtUrl" inputmode="url" placeholder="https://youtu.be/..."><button type="button" class="btn alt" id="rYtGo">OK</button></div><p id="rDev" style="font-weight:700;min-height:1.4em;margin:6px 0 0"></p>'+
'<div class="rstage" id="rStage" hidden><div class="ytb" id="rYT"></div><video id="rV" muted playsinline loop hidden></video><canvas id="rC"></canvas><div class="hud2"><div><span id="hTl"></span><b id="hT">0:00</b></div><div><span id="hSl"></span><b id="hS">0</b></div><div><span id="hPl"></span><b id="hP">--</b></div><div><span id="hDl"></span><b id="hD">0.00</b></div><div><span id="hCl"></span><b id="hC">--</b></div><div><span id="hHl"></span><b id="hH">--</b></div></div><div class="rgh" id="rGh"></div><div class="rres"><span id="hRl">%</span><b id="hR">0</b><div class="bars" id="rResB"></div></div><div class="rbar"><div class="pill"><span id="hGl"></span><b id="hG">+0,0%</b></div><div class="trk"><div class="trkF" id="rTrkF"></div><span id="rTrkGh"></span><i class="me" id="rTrkMe"></i></div><div class="pill"><b id="hLeft">0 m</b></div></div><button type="button" class="rfs" id="rFs" aria-label="volledig scherm">⛶</button><div class="rmsg" id="rMsg"></div><div class="spd" id="rSpd"><button id="rMinus" aria-label="trager">-</button><button id="rPlus" aria-label="sneller">+</button></div></div>';
const comp=tr.querySelector('.comp');tr.insertBefore(card,comp?comp.nextSibling:tr.firstChild);
const paint=()=>{const t=L();$('rH').textContent=t.h;$('rI').textContent=t.i;$('rConn').textContent=t.conn;$('rVidT').textContent=t.vid;$('rVidI').textContent=t.vidI;$('rStart').textContent=run?t.stop:t.start;
 $('rMode').innerHTML=['bike','row'].map(m=>`<button type="button" class="chip" data-rm="${m}" aria-pressed="${mode===m}">${t[m]}</button>`).join('');
 $('rRoutes').innerHTML=Object.keys(ROUTES[mode]).map(k=>`<button type="button" class="chip" data-rr="${k}" aria-pressed="${route===k}">${t.r[k]} · ${ROUTES[mode][k][0]/1000} km</button>`).join('');
 $('hSl').textContent=t.kmh;$('hGl').textContent=mode==='bike'?t.grade:t.res;$('hDl').textContent=t.dist;$('hTl').textContent=t.time;$('hHl').textContent=t.hr;$('hPl').textContent=t.pw;report();paintV();hudLbl()};
card.addEventListener('click',e=>{const m=e.target.closest('[data-rm]'),r=e.target.closest('[data-rr]');if(run)return;if(m){mode=m.dataset.rm;route=Object.keys(ROUTES[mode])[0];paint()}if(r){route=r.dataset.rr;paint()}});
function parse(c,dv){let o=0;const u8=()=>dv.getUint8(o++),u16=()=>{const x=dv.getUint16(o,true);o+=2;return x},s16=()=>{const x=dv.getInt16(o,true);o+=2;return x},u24=()=>{const x=dv.getUint16(o,true)|(dv.getUint8(o+2)<<16);o+=3;return x};
 try{const f=u16();if(c===0x2ad2){if(!(f&1))data.kmh=u16()/100;if(f&2)u16();if(f&4)data.rpm=u16()/2;if(f&8)u16();if(f&16)u24();if(f&32)s16();if(f&64)data.w=s16();if(f&128)s16();if(f&256){u16();u16();u8()}if(f&512)data.hr=u8()}
 else if(c===0x2ad1){if(!(f&1)){data.spm=u8()/2;u16()}if(f&2)u8();if(f&4)u24();if(f&8){const p=u16();data.kmh=p?1800/p:0}if(f&16)u16();if(f&32)data.w=s16();if(f&64)s16();if(f&128)s16();if(f&256){u16();u16();u8()}if(f&512)data.hr=u8()}
 else if(c===0x2acd){if(!(f&1))data.kmh=u16()/100;if(f&2)u16();if(f&4)u24();if(f&8){s16();s16()}if(f&16){u16();u16()}if(f&32)u8();if(f&64)u8();if(f&128){u16();u16();u8()}if(f&256)data.hr=u8()}}catch(e){}}
$('rConn').onclick=()=>{const P=window.SN_PW,B=window.SN_BT;if(P){if(B&&B.connected())P.open(5);else if(P.hasSaved()){$('rDev').textContent='...';P.connectSaved().then(()=>{$('rDev').textContent=B.connected()?'✓ '+B.name():L().noBt;hudLbl()})}else P.open();return}rConnOld()};const rConnOld=async()=>{const t=L(),m=s=>{$('rDev').textContent=s};if(!navigator.bluetooth){m(t.noBt);return}
 try{const d=await navigator.bluetooth.requestDevice({acceptAllDevices:true,optionalServices:[0x1826,0x180d]});const srv=await d.gatt.connect();const s=await srv.getPrimaryService(0x1826);
  for(const c of[0x2ad2,0x2ad1,0x2acd]){try{const ch=await s.getCharacteristic(c);ch.addEventListener('characteristicvaluechanged',e=>parse(c,e.target.value));await ch.startNotifications()}catch(e){}}
  try{cp=await s.getCharacteristic(0x2ad9);await cp.startNotifications();await cp.writeValueWithResponse(new Uint8Array([0]))}catch(e){cp=null}
  try{const h=await(await srv.getPrimaryService(0x180d)).getCharacteristic(0x2a37);h.addEventListener('characteristicvaluechanged',e=>{const v=e.target.value;data.hr=v.getUint8(0)&1?v.getUint16(1,true):v.getUint8(1)});await h.startNotifications()}catch(e){}
  dev=d;d.addEventListener('gattserverdisconnected',()=>{dev=null;cp=null;data={}});m(t.ok.replace('{n}',d.name||'Trainer')+(cp?'':'. '+t.noCtl))}
 catch(e){if(e&&e.name==='NotFoundError')return;m(t.noBt)}};
async function setGrade(g){if(!cp)return window.SN_BT?window.SN_BT.setGrade(g,mode):false;try{if(mode==='bike'){const b=new DataView(new ArrayBuffer(7));b.setUint8(0,0x11);b.setInt16(1,0,true);b.setInt16(3,Math.round(g*100),true);b.setUint8(5,40);b.setUint8(6,51);await cp.writeValueWithResponse(b.buffer)}else await cp.writeValueWithResponse(new Uint8Array([4,Math.max(10,Math.min(200,Math.round(40+g*15)))]));return true}catch(e){return false}}
const domHr=()=>{for(const m of document.querySelectorAll('#devs .met')){const s=m.querySelector('span');if(s&&/bpm/.test(s.textContent)&&!/max/i.test(s.textContent))return parseInt(m.querySelector('b').textContent,10)}return null};
$('rVid').addEventListener('change',e=>{const f=e.target.files[0];if(!f)return;ytSet(null,'own');const v=$('rV');v.src=URL.createObjectURL(f);v.hidden=false});
$('rMinus').onclick=()=>{manual=Math.max(0,manual-2)};$('rPlus').onclick=()=>{manual=Math.min(60,manual+2)};
const fmt=s=>Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0');
function draw(ctx,W,H,d,g,R){const water=mode==='row',hy=H*(.42-(water?0:g)*.012),vid=!$('rV').hidden||!!ytP;ctx.clearRect(0,0,W,H);
 if(!vid){const sky=ctx.createLinearGradient(0,0,0,hy);sky.addColorStop(0,'#7cc4ff');sky.addColorStop(1,'#d9efff');ctx.fillStyle=sky;ctx.fillRect(0,0,W,hy+1);
  ctx.fillStyle='#fff6c9';ctx.beginPath();ctx.arc(W*.8,hy*.35,H*.06,0,7);ctx.fill();
  [[.9,'#8fa6c4',.02,.35],[.6,'#5f7a9c',.05,.25],[.35,'#3d5a46',.12,.15]].forEach(([amp,col,par,hh])=>{ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(0,hy);for(let x=0;x<=W;x+=8){const u=(x+d*par*10)/W;ctx.lineTo(x,hy-H*hh*(.5+.5*Math.sin(u*6.3*amp)*Math.cos(u*2.1)))}ctx.lineTo(W,hy);ctx.fill()});
  ctx.fillStyle=water?'#2f7fb8':'#5aa04c';ctx.fillRect(0,hy,W,H-hy);
  ctx.fillStyle=water?'#3d93cf':'#6f6f74';ctx.beginPath();ctx.moveTo(W*.5-3,hy);ctx.lineTo(W*.5+3,hy);ctx.lineTo(W*.88,H);ctx.lineTo(W*.12,H);ctx.fill();
  for(let i=0;i<14;i++){const p=((i+(d/6)%1)/14)**2,y=hy+(H-hy)*p,w=(W*.38)*p+3;
   if(!water){ctx.fillStyle='#fff';if(i%2===0)ctx.fillRect(W*.5-w*.02,y,Math.max(1,w*.04),Math.max(1,(H-hy)*.02*p*3))}
   else{ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=Math.max(1,p*3);ctx.beginPath();ctx.moveTo(W*.5-w*.6,y);ctx.lineTo(W*.5-w*.3,y);ctx.moveTo(W*.5+w*.3,y);ctx.lineTo(W*.5+w*.6,y);ctx.stroke()}
   ctx.fillStyle=water?'#2e6b3a':'#2f6b33';const tx=w*1.25,th=Math.max(2,(H-hy)*.25*p);if(i%3===0){ctx.fillRect(W*.5-tx-th*.2,y-th,th*.4,th);ctx.fillRect(W*.5+tx-th*.2,y-th,th*.4,th)}}}
 return;const ph=H*.12,py=H-ph-4,len=R[0];let mx=0,mn=0;const pts=[];for(let x=0;x<=len;x+=len/120){const e=water?0:elevAt(R,x);pts.push([x,e]);mx=Math.max(mx,e);mn=Math.min(mn,e)}
 ctx.fillStyle='rgba(0,0,0,.45)';ctx.fillRect(8,py-4,W-16,ph+4);ctx.beginPath();pts.forEach(([x,e],i)=>{const X=12+(W-24)*x/len,Y=py+ph-4-(ph-8)*((e-mn)/((mx-mn)||1));i?ctx.lineTo(X,Y):ctx.moveTo(X,Y)});ctx.strokeStyle=water?'#7fd0ff':'#ffd23f';ctx.lineWidth=2;ctx.stroke();
 const X=12+(W-24)*Math.min(d,len)/len;ctx.fillStyle='#d7263d';ctx.beginPath();ctx.arc(X,py+ph/2,6,0,7);ctx.fill()}
function start(){const t=L(),R=ROUTES[mode][route];run={samples:[],lastS:0,dev:(dev&&dev.name)||(window.SN_BT&&window.SN_BT.name?window.SN_BT.name():''),t0:performance.now(),d:0,s:0,up:0,maxHr:0,wSum:0,wN:0,sSum:0,R,lastE:0,mode,route};$('rStage').hidden=false;$('rStart').textContent=t.stop;lastSent=null;
 const hasD=!!dev||!!(window.SN_BT&&window.SN_BT.connected());$('rSpd').hidden=hasD;$('rMsg').textContent=hasD?'':t.noDev;const v=$('rV');if(!v.hidden)v.play().catch(()=>{});const cv=$('rC'),ctx=cv.getContext('2d');lastT=performance.now();
 const step=now=>{if(!run)return;const dt=Math.min(.25,(now-lastT)/1000);lastT=now;const ext=!dev&&window.SN_BT&&window.SN_BT.connected()?window.SN_BT.live():null,cd=dev?data:(ext||{}),sp=(dev||ext)?(cd.kmh||0):manual;run.d+=sp/3.6*dt;run.s+=dt;run.sSum+=sp*dt;
  const g=grade(R,run.d),e=mode==='bike'?elevAt(R,run.d):0;if(e>run.lastE)run.up+=e-run.lastE;run.lastE=e;const hr=cd.hr||(window.SN_BT&&window.SN_BT.hr())||domHr();if(hr)run.maxHr=Math.max(run.maxHr,hr);if(cd.w){run.wSum+=cd.w*dt;run.wN+=dt}
  if(v&&!v.hidden){if(sp<1)v.pause();else{v.playbackRate=Math.max(.25,Math.min(2,sp/(mode==='bike'?22:12)));if(v.paused)v.play().catch(()=>{})}}
  if(g!==lastSent&&now-(run.ls||0)>1500){run.ls=now;lastSent=g;setGrade(g).then(okc=>{if(okc){$('rMsg').textContent=L().ctl.replace('{g}',g)}})}
  const W=cv.clientWidth,H=cv.clientHeight;if(W&&(cv.width!==W||cv.height!==H)){cv.width=W;cv.height=H}if(W)draw(ctx,W,H,run.d,g,R);
  $('hS').textContent=sp.toFixed(1);$('hG').textContent=g+'%';$('hD').textContent=(run.d/1000).toFixed(2);$('hT').textContent=fmt(run.s);$('hH').textContent=hr||'-';$('hP').textContent=cd.w!=null?cd.w:'-';ytSync(sp);hud2(sp,g,cd,hr);
  if(run.d>=R[0]){finish(true);return}requestAnimationFrame(step)};requestAnimationFrame(step)}
function finish(full){if(!run)return;const t=L(),r=run;run=null;$('rStart').textContent=t.start;const v=$('rV');if(v)v.pause();ytPause();try{if(document.fullscreenElement)document.exitFullscreen()}catch(e){}
 if(r.s>=30){const rec={id:Date.now(),d:new Date().toISOString().slice(0,10),m:r.mode,r:r.route,s:Math.round(r.s),km:+(r.d/1000).toFixed(2),avg:+(r.sSum/r.s).toFixed(1),up:Math.round(r.up),hr:r.maxHr||null,w:r.wN?Math.round(r.wSum/r.wN):null,full,dev:r.dev||'',sm:down(r.samples,400),feel:null,note:''};RIDES.push(rec);saveR();report();showFinish(rec)}
 $('rMsg').textContent=t.done}
$('rStart').onclick=()=>{if(run)finish(false);else start()};
function report(){const t=L(),g=document.querySelector('#prog .grid2');if(!g)return;let c=document.getElementById('rideCard');if(!c){c=document.createElement('div');c.className='card';c.id='rideCard';g.appendChild(c)}
 const list=[...RIDES].reverse().slice(0,10);c.innerHTML=`<h3>${t.rep}</h3>`+(list.length?'<ol class="rides" style="list-style:none;padding:0;margin:0">'+list.map(x=>`<li><button type="button" class="rideBtn" data-ride="${RIDES.indexOf(x)}"><b>${t.r[x.r]||x.r} · ${x.km.toFixed(2)} km</b>${x.d.slice(8,10)}/${x.d.slice(5,7)} · ${fmt(x.s)} · ${x.m==='row'?fmtP(paceOf(x.avg))+'/500m':x.avg+' '+t.kmh} ${t.avg}${x.m==='bike'?' · '+x.up+' '+t.up:''}${x.hr?' · '+t.max+' '+x.hr+' bpm':''}${x.w?' · '+x.w+' W':''}</button></li>`).join('')+'</ol>':`<p class="mut">${t.repEmpty}</p>`)}
var ytP=null,ytId=null,ytRate=1,vSel='none';
const VIDS={bike:[['sOpm6E1lnpc',{nl:'Alpen: meer in Zuid-Tirol',en:'Alps: South Tyrol lake'}],['UIeASEDJNU4',{nl:'1 uur fietstocht',en:'1 hour ride'}]],row:[]};
const VT={nl:{none:'Getekende route',yt:'YouTube-link',own:'Eigen video',bad:'Geen geldige YouTube-link.',err:'Deze video mag niet ingesloten worden. Kies een andere.'},en:{none:'Drawn route',yt:'YouTube link',own:'Own video',bad:'Not a valid YouTube link.',err:'This video cannot be embedded. Pick another one.'}};
const vt=()=>VT[document.documentElement.lang==='en'?'en':'nl'];
function paintV(){const b=$('rVids');if(!b)return;const t=vt(),lg=document.documentElement.lang==='en'?'en':'nl';
 b.innerHTML=`<button type="button" class="chip" data-v="none" aria-pressed="${vSel==='none'}">${t.none}</button>`+(VIDS[mode]||[]).map(([id,n])=>`<button type="button" class="chip" data-v="${id}" aria-pressed="${vSel===id}">▶ ${n[lg]}</button>`).join('')+`<button type="button" class="chip" data-v="yt" aria-pressed="${vSel==='yt'}">${t.yt}</button><button type="button" class="chip" data-v="own" aria-pressed="${vSel==='own'}">${t.own}</button>`;
 $('rYtIn').hidden=vSel!=='yt'}
function ytLoad(){return new Promise(ok=>{if(window.YT&&YT.Player)return ok();const p=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=()=>{p&&p();ok()};if(!document.getElementById('ytApi')){const s=document.createElement('script');s.id='ytApi';s.src='https://www.youtube.com/iframe_api';document.head.appendChild(s)}})}
async function ytSet(id,sel){if(ytP){try{ytP.destroy()}catch(e){}ytP=null}ytId=id;vSel=sel||id||'none';$('rYT').innerHTML='<div id="rYTp"></div>';if(id){$('rV').hidden=true;$('rV').removeAttribute('src');$('rStage').hidden=false;await ytLoad();ytP=new YT.Player('rYTp',{width:'100%',height:'100%',videoId:id,playerVars:{controls:0,mute:1,playsinline:1,rel:0,modestbranding:1,disablekb:1},events:{onReady:e=>{e.target.mute();e.target.pauseVideo()},onError:()=>{$('rMsg').textContent=vt().err}}});if(!run)$('rStage').hidden=true}paintV()}
function ytSync(sp){if(!ytP||!ytP.getPlayerState)return;const s=ytP.getPlayerState();if(sp<1){if(s===1)ytP.pauseVideo();return}const ref=mode==='bike'?22:12,rates=[.25,.5,.75,1,1.25,1.5,1.75,2],want=Math.max(.25,Math.min(2,sp/ref)),r=rates.reduce((a,b)=>Math.abs(b-want)<Math.abs(a-want)?b:a);if(r!==ytRate){ytRate=r;try{ytP.setPlaybackRate(r)}catch(e){}}if(s!==1&&s!==3)ytP.playVideo()}
function ytPause(){try{ytP&&ytP.pauseVideo()}catch(e){}}
$('rVids').addEventListener('click',e=>{const b=e.target.closest('[data-v]');if(!b||run)return;const v=b.dataset.v;
 if(v==='none'){ytSet(null,'none');$('rV').hidden=true}else if(v==='own'){$('rVid').click()}else if(v==='yt'){vSel='yt';paintV();$('rYtUrl').focus()}else ytSet(v)});
$('rYtGo').addEventListener('click',()=>{const u=$('rYtUrl').value.trim(),m=u.match(/(?:v=|youtu\.be\/|shorts\/|embed\/|live\/)([\w-]{11})/)||u.match(/^([\w-]{11})$/);if(!m){$('rDev').textContent=vt().bad;return}$('rDev').textContent='';ytSet(m[1],'yt')});
const R2T={nl:{time:'tijd',pace:'/500m',kmh:'km/u',w:'watt',km:'km',spm:'spm',rpm:'rpm',hr:'bpm',res:'weerstand',hel:'Helling',me:'Jij',pb:'Jouw record',bot:'bot',fs:'Volledig scherm',
 finT:'Goed gedaan!',feel:'Hoe voelde het?',f:['Zwaar','Moeilijk','Oké','Goed','Super'],noteH:'Schrijf een korte notitie over je training.',noteP:'Een paar woorden over je training...',done:'Klaar',see:'Zie het rapport',close:'Sluiten',
 dist:'Afstand',dur:'Duur',avgSp:'Gem. snelheid',avg:'Gemiddeld',max:'Maximum',spd:'Snelheid',pow:'Vermogen',cad:'Cadans',hrt:'Hartslag',up:'Hoogteverschil',dev:'Apparaat',none:'Geen toestel',
 elev:'Hoogte',ep:'Energieprofiel',epI:'Je beste gemiddelde vermogen per tijdsduur.',score:'Scorebord',scoreI:'Jouw ritten op deze route, en de ninja-bots (computer).',rank:'plaats',noData:'Geen gegevens van een toestel tijdens deze rit.'},
en:{time:'time',pace:'/500m',kmh:'km/h',w:'watts',km:'km',spm:'spm',rpm:'rpm',hr:'bpm',res:'resistance',hel:'Slope',me:'You',pb:'Your record',bot:'bot',fs:'Full screen',
 finT:'Well done!',feel:'How did it feel?',f:['Very hard','Hard','Okay','Good','Super'],noteH:'Write a short note about your training.',noteP:'A few words about your training...',done:'Done',see:'See the report',close:'Close',
 dist:'Distance',dur:'Duration',avgSp:'Avg. speed',avg:'Average',max:'Maximum',spd:'Speed',pow:'Power',cad:'Cadence',hrt:'Heart rate',up:'Elevation gain',dev:'Device',none:'No device',
 elev:'Elevation',ep:'Power profile',epI:'Your best average power per duration.',score:'Scoreboard',scoreI:'Your rides on this route, and the ninja bots (computer).',rank:'place',noData:'No device data during this ride.'}};
const r2=()=>R2T[document.documentElement.lang==='en'?'en':'nl'];
const GH={bike:[['Ninja-bot Groen',18],['Ninja-bot Blauw',24],['Ninja-bot Zwart',30]],row:[['Ninja-bot Groen',8],['Ninja-bot Blauw',10],['Ninja-bot Zwart',12.5]]};
const fmtP=s=>{if(!s||!isFinite(s)||s>5999)return'--:--';s=Math.round(s);return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')};
const paceOf=kmh=>kmh>0.5?1800/kmh:0;
const resPct=g=>Math.max(0,Math.min(100,Math.round((40+g*15)/2)));
function pbSpeed(md,rt){const f=RIDES.filter(x=>x.m===md&&x.r===rt&&x.full&&x.s>0);if(!f.length)return null;const b=f.reduce((a,c)=>c.s<a.s?c:a);return b.km/(b.s/3600)}
function ghosts(r){const t=r2(),len=r.R[0],list=GH[r.mode].map(([n,v])=>({n:n+' ('+t.bot+')',v,bot:1}));const pb=pbSpeed(r.mode,r.route);if(pb)list.push({n:t.pb,v:pb,pb:1});
 return list.map(g=>{const d=Math.min(len,g.v/3.6*r.s);return{...g,d,fin:d>=len?len/(g.v/3.6):null}})}
function hud2(sp,g,cd,hr){const t=r2(),r=run;if(!r)return;const len=r.R[0];
 if(r.mode==='row')$('hS').textContent=fmtP(paceOf(sp));
 const cad=r.mode==='row'?cd.spm:cd.rpm;$('hC').textContent=cad!=null?Math.round(cad):'--';$('hP').textContent=cd.w!=null?cd.w:'--';$('hH').textContent=hr||'--';
 $('hG').textContent=(g>=0?'+':'')+g.toFixed(1).replace('.',',')+'%';const rp=resPct(g);$('hR').textContent=rp;$('rResB').innerHTML=Array.from({length:10},(_,i)=>`<i class="${9-i<Math.round(rp/10)?'on':''}"></i>`).join('');
 const p=Math.min(1,r.d/len);$('rTrkF').style.width=(p*100)+'%';$('rTrkMe').style.left=(p*100)+'%';$('hLeft').textContent=Math.max(0,Math.round(len-r.d))+' m';
 const gs=ghosts(r);$('rTrkGh').innerHTML=gs.map(x=>`<i class="${x.pb?'pb':''}" style="left:${Math.min(100,x.d/len*100)}%"></i>`).join('');
 const all=gs.concat([{n:t.me,d:r.d,me:1,fin:null}]).sort((a,b)=>b.d-a.d);
 $('rGh').innerHTML=all.slice(0,6).map((x,i)=>`<div class="${x.me?'me':''}${x.bot?' bot':''}"><span class="rk">${i+1}</span><b>${x.n}</b><em>${x.me?'':(x.fin?fmt(x.fin):((x.d-r.d>=0?'+':'')+Math.round(x.d-r.d)+'m'))}</em></div>`).join('');
 if(r.s-(r.lastS||0)>=1){r.lastS=r.s;const e=r.mode==='bike'?elevAt(r.R,r.d):0;r.samples.push([Math.round(r.d),Math.round(r.s),+sp.toFixed(1),cd.w!=null?cd.w:null,cad!=null?Math.round(cad):null,hr||null,+e.toFixed(1)])}}
function stats(sm,i){const v=sm.map(x=>x[i]).filter(x=>x!=null&&x>0);if(!v.length)return null;return{avg:Math.round(v.reduce((a,b)=>a+b,0)/v.length*10)/10,max:Math.max(...v)}}
function powerCurve(sm){const w=sm.map(x=>x[3]||0);if(!w.some(x=>x>0))return[];const D=[1,5,10,30,60,180,300,600,1200,1800,3600];const out=[];
 for(const d of D){if(d>w.length)break;let s=0,best=0;for(let i=0;i<w.length;i++){s+=w[i];if(i>=d)s-=w[i-d];if(i>=d-1)best=Math.max(best,s/d)}out.push([d,Math.round(best)])}return out}
const dLbl=d=>d<60?d+'s':d<3600?(d/60)+'m':(d/3600)+'h';
function chart(cv,pts,o){const W=cv.width=cv.clientWidth*2,H=cv.height=cv.clientHeight*2,ctx=cv.getContext('2d');if(!ctx)return;ctx.clearRect(0,0,W,H);if(!pts.length)return;
 const pl=90,pb=50,pt=16,pr=16,xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]).filter(v=>v!=null);let mn=o.min!=null?o.min:Math.min(...ys),mx=Math.max(...ys);if(mx===mn)mx=mn+1;
 const X=x=>pl+(W-pl-pr)*((x-xs[0])/((xs[xs.length-1]-xs[0])||1)),Y=v=>{const k=(v-mn)/(mx-mn);return o.inv?pt+(H-pt-pb)*k:H-pb-(H-pt-pb)*k};
 ctx.font='22px Inter,system-ui,sans-serif';ctx.fillStyle='rgba(255,255,255,.75)';ctx.strokeStyle='rgba(255,255,255,.15)';ctx.setLineDash([6,6]);ctx.lineWidth=1;
 for(let i=0;i<=4;i++){const v=mn+(mx-mn)*i/4,y=Y(v);ctx.beginPath();ctx.moveTo(pl,y);ctx.lineTo(W-pr,y);ctx.stroke();ctx.fillText(o.fy?o.fy(v):Math.round(v),6,y+8)}
 ctx.setLineDash([]);for(let i=0;i<=4;i++){const x=xs[0]+(xs[xs.length-1]-xs[0])*i/4;ctx.fillText(o.fx?o.fx(x):Math.round(x),X(x)-20,H-14)}
 ctx.beginPath();let first=true;pts.forEach(p=>{if(p[1]==null)return;const x=X(p[0]),y=Y(p[1]);first?ctx.moveTo(x,y):ctx.lineTo(x,y);first=false});ctx.strokeStyle=o.col;ctx.lineWidth=3;ctx.stroke();
 ctx.lineTo(X(xs[xs.length-1]),o.inv?pt:H-pb);ctx.lineTo(X(xs[0]),o.inv?pt:H-pb);ctx.closePath();ctx.fillStyle=o.col+'40';ctx.fill()}
function bars(cv,pc,col){const W=cv.width=cv.clientWidth*2,H=cv.height=cv.clientHeight*2,ctx=cv.getContext('2d');if(!ctx)return;ctx.clearRect(0,0,W,H);if(!pc.length)return;const mx=Math.max(...pc.map(p=>p[1]))||1,pl=70,pb=46,bw=(W-pl-10)/pc.length;
 ctx.font='22px Inter,system-ui,sans-serif';ctx.fillStyle='rgba(255,255,255,.75)';[0,.5,1].forEach(k=>ctx.fillText(Math.round(mx*k),6,H-pb-(H-pb-16)*k+8));
 pc.forEach(([d,v],i)=>{const h=(H-pb-16)*v/mx,x=pl+i*bw;ctx.fillStyle=col;ctx.fillRect(x+bw*.18,H-pb-h,bw*.64,h);ctx.fillStyle='rgba(255,255,255,.75)';ctx.fillText(dLbl(d),x+bw*.1,H-12)})}
function overlay(id){let o=$(id);if(!o){o=document.createElement('div');o.id=id;o.className='rOv';o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');document.body.appendChild(o)}o.hidden=false;document.body.classList.add('pwLock');return o}
function closeOv(o){o.hidden=true;if(![...document.querySelectorAll('.rOv,.pw')].some(x=>!x.hidden))document.body.classList.remove('pwLock')}
function showFinish(rec){const t=r2(),o=overlay('rideFin'),lg=document.documentElement.lang==='en'?'en':'nl';
 const sp=rec.m==='row'?fmtP(paceOf(rec.avg))+'/500m':rec.avg+' '+t.kmh;
 o.innerHTML=`<div class="rFin"><div class="rFinCard"><h3>${t.finT}</h3><p class="rFinRt">${L().r[rec.r]||rec.r}</p><div class="rFinSt"><div><b>${rec.km.toFixed(2).replace('.',',')} km</b><span>${t.dist}</span></div><div><b>${fmt(rec.s)}</b><span>${t.dur}</span></div><div><b>${sp}</b><span>${t.avgSp}</span></div></div></div>
 <h3 class="rFinH">${t.feel}</h3><div class="rFeel">${t.f.map((f,i)=>`<button type="button" data-feel="${i}" aria-pressed="${rec.feel===i}"><span>${['😫','😕','😐','🙂','🤩'][i]}</span>${f}</button>`).join('')}</div>
 <p class="rFinN">${t.noteH}</p><textarea id="rNote" rows="3" maxlength="300" placeholder="${t.noteP}">${rec.note||''}</textarea>
 <div class="rFinB"><button type="button" class="pwBig dark" data-a="see">${t.see}</button><button type="button" class="pwBig" data-a="done">${t.done}</button></div></div>`;
 o.onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.feel!=null){rec.feel=+b.dataset.feel;o.querySelectorAll('[data-feel]').forEach(x=>x.setAttribute('aria-pressed',x===b));saveR();return}
  rec.note=($('rNote').value||'').trim();saveR();report();closeOv(o);if(b.dataset.a==='see')showReport(rec)}}
function showReport(rec){const t=r2(),o=overlay('rideRep'),sm=rec.sm||[],row=rec.m==='row';
 const S={sp:stats(sm,2),w:stats(sm,3),c:stats(sm,4),h:stats(sm,5)};const spF=v=>row?fmtP(paceOf(v))+'/500m':v.toFixed(1)+' '+t.kmh;
 const tr=(lbl,s,f)=>s?`<tr><th>${lbl}</th><td>${f(s.avg)}</td><td>${f(s.max)}</td></tr>`:'';
 const one=(lbl,v)=>`<tr><th>${lbl}</th><td colspan="2">${v}</td></tr>`;
 const bots=GH[rec.m].map(([n,v])=>({n:n+' ('+t.bot+')',s:(ROUTES[rec.m][rec.r]||[0])[0]/(v/3.6),bot:1}));
 const mine=RIDES.filter(x=>x.m===rec.m&&x.r===rec.r&&x.full).map(x=>({n:x===rec?t.me:(x.d.slice(8,10)+'/'+x.d.slice(5,7)),s:x.s,me:x===rec}));
 const board=bots.concat(mine).sort((a,b)=>a.s-b.s);const myRank=board.findIndex(x=>x.me)+1;const pod=board.slice(0,3);
 const pc=powerCurve(sm);
 o.innerHTML=`<div class="rRep"><div class="pwTop"><button type="button" class="pwIco" data-a="x" aria-label="${t.close}">${ic2('back')}</button><b class="pwT2">${L().r[rec.r]||rec.r}</b></div>
 <div class="rRepSt"><div><b>${fmt(rec.s)}</b><span>${t.dur}</span></div><div><b>${rec.km.toFixed(2).replace('.',',')} km</b><span>${t.dist}</span></div><div><b>${row?fmtP(paceOf(rec.avg)):rec.avg}</b><span>${t.avgSp}${row?' /500m':''}</span></div></div>
 <p class="mut rRepD">${rec.d.split('-').reverse().join('/')}${rec.feel!=null?' · '+['😫','😕','😐','🙂','🤩'][rec.feel]:''}${rec.note?' · '+rec.note.replace(/[<&>]/g,''):''}</p>
 <table class="rTab"><thead><tr><th></th><th>${t.avg}</th><th>${t.max}</th></tr></thead><tbody>${tr(t.spd,S.sp,spF)}${tr(t.pow,S.w,v=>Math.round(v)+' watt')}${tr(t.cad,S.c,v=>Math.round(v)+(row?' spm':' rpm'))}${tr(t.hrt,S.h,v=>Math.round(v)+' bpm')}
 ${one(t.dist,rec.km.toFixed(2).replace('.',',')+' km')}${one(t.up,(rec.up||0)+' m')}${one(t.dur,fmt(rec.s))}${one(t.dev,rec.dev||t.none)}</tbody></table>
 ${sm.length>2?`${rec.m==='bike'?`<h3>${t.elev}</h3><canvas class="rCh" id="chE"></canvas>`:''}${S.w?`<h3>${t.pow}</h3><canvas class="rCh" id="chW"></canvas>`:''}${S.c?`<h3>${t.cad}</h3><canvas class="rCh" id="chC"></canvas>`:''}<h3>${t.spd}</h3><canvas class="rCh" id="chS"></canvas>${S.h?`<h3>${t.hrt}</h3><canvas class="rCh" id="chH"></canvas>`:''}${pc.length?`<h3>${t.ep}</h3><p class="mut">${t.epI}</p><canvas class="rCh" id="chP"></canvas>`:''}`:`<p class="mut">${t.noData}</p>`}
 ${rec.full?`<h3>${t.score}</h3><p class="mut">${t.scoreI}</p><div class="rPod">${[1,0,2].map(i=>pod[i]?`<div class="p${i+1}"><span class="cr">${['🥇','🥈','🥉'][i]}</span><b>${pod[i].n}</b><em>${fmt(pod[i].s)}</em><i>${i+1}.</i></div>`:'').join('')}</div>${myRank?`<div class="rMine"><b>${myRank}</b><span>${t.me}</span><em>${fmt(rec.s)}</em></div>`:''}`:''}
 </div>`;
 o.onclick=e=>{const b=e.target.closest('[data-a="x"]');if(b)closeOv(o)};
 requestAnimationFrame(()=>{const X=sm.map(x=>x[0]),fx=v=>v>=1000?(v/1000).toFixed(2).replace('.',',')+'km':Math.round(v)+'m';
  const c=(id,i,col,o2)=>{const el=$(id);if(el)chart(el,sm.map(x=>[x[0],x[i]]),Object.assign({col,fx},o2||{}))};
  c('chE',6,'#9aa0a8');c('chW',3,'#3b82f6',{min:0});c('chC',4,'#4cc04a',{min:0});c('chH',5,'#e5484d');
  const s=$('chS');if(s){if(row)chart(s,sm.map(x=>[x[0],x[2]>0.5?Math.min(1800,paceOf(x[2])):null]),{col:'#8b5cf6',fx,inv:true,fy:v=>fmtP(v)});else chart(s,sm.map(x=>[x[0],x[2]]),{col:'#8b5cf6',fx,min:0})}
  const p=$('chP');if(p)bars(p,pc,'#3b82f6')})}
function ic2(k){return'<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>'}
function down(sm,n){if(sm.length<=n)return sm;const k=sm.length/n,o=[];for(let i=0;i<n;i++)o.push(sm[Math.floor(i*k)]);o.push(sm[sm.length-1]);return o}
$('rFs').addEventListener('click',()=>{const s=$('rStage');try{if(document.fullscreenElement)document.exitFullscreen();else(s.requestFullscreen||s.webkitRequestFullscreen).call(s)}catch(e){}});
document.addEventListener('click',e=>{const b=e.target.closest('#rideCard [data-ride]');if(b){const r=RIDES[+b.dataset.ride];if(r)showReport(r)}});
function hudLbl(){const t=r2(),row=mode==='row';const set=(i,v)=>{const el=$(i);if(el)el.textContent=v};set('hTl',t.time);set('hSl',row?t.pace:t.kmh);set('hPl',t.w);set('hDl',t.km);set('hCl',row?t.spm:t.rpm);set('hHl',t.hr);set('hGl',t.hel);set('hRl','%');
 const P=window.SN_PW,B=window.SN_BT,c=$('rConn');if(c&&P&&P.hasSaved){const on=B&&B.connected();c.textContent=on?'✓ '+(B.name()||'')+(lang2()==='en'?' connected':' verbonden'):(P.hasSaved()?(lang2()==='en'?'Connect ':'Verbind met ')+P.savedName():L().conn)}}
const lang2=()=>document.documentElement.lang==='en'?'en':'nl';setInterval(()=>{if(!run)hudLbl()},2000);
new MutationObserver(paint).observe($('trTitle'),{childList:true});paint();
})();
// Strong Ninja: logo, banner en icoontje
(()=>{const S=window.SN_IMG||{};const lg=document.querySelector('.logo');
if(S.wm&&lg)lg.innerHTML='<img class="logoimg" alt="Strong Ninja" src="'+S.wm+'">';
if(S.face){let l=document.querySelector('link[rel=icon]');if(!l){l=document.createElement('link');l.rel='icon';document.head.appendChild(l)}l.href=S.face}
const su=document.getElementById('setup');if(S.banner&&su&&!document.getElementById('snBanner')){const i=document.createElement('img');i.id='snBanner';i.className='hero-banner';i.alt='Strong Ninja: train, grow, level up';i.src=S.banner;su.insertBefore(i,su.firstChild)}
})();
// Strong Ninja: Ninja Coach chatbot (AI waar beschikbaar, anders ingebouwde coach)
(()=>{
const lang=()=>document.documentElement.lang==='en'?'en':'nl';
const TX={nl:{btn:'Coach',h:'Ninja Coach',ai:'slimme coach (AI)',basic:'basiscoach',ph:'Stel je vraag...',send:'Stuur',hi:'Hoi! Ik ben je Ninja Coach. Vraag me alles over trainen, je sixpack, slapen, eten of welk programma je best doet.',
note:'Ik ben een computerprogramma, geen dokter. Bij pijn of twijfel: vraag het aan een volwassene of je huisarts.',err:'Even geen verbinding met de slimme coach, ik antwoord met mijn basiskennis.',think:'Even denken...',chips:['Hoe krijg ik een sixpack?','Betere push-ups?','Wat moet ik vandaag doen?','Hoeveel slaap heb ik nodig?']},
en:{btn:'Coach',h:'Ninja Coach',ai:'smart coach (AI)',basic:'basic coach',ph:'Ask your question...',send:'Send',hi:'Hi! I am your Ninja Coach. Ask me anything about training, your six-pack, sleep, food or which program to do.',
note:'I am a computer program, not a doctor. If something hurts or you are unsure, ask an adult or your doctor.',err:'No connection to the smart coach right now, I will answer with my basic knowledge.',think:'Thinking...',chips:['How do I get a six-pack?','Better push-ups?','What should I do today?','How much sleep do I need?']}};
const RULES=[
[/sixpack|six-pack|buik|abs/i,{nl:'Een sixpack train je met core-oefeningen zoals plank, crunches en leg raises, 3 tot 4 keer per week. Zichtbaar wordt hij vooral door goed slapen en gezond eten, niet door minder te eten. Start met het programma Sixpack bij Train.',en:'You train a six-pack with core exercises like plank, crunches and leg raises, 3 to 4 times a week. It becomes visible mostly through good sleep and healthy food, not by eating less. Start the Six-pack program in Train.'}],
[/push|opdruk/i,{nl:'Hou je lichaam recht als een plank, handen iets breder dan je schouders, en zak tot je borst bijna de grond raakt. Lukt het nog niet? Begin op je knieën of tegen een tafel. Probeer elke week 1 of 2 herhalingen meer. Met de knop Camera telt de app mee.',en:'Keep your body straight like a plank, hands slightly wider than your shoulders, and lower until your chest almost touches the floor. Too hard? Start on your knees or against a table. Try 1 or 2 more reps every week. Tap Camera and the app counts along.'}],
[/slaap|slapen|sleep|\bmoe\b|tired/i,{nl:'Tieners hebben 8 tot 10 uur slaap nodig. Je spieren herstellen en je groeit vooral terwijl je slaapt. Leg je gsm 30 minuten voor het slapen weg, dat is ook een quest.',en:'Teens need 8 to 10 hours of sleep. Your muscles recover and you grow mostly while you sleep. Put your phone away 30 minutes before bed, that is a quest too.'}],
[/eiwit|eten|protein|food|dieet|diet|calor|afval|vet/i,{nl:'Eet gevarieerd en genoeg: bij elke maaltijd iets met eiwit, zoals eieren, kwark, kip, vis, bonen of noten, plus groenten, fruit en volkoren. Minder eten om sneller een sixpack te krijgen is geen goed idee terwijl je nog groeit.',en:'Eat varied and enough: protein at every meal, like eggs, yogurt, chicken, fish, beans or nuts, plus vegetables, fruit and whole grains. Eating less to get a six-pack faster is not a good idea while you are still growing.'}],
[/lengte|groei|groter|groot|tall|height|grow/i,{nl:'Hoe groot je wordt, bepalen vooral je genen. Goed slapen, gezond eten en veel bewegen helpen je om je potentieel te halen. Je geschatte eindlengte staat bij Progressie.',en:'How tall you get is mostly decided by your genes. Good sleep, healthy food and lots of exercise help you reach your potential. Your estimated adult height is in Progress.'}],
[/kaak|jaw/i,{nl:'Je kaaklijn hangt vooral af van je genen en je vetpercentage. Het programma Kaaklijn traint je nek en houding, waardoor je kaaklijn beter uitkomt. Kauw geen uren op harde kauwgom.',en:'Your jawline mostly depends on your genes and body fat. The Jawline program trains your neck and posture, which makes your jawline stand out more. Do not chew hard gum for hours.'}],
[/pijn|pain|blessure|injur|hurt|duizel|dizzy/i,{nl:'Stop met de oefening als je echte pijn voelt, dus niet gewoon spierbranden. Rust en vertel het aan een volwassene. Blijft de pijn of word je duizelig, ga dan naar je huisarts.',en:'Stop the exercise if you feel real pain, not just muscle burn. Rest and tell an adult. If the pain stays or you feel dizzy, see your doctor.'}],
[/motiv|zin|lui|lazy|saai|boring/i,{nl:'Kleine stappen werken het best: doe vandaag gewoon 1 quest. Je streak en gordels houden je gemotiveerd. Daag ook eens een vriend of een ninja-bot uit bij Wedstrijd!',en:'Small steps work best: just do 1 quest today. Your streak and belts keep you going. Challenge a friend or a ninja bot in Competition!'}],
[/gordel|belt|xp|level/i,{nl:'Je verdient XP met quests, trainingen en records. Zo klim je van witte gordel via geel, oranje, groen, blauw, paars en bruin naar zwart.',en:'You earn XP with quests, workouts and records. That takes you from white belt through yellow, orange, green, blue, purple and brown to black.'}],
[/fiets|roei|rit|bike|row|ride/i,{nl:'Bij Train vind je de Virtuele rit. Kies een route, verbind je trainer of roeitoestel, en de weerstand past zich aan de helling aan. Je ritten komen bij Progressie.',en:'In Train you find the Virtual ride. Pick a route, connect your trainer or rower and the resistance follows the slope. Your rides show up in Progress.'}]];
const ctx=()=>[document.getElementById('goalTip')?.textContent,document.getElementById('tip')?.textContent,document.getElementById('beltName')?.textContent&&('Gordel: '+document.getElementById('beltName').textContent)].filter(Boolean).join(' ');
const FOOD=[
[/hummus|kikkererwt|chickpea/i,'P',{nl:'Hummus: eiwit en vezels uit kikkererwten',en:'Hummus: protein and fibre from chickpeas'}],
[/avocado/i,'F',{nl:'Avocado: gezonde vetten en vitamines',en:'Avocado: healthy fats and vitamins'}],
[/herbamare|kruidenzout|\bzout|\bsalt/i,'S',{nl:'Herbamare of kruidenzout: lekker, maar het is vooral zout, dus met mate',en:'Herb salt: tasty, but it is mostly salt, so use a little'}],
[/toast|taost|tost|brood|boterham|cracker|beschuit|bread|wrap/i,'C',{nl:'Toast of brood: energie om te trainen, volkoren is beter dan wit',en:'Toast or bread: energy for training, wholegrain is better than white'}],
[/\bkip|kalkoen|chicken|turkey/i,'P',{nl:'Kip of kalkoen: veel eiwit en mager',en:'Chicken or turkey: lots of protein and lean'}],
[/\bei\b|\beitje|eieren|\beggs?\b/i,'P',{nl:'Ei: eiwit van topkwaliteit',en:'Egg: top quality protein'}],
[/\bvis\b|zalm|tonijn|makreel|haring|\bfish|salmon|tuna/i,'P',{nl:'Vis: eiwit en gezonde omega-3 vetten',en:'Fish: protein and healthy omega-3 fats'}],
[/kwark|skyr|yoghurt|yogurt|\bmelk|\bmilk|\bkaas|cheese/i,'P',{nl:'Zuivel (kwark, yoghurt, melk, kaas): eiwit en calcium voor sterke botten',en:'Dairy (yogurt, milk, cheese): protein and calcium for strong bones'}],
[/bonen|linzen|tofu|tempeh|edamame|beans|lentils/i,'P',{nl:'Bonen, linzen of tofu: plantaardig eiwit en vezels',en:'Beans, lentils or tofu: plant protein and fibre'}],
[/noten|pindakaas|amandel|cashew|walnoot|zaden|nuts|peanut butter|almond/i,'F',{nl:'Noten of pindakaas: gezonde vetten en een beetje eiwit',en:'Nuts or peanut butter: healthy fats and a bit of protein'}],
[/havermout|muesli|granola|oats|oatmeal/i,'C',{nl:'Havermout: trage koolhydraten, je hebt lang energie (granola bevat vaak veel suiker)',en:'Oats: slow carbs for long-lasting energy (granola often has lots of sugar)'}],
[/\brijst|pasta|spaghetti|aardappel|patat\b|quinoa|couscous|\brice|potato/i,'C',{nl:'Rijst, pasta of aardappelen: energie om hard te trainen',en:'Rice, pasta or potatoes: energy to train hard'}],
[/banaan|appel|\bfruit|bessen|aardbei|sinaas|mandarijn|druif|kiwi|banana|apple|berries/i,'V',{nl:'Fruit: vitamines en snelle energie',en:'Fruit: vitamins and quick energy'}],
[/groente|broccoli|spinazie|tomaat|wortel|paprika|\bsla\b|komkommer|vegetable|carrot|spinach/i,'V',{nl:'Groenten: vitamines en vezels',en:'Vegetables: vitamins and fibre'}],
[/\bvlees|rundvlees|steak|gehakt|\bham\b|\bmeat|beef/i,'P',{nl:'Vlees: eiwit en ijzer, kies vaker mager vlees',en:'Meat: protein and iron, choose lean meat more often'}],
[/chips|friet|frieten|pizza|hamburger|snoep|chocolade|koek|taart|\bijs\b|donut|candy|fries|cookie|cake/i,'X',{nl:'Snacks zoals chips, friet, pizza of snoep: lekker, maar vooral voor af en toe',en:'Snacks like chips, fries, pizza or candy: tasty, but mostly for now and then'}],
[/energiedrank|energy ?drink|red ?bull|monster/i,'E',{nl:'Energiedrank: veel cafeïne en suiker',en:'Energy drink: lots of caffeine and sugar'}],
[/cola|frisdrank|limonade|soda/i,'X',{nl:'Frisdrank: veel suiker',en:'Soft drinks: lots of sugar'}],
[/\bwater\b/i,'V',{nl:'Water: het beste drankje, zeker als je traint',en:'Water: the best drink, especially when you train'}],
[/eiwitshake|proteïne|proteine|protein ?shake|whey|creatine|supplement|pre-?workout/i,'Z',{nl:'Supplementen zoals eiwitshakes of creatine heb je als tiener niet nodig: gewoon eten geeft genoeg eiwit. Praat erover met een ouder of je huisarts',en:'Teens do not need supplements like protein shakes or creatine: normal food gives enough protein. Talk to a parent or your doctor about it'}]];
const foodAnswer=q=>{const l=lang(),hit=FOOD.filter(f=>f[0].test(q));if(!hit.length)return null;const cats=new Set(hit.map(h=>h[1]));
 let a=hit.map(h=>{const w=(q.match(h[0])||[''])[0].trim(),t=h[2][l],i=t.indexOf(':');const nm=w&&!['E','X','Z','S'].includes(h[1])?w.charAt(0).toUpperCase()+w.slice(1):t.slice(0,i);return '• '+nm+t.slice(i)+'.'}).join('\n')+'\n\n';
 if(cats.has('E'))a+=l==='nl'?'Energiedrank is af te raden voor tieners: het kan je hart sneller doen slaan en je slaap verstoren. Drink liever water.':'Energy drinks are not recommended for teens: they can make your heart race and disturb your sleep. Drink water instead.';
 else if(cats.has('Z'))a+=l==='nl'?'Kies liever echte maaltijden met eiwit.':'Choose real meals with protein instead.';
 else if(cats.has('P'))a+=l==='nl'?'Goed voor je spieren: er zit eiwit in. Na het trainen is eiwit samen met koolhydraten (zoals brood of rijst) een sterke combinatie.':'Good for your muscles: it has protein. After training, protein together with carbs (like bread or rice) is a strong combo.';
 else if(cats.has('X')&&cats.size===1)a+=l==='nl'?'Prima af en toe, maar niet elke dag. Voor je spieren heb je eiwit nodig, zoals een ei, kip, kwark of bonen.':'Fine now and then, but not every day. Your muscles need protein, like an egg, chicken, yogurt or beans.';
 else a+=l==='nl'?'Gezond! Voor je spieren mag er nog wat eiwit bij, zoals een ei, kip, kwark of bonen.':'Healthy! For your muscles you can add some protein, like an egg, chicken, yogurt or beans.';
 if(cats.has('S'))a+=l==='nl'?' Let wel op met zout.':' Go easy on the salt.';return a};
const MORE=[
[/spier|sterk|kracht|muscle|strong/i,{nl:'Spieren groeien door 3 dingen: krachttraining 2 tot 4 keer per week, genoeg eiwit bij elke maaltijd en 8 tot 10 uur slaap. Rustdagen horen erbij, want dan herstellen je spieren.',en:'Muscles grow from 3 things: strength training 2 to 4 times a week, enough protein at every meal and 8 to 10 hours of sleep. Rest days matter, that is when muscles recover.'}],
[/drink|dorst|thirst|hydrat/i,{nl:'Drink vooral water: ongeveer 6 tot 8 glazen per dag, en extra als je sport of het warm is.',en:'Drink mostly water: about 6 to 8 glasses a day, and extra when you train or it is hot.'}],
[/opwarm|warm.?up/i,{nl:'Warm 5 minuten op voor je traint: wat springen, armen draaien, een paar squats. Zo voorkom je blessures.',en:'Warm up for 5 minutes before training: some jumping, arm circles, a few squats. It helps prevent injuries.'}],
[/rust|rest|pauze|hoe vaak|how often|elke dag|every day/i,{nl:'Train 3 tot 5 keer per week en neem minstens 1 of 2 rustdagen. Je kan wel elke dag je quests doen, zoals stretchen en water drinken.',en:'Train 3 to 5 times a week and take at least 1 or 2 rest days. You can still do your daily quests, like stretching and drinking water.'}],
[/stretch|lenig|flexib|mobilit/i,{nl:'Stretch na het trainen 5 minuten: hou elke rek 20 tot 30 seconden vast, zonder te veren. Het programma Groei heeft goede houdingsoefeningen.',en:'Stretch for 5 minutes after training: hold each stretch 20 to 30 seconds without bouncing. The Grow program has good posture exercises.'}],
[/conditie|cardio|lopen|joggen|rennen|uithouding|stamina|running|voetbal|football|soccer/i,{nl:'Voor je conditie werken lopen, fietsen, touwspringen en voetballen super. Probeer 3 keer per week 20 tot 30 minuten. De virtuele rit bij Train is ook conditie.',en:'For stamina, running, cycling, jump rope and football are great. Try 3 times a week for 20 to 30 minutes. The virtual ride in Train counts too.'}],
[/gewicht|halter|dumbbell|kilo|\bkg\b|zwaar|heavy|weights/i,{nl:'Als tiener kan je prima met gewichten trainen, zolang je techniek goed is en je licht begint. Kies een gewicht waarmee je 12 tot 15 nette herhalingen haalt, en train liefst met een volwassene erbij.',en:'Teens can train with weights fine, as long as the technique is good and you start light. Pick a weight you can do 12 to 15 clean reps with, ideally with an adult around.'}]];
const SMALL=[
[/^\W*(6\W*7|six\W*seven|zes\W*zeven)\W*$/i,{nl:'6-7! Haha. Weet je wat ook een goeie 67 is? 67 seconden plank. Lukt jou dat? Test het bij Train.',en:'6-7! Haha. Know what is also a good 67? A 67 second plank. Can you do it? Try it in Train.'}],
[/^\W*(hoi|hallo|hey|hi|hello|yo|hej|hiya|salut|goeiemorgen|goedemorgen|goedemiddag|goedenavond|goeiedag|dag|hallo daar)\b/i,{nl:'Hoi! Klaar om sterker te worden? Vraag me iets over trainen, eten of slapen, of tik op "Wat moet ik vandaag doen?".',en:'Hi! Ready to get stronger? Ask me about training, food or sleep, or tap "What should I do today?".'}],
[/bedankt|dankje|dank je|dank u|merci|thanks|thank you|\bthx\b/i,{nl:'Graag gedaan! Succes met je training, ninja.',en:'You are welcome! Good luck with your training, ninja.'}],
[/hoe gaat|hoe is het|alles goed|how are you|what'?s up|hoe gaat het/i,{nl:'Met mij gaat het top, ik ben altijd klaar om te trainen! En met jou? Heb je vandaag al een quest gedaan?',en:'I am great, always ready to train! How about you? Did you do a quest today?'}],
[/wie ben je|wat ben je|wie ben jij|wat kan je|wat kun je|who are you|what can you do/i,{nl:'Ik ben Ninja Coach, de coach in Strong Ninja. Ik help je met trainen, eten, slapen, je programma en motivatie. Voor andere vragen tik je onder mijn antwoord op Vraag ChatGPT of Vraag Claude.',en:'I am Ninja Coach, the coach in Strong Ninja. I help with training, food, sleep, your program and motivation. For other questions, tap Ask ChatGPT or Ask Claude under my answer.'}],
[/doei|daag|salu|bye|tot later|tot morgen|slaapwel|good ?night/i,{nl:'Doei! Vergeet je quests niet, en slaap lekker lang.',en:'Bye! Do not forget your quests, and get plenty of sleep.'}],
[/grap|mop|moppen|joke|lach/i,{nl:'Waarom nam de ninja zijn halters mee naar bed? Om sterker te dromen! Haha.',en:'Why did the ninja take his dumbbells to bed? To dream stronger! Haha.'}],
[/^\W*(ok|oke|oké|okay|cool|nice|top|super|leuk|ja|nee|yes|no|kk|lol|haha+|wow|chill|prima)\W*$/i,{nl:'Top! Waar kan ik je nog mee helpen?',en:'Great! What else can I help you with?'}]];
const smallTalk=q=>{const l=lang();for(const[re,a]of SMALL)if(re.test(q))return a[l];
 const n=q.match(/^\W*(\d{1,3})\W*$/);if(n)return l==='nl'?'Een getal! Wil je een doel halen, bijvoorbeeld '+n[1]+' push-ups? Vraag me dan: hoe haal ik '+n[1]+' push-ups?':'A number! Want to reach a goal, like '+n[1]+' push-ups? Then ask me: how do I reach '+n[1]+' push-ups?';
 const g=q.match(/(\d{1,3})\s*(push-?ups|opdrukken|squats|sit-?ups|crunches|pull-?ups|seconden plank)/i);if(g&&/haal|halen|reach|kan ik|lukt|doel|goal/i.test(q)){const x=+g[1],s=Math.max(3,Math.round(x*.5));return l==='nl'?'Plan voor '+x+' '+g[2]+': train 3 tot 4 dagen per week, doe 3 sets van ongeveer '+s+' en tel elke week 1 of 2 herhalingen bij. Test je max om de 2 weken. Met de knop Camera telt de app mee.':'Plan for '+x+' '+g[2]+': train 3 to 4 days a week, do 3 sets of about '+s+' and add 1 or 2 reps every week. Test your max every 2 weeks. Tap Camera and the app counts along.'}
 return null};
const basic=q=>{const l=lang();const st=smallTalk(q);if(st)return st;const fa=foodAnswer(q);if(fa)return fa;if(/vandaag|today|programma|program|welk|which|begin|start/i.test(q)){const c=ctx();return(l==='nl'?'Voor jou: ':'For you: ')+(c||(l==='nl'?'doe de starttest, dan weet ik wat bij je past.':'do the starting test so I know what fits you.'))+(l==='nl'?' Vink daarnaast je quests af op Vandaag.':' Also tick off your quests in Today.')}
 for(const[re,a]of RULES.concat(MORE))if(re.test(q))return a[l];return l==='nl'?'Goeie vraag! Daar heb ik als basiscoach geen precies antwoord op. Wat altijd helpt: train 3 tot 5 keer per week, eet gevarieerd met eiwit bij elke maaltijd, drink water en slaap 8 tot 10 uur. Je kan me ook vragen stellen over een bepaald eten, oefening, slaap, groeien of motivatie. Bij twijfel over je gezondheid: vraag het een volwassene of je huisarts.':'Good question! As a basic coach I do not have an exact answer. What always helps: train 3 to 5 times a week, eat varied with protein at every meal, drink water and sleep 8 to 10 hours. You can also ask me about a specific food, exercise, sleep, growing or motivation. If you are worried about your health, ask an adult or your doctor.'};
let sample=null;if(window.claude&&claude.use)claude.use('sample').then(f=>{sample=f;head()}).catch(()=>{});
const SYS='Je bent Ninja Coach in de trainingsapp Strong Ninja voor tieners (12 tot 18 jaar). Antwoord kort (hoogstens 5 zinnen), vriendelijk en motiverend, in de taal van de vraag. Geef veilige trainingstips met lichaamsgewicht en verwijs naar de app (Vandaag, Train, Progressie, Camera, Wedstrijd, Virtuele rit). Geef nooit calorie-doelen, diëten, afvaltips, vasten of supplementen; wel gevarieerd en genoeg eten. Geef geen medisch advies: bij pijn, duizeligheid, blessures of zorgen verwijs je naar een volwassene of de huisarts. Praat nooit negatief over iemands lichaam of uiterlijk. Context over deze gebruiker: ';
const fab=document.createElement('button');fab.className='cbFab';fab.type='button';
const pan=document.createElement('div');pan.className='cbPanel';pan.hidden=true;pan.setAttribute('role','dialog');
pan.innerHTML='<div class="cbHead"><img alt="" id="cbFace"><b id="cbH"></b><button type="button" id="cbX" aria-label="sluiten">✕</button></div><div class="cbMsgs" id="cbMsgs" aria-live="polite"></div><div class="cbChips" id="cbChips"></div><form class="cbForm" id="cbForm"><input id="cbIn" autocomplete="off" maxlength="300"><button class="btn" id="cbSend"></button></form><div class="cbNote" id="cbNote"></div>';
document.body.appendChild(pan);document.body.appendChild(fab);
const $=id=>document.getElementById(id);const face=(window.SN_IMG||{}).face;
const head=()=>{const t=TX[lang()];fab.innerHTML=(face?'<img alt="" src="'+face+'">':'')+'<span>'+t.btn+'</span>';if(face)$('cbFace').src=face;else $('cbFace').hidden=true;
 $('cbH').innerHTML=t.h+'<span>'+(sample?t.ai:t.basic)+'</span>';$('cbIn').placeholder=t.ph;$('cbSend').textContent=t.send;$('cbNote').textContent=t.note;
 $('cbChips').innerHTML=t.chips.map(c=>'<button type="button">'+c+'</button>').join('')};
const hist=[];const add=(who,txt)=>{const d=document.createElement('div');d.className='cbM '+who;d.textContent=txt;$('cbMsgs').appendChild(d);$('cbMsgs').scrollTop=1e9;return d};
let greeted=false;fab.onclick=()=>{pan.hidden=!pan.hidden;if(!pan.hidden){if(!greeted){add('bot',TX[lang()].hi);greeted=true}$('cbIn').focus()}};$('cbX').onclick=()=>{pan.hidden=true};
async function ask(q){q=q.trim();if(!q)return;$('cbChips').hidden=true;add('me',q);hist.push({role:'user',content:q});const t=TX[lang()];
 if(sample){const d=add('bot',t.think);try{const msgs=[{role:'user',content:SYS+(ctx()||'onbekend')+'\n\nVraag: '+hist[0].content},...hist.slice(1)].slice(-10);if(msgs[0].role!=='user')msgs.shift();
  const r=await sample(msgs,{modelTier:'quick',cache:false,onText:x=>{d.textContent=x.text}});d.textContent=r.text;hist.push({role:'assistant',content:r.text});return}catch(e){d.textContent=t.err+'\n\n'+basic(q);hist.push({role:'assistant',content:d.textContent});return}}
 const a=basic(q);const d=add('bot',a);hist.push({role:'assistant',content:a});const pr=(lang()==='nl'?'Ik ben een tiener en gebruik de trainingsapp Strong Ninja. Geef een kort, veilig antwoord, zonder dieet-, calorie- of supplementadvies: ':'I am a teenager using the training app Strong Ninja. Give a short, safe answer, without diet, calorie or supplement advice: ')+q,e=encodeURIComponent(pr);const w=document.createElement('div');w.className='cbAsk';w.innerHTML='<a target="_blank" rel="noopener" href="https://chatgpt.com/?q='+e+'">'+(lang()==='nl'?'Vraag ChatGPT':'Ask ChatGPT')+'</a><a target="_blank" rel="noopener" href="https://claude.ai/new?q='+e+'">'+(lang()==='nl'?'Vraag Claude':'Ask Claude')+'</a>';d.appendChild(w);$('cbMsgs').scrollTop=1e9}
$('cbForm').addEventListener('submit',e=>{e.preventDefault();const v=$('cbIn').value;$('cbIn').value='';ask(v)});
$('cbChips').addEventListener('click',e=>{const b=e.target.closest('button');if(b)ask(b.textContent)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!pan.hidden)pan.hidden=true});
head();const tt=document.getElementById('trTitle');if(tt)new MutationObserver(head).observe(tt,{childList:true});
})();
// Strong Ninja: pro toestellen-wizard (type, merk, model, verbinden, datacheck, mijn apparatuur)
(()=>{
const $=id=>document.getElementById(id);if(!$('btAdd'))return;
const lang=()=>document.documentElement.lang==='en'?'en':'nl';
const TX={nl:{type:'Jouw toestel',typeI:'Welk toestel wil je gebruiken met Strong Ninja?',brand:'Merk',brandI:'Kies het merk van je toestel, of gebruik de camera om je bewegingen te volgen.',opt:'Camera (optische sensor)',optI:'Geen toestel met Bluetooth? De camera van je gsm volgt je bewegingen bij de oefeningen.',of:'of',search:'Zoek je merk',noBrand:'Ik vind mijn merk niet',model:'Model',modelI:'Kies je model, of sla over.',modelPh:'Model (optioneel)',skip:'Overslaan',next:'Volgende',conn:'Verbinding',connI:'Zet je toestel aan en zorg dat Bluetooth en Locatie aan staan op je gsm.',scan:'Zoek toestel',scanAll:'Toon alle Bluetooth-toestellen',scanHelp:'Chrome toont zo meteen een lijst. Kies daar je toestel.',busy:'Verbinden...',notFound:'Geen toestel gekozen of gevonden. Staat het aan en is het niet met een andere app verbonden?',noBt:'Bluetooth werkt niet in deze browser. Gebruik Chrome op Android of op een computer, op de echte website.',check:'Datacheck',checkI:'Beweeg even: we kijken of de gegevens van je toestel binnenkomen.',connected:'Verbonden',lost:'Verbinding kwijt',name:'Naam',bmodel:'Model',cad:'Snelheid berekenen uit cadans',add:'Toevoegen aan mijn apparatuur',saved:'Opgeslagen! De app onthoudt dit toestel. Volgende keer tik je gewoon op Verbinden.',mine:'Mijn apparatuur',mineI:'Deze toestellen onthoudt de app. Tik op Verbinden voor je gaat sporten.',none:'Nog geen toestellen. Tik op + om er een toe te voegen.',reconn:'Verbinden',disc:'Verbreken',del:'Verwijderen',sure:'Weet je zeker dat je het wilt wissen?',yes:'Ja',no:'Nee',set:'Instellingen',save:'Bewaren',close:'Sluiten',camOn:'Camera gekozen. Open een oefening bij Train en tik op Cameracoach.',btn:'Mijn apparatuur',noCtl:'Dit toestel laat geen automatische weerstand toe.',
t:{bike:'Fietstrainer',ebike:'Hometrainer',tread:'Loopband',cross:'Crosstrainer',row:'Roeitoestel',hr:'Hartslagmeter'},
m:{pace:'/500m',kmh:'km/u',rpm:'rpm',spm:'spm',w:'watt',hr:'bpm',incl:'% helling',dist:'m'}},
en:{type:'Your machine',typeI:'Which machine do you want to use with Strong Ninja?',brand:'Brand',brandI:'Pick the brand of your machine, or use the camera to track your moves.',opt:'Camera (optical sensor)',optI:'No Bluetooth machine? Your phone camera tracks your moves during exercises.',of:'or',search:'Search your brand',noBrand:"I can't find my brand",model:'Model',modelI:'Pick your model, or skip.',modelPh:'Model (optional)',skip:'Skip',next:'Next',conn:'Connection',connI:'Turn on your machine and make sure Bluetooth and Location are on on your phone.',scan:'Find machine',scanAll:'Show all Bluetooth devices',scanHelp:'Chrome will show a list. Pick your machine there.',busy:'Connecting...',notFound:'No machine picked or found. Is it on and not connected to another app?',noBt:'Bluetooth does not work in this browser. Use Chrome on Android or a computer, on the real website.',check:'Data check',checkI:'Move a bit: we check that data from your machine comes in.',connected:'Connected',lost:'Connection lost',name:'Name',bmodel:'Model',cad:'Calculate speed from cadence',add:'Add to my equipment',saved:'Saved! The app remembers this machine. Next time just tap Connect.',mine:'My equipment',mineI:'The app remembers these machines. Tap Connect before you train.',none:'No machines yet. Tap + to add one.',reconn:'Connect',disc:'Disconnect',del:'Delete',sure:'Are you sure you want to delete it?',yes:'Yes',no:'No',set:'Settings',save:'Save',close:'Close',camOn:'Camera chosen. Open an exercise in Train and tap Camera coach.',btn:'My equipment',noCtl:'This machine does not allow automatic resistance.',
t:{bike:'Smart trainer',ebike:'Exercise bike',tread:'Treadmill',cross:'Cross trainer',row:'Rowing machine',hr:'Heart-rate monitor'},
m:{pace:'/500m',kmh:'km/h',rpm:'rpm',spm:'spm',w:'watts',hr:'bpm',incl:'% incline',dist:'m'}}};
const L=()=>TX[lang()];
const I={bike:'<circle cx="7" cy="17" r="4"/><circle cx="18" cy="17" r="4"/><path d="M7 17l4-8h5l2 8M11 9l-1-3h-2M15 9l1-3"/>',ebike:'<path d="M6 20h12M9 20l2-9h4l1 9M11 11l-2-4M15 7h3"/><circle cx="12" cy="4" r="1.5"/>',tread:'<path d="M3 19h15l3-3M14 4a1.5 1.5 0 1 0 0 .1M12 8l-3 4 3 2-1 4M12 8l3 3 3-1M9 12l-3 1"/>',cross:'<path d="M8 20l3-7 4 7M11 13l1-5M12 8l4-4M12 8l-4-3M7 20h10"/><circle cx="12" cy="3" r="1.2"/>',row:'<path d="M2 18h20M5 18a2 2 0 1 1 0-.1M9 14l4 1 3-3 4 1M13 15l-2 3"/><circle cx="16" cy="9" r="1.5"/>',hr:'<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/><path d="M7 12h3l1-2 2 4 1-2h3"/>',bt:'<path d="M7 7l10 10-5 4V3l5 4L7 17"/>',cam:'<rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13.5" r="3.5"/><path d="M8 7l2-3h4l2 3"/>',back:'<path d="M15 5l-7 7 7 7"/>',plus:'<path d="M12 5v14M5 12h14"/>',trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',srch:'<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',ok:'<path d="M5 12l4 4 10-10"/>',q:'<path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14M12 17.5v.1"/>'};
const ic=(k,s=24)=>`<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[k]}</svg>`;
const BRANDS=['Abilica','Active Sports Gear','Adidas','Alinco','Amila','AquaRowing','Ascend','Asviva','Atletica','Augletics','Bcube','Behumax','Bkool','Bowflex','Concept2','Domyos','Echelon','Elite','First Degree','Flow Fitness','Garmin','Hammer','Hydrow','iFit','Joroto','Kettler','Life Fitness','Merach','NordicTrack','Peloton','Polar','ProForm','Renpho','Saris','Schwinn','Skandika','Sole','Sportstech','Stages','Tacx','Technogym','Toorx','Wahoo','WaterRower','Xiaomi','Yesoul','Zwift'];
const MODELS={'Joroto|row':['JR20','JR30','JR40','MR19','MR20H','MR23','MR26','MR270','MR280'],'Joroto|ebike':['X2','X2PRO','X4S','MB21','MB30','MB40'],'Concept2|row':['RowErg','RowErg Tall','Dynamic RowErg'],'Concept2|ebike':['BikeErg'],'WaterRower|row':['Natural','Club','Oxbridge','S4 met ComModule'],'Wahoo|bike':['KICKR','KICKR CORE','KICKR SNAP','KICKR MOVE'],'Tacx|bike':['NEO 2T','NEO 3M','Flux S','Flux 2','Flow'],'Elite|bike':['Direto XR','Suito T','Justo','Zumo'],'Zwift|bike':['Zwift Hub','Zwift Hub One'],'Merach|row':['R50','Q1S','R01'],'Merach|ebike':['S08','S28','S22'],'Renpho|ebike':['AI Smart Bike'],'Renpho|row':['AI Smart Rower V2'],'Polar|hr':['H9','H10','Verity Sense'],'Garmin|hr':['HRM-Dual','HRM-Pro Plus','HRM 200']};
const SVC={bike:[0x1826,0x1818,0x1816],ebike:[0x1826,0x1818,0x1816],tread:[0x1826],cross:[0x1826],row:[0x1826],hr:[0x180d]};
const OPT=[0x1826,0x180d,0x1818,0x1816,0x180a,0x180f];
const METS={row:['pace','spm','w','hr'],bike:['kmh','rpm','w','hr'],ebike:['kmh','rpm','w','hr'],tread:['kmh','incl','hr','dist'],cross:['kmh','spm','w','hr'],hr:['hr']};
const K='strongninja_gear';let G=[];try{G=JSON.parse(localStorage.getItem(K)||'[]')}catch(e){}
const saveG=()=>{try{localStorage.setItem(K,JSON.stringify(G))}catch(e){}};
const LIVE=new Map();// id -> {dev,cp,data,seen:Set,lost}
const BT={live(){for(const v of LIVE.values())if(!v.lost&&v.type!=='hr')return v.data;const h=[...LIVE.values()].find(v=>!v.lost);return h?h.data:null},
 hr(){for(const v of LIVE.values())if(!v.lost&&v.data.hr)return v.data.hr;return null},
 connected(){return[...LIVE.values()].some(v=>!v.lost)},
 name(){for(const v of LIVE.values())if(!v.lost){const g=G.find(x=>x.id===v.id);return g?([g.brand,g.model].filter(Boolean).join(' - ')||g.label||g.name):(v.dev&&v.dev.name)||''}return''},
 async setGrade(g,mode){for(const v of LIVE.values()){if(v.lost||!v.cp)continue;try{if(v.type==='bike'||v.type==='ebike'){const b=new DataView(new ArrayBuffer(7));b.setUint8(0,0x11);b.setInt16(1,0,true);b.setInt16(3,Math.round(g*100),true);b.setUint8(5,40);b.setUint8(6,51);await v.cp.writeValueWithResponse(b.buffer)}else await v.cp.writeValueWithResponse(new Uint8Array([4,Math.max(10,Math.min(200,Math.round(40+g*15)))]));return true}catch(e){}}return false}};
window.SN_BT=BT;
function rd(dv){let o=0;return{u8:()=>dv.getUint8(o++),u16:()=>{const x=dv.getUint16(o,true);o+=2;return x},s16:()=>{const x=dv.getInt16(o,true);o+=2;return x},u24:()=>{const x=dv.getUint16(o,true)|(dv.getUint8(o+2)<<16);o+=3;return x},left:()=>dv.byteLength-o}}
function parse(c,dv,L,cad){const d=L.data,s=L.seen,set=(k,v)=>{d[k]=v;s.add(k)};const r=rd(dv);
 try{if(c===0x2a37){const f=r.u8();set('hr',f&1?r.u16():r.u8())}
 else if(c===0x2a63){r.u16();set('w',r.s16())}
 else if(c===0x2ad2){const f=r.u16();if(!(f&1))set('kmh',r.u16()/100);if(f&2)r.u16();if(f&4)set('rpm',Math.round(r.u16()/2));if(f&8)r.u16();if(f&16)set('dist',r.u24());if(f&32)r.s16();if(f&64)set('w',r.s16());if(f&128)r.s16();if(f&256){r.u16();r.u16();r.u8()}if(f&512)set('hr',r.u8())}
 else if(c===0x2ad1){const f=r.u16();if(!(f&1)){set('spm',Math.round(r.u8()/2));r.u16()}if(f&2)r.u8();if(f&4)set('dist',r.u24());if(f&8){const p=r.u16();set('pace',p);set('kmh',p?+(1800/p).toFixed(1):0)}if(f&16)r.u16();if(f&32)set('w',r.s16());if(f&64)r.s16();if(f&128)r.s16();if(f&256){r.u16();r.u16();r.u8()}if(f&512)set('hr',r.u8())}
 else if(c===0x2acd){const f=r.u16();if(!(f&1))set('kmh',r.u16()/100);if(f&2)r.u16();if(f&4)set('dist',r.u24());if(f&8){set('incl',r.s16()/10);r.s16()}if(f&16){r.u16();r.u16()}if(f&32)r.u8();if(f&64)r.u8();if(f&128){r.u16();r.u16();r.u8()}if(f&256)set('hr',r.u8())}
 else if(c===0x2ace){const f=r.u8()|(r.u8()<<8)|(r.u8()<<16);if(!(f&1))set('kmh',r.u16()/100);if(f&2)r.u16();if(f&4)set('dist',r.u24());if(f&8){set('spm',r.u16());r.u16()}if(f&16)r.u16();if(f&32){r.u16();r.u16()}if(f&64){set('incl',r.s16()/10);r.s16()}if(f&128)r.s16();if(f&256)set('w',r.s16());if(f&512)r.s16();if(f&1024){r.u16();r.u16();r.u8()}if(f&2048)set('hr',r.u8())}}catch(e){}
 if(cad&&d.rpm!=null&&(!s.has('kmh')||!d.kmh)){d.kmh=+(d.rpm*0.32).toFixed(1);s.add('kmh')}}
async function connectDev(dev,g){const Lv={dev,type:g.type,data:{},seen:new Set(),lost:false,cp:null,id:g.id};LIVE.set(g.id,Lv);
 const srv=await dev.gatt.connect();
 const sub=async(svc,chs)=>{let s;try{s=await srv.getPrimaryService(svc)}catch(e){return 0}let n=0;for(const c of chs){try{const ch=await s.getCharacteristic(c);ch.addEventListener('characteristicvaluechanged',e=>{parse(c,e.target.value,Lv,g.cad);Lv.t=Date.now()});await ch.startNotifications();n++}catch(e){}}return n};
 let n=await sub(0x1826,[0x2ad2,0x2ad1,0x2acd,0x2ace]);n+=await sub(0x180d,[0x2a37]);n+=await sub(0x1818,[0x2a63]);
 try{const s=await srv.getPrimaryService(0x1826);Lv.cp=await s.getCharacteristic(0x2ad9);await Lv.cp.startNotifications();await Lv.cp.writeValueWithResponse(new Uint8Array([0]))}catch(e){Lv.cp=null}
 dev.addEventListener('gattserverdisconnected',()=>{Lv.lost=true;paintMine();syncDevs()});
 Lv.n=n;return Lv}
// ---------- UI ----------
let st={step:0,type:null,brand:null,model:'',q:'',cad:false,dev:null,live:null,err:'',busy:false,edit:null,del:null};
const ov=document.createElement('div');ov.className='pw';ov.id='pw';ov.hidden=true;ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');document.body.appendChild(ov);
const prog=()=>{const p=[0,1,2,3,4][st.step]||0;return `<div class="pwBar"><i style="width:${Math.min(100,p*25)}%"></i></div>`};
const head=(title,sub)=>`<div class="pwTop"><button type="button" class="pwIco" data-a="back" aria-label="terug">${ic('back')}</button>${st.step<5?prog():'<b class="pwT2">'+title+'</b>'}${st.step===5?`<button type="button" class="pwIco pwAdd" data-a="new" aria-label="toevoegen">${ic('plus')}</button>`:''}</div>${st.step<5?`<h2 class="pwH">${title}</h2>`:''}${sub?`<p class="pwP">${sub}</p>`:''}`;
const fmtPace=s=>s?Math.floor(s/60)+':'+String(s%60).padStart(2,'0'):'0:00';
function metHtml(Lv,type){const t=L(),d=Lv?Lv.data:{},s=Lv?Lv.seen:new Set();const ms=METS[type]||METS.bike;const big=ms[0];
 const cell=(k,b)=>`<div class="pwMet${b?' big':''}"><span class="pwChk ${s.has(k)?'ok':'q'}">${ic(s.has(k)?'ok':'q',14)}</span><b>${k==='pace'?fmtPace(d.pace):(d[k]!=null?d[k]:0)}</b><span>${t.m[k]}</span></div>`;
 return `<div class="pwMets">${cell(big,true)}<div class="pwRow">${ms.slice(1).map(k=>cell(k)).join('')}</div></div>`}
function view(){const t=L();let h='';
 if(st.step===0){h=head(t.type,t.typeI)+`<div class="pwGrid">${Object.keys(t.t).map(k=>`<button type="button" class="pwTile" data-type="${k}">${ic(k,40)}<b>${t.t[k]}</b></button>`).join('')}</div>`}
 else if(st.step===1){const q=st.q.toLowerCase();const list=BRANDS.filter(b=>b.toLowerCase().includes(q));let last='';
  h=head(t.brand,t.brandI)+`<button type="button" class="pwOpt" data-a="cam">${ic('cam',28)}<span><b>${t.opt}</b><small>${t.optI}</small></span><i class="pwRad"></i></button><div class="pwOf"><span>${t.of}</span></div>`+
  `<label class="pwSearch">${ic('srch',22)}<input id="pwQ" type="search" autocomplete="off" placeholder="${t.search}" value="${st.q.replace(/"/g,'&quot;')}"></label>`+
  `<div class="pwBrands">${list.map(b=>{const L1=b[0].toUpperCase();const sep=L1!==last&&!q?`<div class="pwLet">${L1}</div>`:'';last=L1;return sep+`<button type="button" class="pwBrand${st.brand===b?' on':''}" data-brand="${b}">${b}</button>`}).join('')}</div>`+
  `<div class="pwFoot"><button type="button" class="pwBig ${st.brand?'':'dark'}" data-a="${st.brand?'next':'nobrand'}">${st.brand?t.next:t.noBrand}</button></div>`}
 else if(st.step===2){const ms=MODELS[st.brand+'|'+st.type]||[];
  h=head(t.model,t.modelI)+(ms.length?`<div class="pwList">${ms.map(m=>`<button type="button" class="pwItem${st.model===m?' on':''}" data-model="${m}"><b>${m}</b><i class="pwRad">${st.model===m?ic('ok',16):''}</i></button>`).join('')}</div>`:`<input class="pwIn" id="pwM" placeholder="${t.modelPh}" value="${st.model.replace(/"/g,'&quot;')}">`)+
  `<div class="pwFoot"><button type="button" class="pwBig" data-a="next">${st.model?t.next:t.skip}</button></div>`}
 else if(st.step===3){h=head(t.conn,t.connI)+`<div class="pwPulse${st.busy?' on':''}"><span>${ic('bt',48)}</span></div><p class="pwP" style="font-weight:700">${st.busy?t.busy:t.scanHelp}</p>${st.err?`<div class="pwErr">${st.err}</div>`:''}`+
  `<div class="pwFoot"><button type="button" class="pwBig" data-a="scan" ${st.busy?'disabled':''}>${t.scan}</button><button type="button" class="pwLink" data-a="scanall">${t.scanAll}</button></div>`}
 else if(st.step===4){const Lv=st.live;h=head(t.check,t.checkI)+metHtml(Lv,st.type)+
  `<div class="pwDevH"><b>${(st.dev&&st.dev.name)||'Bluetooth'}</b><span class="pwDot ${Lv&&!Lv.lost?'on':''}"></span><span>${Lv&&!Lv.lost?t.connected:t.lost}</span></div>`+
  `<div class="pwInfo"><div><span>${t.name}</span><b>${((st.dev&&st.dev.name)||'')+(st.model?' - '+st.model:'')}</b></div><div><span>${t.brand}</span><b>${st.brand||'-'}</b></div><div><span>${t.bmodel}</span><b>${st.model||'-'}</b></div></div>`+
  ((st.type==='bike'||st.type==='ebike')?`<label class="pwInfo pwCad"><span>${t.cad}</span><input type="checkbox" id="pwCad" ${st.cad?'checked':''}></label>`:'')+
  `<div class="pwFoot"><button type="button" class="pwBig" data-a="add">${t.add}</button></div>`}
 else if(st.step===5){h=head(t.mine,'')+`<p class="pwP">${t.mineI}</p><div class="pwMine">${G.length?G.map(g=>{const Lv=LIVE.get(g.id),on=Lv&&!Lv.lost;
   if(st.del===g.id)return `<div class="pwGear"><span class="pwGi">${ic(g.type,30)}</span><span class="pwGn"><b>${t.sure}</b><small>${g.name}</small></span><button type="button" class="pwSm" data-del="${g.id}">${t.yes}</button><button type="button" class="pwSm alt" data-a="nodel">${t.no}</button></div>`;
   if(st.edit===g.id)return `<div class="pwGear col"><input class="pwIn" id="pwEN" value="${(g.label||g.name).replace(/"/g,'&quot;')}"><div class="pwChips">${Object.keys(t.t).map(k=>`<button type="button" class="chip" data-et="${k}" aria-pressed="${g.type===k}">${t.t[k]}</button>`).join('')}</div>${(g.type==='bike'||g.type==='ebike')?`<label class="pwCad2"><input type="checkbox" id="pwEC" ${g.cad?'checked':''}> ${t.cad}</label>`:''}<div style="display:flex;gap:8px"><button type="button" class="pwSm" data-save="${g.id}">${t.save}</button><button type="button" class="pwSm alt" data-a="noedit">${t.close}</button></div></div>`;
   return `<div class="pwGear${on?' on':''}">${st.arm===g.id?`<button type="button" class="pwGi pwX" data-d="${g.id}" aria-label="${t.del}">✕</button>`:`<button type="button" class="pwGi" data-arm="${g.id}" aria-label="${t.del}">${ic(g.type,30)}</button>`}<span class="pwGn"><small>${g.name}</small><b>${g.label||g.brand||t.t[g.type]}</b><small>${[g.brand&&g.label?g.brand:'',g.model].filter(Boolean).join(' · ')||t.t[g.type]}</small>${on?`<span class="pwLiveTxt">${liveTxt(Lv,g.type)}</span>`:''}</span><button type="button" class="pwSm${on?' alt':''}" data-c="${g.id}">${on?t.disc:t.reconn}</button><button type="button" class="pwIco sm" data-d="${g.id}" aria-label="${t.del}">${ic('trash',20)}</button><button type="button" class="pwIco sm" data-e="${g.id}" aria-label="${t.set}">${ic('gear',20)}</button></div>`}).join(''):`<p class="pwP">${t.none}</p>`}</div>${st.ok?`<div class="pwOkMsg">✓ ${st.ok}</div>`:''}${st.err?`<div class="pwErr">${st.err}</div>`:''}`}
 ov.innerHTML=`<div class="pwIn0 s${st.step}">${h}</div>`;
 const q=$('pwQ');if(q){q.oninput=()=>{st.q=q.value;const p=q.selectionStart;view();const n=$('pwQ');n.focus();try{n.setSelectionRange(p,p)}catch(e){}}}
 const m=$('pwM');if(m)m.oninput=()=>{st.model=m.value.trim();ov.querySelector('[data-a="next"]').textContent=st.model?L().next:L().skip};
 const c=$('pwCad');if(c)c.onchange=()=>{st.cad=c.checked;if(st.live){const g=G.find(x=>x.id===st.live.id);if(g)g.cad=st.cad}};}
function liveTxt(Lv,type){const t=L(),d=Lv.data;return(METS[type]||[]).filter(k=>d[k]!=null).map(k=>(k==='pace'?fmtPace(d.pace):d[k])+' '+t.m[k]).join(' · ')}
function open(step){st={step:step==null?(G.length?5:0):step,type:null,brand:null,model:'',q:'',cad:false,dev:null,live:null,err:'',busy:false,edit:null,del:null};ov.hidden=false;document.body.classList.add('pwLock');view()}
function close(){ov.hidden=true;document.body.classList.remove('pwLock');syncDevs()}
window.SN_PW={open,close,remove:id=>{const Lv=LIVE.get(id);if(Lv){try{Lv.dev.gatt.disconnect()}catch(e){}LIVE.delete(id)}G=G.filter(x=>x.id!==id);saveG();syncDevs();paintMine()},hasSaved:()=>G.length>0,savedName:()=>{const g=G[G.length-1];return g?(g.label||[g.brand,g.model].filter(Boolean).join(' ')||g.name):''},connectSaved:()=>{const g=G[G.length-1];return g?reconnect(g):Promise.resolve()}};
async function scan(all){const t=L();st.err='';if(!navigator.bluetooth){st.err=t.noBt;view();return}
 const pre=st.brand?[st.brand.split(' ')[0].toUpperCase(),st.brand.split(' ')[0]]:[];
 let opts;if(all)opts={acceptAllDevices:true,optionalServices:OPT};
 else{const f=(SVC[st.type]||[0x1826]).map(s=>({services:[s]}));pre.forEach(p=>f.push({namePrefix:p}));opts={filters:f,optionalServices:OPT}}
 let dev;try{dev=await navigator.bluetooth.requestDevice(opts)}catch(e){st.err=e&&e.name==='NotFoundError'?t.notFound:(e&&e.name==='SecurityError'?t.noBt:t.notFound);view();return}
 st.busy=true;view();
 const g={id:dev.id||String(Date.now()),name:dev.name||'Bluetooth',type:st.type,brand:st.brand||'',model:st.model||'',cad:st.cad};
 try{st.dev=dev;st.live=await connectDev(dev,g);st.pending=g;st.busy=false;st.step=4;view()}
 catch(e){st.busy=false;st.err=t.notFound;view()}}
async function reconnect(g){const t=L();st.err='';if(!navigator.bluetooth){st.err=t.noBt;view();return}
 let dev=null;try{if(navigator.bluetooth.getDevices){const ds=await navigator.bluetooth.getDevices();dev=ds.find(d=>d.id===g.id)||null}}catch(e){}
 if(!dev){try{dev=await navigator.bluetooth.requestDevice({filters:[{name:g.name}],optionalServices:OPT})}catch(e){st.err=t.notFound;view();return}}
 try{if(dev.id&&dev.id!==g.id){g.id=dev.id;saveG()}await connectDev(dev,g)}catch(e){st.err=t.notFound}view();syncDevs()}
ov.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const a=b.dataset.a,t=L();
 if(b.dataset.type){st.type=b.dataset.type;st.brand=null;st.model='';st.step=1;view();return}
 if(b.dataset.brand){st.brand=b.dataset.brand;st.model='';view();return}
 if(b.dataset.model){st.model=b.dataset.model;view();return}
 if(b.dataset.c){const g=G.find(x=>x.id===b.dataset.c),Lv=LIVE.get(b.dataset.c);if(Lv&&!Lv.lost){try{Lv.dev.gatt.disconnect()}catch(e){}Lv.lost=true;LIVE.delete(g.id);view();syncDevs()}else reconnect(g);return}
 if(b.dataset.arm){st.arm=st.arm===b.dataset.arm?null:b.dataset.arm;st.del=null;view();return}
  if(b.dataset.d){st.del=b.dataset.d;st.arm=null;st.edit=null;view();return}
 if(b.dataset.del){const id=b.dataset.del,Lv=LIVE.get(id);if(Lv){try{Lv.dev.gatt.disconnect()}catch(e){}LIVE.delete(id)}G=G.filter(x=>x.id!==id);saveG();st.del=null;view();syncDevs();return}
 if(b.dataset.e){st.edit=b.dataset.e;st.del=null;view();return}
 if(b.dataset.et){const g=G.find(x=>x.id===st.edit);if(g){g.type=b.dataset.et;view()}return}
 if(b.dataset.save){const g=G.find(x=>x.id===b.dataset.save);if(g){g.label=($('pwEN').value||'').trim();const c=$('pwEC');if(c)g.cad=c.checked;saveG()}st.edit=null;view();syncDevs();return}
 switch(a){
  case'back':if(st.step===5||st.step===0){close()}else if(st.step===4){st.step=3;view()}else{st.step--;st.err='';view()}break;
  case'new':open(0);break;
  case'cam':try{localStorage.setItem('strongninja_cam','1')}catch(e){}st.step=5;st.err=t.camOn;view();break;
  case'nobrand':st.brand='';st.step=3;view();break;
  case'next':if(st.step===1&&st.brand){st.step=2;view()}else if(st.step===2){st.step=3;view()}break;
  case'scan':scan(false);break;case'scanall':scan(true);break;
  case'add':{const g=st.pending;if(g){g.cad=st.cad;G=G.filter(x=>x.id!==g.id);G.push(g);saveG();try{const D=window.__snDev;if(D){D.asked=true;D.skip=false;localStorage.setItem('strongninja_dev',JSON.stringify(D))}}catch(e){}}st.step=5;st.err='';st.ok=L().saved;view();st.ok='';syncDevs();break}
  case'nodel':st.del=null;view();break;case'noedit':st.edit=null;view();break}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!ov.hidden)close()});
setInterval(()=>{if(ov.hidden)return;if(st.step===4){const box=ov.querySelector('.pwMets');if(box)box.outerHTML=metHtml(st.live,st.type)}else if(st.step===5&&!st.edit&&!st.del){ov.querySelectorAll('.pwGear').forEach((el,i)=>{const g=G[i],Lv=g&&LIVE.get(g.id),s=el.querySelector('.pwLiveTxt');if(s&&Lv)s.textContent=liveTxt(Lv,g.type)})}},700);
// ---------- Train-tab integratie ----------
const btn=$('btAdd');btn.addEventListener('click',e=>{e.stopImmediatePropagation();e.preventDefault();open()},true);
function syncDevs(){const box=$('devs');if(!box)return;const t=L();
 box.innerHTML=G.map(g=>{const Lv=LIVE.get(g.id),on=Lv&&!Lv.lost;const d=on?Lv.data:{};const mets=(METS[g.type]||[]).map(k=>`<div class="met"><b>${on&&d[k]!=null?(k==='pace'?fmtPace(d.pace):d[k]):'-'}</b><span>${t.m[k]}</span></div>`).join('');
  return `<div class="dev pwDev" data-g="${g.id}"><header><b>${g.label||g.name}</b><span class="mut">${on?t.connected:''}</span><button type="button" data-pwc="${g.id}">${on?t.disc:t.reconn}</button></header><div class="mets">${mets}</div></div>`}).join('');
 paintBtn()}
function paintBtn(){btn.textContent=L().btn+(G.length?' ('+G.length+')':'')}
function paintMine(){if(!ov.hidden&&st.step===5)view()}
$('devs')&&$('devs').addEventListener('click',e=>{const b=e.target.closest('[data-pwc]');if(!b)return;const g=G.find(x=>x.id===b.dataset.pwc),Lv=LIVE.get(g.id);if(Lv&&!Lv.lost){try{Lv.dev.gatt.disconnect()}catch(er){}LIVE.delete(g.id);syncDevs()}else reconnect(g).then(syncDevs)});
setInterval(()=>{if(G.length&&BT.connected()){document.querySelectorAll('.pwDev').forEach(el=>{const g=G.find(x=>x.id===el.dataset.g),Lv=g&&LIVE.get(g.id);if(!Lv||Lv.lost)return;const ms=el.querySelectorAll('.met b');(METS[g.type]||[]).forEach((k,i)=>{if(ms[i])ms[i].textContent=Lv.data[k]!=null?(k==='pace'?fmtPace(Lv.data.pace):Lv.data[k]):'-'})})}},1000);
const tt=$('trTitle');if(tt)new MutationObserver(()=>{paintBtn();syncDevs()}).observe(tt,{childList:true});
syncDevs();
(async()=>{try{if(!G.length||!navigator.bluetooth||!navigator.bluetooth.getDevices)return;const ds=await navigator.bluetooth.getDevices();for(const g of G){const d=ds.find(x=>x.id===g.id);if(!d)continue;try{await Promise.race([connectDev(d,g),new Promise((_,no)=>setTimeout(()=>no(),8000))]);syncDevs()}catch(e){LIVE.delete(g.id)}}}catch(e){}})();
})();
// Strong Ninja: begeleide training (vanzelf door: train, rust, volgende) met een mens die het voordoet
(()=>{
const $=id=>document.getElementById(id);const list=$('exList');if(!list)return;
const lang=()=>document.documentElement.lang==='en'?'en':'nl';
const TX={nl:{start:'▶ Start begeleide training',startI:'De app leidt je erdoor: trainen, rusten, volgende. Je hoeft niets aan te klikken.',ready:'Maak je klaar',rest:'Rust',next:'Volgende',set:'Set',of:'van',ex:'Oefening',reps:'herhalingen',sec:'seconden',perSide:'per kant',go:'Start!',done:'Training klaar!',doneI:'Super gedaan, ninja. Je XP is bijgeteld.',pause:'Pauze',resume:'Verder',skip:'Overslaan',stop:'Stoppen',sound:'Geluid',close:'Sluiten',half:'Wissel van kant',early:'Klaar',tip:'Kijk naar de ninja en doe hem na.'},
en:{start:'▶ Start guided workout',startI:'The app leads you through it: train, rest, next. No need to tap anything.',ready:'Get ready',rest:'Rest',next:'Next',set:'Set',of:'of',ex:'Exercise',reps:'reps',sec:'seconds',perSide:'per side',go:'Go!',done:'Workout done!',doneI:'Great job, ninja. Your XP has been added.',pause:'Pause',resume:'Resume',skip:'Skip',stop:'Stop',sound:'Sound',close:'Close',half:'Switch sides',early:'Done',tip:'Watch the ninja and copy it.'}};
const L=()=>TX[lang()];
// ---- poses: H hoofd, N schouders, P heup, E elleboog, W pols, K knie, F voet (2 = andere kant) ----
const ST={H:[100,26],N:[100,44],P:[100,86],E:[100,64],W:[100,84],K:[100,111],F:[100,135]};
const S=o=>Object.assign({},ST,o);
const PL=o=>Object.assign({F:[30,132],K:[60,124],P:[90,116],N:[140,104],H:[156,96],E:[140,118],W:[140,132]},o);
const SUP=o=>Object.assign({H:[44,123],N:[60,127],P:[104,130],K:[126,104],F:[148,132],E:[54,113],W:[44,110]},o);
const PRO=o=>Object.assign({F:[40,130],K:[66,131],P:[96,130],N:[140,128],H:[156,124],E:[150,131],W:[168,132]},o);
const P={
 'Squats':{a:S({E:[114,50],W:[130,48]}),b:S({P:[80,96],N:[94,56],H:[99,40],K:[112,106],E:[110,60],W:[128,58]})},
 'Push-ups':{a:PL({}),b:PL({P:[90,122],N:[140,121],H:[157,115],E:[123,117]})},
 'Plank':{a:PL({P:[90,117],N:[140,113],H:[157,107],E:[140,132],W:[166,132]}),hold:1},
 'Pike push-ups':{a:PL({F:[52,132],K:[70,106],P:[90,76],N:[124,110],H:[131,119],E:[128,121],W:[134,132]}),b:PL({F:[52,132],K:[70,106],P:[90,76],N:[127,121],H:[134,128],E:[116,119],W:[134,132]})},
 'Chair dips':{a:{H:[68,44],N:[66,61],P:[70,101],E:[64,79],W:[60,96],K:[110,103],F:[116,135]},b:{H:[72,63],N:[70,80],P:[72,119],E:[50,84],W:[60,96],K:[110,111],F:[116,135]},prop:'chair'},
 'Lunges':{a:S({K:[106,111],F:[108,135],K2:[96,111],F2:[94,135]}),b:S({P:[100,97],N:[100,54],H:[100,37],E:[100,74],W:[100,92],K:[124,102],F:[126,135],K2:[88,128],F2:[70,134]})},
 'Superman':{a:PRO({}),b:PRO({F:[38,118],K:[64,126],N:[140,121],H:[157,113],E:[160,116],W:[182,108]})},
 'Crunches':{a:SUP({}),b:SUP({H:[62,107],N:[72,115],E:[66,103],W:[58,103]})},
 'Leg raises':{a:SUP({K:[132,128],F:[160,131],E:[76,130],W:[94,131]}),b:SUP({K:[122,106],F:[130,74],E:[76,130],W:[94,131]})},
 'Bicycle crunch':{a:SUP({H:[60,109],N:[70,117],K:[120,104],F:[142,112],K2:[136,125],F2:[162,128],E:[66,103],W:[58,103]}),b:SUP({H:[60,109],N:[70,117],K2:[120,104],F2:[142,112],K:[136,125],F:[162,128],E:[66,103],W:[58,103]})},
 'Mountain climbers':{a:PL({K2:[110,118],F2:[96,130]}),b:PL({K:[110,118],F:[96,130],K2:[60,124],F2:[30,132]}),fast:1},
 'Russian twist':{a:{P:[100,128],N:[88,92],H:[84,76],K:[124,104],F:[148,116],E:[102,104],W:[116,100]},b:{P:[100,128],N:[88,92],H:[84,76],K:[124,104],F:[148,116],E:[90,112],W:[100,114]}},
 'Chin tucks':{a:S({H:[104,25]}),b:S({H:[95,27]})},
 'Lying neck curls':{a:SUP({E:[76,130],W:[94,131]}),b:SUP({H:[54,110],E:[76,130],W:[94,131]})},
 'Prone neck extensions':{a:PRO({H:[156,129]}),b:PRO({H:[158,115]})},
 'Side neck raises':{a:SUP({E:[76,130],W:[94,131]}),b:SUP({H:[52,112],E:[76,130],W:[94,131]})},
 'Wall posture hold':{a:S({H:[96,26],N:[95,44],P:[96,86]}),hold:1,prop:'wall'},
 'Tongue posture hold':{a:S({}),hold:1,prop:'mouth'},
 'Dead hang':{a:S({H:[104,30],N:[100,44],E:[92,26],W:[90,10],E2:[108,26],W2:[110,10],P:[100,86],K:[100,110],F:[101,133]}),b:S({H:[104,30],N:[100,44],E:[92,26],W:[90,10],E2:[108,26],W2:[110,10],P:[101,86],K:[102,110],F:[104,133]}),prop:'bar'},
 'Wall angels':{a:S({E:[80,46],W:[78,30],E2:[120,46],W2:[122,30]}),b:S({E:[80,30],W:[90,10],E2:[120,30],W2:[110,10]})},
 'Cobra stretch':{a:PRO({P:[96,129],N:[132,104],H:[144,90],E:[132,118],W:[134,131]}),b:PRO({P:[96,129],N:[133,100],H:[145,85],E:[133,116],W:[134,131]})},
 'Hip flexor stretch':{a:{P:[100,98],N:[98,58],H:[98,42],E:[100,78],W:[110,92],K:[124,105],F:[126,135],K2:[88,132],F2:[66,134]},b:{P:[103,100],N:[100,58],H:[100,42],E:[102,78],W:[112,92],K:[126,105],F:[126,135],K2:[88,132],F2:[66,134]}},
 'Jump rope':{a:S({E:[90,70],W:[82,86],E2:[110,70],W2:[118,86]}),b:S({H:[100,18],N:[100,36],P:[100,78],E:[90,62],W:[82,78],E2:[110,62],W2:[118,78],K:[100,103],F:[100,127]}),fast:1,prop:'rope'},
 'Calf raises':{a:S({}),b:S({H:[100,20],N:[100,38],P:[100,80],E:[100,58],W:[100,78],K:[100,105],F:[100,129]})}};
const GEN={a:S({K:[112,104],F:[104,128],K2:[98,111],F2:[98,135]}),b:S({K2:[112,104],F2:[104,128],K:[98,111],F:[98,135]})};
const lerp=(a,b,k)=>[a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k];
function pose(def,tm){const a=def.a,b=def.b||def.a,per=def.fast?0.9:2.6;let k=(1-Math.cos(tm/per*Math.PI*2))/2;if(def.hold)k=(1-Math.cos(tm/3*Math.PI*2))/2*0.06;const o={};
 for(const j of['H','N','P','E','W','K','F','E2','W2','K2','F2']){const A=a[j]||a[j[0]],B=b[j]||b[j[0]]||A;o[j]=lerp(A,def.hold?A:B,k)}if(def.hold){o.H=[o.H[0],o.H[1]-k*8];o.N=[o.N[0],o.N[1]-k*6]}return o}
function svgFig(o,prop){const l=(a,b,w,c)=>`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
 const far='#0a8597',near='#16c6dc',skin='#ffd9b8';let pr='';
 if(prop==='chair')pr=`<rect x="28" y="96" width="36" height="6" rx="2" fill="#6b7280"/><line x1="32" y1="102" x2="32" y2="135" stroke="#6b7280" stroke-width="4"/><line x1="60" y1="102" x2="60" y2="135" stroke="#6b7280" stroke-width="4"/>`;
 if(prop==='wall')pr=`<rect x="84" y="4" width="6" height="131" fill="#4b5563"/>`;
 if(prop==='bar')pr=`<line x1="60" y1="8" x2="140" y2="8" stroke="#9ca3af" stroke-width="5" stroke-linecap="round"/>`;
 if(prop==='rope')pr=`<path d="M${o.W[0]} ${o.W[1]} Q100 ${o.F[1]+14} ${o.W2[0]} ${o.W2[1]}" fill="none" stroke="#f59e0b" stroke-width="2.5"/>`;
 const mouth=prop==='mouth'?`<circle cx="${o.H[0]+4}" cy="${o.H[1]+4}" r="2.2" fill="#e5484d"/>`:'';
 return `<svg viewBox="0 0 200 145" class="gwFig" aria-hidden="true"><line x1="0" y1="136" x2="200" y2="136" stroke="rgba(255,255,255,.25)" stroke-width="2"/>${pr}
 ${l(o.P,o.K2,11,far)}${l(o.K2,o.F2,10,far)}${l(o.N,o.E2,9,far)}${l(o.E2,o.W2,8,far)}
 ${l(o.N,o.P,15,near)}${l(o.P,o.K,11,near)}${l(o.K,o.F,10,near)}${l(o.N,o.E,9,near)}${l(o.E,o.W,8,near)}
 <circle cx="${o.H[0]}" cy="${o.H[1]}" r="10" fill="${skin}"/><path d="M${o.H[0]-10} ${o.H[1]-2} q10 -8 20 0" stroke="#111" stroke-width="4" fill="none"/>${mouth}</svg>`}
// ---- plan maken uit de lijst op het scherm ----
function plan(){return[...list.querySelectorAll('.ex')].map((ex,i)=>{const nm=ex.querySelector('.nm').textContent.trim(),rp=ex.querySelector('.rp').textContent.trim();
 const m=rp.match(/^(\d+)\s*×\s*(.+)$/);const sets=m?+m[1]:3,tgt=m?m[2]:rp;const side=/\/\s*(been|kant|leg|side)/i.test(tgt);let secs=null,reps=null;
 const t=tgt.match(/(\d+)\s*(s|sec|min)/i);if(t)secs=+t[1]*(/min/i.test(t[2])?60:1);else{const r=tgt.match(/\d+/);reps=r?+r[0]:10}
 const def=P[nm]||GEN;const per=def.fast?1.2:2.8;const dur=secs?secs:Math.round(reps*per);return{i,nm,sets,secs,reps,side,dur:side?dur*2:dur,def}})}
// ---- speler ----
let G=null,raf=0,tick=0,sound=true;
const say=txt=>{if(!sound||!window.speechSynthesis)return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(txt);u.lang=lang()==='en'?'en-GB':'nl-BE';u.rate=1.05;speechSynthesis.speak(u)}catch(e){}};
const beep=(f=880,d=.12)=>{if(!sound)return;try{const A=beep.ac||(beep.ac=new(window.AudioContext||window.webkitAudioContext)());const o=A.createOscillator(),g=A.createGain();o.frequency.value=f;g.gain.value=.08;o.connect(g);g.connect(A.destination);o.start();o.stop(A.currentTime+d)}catch(e){}};
const ov=document.createElement('div');ov.className='gw';ov.hidden=true;ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');document.body.appendChild(ov);
const steps=p=>{const s=[{k:'ready',d:8,x:0}];p.forEach((e,xi)=>{for(let j=0;j<e.sets;j++){s.push({k:'work',d:e.dur,x:xi,j});const last=j===e.sets-1&&xi===p.length-1;if(!last)s.push({k:'rest',d:j===e.sets-1?45:30,x:j===e.sets-1?xi+1:xi,j:j===e.sets-1?0:j+1,after:xi})}});return s};
function start(){const p=plan();if(!p.length)return;G={p,s:steps(p),i:0,left:0,paused:false,t0:performance.now()};G.left=G.s[0].d;ov.hidden=false;document.body.classList.add('pwLock');enter();loop()}
function enter(){const st=G.s[G.i],e=G.p[st.x],t=L();G.left=st.d;G.said={};
 if(st.k==='ready')say(t.ready+'. '+e.nm);else if(st.k==='work'){beep(1046,.2);say(t.go+' '+e.nm+(e.reps?', '+e.reps+' '+t.reps:''))}else say(t.rest+'. '+t.next+': '+e.nm);render()}
function markSet(x,j){const ex=list.querySelectorAll('.ex')[x];const b=ex&&ex.querySelectorAll('.set')[j];if(b&&!b.classList.contains('on')){b.click();const s=$('tStop');if(s)s.click()}}
function advance(){const st=G.s[G.i];if(st.k==='work')markSet(st.x,st.j);G.i++;if(G.i>=G.s.length){finish();return}enter()}
function finish(){const t=L();cancelAnimationFrame(raf);say(t.done);const f=$('finish');if(f)f.click();ov.innerHTML=`<div class="gwIn"><div class="gwDone"><div class="gwBig">🥋</div><h2>${t.done}</h2><p>${t.doneI}</p><button type="button" class="pwBig" data-a="close">${t.close}</button></div></div>`;G=null}
function close(){cancelAnimationFrame(raf);try{speechSynthesis.cancel()}catch(e){}ov.hidden=true;G=null;if(![...document.querySelectorAll('.rOv,.pw')].some(x=>!x.hidden))document.body.classList.remove('pwLock')}
function render(){const t=L(),st=G.s[G.i],e=G.p[st.x],nx=G.s.slice(G.i+1).find(s=>s.k==='work');const ne=nx&&G.p[nx.x];
 const tgt=e.secs?`${e.secs} ${t.sec}`:`${e.reps} ${t.reps}`;const lbl=st.k==='ready'?t.ready:st.k==='rest'?t.rest:e.nm;
 ov.innerHTML=`<div class="gwIn ${st.k}"><div class="gwTop"><button type="button" class="pwIco" data-a="close" aria-label="${t.stop}">✕</button><div class="gwProg"><i style="width:${G.i/(G.s.length-1)*100}%"></i></div><button type="button" class="pwIco" data-a="snd" aria-label="${t.sound}">${sound?'🔊':'🔇'}</button></div>
 <p class="gwMeta">${t.ex} ${st.x+1} ${t.of} ${G.p.length} · ${t.set} ${(st.j||0)+1} ${t.of} ${e.sets}</p>
 <h2 class="gwName">${lbl}</h2>${st.k!=='work'?`<p class="gwSub">${st.k==='rest'?t.next+': ':''}<b>${e.nm}</b> · ${tgt}${e.side?' '+t.perSide:''}</p>`:`<p class="gwSub">${tgt}${e.side?' '+t.perSide:''} · ${t.tip}</p>`}
 <div class="gwStage" id="gwStage"></div>
 <div class="gwTime"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" class="bg"/><circle cx="60" cy="60" r="52" class="fg" id="gwRing" stroke-dasharray="327" stroke-dashoffset="0"/></svg><b id="gwNum">${Math.ceil(G.left)}</b></div>
 ${st.k==='work'&&e.reps?`<p class="gwRep" id="gwRep"></p>`:''}
 <div class="gwBtns"><button type="button" class="pwSm alt" data-a="pause">${G.paused?t.resume:t.pause}</button><button type="button" class="pwSm alt" data-a="skip">${st.k==='work'&&e.reps?t.early:t.skip} ⏭</button></div>
 ${ne&&st.k==='work'?`<p class="gwNext">${t.next}: ${ne.nm}</p>`:''}</div>`}
function loop(){let last=performance.now();const fr=now=>{if(!G)return;const dt=(now-last)/1000;last=now;const st=G.s[G.i],e=G.p[st.x],t=L();
 if(!G.paused){G.left-=dt;tick+=dt;const L2=Math.ceil(G.left);
  if(L2<=3&&L2>=1&&!G.said[L2]){G.said[L2]=1;beep(660);if(st.k!=='work'||e.secs)say(String(L2))}
  if(st.k==='work'&&e.side&&!G.said.half&&G.left<=st.d/2){G.said.half=1;say(t.half);beep(523,.25)}
  if(G.left<=0){advance();raf=requestAnimationFrame(fr);return}}
 const stg=$('gwStage');if(stg){const def=e.def;stg.innerHTML=svgFig(pose(def,G.paused?0:tick),def.prop)}
 const n=$('gwNum');if(n)n.textContent=Math.max(0,Math.ceil(G.left));const r=$('gwRing');if(r)r.setAttribute('stroke-dashoffset',String(327*(1-Math.max(0,G.left)/st.d)));
 const rp=$('gwRep');if(rp&&e.reps){const done=Math.min(e.reps*(e.side?2:1),Math.floor((st.d-G.left)/(st.d/(e.reps*(e.side?2:1)))));rp.textContent=done+' / '+e.reps*(e.side?2:1)}
 raf=requestAnimationFrame(fr)};raf=requestAnimationFrame(fr)}
ov.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a;
 if(a==='close')close();else if(a==='snd'){sound=!sound;if(!sound)try{speechSynthesis.cancel()}catch(er){}b.textContent=sound?'🔊':'🔇'}
 else if(a==='pause'&&G){G.paused=!G.paused;render()}else if(a==='skip'&&G){advance()}});
document.addEventListener('keydown',e=>{if(!ov.hidden&&e.key==='Escape')close()});
// startknop boven de oefeningen
const box=document.createElement('div');box.className='gwStart';box.innerHTML='<button type="button" class="btn" id="gwGo"></button><p class="mut" id="gwGoI"></p>';list.parentNode.insertBefore(box,list);
const paint=()=>{$('gwGo').textContent=L().start;$('gwGoI').textContent=L().startI};paint();$('gwGo').addEventListener('click',start);
const tt=$('trTitle');if(tt)new MutationObserver(paint).observe(tt,{childList:true});
window.SN_GW={start,poses:P,svgFig,pose};
})();
// Strong Ninja: login (e-mail + wachtwoord, akkoord-mail NL/EN via EmailJS), cloud-opslag, admin met zwarte band en tellers
(()=>{
const CFG=window.SN_FB||{apiKey:'AIzaSyBGBJzwefThGpgKVo867iM_RhysXBV5qZ0',authDomain:'strong-ninja.firebaseapp.com',projectId:'strong-ninja',storageBucket:'strong-ninja.firebasestorage.app',messagingSenderId:'513382608879',appId:'1:513382608879:web:9b4e6576e2f825b239901a'};
// EmailJS (gratis maildienst) voor de "Ik ga akkoord"-mail. Leeg = valt terug op de Firebase-inloglink.
const MAIL=window.SN_MAIL||{publicKey:'cAGjHaZpuYxclikSa',service:'service_ig5pxaf',template:'template_y1hpj3h'};
const useEJS=!/^__/.test(MAIL.publicKey);
if(/^__/.test(CFG.apiKey))return;
document.body.classList.add('snWait');const unwait=()=>document.body.classList.remove('snWait');setTimeout(unwait,7000);
const ADMIN='seppgielen@gmail.com';
const norm=e=>{e=String(e||'').trim().toLowerCase();const i=e.lastIndexOf('@');if(i<1)return e;let u=e.slice(0,i),d=e.slice(i+1);if(d==='gmail.com'||d==='googlemail.com'){u=u.split('+')[0].replace(/\./g,'');d='gmail.com'}return u+'@'+d};
const V='https://www.gstatic.com/firebasejs/10.14.1/';
const lang=()=>document.documentElement.lang==='en'?'en':'nl';
const TX={nl:{login:'Inloggen',signup:'Account maken',email:'E-mailadres',pw:'Wachtwoord',pw2:'Herhaal wachtwoord',age:'Ik ben 13 jaar of ouder, of een ouder gaf toestemming.',go:'Inloggen',make:'Account maken',forgot:'Wachtwoord vergeten?',again:'Mail opnieuw sturen',resetSent:'Mail verstuurd om je wachtwoord te resetten.',out:'Uitloggen',sureOut:'Uitloggen? Je voortgang blijft online bewaard.',yes:'Ja',no:'Nee',cancel:'Annuleren',
 accounts:'spelers met account',online:'online',admin:'Admin',intro:'Log in om je voortgang online te bewaren, op elke gsm.',
 waitH:'Ga je akkoord?',waitP:'We stuurden een mail naar {e}. Tik in de mail op "Ik ga akkoord", of typ hieronder de code uit de mail. Kijk ook in je spam.',sentAgain:'Nieuwe mail gestuurd naar {e}.',wait30:'Wacht nog {s} seconden en probeer opnieuw.',
 apH:'Inloggen bij Strong Ninja',apP:'Iemand wil inloggen of een account maken met {e}. Was jij dat?',apOk:'Ik ga akkoord',apNo:'Nee, dat was ik niet',apDone:'Gelukt! Je bent akkoord. Ga terug naar het scherm waar je inlogde: je gaat daar vanzelf verder.',apNoDone:'Oké, er gebeurt niets. Niemand kan inloggen zonder jouw akkoord.',apBad:'Deze link werkt niet (meer). Log opnieuw in om een nieuwe mail te krijgen.',home:'Naar de app',
 e:{'auth/invalid-email':'Dat e-mailadres klopt niet.','auth/missing-password':'Vul een wachtwoord in.','auth/weak-password':'Kies een wachtwoord van minstens 8 tekens.','auth/email-already-in-use':'Er bestaat al een account met dit e-mailadres. Log in.','auth/invalid-credential':'E-mail of wachtwoord klopt niet. Nog geen account? Kies Account maken.','auth/wrong-password':'E-mail of wachtwoord klopt niet.','auth/user-not-found':'E-mail of wachtwoord klopt niet.','auth/too-many-requests':'Te veel pogingen. Wacht even.','auth/network-request-failed':'Geen internet.',match:'De wachtwoorden zijn niet gelijk.',short:'Kies een wachtwoord van minstens 8 tekens.',ageReq:'Vink het vakje aan.',mail:'De mail kon niet verstuurd worden. Probeer opnieuw.','auth/operation-not-allowed':'Inloggen met Google staat nog niet aan.','auth/unauthorized-domain':'Inloggen met Google werkt hier niet. Open de app in een eigen tabblad.',other:'Er ging iets mis. Probeer opnieuw.'},
 google:'Verder met Google',or:'of met e-mail',gNote:'Met Google ga je akkoord dat je 13 jaar of ouder bent, of dat een ouder toestemming gaf.',soft:'📧 Bevestig je e-mail: tik in de mail op "Ik ga akkoord" of typ hier de code. Nog {d}.',codePh:'Code uit mail',codeGo:'Bevestig',codeBad:'Code klopt niet',later:'Nog geen mail ontvangen? Later bevestigen',days:'dagen',day:'dag',softAgain:'Mail opnieuw',softOk:'Top, je e-mail is bevestigd!'},
en:{login:'Log in',signup:'Create account',email:'Email',pw:'Password',pw2:'Repeat password',age:'I am 13 or older, or a parent gave permission.',go:'Log in',make:'Create account',forgot:'Forgot password?',again:'Send email again',resetSent:'Email sent to reset your password.',out:'Log out',sureOut:'Log out? Your progress stays saved online.',yes:'Yes',no:'No',cancel:'Cancel',
 accounts:'players with an account',online:'online',admin:'Admin',intro:'Log in to save your progress online, on any phone.',
 waitH:'Do you agree?',waitP:'We sent an email to {e}. Tap "I agree" in the email, or type the code from the email below. Also check your spam.',sentAgain:'New email sent to {e}.',wait30:'Wait {s} seconds and try again.',
 apH:'Log in to Strong Ninja',apP:'Someone wants to log in or create an account with {e}. Was that you?',apOk:'I agree',apNo:'No, that was not me',apDone:'Done! You agreed. Go back to the screen where you logged in: it continues by itself.',apNoDone:'Okay, nothing happens. Nobody can log in without your agreement.',apBad:'This link does not work (anymore). Log in again to get a new email.',home:'Go to the app',
 e:{'auth/invalid-email':'That email is not valid.','auth/missing-password':'Enter a password.','auth/weak-password':'Pick a password of at least 8 characters.','auth/email-already-in-use':'An account with this email already exists. Log in.','auth/invalid-credential':'Email or password is wrong. No account yet? Pick Create account.','auth/wrong-password':'Email or password is wrong.','auth/user-not-found':'Email or password is wrong.','auth/too-many-requests':'Too many tries. Wait a bit.','auth/network-request-failed':'No internet.',match:'The passwords do not match.',short:'Pick a password of at least 8 characters.',ageReq:'Tick the box.',mail:'The email could not be sent. Try again.',other:'Something went wrong. Try again.','auth/operation-not-allowed':'Google sign-in is not turned on yet.','auth/unauthorized-domain':'Google sign-in does not work here. Open the app in its own tab.'},
 google:'Continue with Google',or:'or with email',gNote:'With Google you confirm you are 13 or older, or a parent gave permission.',soft:'📧 Confirm your email: tap "I agree" in the email or type the code here. {d} left.',codePh:'Code from email',codeGo:'Confirm',codeBad:'Wrong code',later:'No email yet? Confirm later',days:'days',day:'day',softAgain:'Send again',softOk:'Great, your email is confirmed!'}};
const t=k=>TX[lang()][k];const errTxt=c=>TX[lang()].e[c]||TX[lang()].e.other;
let A,F,auth,db,user=null,mode='login',msg='',err='',busy=false,last='',timer=null,pres=null,cnt=null,waitTok='',waitUnsub=null,lastSend=0,apTok='',apState='';
const $=id=>document.getElementById(id);
const TK=e=>'sn_trust_'+norm(e);const trusted=e=>{try{return localStorage.getItem(TK(e))==='1'}catch(x){return false}};const trust=(e,on)=>{try{on?localStorage.setItem(TK(e),'1'):localStorage.removeItem(TK(e))}catch(x){}};
const keys=()=>{const o={};try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.startsWith('strongninja'))o[k]=localStorage.getItem(k)}}catch(e){}return o};
const ov=document.createElement('div');ov.className='snAuth';ov.hidden=true;ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');document.body.appendChild(ov);
const pill=document.createElement('div');pill.className='snAuthPill';pill.hidden=true;
const esc=s=>String(s||'').replace(/[<&>"]/g,c=>({'<':'&lt;','&':'&amp;','>':'&gt;','"':'&quot;'}[c]));
function belt(){return `<svg viewBox="0 0 120 40" width="72" height="24" aria-hidden="true"><rect x="0" y="13" width="120" height="14" rx="3" fill="#111"/><path d="M50 8 L70 32 M70 8 L50 32" stroke="#111" stroke-width="9" stroke-linecap="round"/><rect x="52" y="10" width="16" height="20" rx="4" fill="#1b1b1b" stroke="#d4af37" stroke-width="2"/>${[8,22,36].map(x=>`<path d="M${x} 15 l7 5 l-7 5" fill="none" stroke="#d4af37" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}${[112,98,84].map(x=>`<path d="M${x} 15 l-7 5 l7 5" fill="none" stroke="#d4af37" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}</svg>`}
const logo=()=>window.SN_IMG&&window.SN_IMG.wm?`<img class="snAuthLogo" src="${window.SN_IMG.wm}" alt="Strong Ninja">`:'<h1>STRONG NINJA</h1>';
function view(){const img=logo(),E=err?`<p class="snAuthErr" role="alert">${esc(err)}</p>`:'',M=msg?`<p class="snAuthOk">${esc(msg)}</p>`:'';
 if(apTok){const body=apState==='ok'?`<p class="snAuthOk">${t('apDone')}</p><button type="button" class="pwLink" data-a="home">${t('home')}</button>`:apState==='no'?`<p>${t('apNoDone')}</p><button type="button" class="pwLink" data-a="home">${t('home')}</button>`:apState==='bad'?`<p class="snAuthErr">${t('apBad')}</p><button type="button" class="pwLink" data-a="home">${t('home')}</button>`:
   `<p>${esc(t('apP').replace('{e}',apState||'…'))}</p>${E}<button type="button" class="pwBig" data-a="apok" ${busy?'disabled':''}>✓ ${t('apOk')}</button><button type="button" class="pwLink" data-a="apno">${t('apNo')}</button>`;
  ov.innerHTML=`<div class="snAuthIn">${img}<div class="snAuthCard"><h2>${t('apH')}</h2>${body}</div></div>`;return}
 if(user&&waitTok){ov.innerHTML=`<div class="snAuthIn">${img}<div class="snAuthCard"><h2>${t('waitH')}</h2><p>${esc(t('waitP').replace('{e}',user.email))}</p><div class="snSpin" aria-hidden="true"></div>${E}${M}<form id="snCodeF" class="snCodeF"><input id="aC" inputmode="numeric" maxlength="6" placeholder="${t('codePh')}" aria-label="${t('codePh')}"><button type="submit" class="pwSm" ${busy?'disabled':''}>${t('codeGo')}</button></form><button type="button" class="pwBig" data-a="resend" ${busy?'disabled':''}>${t('again')}</button>${(+LS.g(kk('later',user.email))||0)<3?`<button type="button" class="pwLink" data-a="later">${t('later')}</button>`:''}<button type="button" class="pwLink" data-a="out">${t('cancel')}</button></div></div>`;
  const cf=$('snCodeF');if(cf)cf.addEventListener('submit',async e=>{e.preventDefault();const v=($('aC')||{}).value||'';busy=true;err='';view();const ok=await tryCode(user,v);busy=false;if(!ok){err=t('codeBad');view()}});return}
 const su=mode==='signup';
 ov.innerHTML=`<div class="snAuthIn">${img}<p class="snAuthIntro">${t('intro')}</p><div class="snAuthCard"><div class="snAuthTabs" role="tablist"><button type="button" role="tab" aria-selected="${!su}" data-m="login">${t('login')}</button><button type="button" role="tab" aria-selected="${su}" data-m="signup">${t('signup')}</button></div>
 <button type="button" class="snGoogle" data-a="google" ${busy?'disabled':''}><svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg> ${t('google')}</button><p class="snGNote">${t('gNote')}</p><div class="snOr"><span>${t('or')}</span></div>
 <form id="snAuthF" novalidate><label>${t('email')}<input id="aE" type="email" autocomplete="email" inputmode="email" required></label><label>${t('pw')}<input id="aP" type="password" autocomplete="${su?'new-password':'current-password'}" minlength="8" required></label>
 ${su?`<label>${t('pw2')}<input id="aP2" type="password" autocomplete="new-password" minlength="8" required></label><label class="snAuthChk"><input id="aAge" type="checkbox"> ${t('age')}</label>`:''}
 ${E}${M}<button type="submit" class="pwBig" ${busy?'disabled':''}>${su?t('make'):t('go')}</button>${su?'':`<button type="button" class="pwLink" data-a="forgot">${t('forgot')}</button>`}</form></div></div>`;
 $('snAuthF').addEventListener('submit',submit)}
function show(){unwait();ov.hidden=false;document.body.classList.add('pwLock');view()}
function hide(){unwait();ov.hidden=true;if(![...document.querySelectorAll('.rOv,.pw,.gw,.hc,.snNewOv,.snIntro')].some(x=>!x.hidden))document.body.classList.remove('pwLock')}
async function submit(e){e.preventDefault();err='';msg='';const em=norm($('aE').value),pw=$('aP').value;
 if(mode==='signup'){if(pw.length<8){err=TX[lang()].e.short;view();return}if(pw!==$('aP2').value){err=TX[lang()].e.match;view();return}if(!$('aAge').checked){err=TX[lang()].e.ageReq;view();return}}
 busy=true;view();$('aE').value=em;
 try{if(mode==='signup'){const c=await A.createUserWithEmailAndPassword(auth,em,pw);try{await F.setDoc(F.doc(db,'accounts',c.user.uid),{t:F.serverTimestamp()})}catch(x){}}
  else await A.signInWithEmailAndPassword(auth,em,pw)}catch(x){err=errTxt(x.code)}busy=false;if(!ov.hidden)view()}
// ---- akkoord-mail ----
const rndTok=()=>{const a=new Uint8Array(24);crypto.getRandomValues(a);return [...a].map(b=>b.toString(16).padStart(2,'0')).join('')};
let ejs=null;const loadEJS=()=>ejs?Promise.resolve(ejs):new Promise((ok,no)=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';s.onload=()=>{ejs=window.emailjs;ejs.init({publicKey:MAIL.publicKey});ok(ejs)};s.onerror=no;document.head.appendChild(s)});
async function sendApproval(u){const tok=rndTok(),code=String(Math.floor(100000+Math.random()*900000));await F.setDoc(F.doc(db,'approvals',tok),{uid:u.uid,email:u.email,ok:false,ch:await sha(tok+code),t:F.serverTimestamp()});
 const link=location.origin+location.pathname+'?akkoord='+tok;
 let sent=false;if(useEJS){try{await loadEJS();await ejs.send(MAIL.service,MAIL.template,{to_email:u.email,link,code,email:u.email,time:new Date().toLocaleString('nl-BE',{hour12:false})});sent=true}catch(x){console.warn('emailjs',x)}}
 if(!sent){await A.sendSignInLinkToEmail(auth,u.email,{url:link,handleCodeInApp:true})}
 lastSend=Date.now();return tok}
const sha=async x=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(x)))].map(b=>b.toString(16).padStart(2,'0')).join('');
async function tryCode(u,code){code=String(code||'').replace(/\D/g,'');const tk=LS.g(kk('tok',u.email))||(waitTok!=='x'?waitTok:'');if(!tk||code.length!==6)return false;try{const s=await F.getDoc(F.doc(db,'approvals',tk));if(!s.exists()||s.data().ch!==await sha(tk+code))return false;await F.updateDoc(F.doc(db,'approvals',tk),{ok:true,okAt:F.serverTimestamp()});return true}catch(x){return false}}
const GRACE=3*864e5;const kk=(p,e)=>'sn_'+p+'_'+norm(e);
const LS={g:k=>{try{return localStorage.getItem(k)}catch(x){return null}},s:(k,v)=>{try{v==null?localStorage.removeItem(k):localStorage.setItem(k,v)}catch(x){}}};
const isSoft=e=>LS.g(kk('soft',e))==='1';const setSoft=(e,on)=>LS.s(kk('soft',e),on?'1':null);
const firstSeen=e=>{let f=+LS.g(kk('first',e));if(!f){f=Date.now();LS.s(kk('first',e),String(f))}return f};
async function approvedTok(e){const tk=LS.g(kk('tok',e));if(!tk)return false;try{const s=await F.getDoc(F.doc(db,'approvals',tk));return s.exists()&&s.data().ok===true}catch(x){return false}}
let softUn=null;function softWatch(u,tok){if(softUn)softUn();softUn=F.onSnapshot(F.doc(db,'approvals',tok),s=>{if(s.exists()&&s.data().ok===true&&user&&user.uid===u.uid){setSoft(u.email,false);softUn&&softUn();softUn=null;softUI(u,true)}},()=>{})}
async function bgMail(u,force){let tk=LS.g(kk('tok',u.email));if(!tk||force){try{tk=await sendApproval(u);LS.s(kk('tok',u.email),tk)}catch(x){console.warn(x);return false}}softWatch(u,tk);return true}
const sb=document.createElement('div');sb.className='snSoft';sb.hidden=true;document.body.appendChild(sb);
function softUI(u,done){if(done){sb.hidden=false;sb.innerHTML=`<span>${t('softOk')}</span>`;setTimeout(()=>{sb.hidden=true},4000);return}
 if(!u||!isSoft(u.email)||sessionStorage.getItem('sn_softx')){sb.hidden=true;return}const d=Math.max(1,Math.ceil((GRACE-(Date.now()-firstSeen(u.email)))/864e5));
 sb.hidden=false;sb.innerHTML=`<span>${esc(t('soft').replace('{d}',d+' '+(d===1?t('day'):t('days'))))}</span><input class="snSoftC" inputmode="numeric" maxlength="6" placeholder="${t('codePh')}" aria-label="${t('codePh')}"><button type="button" data-s="code">${t('codeGo')}</button><button type="button" class="alt" data-s="again">${t('softAgain')}</button><button type="button" data-s="x" aria-label="${t('cancel')}">✕</button>`}
sb.addEventListener('click',async e=>{const b=e.target.closest('button');if(!b||!user)return;if(b.dataset.s==='x'){try{sessionStorage.setItem('sn_softx','1')}catch(x){}sb.hidden=true;return}
 if(b.dataset.s==='code'){const inp=sb.querySelector('.snSoftC');b.disabled=true;const ok=await tryCode(user,inp&&inp.value);b.disabled=false;if(ok){setSoft(user.email,false);trust(user.email,true);softUI(user,true)}else{if(inp){inp.value='';inp.placeholder=t('codeBad');inp.classList.add('bad')}}return}
 if(b.dataset.s==='again'){if(Date.now()-lastSend<30000)return;b.disabled=true;await bgMail(user,true);b.textContent='✓';setTimeout(()=>{b.disabled=false;b.textContent=t('softAgain')},4000)}});
function listen(tok){if(waitUnsub)waitUnsub();waitTok=tok;waitUnsub=F.onSnapshot(F.doc(db,'approvals',tok),s=>{if(s.exists()&&s.data().ok===true&&user){trust(user.email,true);waitUnsub&&waitUnsub();waitUnsub=null;waitTok='';onUser(user)}},()=>{})}
// ---- knoppen ----
ov.addEventListener('click',async e=>{const b=e.target.closest('button');if(!b)return;
 if(b.dataset.m){mode=b.dataset.m;err='';msg='';view();return}
 const a=b.dataset.a;if(!a)return;err='';msg='';
 if(a==='forgot'){const em=($('aE')||{}).value;if(!em){err=TX[lang()].e['auth/invalid-email'];view();return}try{await A.sendPasswordResetEmail(auth,norm(em));msg=t('resetSent')}catch(x){err=errTxt(x.code)}view()}
 if(a==='resend'&&user){const left=Math.ceil((lastSend+30000-Date.now())/1000);if(left>0){err=t('wait30').replace('{s}',left);view();return}busy=true;view();try{const tok=await sendApproval(user);listen(tok);msg=t('sentAgain').replace('{e}',user.email)}catch(x){console.warn(x);err=TX[lang()].e.mail}busy=false;view()}
 if(a==='out'){if(waitUnsub){waitUnsub();waitUnsub=null}waitTok='';if(user&&trusted(user.email)){try{await F.setDoc(F.doc(db,'presence',user.uid),{t:F.Timestamp.fromMillis(Date.now()-600000)})}catch(x){}}await A.signOut(auth)}
 if(a==='apok'){busy=true;view();try{await F.updateDoc(F.doc(db,'approvals',apTok),{ok:true,okAt:F.serverTimestamp()});apState='ok'}catch(x){apState='bad'}busy=false;view()}
 if(a==='apno'){apState='no';view()}
 if(a==='later'&&user){const n=+LS.g(kk('later',user.email))||0;if(n<3){LS.s(kk('later',user.email),String(n+1));LS.s(kk('first',user.email),String(Date.now()-GRACE+864e5));if(waitUnsub){waitUnsub();waitUnsub=null}waitTok='';onUser(user)}return}
 if(a==='google'){busy=true;view();try{const p=new A.GoogleAuthProvider();p.setCustomParameters({prompt:'select_account'});try{await A.signInWithPopup(auth,p)}catch(x){if(x.code==='auth/popup-blocked'||x.code==='auth/operation-not-supported-in-this-environment'){await A.signInWithRedirect(auth,p);return}throw x}}catch(x){err=(x.code==='auth/popup-closed-by-user'||x.code==='auth/cancelled-popup-request')?'':errTxt(x.code)}busy=false;if(!ov.hidden)view();return}
 if(a==='home'){apTok='';apState='';history.replaceState(null,'',location.pathname);onUser(auth.currentUser)}});
// ---- header: naam, uitloggen, admin-band en tellers ----
const isAdmin=()=>!!(user&&norm(user.email)===ADMIN&&trusted(user.email));
function paintPill(){if(!user||waitTok||!trusted(user.email)){pill.hidden=true;return}pill.hidden=false;const adm=isAdmin();
 pill.innerHTML=`${adm?`<span class="snAdm" title="${t('admin')}">${belt()}</span><span class="snCnt" title="${t('accounts')} / ${t('online')}"><b id="snCA">${cnt?cnt.a:'…'}</b> <span class="snCL">${t('accounts')}</span> · <i class="dot"></i><b id="snCO">${cnt?cnt.o:'…'}</b> <span class="snCL">${t('online')}</span></span>`:''}<button type="button" class="snMe" data-a="me">${window.SN_PROF?SN_PROF.chip():esc(user.email.split('@')[0])}</button>`;
 const lg=document.getElementById('lang');if(lg&&!pill.isConnected)lg.parentNode.insertBefore(pill,lg)}
pill.addEventListener('click',e=>{const b=e.target.closest('[data-a="me"]');if(!b)return;if(window.SN_PROF&&SN_PROF.ok()){SN_PROF.open();return}if(pill.querySelector('.snOutAsk'))return;const d=document.createElement('span');d.className='snOutAsk';d.innerHTML=`${t('sureOut')} <button type="button" data-o="y">${t('yes')}</button><button type="button" data-o="n">${t('no')}</button>`;pill.appendChild(d)});
pill.addEventListener('click',async e=>{const b=e.target.closest('[data-o]');if(!b)return;if(b.dataset.o==='y'){await push();if(user){try{await F.setDoc(F.doc(db,'presence',user.uid),{t:F.Timestamp.fromMillis(Date.now()-600000)})}catch(x){}trust(user.email,false)}await A.signOut(auth)}else paintPill()});
let cUn=null,pDocs=[];function paintCnt(){if(!cnt)return;const A1=$('snCA'),O1=$('snCO');if(A1)A1.textContent=cnt.a;if(O1)O1.textContent=cnt.o}
function recount(){if(!cnt)cnt={a:0,o:0};const lim=Date.now()-2*60*1000;cnt.o=pDocs.filter(t=>t&&t.toMillis&&t.toMillis()>lim).length;paintCnt()}
async function counts(){if(!isAdmin()){if(cUn){cUn.forEach(f=>f());cUn=null}return}
 if(!cUn){try{cUn=[F.onSnapshot(F.collection(db,'accounts'),s=>{cnt=cnt||{a:0,o:0};cnt.a=s.size;paintCnt()},x=>console.warn('tellers',x)),
  F.onSnapshot(F.collection(db,'presence'),s=>{pDocs=s.docs.map(d=>d.data().t);recount()},x=>console.warn('tellers',x))];setInterval(recount,15000)}catch(x){console.warn('tellers',x)}}
 recount()}
async function beat(){if(!user||!trusted(user.email))return;try{await F.setDoc(F.doc(db,'presence',user.uid),{t:F.serverTimestamp()},{merge:true})}catch(x){}}
// ---- opslag ----
async function push(){if(!user||!trusted(user.email))return;const d=keys(),j=JSON.stringify(d);if(j===last)return;last=j;try{await F.setDoc(F.doc(db,'users',user.uid),{data:d,t:Date.now()})}catch(x){last=''}}
async function onUser(u){user=u;clearInterval(timer);clearInterval(pres);
 if(apTok){show();return}
 if(!u){cnt=null;waitTok='';sb.hidden=true;paintPill();show();return}
 if(u.emailVerified){trust(u.email,true);setSoft(u.email,false)}
 if(!trusted(u.email)||isSoft(u.email)){
  if(await approvedTok(u.email)){trust(u.email,true);setSoft(u.email,false)}
  else if(GRACE-(Date.now()-firstSeen(u.email))>0){trust(u.email,true);setSoft(u.email,true);bgMail(u)}
  else{trust(u.email,false);setSoft(u.email,false);
   if(!waitTok){show();busy=true;view();try{const tok=await sendApproval(u);LS.s(kk('tok',u.email),tok);listen(tok)}catch(x){console.warn(x);err=TX[lang()].e.mail;waitTok='x'}busy=false}show();return}}
 softUI(u);
 waitTok='';hide();paintPill();
 try{await F.setDoc(F.doc(db,'accounts',u.uid),{t:F.serverTimestamp()},{merge:true})}catch(x){}
 let snap=null;try{snap=await F.getDoc(F.doc(db,'users',u.uid))}catch(x){}
 const local=keys(),cloud=snap&&snap.exists()?(snap.data().data||{}):null;let lt=0;try{lt=+localStorage.getItem('sn_local_t')||0}catch(x){}
 if(cloud&&Object.keys(cloud).length&&JSON.stringify(cloud)!==JSON.stringify(local)&&(!local.strongninja||(snap.data().t||0)>lt)&&!sessionStorage.getItem('sn_restored')){
  try{Object.keys(local).forEach(k=>localStorage.removeItem(k));for(const k in cloud)localStorage.setItem(k,cloud[k]);localStorage.setItem('sn_local_t',String(snap.data().t||Date.now()));sessionStorage.setItem('sn_restored','1')}catch(x){}location.reload();return}
 last='';await push();
 timer=setInterval(()=>{const j=JSON.stringify(keys());if(j!==last){try{localStorage.setItem('sn_local_t',String(Date.now()))}catch(x){}push()}},5000);
 beat();counts();pres=setInterval(()=>{beat();counts()},30000)}
document.addEventListener('visibilitychange',()=>{if(document.hidden)push();else{beat();counts()}});
addEventListener('pagehide',()=>{if(user&&trusted(user.email)&&F){try{F.setDoc(F.doc(db,'presence',user.uid),{t:F.Timestamp.fromMillis(Date.now()-10*60*1000)})}catch(x){}}});
new MutationObserver(()=>{if(!ov.hidden)view();paintPill()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
(async()=>{try{const app=(await import(V+'firebase-app.js')).initializeApp(CFG);A=await import(V+'firebase-auth.js');F=await import(V+'firebase-firestore.js');auth=A.getAuth(app);try{await A.setPersistence(auth,A.indexedDBLocalPersistence)}catch(x){try{await A.setPersistence(auth,A.browserLocalPersistence)}catch(y){}}auth.languageCode=lang();db=F.getFirestore(app);
 const q=new URLSearchParams(location.search);const tok=q.get('akkoord');
 if(tok&&/^[0-9a-f]{48}$/.test(tok)){apTok=tok;apState='';show();try{const s=await F.getDoc(F.doc(db,'approvals',tok));if(!s.exists())apState='bad';else if(s.data().ok)apState='ok';else apState=s.data().email}catch(x){apState='bad'}view()}
 A.onAuthStateChanged(auth,onUser)}catch(x){console.warn('firebase',x);unwait()}})();
async function logout(){await push();if(user){try{await F.setDoc(F.doc(db,'presence',user.uid),{t:F.Timestamp.fromMillis(Date.now()-600000)})}catch(x){}trust(user.email,false)}await A.signOut(auth)}
window.SN_AUTH={isAdmin,logout,repaint:()=>paintPill(),user:()=>user,ready:()=>!!(user&&trusted(user.email)&&F&&db),fb:()=>({A,F,db,auth})};
})();
// Strong Ninja: kapsel-coach (gezichtsvorm met de camera, passend kapsel, passen op je hoofd, kaart voor de kapper)
(()=>{
const $=id=>document.getElementById(id);const host=$('today');if(!host)return;
const lang=()=>document.documentElement.lang==='en'?'en':'nl';
const TX={nl:{h:'Kapsel-coach',i:'Film je gezicht: de app herkent je gezichtsvorm, toont welke kapsels goed passen en zet ze op je hoofd. Daarna krijg je een kaart om aan de kapper te tonen.',open:'Start kapsel-coach',cam:'Camera aanzetten',priv:'Je video blijft op je gsm. Er wordt niets opgeslagen of verstuurd.',look:'Kijk recht in de camera, haar uit je gezicht.',scan:'Gezicht meten...',noFace:'Geen gezicht gezien. Kijk recht in de camera, met goed licht.',shape:'Jouw gezichtsvorm',best:'Kapsels die goed passen',pick:'Laat de app kiezen',len:'Lengte',short:'Kort',mid:'Halflang',long:'Lang',all:'Alles',try:'Probeer op je hoofd',barber:'Kaart voor de kapper',share:'Delen',save:'Opslaan',again:'Opnieuw meten',close:'Sluiten',note:'Dit is een getekend voorbeeld op je hoofd, geen echte fotobewerking.',tell:'Zeg tegen de kapper:',loadErr:'De camera of de gezichtsherkenning kon niet starten. Open de app in Chrome op de echte website.',color:'Haarkleur',chosen:'De app koos:',
 shapes:{ovaal:['Ovaal','Mooi in balans. Bijna elk kapsel staat je.'],rond:['Rond','Even breed als lang, zachte kaaklijn. Volume bovenop maakt je gezicht langer.'],vierkant:['Vierkant','Brede, sterke kaaklijn. Textuur en zachte lijnen staan goed.'],lang:['Lang','Langer dan breed. Een pony of volume aan de zijkant maakt het mooi in balans.'],hart:['Hart','Breder voorhoofd, smallere kin. Volume rond kin en een zijscheiding staan goed.']}},
en:{h:'Haircut coach',i:'Film your face: the app recognises your face shape, shows which haircuts suit you and puts them on your head. Then you get a card to show the barber.',open:'Start haircut coach',cam:'Turn on camera',priv:'Your video stays on your phone. Nothing is saved or sent.',look:'Look straight at the camera, hair out of your face.',scan:'Measuring face...',noFace:'No face found. Look straight at the camera, with good light.',shape:'Your face shape',best:'Haircuts that suit you',pick:'Let the app choose',len:'Length',short:'Short',mid:'Medium',long:'Long',all:'All',try:'Try on your head',barber:'Card for the barber',share:'Share',save:'Save',again:'Measure again',close:'Close',note:'This is a drawn preview on your head, not real photo editing.',tell:'Tell the barber:',loadErr:'The camera or face detection could not start. Open the app in Chrome on the real website.',color:'Hair colour',chosen:'The app chose:',
 shapes:{ovaal:['Oval','Nicely balanced. Almost every haircut suits you.'],rond:['Round','As wide as long, soft jawline. Volume on top makes your face look longer.'],vierkant:['Square','Wide, strong jawline. Texture and soft lines suit you.'],lang:['Long','Longer than wide. A fringe or volume at the sides balances it.'],hart:['Heart','Wider forehead, narrower chin. Volume near the chin and a side part suit you.']}}};
const L=()=>TX[lang()];
// kapsels: p = tekenparameters (h volume boven, side dikte zijkant, fr pony, len lengte onder oor, fade, quiff, part -1/0/1)
const CUTS=[
 {k:'buzz',len:'short',nl:'Buzz cut',en:'Buzz cut',bar:{nl:'Overal 6 tot 9 mm met de tondeuse, nek recht.',en:'Clippers 6 to 9 mm all over, square neckline.'},p:{h:.05,side:.03,fr:0,len:0,fade:1}},
 {k:'crew',len:'short',nl:'Crew cut',en:'Crew cut',bar:{nl:'Zijkanten 3 mm fade, bovenkant 2 tot 3 cm, voorkant iets langer.',en:'Sides 3 mm fade, top 2 to 3 cm, front slightly longer.'},p:{h:.12,side:.04,fr:.05,len:0,fade:1}},
 {k:'crop',len:'short',nl:'Textured crop',en:'Textured crop',bar:{nl:'Mid fade, bovenkant 4 tot 6 cm met textuur, korte rechte pony.',en:'Mid fade, top 4 to 6 cm textured, short straight fringe.'},p:{h:.16,side:.04,fr:.35,len:0,fade:1,tex:1}},
 {k:'quiff',len:'short',nl:'Quiff',en:'Quiff',bar:{nl:'Zijkanten 2 tot 3 mm fade, bovenkant 6 tot 8 cm, voorkant omhoog en naar achter föhnen.',en:'Sides 2 to 3 mm fade, top 6 to 8 cm, blow-dry the front up and back.'},p:{h:.32,side:.05,fr:0,len:0,fade:1,quiff:1}},
 {k:'side',len:'short',nl:'Zijscheiding',en:'Side part',bar:{nl:'Zijkanten taper met schaar of 6 mm, bovenkant 5 tot 7 cm, scheiding links.',en:'Taper sides with scissors or 6 mm, top 5 to 7 cm, part on the left.'},p:{h:.2,side:.07,fr:0,len:0,part:-1}},
 {k:'curls',len:'short',nl:'Krullen met fade',en:'Curly top fade',bar:{nl:'Hoge fade, bovenkant 5 tot 8 cm krullen laten, alleen de punten bijknippen.',en:'High fade, keep 5 to 8 cm of curls on top, trim the ends only.'},p:{h:.3,side:.03,fr:.2,len:0,fade:1,curl:1}},
 {k:'curtains',len:'mid',nl:'Curtains (middenscheiding)',en:'Curtains (middle part)',bar:{nl:'Bovenkant 10 tot 12 cm, middenscheiding, zijkanten 2 cm met schaar, pony tot de wenkbrauwen.',en:'Top 10 to 12 cm, middle part, sides 2 cm with scissors, fringe to the eyebrows.'},p:{h:.18,side:.12,fr:.55,len:.05,part:0}},
 {k:'flow',len:'mid',nl:'Flow (tot de oren)',en:'Flow (ear length)',bar:{nl:'Overal 10 tot 15 cm met de schaar, laagjes, naar achter of opzij.',en:'10 to 15 cm all over with scissors, layers, swept back or aside.'},p:{h:.2,side:.16,fr:.15,len:.15,part:1}},
 {k:'bob',len:'mid',nl:'Bob (tot de kin)',en:'Bob (chin length)',bar:{nl:'Recht geknipt tot op de kin, lichte laagjes aan de voorkant.',en:'Cut straight to the chin, light layers at the front.'},p:{h:.14,side:.2,fr:.1,len:.3,part:1}},
 {k:'bangs',len:'mid',nl:'Pony met laagjes',en:'Fringe with layers',bar:{nl:'Rechte pony tot de wenkbrauwen, lengte tot de schouders met laagjes.',en:'Straight fringe to the eyebrows, shoulder length with layers.'},p:{h:.12,side:.2,fr:.6,len:.55}},
 {k:'layers',len:'long',nl:'Lange laagjes',en:'Long layers',bar:{nl:'Lengte houden, laagjes vanaf de kin, voorkant omlijstend knippen.',en:'Keep the length, layers from the chin, face-framing front.'},p:{h:.14,side:.22,fr:.12,len:.95,part:1}},
 {k:'longmid',len:'long',nl:'Lang met middenscheiding',en:'Long with middle part',bar:{nl:'Lang, middenscheiding, punten 1 tot 2 cm bijknippen.',en:'Long, middle part, trim 1 to 2 cm off the ends.'},p:{h:.12,side:.2,fr:.05,len:.9,part:0}}];
const BEST={ovaal:['quiff','crop','side','curtains','layers','bob','flow','crew'],rond:['quiff','side','crop','layers','longmid','curls'],vierkant:['crop','crew','curtains','flow','layers','bangs'],lang:['crop','curtains','bangs','bob','flow','side'],hart:['side','curtains','bob','layers','flow','crop']};
const COLORS=['#2b1b14','#4a2f1e','#7a4b2a','#b07d4f','#d9b37a','#111111'];
// ---- UI ----
const card=document.createElement('div');card.className='card hcCard';card.innerHTML='<h3 id="hcH"></h3><p class="mut" id="hcI"></p><button type="button" class="btn" id="hcOpen"></button>';host.appendChild(card);
const ov=document.createElement('div');ov.className='hc';ov.hidden=true;ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');document.body.appendChild(ov);
let st={shape:null,cut:null,lenF:'all',color:COLORS[0],stream:null,fl:null,raf:0,lm:null,msg:'',err:'',scanning:false,samples:[]};
const paintCard=()=>{const t=L();$('hcH').textContent=t.h;$('hcI').textContent=t.i;$('hcOpen').textContent=t.open};paintCard();
const tt=$('hTitle');if(tt)new MutationObserver(paintCard).observe(tt,{childList:true});
$('hcOpen').addEventListener('click',()=>{ov.hidden=false;document.body.classList.add('pwLock');view()});
function cutName(c){return c[lang()]}
function view(){const t=L();const sh=st.shape&&t.shapes[st.shape];
 const list=st.shape?(BEST[st.shape]||[]).map(k=>CUTS.find(c=>c.k===k)).filter(c=>st.lenF==='all'||c.len===st.lenF):[];
 ov.innerHTML=`<div class="hcIn"><div class="pwTop"><button type="button" class="pwIco" data-a="close" aria-label="${t.close}">✕</button><b class="pwT2">${t.h}</b></div>
 <div class="hcStage"><video id="hcV" playsinline muted></video><canvas id="hcC"></canvas>${!st.stream?`<div class="hcStart"><button type="button" class="pwBig" data-a="cam">📷 ${t.cam}</button><p>${t.priv}</p></div>`:''}${st.msg?`<div class="hcMsg">${st.msg}</div>`:''}</div>
 ${st.err?`<div class="pwErr">${st.err}</div>`:''}
 ${st.stream&&!st.shape?`<p class="hcP">${t.look}</p>`:''}
 ${sh?`<div class="hcShape"><span>${t.shape}</span><b>${sh[0]}</b><p>${sh[1]}</p><button type="button" class="pwLink" data-a="again">${t.again}</button></div>
  <div class="hcRow"><span>${t.len}</span>${['all','short','mid','long'].map(k=>`<button type="button" class="chip" data-len="${k}" aria-pressed="${st.lenF===k}">${t[k]}</button>`).join('')}</div>
  <div class="hcRow"><span>${t.color}</span>${COLORS.map(c=>`<button type="button" class="hcCol" data-col="${c}" style="background:${c}" aria-pressed="${st.color===c}" aria-label="${c}"></button>`).join('')}</div>
  <h3 class="hcH3">${t.best}</h3><button type="button" class="pwBig" data-a="pick">✨ ${t.pick}</button>
  <div class="hcCuts">${list.map(c=>`<button type="button" class="hcCut${st.cut===c.k?' on':''}" data-cut="${c.k}">${miniSvg(c)}<b>${cutName(c)}</b></button>`).join('')}</div>
  ${st.cut?(()=>{const c=CUTS.find(x=>x.k===st.cut);return `<div class="hcSel"><b>${cutName(c)}</b><p><span>${t.tell}</span> ${c.bar[lang()]}</p><p class="mut">${t.note}</p><button type="button" class="pwBig" data-a="barber">✂️ ${t.barber}</button></div>`})():''}`:''}
 <div id="hcOut"></div></div>`;
 const v=$('hcV');if(v&&st.stream){v.srcObject=st.stream;v.play().catch(()=>{})}}
function miniSvg(c){const p=c.p,W=60,H=60,cx=30;const top=14-p.h*30,fr=20+p.fr*14,len=36+p.len*22;
 return `<svg viewBox="0 0 60 60" width="56" height="56" aria-hidden="true"><ellipse cx="30" cy="33" rx="13" ry="16" fill="#ffd9b8"/><path d="M${cx-15-p.side*20} ${Math.max(30,len)} Q${cx-17-p.side*20} ${top+6} ${cx} ${top} Q${cx+17+p.side*20} ${top+6} ${cx+15+p.side*20} ${Math.max(30,len)} L${cx+12} ${Math.max(28,len-4)} Q${cx+12} ${fr} ${cx} ${fr} Q${cx-12} ${fr} ${cx-12} ${Math.max(28,len-4)} Z" fill="${st.color}"/></svg>`}
// ---- camera en gezichtsherkenning ----
async function startCam(){const t=L();st.err='';st.msg=t.scan;view();
 try{st.stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'user',width:{ideal:720},height:{ideal:960}},audio:false})}catch(e){st.err=t.loadErr;st.msg='';view();return}
 view();
 try{if(!st.fl){const V='https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14';const mp=await import(V);const fs=await mp.FilesetResolver.forVisionTasks(V+'/wasm');
  st.fl=await mp.FaceLandmarker.createFromOptions(fs,{baseOptions:{modelAssetPath:'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',delegate:'GPU'},runningMode:'VIDEO',numFaces:1})}}
 catch(e){console.warn(e);st.err=t.loadErr;st.msg='';view();return}
 st.samples=[];st.scanning=true;loop()}
function stopCam(){cancelAnimationFrame(st.raf);if(st.stream){st.stream.getTracks().forEach(x=>x.stop());st.stream=null}}
const d2=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
function classify(lm,vw,vh){const P=i=>({x:lm[i].x*vw,y:lm[i].y*vh});
 const len=d2(P(10),P(152)),cheek=d2(P(234),P(454)),jaw=d2(P(172),P(397)),fore=d2(P(54),P(284));
 return{r:len/cheek,j:jaw/cheek,f:fore/jaw}}
function decide(ms){const avg=k=>ms.reduce((a,m)=>a+m[k],0)/ms.length;const r=avg('r'),j=avg('j'),f=avg('f');
 if(r>=1.45)return'lang';if(r<1.22&&j<0.9)return'rond';if(j>=0.9)return'vierkant';if(f>1.18)return'hart';return'ovaal'}
function loop(){const v=$('hcV'),cv=$('hcC');if(!st.stream)return;
 if(v&&cv&&v.readyState>=2&&st.fl){const vw=v.videoWidth,vh=v.videoHeight;if(cv.width!==vw){cv.width=vw;cv.height=vh}const ctx=cv.getContext('2d');ctx.clearRect(0,0,vw,vh);
  let res=null;try{res=st.fl.detectForVideo(v,performance.now())}catch(e){}
  const lm=res&&res.faceLandmarks&&res.faceLandmarks[0];
  if(lm){st.lm=lm;
   if(st.scanning){st.samples.push(classify(lm,vw,vh));drawOutline(ctx,lm,vw,vh);const m=$('hcMsg')||ov.querySelector('.hcMsg');if(m)m.textContent=L().scan+' '+Math.min(100,Math.round(st.samples.length/45*100))+'%';
    if(st.samples.length>=45){st.scanning=false;st.shape=decide(st.samples);st.msg='';view()}}
   else if(st.cut)drawHair(ctx,lm,vw,vh,CUTS.find(c=>c.k===st.cut).p,st.color);
   else drawOutline(ctx,lm,vw,vh)}
  else if(st.scanning){const m=ov.querySelector('.hcMsg');if(m)m.textContent=L().noFace}}
 st.raf=requestAnimationFrame(loop)}
const OVAL=[10,338,297,332,284,251,389,356,454,323,361,288,397,365,379,378,400,377,152,148,176,149,150,136,172,58,132,93,234,127,162,21,54,103,67,109];
function drawOutline(ctx,lm,w,h){ctx.beginPath();OVAL.forEach((i,k)=>{const x=lm[i].x*w,y=lm[i].y*h;k?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.closePath();ctx.strokeStyle='#16c6dc';ctx.lineWidth=Math.max(3,w/200);ctx.setLineDash([10,8]);ctx.stroke();ctx.setLineDash([])}
function drawHair(ctx,lm,w,h,p,col){
 const P=i=>({x:lm[i].x*w,y:lm[i].y*h}),add=(a,b,k=1)=>({x:a.x+b.x*k,y:a.y+b.y*k}),sub=(a,b)=>({x:a.x-b.x,y:a.y-b.y}),lerp=(a,b,k)=>({x:a.x+(b.x-a.x)*k,y:a.y+(b.y-a.y)*k}),dot=(a,b)=>a.x*b.x+a.y*b.y;
 const A=P(234),B=P(454),C={x:(A.x+B.x)/2,y:(A.y+B.y)/2},Wd=Math.hypot(B.x-A.x,B.y-A.y),top=P(10),chin=P(152),faceH=Math.hypot(chin.x-top.x,chin.y-top.y);
 const up={x:(top.x-chin.x)/faceH,y:(top.y-chin.y)/faceH};
 const browC=lerp(P(105),P(334),.5);
 // voorhoofd-boog van links naar rechts (haarlijn)
 const U=[127,162,21,54,103,67,109,10,338,297,332,284,251,389,356].map(P);const n=U.length;
 const lift=Wd*(0.10+p.h*0.85),vol=1.10+p.side*1.6;
 const outer=U.map((q,i)=>{const m=Math.sin(Math.PI*i/(n-1));let o=add(C,sub(q,C),vol);o=add(o,up,Wd*0.04+lift*Math.pow(m,0.35));if(p.quiff){const f=Math.pow(m,3);o=add(o,up,Wd*0.07*f)}return o});
 const inner=U.map((q,i)=>{const m=Math.sin(Math.PI*i/(n-1));let o=add(q,sub(q,C),0.03);o=add(o,up,Wd*0.015);
  if(p.fr>0){const target=add(q,up,dot(sub(browC,q),up)+Wd*0.05);o=lerp(o,target,Math.min(1,p.fr*1.25)*Math.pow(m,0.7))}
  if(p.part!=null){const pi=p.part===0?(n-1)/2:p.part<0?(n-1)*0.32:(n-1)*0.68,dd=Math.abs(i-pi)/n;o=add(o,up,Wd*0.05*Math.max(0,0.25-dd)*4)}
  return o});
 // zijkanten: van slaap naar beneden
 const endD=faceH*(p.len>0?0.45+p.len*1.05:(p.fade?0.30:0.40));
 function side(ids,sgn){const pts=ids.map(P);const o=[],ii=[];let last=null,lastD=0;
  for(const q of pts){const d=dot(sub(top,q),up);if(d>endD)break;o.push(add(C,sub(q,C),1.05+p.side*(p.fade?0.6:1.6)));ii.push(add(C,sub(q,C),p.len>0.25?1.0:1.01));last=q;lastD=d}
  if(last&&p.len>0&&endD>lastD+faceH*0.02){const ext=endD-lastD,out={x:-up.y*sgn,y:up.x*sgn};const lo=o[o.length-1],li=ii[ii.length-1];
   const steps=3;for(let k=1;k<=steps;k++){const t=k/steps;o.push(add(add(lo,up,-ext*t),out,Wd*0.04*t));ii.push(add(add(li,up,-ext*t),out,-Wd*(0.02+0.10*t)))}}
  return{o,ii}}
 const Ls=side([127,234,93,132,58,172,136,150,149],-1),Rs=side([356,454,323,361,288,397,365,379,378],1);
 const poly=[...Ls.o.slice().reverse(),...outer,...Rs.o,...Rs.ii.slice().reverse(),...inner.slice().reverse(),...Ls.ii];
 const path=()=>{ctx.beginPath();ctx.moveTo((poly[0].x+poly[1].x)/2,(poly[0].y+poly[1].y)/2);for(let i=1;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length];ctx.quadraticCurveTo(a.x,a.y,(a.x+b.x)/2,(a.y+b.y)/2)}ctx.closePath()};
 const sh=(hex,k)=>{const v=parseInt(hex.slice(1),16);let r=v>>16,g=v>>8&255,b=v&255;const f=x=>Math.max(0,Math.min(255,Math.round(k<0?x*(1+k):x+(255-x)*k)));return`rgb(${f(r)},${f(g)},${f(b)})`};
 const crown=add(C,up,faceH*0.75);
 ctx.save();
 // zachte schaduw op het voorhoofd
 ctx.save();path();ctx.shadowColor='rgba(0,0,0,.45)';ctx.shadowBlur=Wd*0.06;ctx.shadowOffsetY=Wd*0.015;ctx.fillStyle=sh(col,-0.2);ctx.fill();ctx.restore();
 const g=ctx.createRadialGradient(crown.x,crown.y,Wd*0.05,crown.x,crown.y,Wd*(1.1+p.len));g.addColorStop(0,sh(col,0.12));g.addColorStop(0.55,col);g.addColorStop(1,sh(col,-0.35));
 path();ctx.fillStyle=g;ctx.fill();
 // haarlokken
 ctx.save();path();ctx.clip();ctx.lineCap='round';
 const rnd=(i)=>{const x=Math.sin(i*127.1+p.h*311.7)*43758.5453;return x-Math.floor(x)};const tone=k=>sh(col,k);
 const at=(arr,t)=>{const f=t*(arr.length-1),i=Math.floor(f),r=f-i;return lerp(arr[i],arr[Math.min(arr.length-1,i+1)],r)};
 const N=Math.round(160+Wd*0.9);ctx.lineCap='round';
 for(let j=0;j<N;j++){const t=rnd(j),o=at(outer,t),e=at(inner,Math.min(1,Math.max(0,t+(rnd(j+7)-0.5)*0.04))),a0=lerp(o,e,rnd(j+3)*0.25),side=(t-0.5);
  const dir=p.part!=null?(t<(p.part===0?0.5:p.part<0?0.32:0.68)?-1:1):(side<0?-1:1);const mid=add(lerp(a0,e,0.5),{x:-up.y,y:up.x},Wd*0.04*dir*(0.5+rnd(j+5)));
  const L=0.35+rnd(j+11)*0.65,end=lerp(a0,e,0.55+L*0.45);ctx.strokeStyle=tone((rnd(j+13)-0.55)*0.6);ctx.globalAlpha=0.35+rnd(j+17)*0.45;ctx.lineWidth=Math.max(0.6,Wd/(180+rnd(j+19)*160));
  ctx.beginPath();ctx.moveTo(a0.x,a0.y);ctx.quadraticCurveTo(mid.x,mid.y,end.x,end.y);ctx.stroke()}
 for(const S of[Ls,Rs]){if(S.o.length<2)continue;const M=Math.round(N*0.35*(0.4+p.len));for(let j=0;j<M;j++){const t=rnd(j+900),s2=rnd(j+901);const a1=lerp(at(S.o,t*0.2),at(S.ii,t*0.2),s2),a2=lerp(at(S.o,Math.min(1,t*0.2+0.3+rnd(j+903)*0.6)),at(S.ii,Math.min(1,t*0.2+0.3+rnd(j+903)*0.6)),s2);
  ctx.strokeStyle=tone((rnd(j+905)-0.55)*0.6);ctx.globalAlpha=0.3+rnd(j+907)*0.45;ctx.lineWidth=Math.max(0.6,Wd/(170+rnd(j+909)*150));ctx.beginPath();ctx.moveTo(a1.x,a1.y);ctx.quadraticCurveTo((a1.x+a2.x)/2+(rnd(j+911)-0.5)*Wd*0.03,(a1.y+a2.y)/2,a2.x,a2.y);ctx.stroke()}}
 // glans
 ctx.globalAlpha=0.18;const hl=ctx.createRadialGradient(at(outer,0.4).x,at(outer,0.4).y,0,at(outer,0.4).x,at(outer,0.4).y,Wd*0.45);hl.addColorStop(0,'#fff');hl.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=hl;ctx.fillRect(C.x-Wd*2,C.y-Wd*2,Wd*4,Wd*4);ctx.globalAlpha=1;
 if(p.curl){for(let i=0;i<40;i++){const t=(i*0.618)%1,s=((i*0.37)%1),q=lerp(lerp(outer[Math.floor(t*(n-1))],inner[Math.floor(t*(n-1))],s*0.8),C,0);ctx.strokeStyle=i%2?'rgba(255,255,255,.12)':'rgba(0,0,0,.25)';ctx.lineWidth=Math.max(1,Wd/90);ctx.beginPath();ctx.arc(q.x,q.y,Wd*0.025,0,Math.PI*1.6);ctx.stroke()}}
 if(p.tex){for(let i=0;i<30;i++){const t=(i*0.618)%1,q=lerp(outer[Math.floor(t*(n-1))],inner[Math.floor(t*(n-1))],0.6+((i*0.29)%0.4));ctx.strokeStyle='rgba(0,0,0,.25)';ctx.lineWidth=Math.max(1,Wd/100);ctx.beginPath();ctx.moveTo(q.x,q.y);ctx.lineTo(q.x+Wd*0.01,q.y+Wd*0.03);ctx.stroke()}}
 // fade: zijkanten naar de huid laten verlopen
 if(p.fade){ctx.globalCompositeOperation='destination-out';for(const [S,sg] of[[Ls,-1],[Rs,1]]){if(!S.o.length)continue;const a=S.ii[0],b=S.o[S.o.length-1];const gr=ctx.createLinearGradient(a.x,a.y,b.x,b.y);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba(0,0,0,.7)');ctx.fillStyle=gr;ctx.beginPath();ctx.moveTo(S.o[0].x,S.o[0].y);S.o.forEach(q=>ctx.lineTo(q.x,q.y));S.ii.slice().reverse().forEach(q=>ctx.lineTo(q.x,q.y));ctx.closePath();ctx.fill()}ctx.globalCompositeOperation='source-over'}
 ctx.restore();
 {const rnd=(i)=>{const x=Math.sin(i*91.7+p.h*71.3)*43758.5453;return x-Math.floor(x)};ctx.save();ctx.lineCap='round';for(let j=0;j<70;j++){const t=0.08+rnd(j)*0.84,e=(()=>{const f=t*(inner.length-1),i=Math.floor(f),r=f-i;return lerp(inner[i],inner[Math.min(inner.length-1,i+1)],r)})(),d=add(e,up,-Wd*(0.01+rnd(j+1)*0.04));ctx.strokeStyle=sh(col,(rnd(j+2)-0.5)*0.4);ctx.globalAlpha=0.25+rnd(j+3)*0.35;ctx.lineWidth=Math.max(0.5,Wd/260);ctx.beginPath();ctx.moveTo(add(e,up,Wd*0.03).x,add(e,up,Wd*0.03).y);ctx.quadraticCurveTo(e.x+(rnd(j+4)-0.5)*Wd*0.03,e.y,d.x,d.y);ctx.stroke()}ctx.restore()}
 // scheiding
 if(p.part!=null){const pi=Math.round(p.part===0?(n-1)/2:p.part<0?(n-1)*0.32:(n-1)*0.68);const a=inner[pi],b=lerp(inner[pi],outer[pi],0.85);ctx.strokeStyle='rgba(0,0,0,.35)';ctx.lineWidth=Math.max(1.5,Wd/70);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}
 ctx.restore()}
// ---- kaart voor de kapper ----
async function barber(){const t=L(),c=CUTS.find(x=>x.k===st.cut),v=$('hcV'),hc=$('hcC');const W=720,H=1100,cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d');
 x.fillStyle='#0b2a33';x.fillRect(0,0,W,H);
 if(v&&v.videoWidth){const s=Math.max(W/v.videoWidth,700/v.videoHeight),dw=v.videoWidth*s,dh=v.videoHeight*s;x.save();x.beginPath();x.rect(0,0,W,700);x.clip();x.translate(W,0);x.scale(-1,1);x.drawImage(v,(W-dw)/2,(700-dh)/2,dw,dh);if(hc)x.drawImage(hc,(W-dw)/2,(700-dh)/2,dw,dh);x.restore()}
 x.fillStyle='#16c6dc';x.font='bold 34px Inter,Arial,sans-serif';x.fillText('STRONG NINJA · '+t.barber.toUpperCase(),32,760);
 x.fillStyle='#fff';x.font='bold 54px Inter,Arial,sans-serif';x.fillText(cutName(c),32,830);
 x.font='30px Inter,Arial,sans-serif';const words=(t.tell+' '+c.bar[lang()]).split(' ');let line='',y=890;for(const w of words){if(x.measureText(line+w).width>W-64){x.fillText(line,32,y);line='';y+=42}line+=w+' '}x.fillText(line,32,y);
 x.fillStyle='rgba(255,255,255,.6)';x.font='24px Inter,Arial,sans-serif';x.fillText(t.shapes[st.shape][0]+' · '+t.note,32,H-30);
 const url=cv.toDataURL('image/jpeg',0.9);const out=$('hcOut');out.innerHTML=`<div class="hcBar"><img src="${url}" alt="${cutName(c)}"><div class="hcBarB"><button type="button" class="pwSm" data-a="share">${t.share}</button><a class="pwSm alt" download="kapsel-${c.k}.jpg" href="${url}">${t.save}</a></div></div>`;out.scrollIntoView({behavior:'smooth'});st.card=cv}
ov.addEventListener('click',async e=>{const b=e.target.closest('button');if(!b)return;const a=b.dataset.a;
 if(b.dataset.len){st.lenF=b.dataset.len;view();return}if(b.dataset.col){st.color=b.dataset.col;view();return}if(b.dataset.cut){st.cut=b.dataset.cut;view();return}
 if(a==='close'){stopCam();ov.hidden=true;if(![...document.querySelectorAll('.rOv,.pw,.gw,.snAuth')].some(x=>!x.hidden))document.body.classList.remove('pwLock');return}
 if(a==='cam')startCam();
 if(a==='again'){st.shape=null;st.cut=null;st.samples=[];st.scanning=true;st.msg=L().scan;view()}
 if(a==='pick'){const list=(BEST[st.shape]||[]).map(k=>CUTS.find(c=>c.k===k)).filter(c=>st.lenF==='all'||c.len===st.lenF);if(list.length){st.cut=list[0].k;view();const s=ov.querySelector('.hcSel b');if(s)s.textContent=L().chosen+' '+cutName(list[0])}}
 if(a==='barber')barber();
 if(a==='share'&&st.card){st.card.toBlob(async bl=>{const f=new File([bl],'kapsel.jpg',{type:'image/jpeg'});try{if(navigator.canShare&&navigator.canShare({files:[f]}))await navigator.share({files:[f],title:L().barber});else{const l=document.createElement('a');l.href=URL.createObjectURL(bl);l.download='kapsel.jpg';l.click()}}catch(er){}},'image/jpeg',0.9)}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!ov.hidden)ov.querySelector('[data-a="close"]').click()});
})();
// Strong Ninja: Wat is nieuw (versies, datum en tijd, NL/EN)
(()=>{
const $=id=>document.getElementById(id);
const lang=()=>document.documentElement.lang==='en'?'en':'nl';
const LOG=[
 ['2.12','2026-11-26 16:20',['Inloggen gaat sneller: je bent meteen binnen. De akkoord-mail komt op de achtergrond, je hebt 3 dagen om op "Ik ga akkoord" te tikken.','Nieuw: Verder met Google. Eén tik, geen wachtwoord en geen mail nodig.','Mijn materiaal thuis: koppel een foto aan één toestel en bevestig. Wissen via de afbeelding en het rode kruisje.'],['Logging in is faster: you are in straight away. The agreement email comes in the background, you have 3 days to tap "I agree".','New: Continue with Google. One tap, no password and no email needed.','My equipment at home: link a photo to one item and confirm. Delete via the picture and the red cross.']],
 ['2.11','2026-11-25 19:10',['Nieuw: Mijn gegevens. Tik rechtsboven op je naam.','Kies zelf een gebruikersnaam of laat de app er een kiezen.','Kies een ninja als profielfoto of een foto uit je galerij. Een eigen foto zien enkel je vrienden.','Wie nog geen naam of foto heeft, krijgt dit scherm vanzelf te zien.'],['New: My details. Tap your name at the top right.','Pick a username yourself or let the app choose one.','Pick a ninja as profile picture or a photo from your gallery. Only your friends see your own photo.','If you have no name or picture yet, this screen opens by itself.']],
 ['2.10','2026-11-25 18:55',['Nieuw: Vrienden. Kies een ninja-naam, zoek vrienden, stuur uitnodigingen en zie je vriendenlijst.','Daag een vriend uit voor een push-up wedstrijd van 60 seconden. De winnaar zie je bij Wedstrijden.','Admin: tik op de tellers om alle spelers te zien, met een Info-knop per speler.','De tellers voor accounts en spelers online werken nu live bij.'],['New: Friends. Pick a ninja name, find friends, send invites and see your friend list.','Challenge a friend to a 60-second push-up contest. See the winner under Contests.','Admin: tap the counters to see all players, with an Info button per player.','The account and players-online counters now update live.']],
 ['2.9','2026-11-25 18:10',['Nieuwe akkoord-mail: bij account maken en bij inloggen op een nieuw toestel tik je in de mail op "Ik ga akkoord". Daarna ga je in de app vanzelf verder.','Wie inlogt zonder jouw akkoord, komt er niet in.'],['New agreement email: when you create an account or log in on a new device, tap "I agree" in the email. The app then continues by itself.','Nobody gets in without your agreement.']],
 ['2.8','2026-11-25 17:45',['Bij het inloggen staat er altijd een knop "Mail opnieuw sturen" als je de inloglink niet kreeg.'],['When you log in there is always a "Send email again" button if you did not get the login link.']],
 ['2.7','2026-11-25 17:05',['Bij inloggen bevestig je met een link in je mail dat jij het bent.','De app start nu in de juiste volgorde: inloggen, starttest, uitleg van de app.','Na de starttest krijg je een korte uitleg van de app.','Kapsels in de kapsel-coach zien er veel echter uit en volgen de vorm van je gezicht.'],['When you log in, you confirm it is you with a link in your email.','The app now starts in the right order: log in, starting test, app explanation.','After the starting test you get a short explanation of the app.','Haircuts in the haircut coach look much more real and follow the shape of your face.']],
 ['2.6','2026-11-25 16:25',['Nieuwe pagina "Wat is nieuw": hier zie je wat er veranderd is.','Een Gmail-adres met of zonder punt (seppgielen of sepp.gielen) is nu hetzelfde account.'],["New \"What's new\" page: see what has changed.",'A Gmail address with or without a dot (seppgielen or sepp.gielen) is now the same account.']],
 ['2.5','2026-11-25 16:04',['Kapsel-coach: de camera herkent je gezichtsvorm, toont passende kapsels, zet ze op je hoofd en maakt een kaart voor de kapper.'],['Haircut coach: the camera recognises your face shape, shows haircuts that suit you, puts them on your head and makes a card for the barber.']],
 ['2.4','2026-11-25 16:00',['Inloggen en account maken met e-mail, wachtwoord en een bevestigingslink.','Je voortgang wordt online bewaard, ook op een andere gsm.','Admin met zwarte band en tellers: spelers met account en spelers online.'],['Log in and create an account with email, password and a confirmation link.','Your progress is saved online, also on another phone.','Admin with black belt and counters: players with an account and players online.']],
 ['2.3','2026-11-24 19:15',['Begeleide training: trainen, rusten en volgende gaan vanzelf, met een ninja die elke oefening voordoet.','Ritscherm zoals een pro-app: ranglijst met ninja-bots, weerstand, voortgang en volledig scherm.','Na een rit: hoe voelde het, een notitie en een rapport met grafieken en scorebord.','De app onthoudt je toestellen: "Toevoegen aan mijn apparatuur".'],['Guided workout: train, rest and next happen by themselves, with a ninja showing each exercise.','Pro-style ride screen: leaderboard with ninja bots, resistance, progress and full screen.','After a ride: how it felt, a note and a report with charts and scoreboard.','The app remembers your machines: "Add to my equipment".']],
 ['2.2','2026-11-24 18:56',['Nieuwe toestellen-wizard: type, merk, model, verbinden en datacheck.',"Rit-video's van YouTube die meespelen op jouw snelheid."],['New equipment wizard: type, brand, model, connect and data check.','Ride videos from YouTube that play at your speed.']],
 ['2.1','2026-11-23 20:21',['De Bluetooth-zoeker toont nu alle toestellen in de buurt.'],['The Bluetooth search now shows all nearby devices.']],
 ['2.0','2026-11-23',['Ninja Coach: stel al je vragen, gratis.','Nieuw logo en kleuren, ook in het tabblad.'],['Ninja Coach: ask all your questions, for free.','New logo and colours, also in the browser tab.']],
 ['1.5','2026-11-23',['Virtuele rit fietsen en roeien met helling, automatische weerstand en ritrapport.'],['Virtual ride cycling and rowing with slope, automatic resistance and ride report.']],
 ['1.4','2026-11-23',['Camera-coach: lijnen op je lichaam en herhalingen tellen bij elke oefening.','Push-up-wedstrijd met de camera en wedstrijden tegen ninja-bots.'],['Camera coach: lines on your body and rep counting for every exercise.','Push-up contest with the camera and contests against ninja bots.']],
 ['1.3','2026-11-23',['Kies hoe je lichaam eruitziet met figuren, en meerdere doelen.','Toestellen verbinden bij de start, of weigeren.'],['Pick what your body looks like with figures, and several goals.','Connect devices at the start, or decline.']],
 ['1.2','2026-11-22',['Kaaklijn-training.',"Foto's of lijst van je materiaal thuis, met een eigen programma.",'Meerdere Bluetooth-toestellen tegelijk.'],['Jawline training.','Photos or list of your equipment at home, with its own programme.','Several Bluetooth devices at once.']],
 ['1.0','2026-11-22',['Eerste versie: starttest met kracht en lengte, dagelijkse quests, XP en gordels.'],['First version: starting test with strength and height, daily quests, XP and belts.']]];
const CUR=LOG[0][0];
const TX={nl:{btn:'Nieuw',h:'Wat is nieuw',v:'Versie',close:'Sluiten',now:'Je hebt de nieuwste versie'},en:{btn:'New',h:"What's new",v:'Version',close:'Close',now:'You have the latest version'}};
const t=k=>TX[lang()][k];
const fmt=s=>{const[d,tm]=s.split(' ');const[y,m,dd]=d.split('-');return dd+'/'+m+'/'+y+(tm?' · '+tm+(lang()==='en'?'':' u'):'')};
let seen='';try{seen=localStorage.getItem('strongninja_seen')||''}catch(e){}
const btn=document.createElement('button');btn.type='button';btn.className='snNew';btn.id='snNewBtn';
const ov=document.createElement('div');ov.className='snNewOv';ov.hidden=true;ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');document.body.appendChild(ov);
function paintBtn(){btn.innerHTML='✨ <span class="snNL">'+t('btn')+'</span>'+(seen!==CUR?'<i class="dot"></i>':'');btn.title=t('h')+' · v'+CUR;const lg=$('lang');if(lg&&!btn.isConnected)lg.parentNode.insertBefore(btn,lg)}
function view(){const l=lang()==='en'?1:0;
 ov.innerHTML=`<div class="snNewIn"><div class="pwTop"><button type="button" class="pwIco" data-a="x" aria-label="${t('close')}">✕</button><b class="pwT2">${t('h')}</b></div><p class="snNewNow">${t('now')}: <b>v${CUR}</b></p>`+
 LOG.map(([v,d,nl,en],i)=>`<section class="snNewItem${i===0?' top':''}"><header><b>${t('v')} ${v}</b><time>${fmt(d)}</time></header><ul>${(l?en:nl).map(x=>`<li>${x}</li>`).join('')}</ul></section>`).join('')+'</div>'}
function open(){ov.hidden=false;document.body.classList.add('pwLock');view();seen=CUR;try{localStorage.setItem('strongninja_seen',CUR)}catch(e){}paintBtn()}
function close(){ov.hidden=true;if(![...document.querySelectorAll('.rOv,.pw,.gw,.snAuth,.hc')].some(x=>!x.hidden))document.body.classList.remove('pwLock')}
btn.addEventListener('click',open);ov.addEventListener('click',e=>{if(e.target.closest('[data-a="x"]'))close()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!ov.hidden)close()});
new MutationObserver(()=>{paintBtn();if(!ov.hidden)view()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
paintBtn();
let had=false;try{had=!!localStorage.getItem('strongninja')}catch(e){}
if(had&&seen!==CUR){const tryOpen=(n)=>{const busy=document.body.classList.contains('snWait')||[...document.querySelectorAll('.snAuth,.pw,.gw,.hc,.rOv,.snIntro')].some(x=>!x.hidden)||(document.getElementById('setup')&&!document.getElementById('setup').hidden);if(!busy)open();else if(n<40)setTimeout(()=>tryOpen(n+1),3000)};setTimeout(()=>tryOpen(0),2500)}
if(!had&&!seen){try{localStorage.setItem('strongninja_seen',CUR)}catch(e){}seen=CUR;paintBtn()}
window.SN_NEWS={open,version:CUR};
})();
// Strong Ninja: uitleg van de app na de starttest (1 keer)
(()=>{
const $=id=>document.getElementById(id);const su=$('setup');if(!su)return;
const lang=()=>document.documentElement.lang==='en'?'en':'nl';
const S={nl:[['🥋','Welkom bij Strong Ninja!','Je starttest is klaar. Zo werkt de app, in 5 stappen.'],['📅','Vandaag','Je dagelijkse quests, je XP en je gordel. Elke dag een beetje sterker: zo groei je naar de zwarte band.'],['💪','Train','Kies een programma en tik op "Start begeleide training": de app leidt je erdoor. Hier verbind je ook je toestellen en doe je een virtuele rit.'],['📈','Progressie','Je records, gordels, ritten en rapporten. Zie hoe je sterker wordt.'],['💬','Coach en meer','Vragen? Tik op Coach rechtsonder. Bij ✨ Nieuw zie je wat er veranderd is, en bij Vandaag staat de kapsel-coach.']],
en:[['🥋','Welcome to Strong Ninja!','Your starting test is done. This is how the app works, in 5 steps.'],['📅','Today','Your daily quests, your XP and your belt. A bit stronger every day: that is how you grow to black belt.'],['💪','Train','Pick a programme and tap "Start guided workout": the app leads you through it. This is also where you connect your machines and do a virtual ride.'],['📈','Progress','Your records, belts, rides and reports. See how you get stronger.'],['💬','Coach and more','Questions? Tap Coach at the bottom right. ✨ New shows what has changed, and the haircut coach is on Today.']]};
const B={nl:{next:'Volgende',go:'Aan de slag!',skip:'Overslaan'},en:{next:'Next',go:"Let's go!",skip:'Skip'}};
const K='strongninja_intro';let i=0;
const ov=document.createElement('div');ov.className='snIntro';ov.hidden=true;ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');document.body.appendChild(ov);
function view(){const st=S[lang()],b=B[lang()],[ic,h,p]=st[i],last=i===st.length-1;
 ov.innerHTML=`<div class="snIntroCard"><div class="snIntroIc">${ic}</div><h2>${h}</h2><p>${p}</p><div class="snIntroDots">${st.map((_,j)=>`<i class="${j===i?'on':''}"></i>`).join('')}</div><div class="snIntroB">${last?'':`<button type="button" class="pwLink" data-a="skip">${b.skip}</button>`}<button type="button" class="pwBig" data-a="${last?'done':'next'}">${last?b.go:b.next}</button></div></div>`}
function open(){i=0;ov.hidden=false;document.body.classList.add('pwLock');view()}
function done(){ov.hidden=true;try{localStorage.setItem(K,'1')}catch(e){}if(![...document.querySelectorAll('.rOv,.pw,.gw,.snAuth,.hc,.snNewOv')].some(x=>!x.hidden))document.body.classList.remove('pwLock')}
ov.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a;if(a==='next'){i++;view()}else done()});
let wasOpen=!su.hidden;
new MutationObserver(()=>{if(!su.hidden){wasOpen=true;return}let seen=false;try{seen=localStorage.getItem(K)==='1'}catch(e){}if(wasOpen&&!seen)setTimeout(open,400);wasOpen=false}).observe(su,{attributes:true,attributeFilter:['hidden']});
new MutationObserver(()=>{if(!ov.hidden)view()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
window.SN_INTRO={open};
})();
// Strong Ninja: vrienden (zoeken, uitnodigen, lijst, push-up wedstrijden) en admin-spelerslijst met info
(()=>{
const $=id=>document.getElementById(id);
const lang=()=>document.documentElement.lang==='en'?'en':'nl';
const TX={nl:{fr:'Vrienden',tabF:'Vrienden',tabI:'Uitnodigingen',tabS:'Zoeken',tabC:'Wedstrijden',close:'Sluiten',
 nameH:'Kies je ninja-naam',nameP:'Zo vinden vrienden je. Gebruik niet je volledige echte naam. 3 tot 16 tekens: letters, cijfers en _.',nameGo:'Bewaren',nameBad:'3 tot 16 tekens: letters, cijfers en _.',nameTaken:'Die naam is al bezet. Kies een andere.',
 noFr:'Nog geen vrienden. Zoek een vriend bij Zoeken.',search:'Zoek op ninja-naam',noRes:'Niemand gevonden.',add:'Voeg toe',sent:'Uitgenodigd',already:'Vriend',
 inc:'Wil je vriend worden?',out:'Wacht op antwoord',accept:'Accepteren',decline:'Weigeren',cancel:'Intrekken',noInv:'Geen uitnodigingen.',
 chal:'💪 Daag uit',info:'Info',remove:'Verwijderen',sure:'Zeker?',yes:'Ja',no:'Nee',online:'online',offline:'offline',
 cH:'Push-ups in 60 seconden',cNone:'Nog geen wedstrijden. Daag een vriend uit bij Vrienden.',you:'Jij',wait:'wacht op',play:'Doe mee',win:'gewonnen!',lose:'verloren',draw:'gelijk',
 goNow:'Doe nu je push-ups bij de wedstrijd hieronder. Je score gaat vanzelf naar {n}.',scoreSent:'Je score ({s}) is verstuurd naar {n}.',
 players:'Spelers',all:'Alle',onl:'Online',noName:'(nog geen naam)',lastSeen:'laatst gezien',now:'nu',min:'min geleden',hr:'u geleden',day:'d geleden',
 acc:'Account',created:'Aangemaakt',belt:'Band',xp:'XP',water:'Water vandaag',glasses:'glazen',push:'Push-up record',streak:'Streak',days:'dagen',friends:'Vrienden',privacy:'E-mailadressen zijn verborgen voor privacy.',back:'Terug'},
en:{fr:'Friends',tabF:'Friends',tabI:'Invites',tabS:'Search',tabC:'Contests',close:'Close',
 nameH:'Pick your ninja name',nameP:'This is how friends find you. Do not use your full real name. 3 to 16 characters: letters, numbers and _.',nameGo:'Save',nameBad:'3 to 16 characters: letters, numbers and _.',nameTaken:'That name is taken. Pick another one.',
 noFr:'No friends yet. Find a friend in Search.',search:'Search by ninja name',noRes:'Nobody found.',add:'Add',sent:'Invited',already:'Friend',
 inc:'Wants to be friends?',out:'Waiting for an answer',accept:'Accept',decline:'Decline',cancel:'Withdraw',noInv:'No invites.',
 chal:'💪 Challenge',info:'Info',remove:'Remove',sure:'Sure?',yes:'Yes',no:'No',online:'online',offline:'offline',
 cH:'Push-ups in 60 seconds',cNone:'No contests yet. Challenge a friend in Friends.',you:'You',wait:'waiting for',play:'Play',win:'won!',lose:'lost',draw:'draw',
 goNow:'Do your push-ups now in the contest below. Your score goes to {n} by itself.',scoreSent:'Your score ({s}) was sent to {n}.',
 players:'Players',all:'All',onl:'Online',noName:'(no name yet)',lastSeen:'last seen',now:'now',min:'min ago',hr:'h ago',day:'d ago',
 acc:'Account',created:'Created',belt:'Belt',xp:'XP',water:'Water today',glasses:'glasses',push:'Push-up record',streak:'Streak',days:'days',friends:'Friends',privacy:'Email addresses are hidden for privacy.',back:'Back'}};
const t=k=>TX[lang()][k];
const esc=s=>String(s==null?'':s).replace(/[<&>"]/g,c=>({'<':'&lt;','&':'&amp;','>':'&gt;','"':'&quot;'}[c]));
let FB=null,me=null,prof=null,tab='f',q='',res=[],frs=[],inc=[],outR=[],chs=[],unsubs=[],sel=null,admTab='all',admList=[],admSel=null,sureId='';
const toast=m=>{const el=$('toast');if(!el)return;el.textContent=m;el.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove('on'),3500)};
const ago=ts=>{if(!ts)return'-';const ms=Date.now()-(ts.toMillis?ts.toMillis():ts);const m=Math.round(ms/60000);if(m<3)return t('now');if(m<60)return m+' '+t('min');const h=Math.round(m/60);if(h<48)return h+' '+t('hr');return Math.round(h/24)+' '+t('day')};
const isOn=p=>p&&p.lastSeen&&(Date.now()-(p.lastSeen.toMillis?p.lastSeen.toMillis():0))<3*60*1000;
const BELTC={wit:'#f2f2f2',white:'#f2f2f2',geel:'#f5d22e',yellow:'#f5d22e',oranje:'#f08a24',orange:'#f08a24',groen:'#2fb34a',green:'#2fb34a',blauw:'#2f6fe0',blue:'#2f6fe0',bruin:'#7a4a24',brown:'#7a4a24',zwart:'#111',black:'#111'};
const bcol=b=>BELTC[String(b||'').toLowerCase().split(' ')[0]]||'#6b7280';
const av=(p,big)=>{if(p&&p.av==='photo'&&photos[p.uid])return `<span class="socAv img"><img src="${photos[p.uid]}" alt=""></span>`;if(p&&p.av!=null&&p.av!=='photo'&&!isNaN(+p.av))return `<span class="socAv nja">${ninja(+p.av,p.belt)}</span>`;return `<span class="socAv" style="background:${bcol(p&&p.belt)};color:${/wit|white|geel|yellow/i.test(p&&p.belt||'')?'#111':'#fff'}">${esc(((p&&p.name)||'?')[0].toUpperCase())}</span>`};
// ---- eigen profiel bijhouden ----
function stats(){let S={};try{S=JSON.parse(localStorage.getItem('strongninja')||'{}')}catch(e){}const d=new Date().toISOString().slice(0,10);const day=(S.days||{})[d]||{};
 let push=0;try{(S.prs&&S.prs.push||[]).forEach(x=>{push=Math.max(push,+(x[1]||x)||0)});JSON.parse(localStorage.getItem('strongninja_comp')||'[]').forEach(x=>{push=Math.max(push,+x.n||0)})}catch(e){}
 const xp=parseInt((($('xpTxt')||{}).textContent||'').replace(/\D+/g,' ').trim().split(' ')[0],10)||0;
 return{belt:(($('beltName')||{}).textContent||'').trim(),xp,water:day.water||0,waterDay:d,push,streak:parseInt((($('streak')||{}).textContent||'0'),10)||0}}
async function saveProfile(){if(!FB||!me)return;const{F,db}=FB;const s=stats();try{await F.setDoc(F.doc(db,'profiles',me.uid),Object.assign(s,{lastSeen:F.serverTimestamp()}),{merge:true})}catch(e){console.warn('profiel',e)}}
async function loadProfile(){const{F,db}=FB;try{const s=await F.getDoc(F.doc(db,'profiles',me.uid));prof=s.exists()?s.data():{};if(!prof.created){await F.setDoc(F.doc(db,'profiles',me.uid),{created:F.serverTimestamp()},{merge:true})}}catch(e){prof={}}}
// ---- live luisteren ----
function listen(){unsubs.forEach(u=>u());unsubs=[];const{F,db}=FB,R=F.collection(db,'friendReq'),C=F.collection(db,'challenges');
 const qq=(c,...w)=>F.query(c,...w.map(x=>F.where(...x)));
 let a=[],b=[];const upF=()=>{const ids=[...a,...b];frs=ids;Promise.all(ids.map(x=>F.getDoc(F.doc(db,'profiles',x.uid)).then(s=>Object.assign({uid:x.uid,rid:x.rid},s.exists()?s.data():{})).catch(()=>({uid:x.uid,rid:x.rid})))).then(async l=>{frs=l;await photosFor(l);paint()})};
 unsubs.push(F.onSnapshot(qq(R,['from','==',me.uid],['status','==','accepted']),s=>{a=s.docs.map(d=>({uid:d.data().to,rid:d.id}));upF()},()=>{}));
 unsubs.push(F.onSnapshot(qq(R,['to','==',me.uid],['status','==','accepted']),s=>{b=s.docs.map(d=>({uid:d.data().from,rid:d.id}));upF()},()=>{}));
 unsubs.push(F.onSnapshot(qq(R,['to','==',me.uid],['status','==','pending']),s=>{inc=s.docs.map(d=>Object.assign({id:d.id},d.data()));paint()},()=>{}));
 unsubs.push(F.onSnapshot(qq(R,['from','==',me.uid],['status','==','pending']),s=>{outR=s.docs.map(d=>Object.assign({id:d.id},d.data()));paint()},()=>{}));
 let c1=[],c2=[];const upC=()=>{chs=[...c1,...c2].sort((x,y)=>(y.t&&y.t.toMillis?y.t.toMillis():0)-(x.t&&x.t.toMillis?x.t.toMillis():0)).slice(0,30);paint()};
 unsubs.push(F.onSnapshot(qq(C,['from','==',me.uid]),s=>{c1=s.docs.map(d=>Object.assign({id:d.id},d.data()));upC()},()=>{}));
 unsubs.push(F.onSnapshot(qq(C,['to','==',me.uid]),s=>{c2=s.docs.map(d=>Object.assign({id:d.id},d.data()));upC()},()=>{}))}
// ---- UI ----
const btn=document.createElement('button');btn.type='button';btn.className='socBtn';btn.hidden=true;
const ov=document.createElement('div');ov.className='soc';ov.hidden=true;ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');document.body.appendChild(ov);
const openCh=()=>chs.filter(c=>c.status==='open'&&((c.to===me.uid&&c.toScore==null)||(c.from===me.uid&&c.fromScore==null))).length;
function paintBtn(){const n=inc.length+(me?openCh():0);btn.innerHTML=`👥 <span>${t('fr')}</span>${n?`<i class="socBadge">${n}</i>`:''}`;const lg=$('lang');if(lg&&!btn.isConnected)lg.parentNode.insertBefore(btn,lg)}
function paint(){paintBtn();if(!ov.hidden)view()}
function row(p,actions){return `<div class="socRow">${av(p)}<span class="socN"><b>${esc(p.name||t('noName'))}</b><small><i class="socDot ${isOn(p)?'on':''}"></i>${isOn(p)?t('online'):t('offline')}${p.belt?' · '+esc(p.belt):''}</small></span>${actions}</div>`}
function infoCard(p,fl){return `<div class="socInfo">${av(p)}<h3>${esc(p.name||t('noName'))}</h3><p class="mut"><i class="socDot ${isOn(p)?'on':''}"></i>${isOn(p)?t('online'):t('lastSeen')+' '+ago(p.lastSeen)}</p>
 <table><tr><th>${t('acc')}</th><td>${esc(p.name||t('noName'))}${p.created?' · '+t('created')+' '+new Date(p.created.toMillis()).toLocaleDateString('nl-BE'):''}</td></tr><tr><th>${t('belt')}</th><td>${esc(p.belt||'-')}</td></tr><tr><th>${t('xp')}</th><td>${p.xp||0}</td></tr><tr><th>${t('water')}</th><td>${p.waterDay===new Date().toISOString().slice(0,10)?(p.water||0):0} ${t('glasses')}</td></tr><tr><th>${t('push')}</th><td>${p.push||0}</td></tr><tr><th>${t('streak')}</th><td>${p.streak||0} ${t('days')}</td></tr>${fl?`<tr><th>${t('friends')}</th><td>${fl.length?fl.map(esc).join(', '):'-'}</td></tr>`:''}</table>${fl?`<p class="mut socSmall">${t('privacy')}</p>`:''}<button type="button" class="pwLink" data-a="back">${t('back')}</button></div>`}
function view(){if(!me){ov.hidden=true;return}
 const head=`<div class="pwTop"><button type="button" class="pwIco" data-a="x" aria-label="${t('close')}">✕</button><b class="pwT2">${t('fr')}${prof&&prof.name?' · '+esc(prof.name):''}</b></div>`;
 if(!prof||!prof.name){ov.innerHTML=`<div class="socIn">${head}<div class="socCard"><h3>${t('nameH')}</h3><p>${t('nameP')}</p><button type="button" class="pwBig" data-a="prof">${t('nameGo')}</button></div></div>`;return}
 if(sel){if(sel.av==='photo'&&!(sel.uid in photos)){loadPhoto(sel.uid).then(()=>view())}ov.innerHTML=`<div class="socIn">${head}${infoCard(sel)}</div>`;return}
 const tabs=[['f',t('tabF'),frs.length],['i',t('tabI'),inc.length],['s',t('tabS'),0],['c',t('tabC'),openCh()]];
 let body='';
 if(tab==='f')body=frs.length?frs.map(p=>row(p,sureId===p.rid?`<button type="button" class="pwSm" data-del="${p.rid}">${t('yes')}</button><button type="button" class="pwSm alt" data-a="nosure">${t('no')}</button>`:`<button type="button" class="pwSm" data-ch="${p.uid}">${t('chal')}</button><button type="button" class="pwSm alt" data-info="${p.uid}">${t('info')}</button><button type="button" class="pwIco sm" data-sure="${p.rid}" aria-label="${t('remove')}">✕</button>`)).join(''):`<p class="mut">${t('noFr')}</p>`;
 if(tab==='i')body=(inc.length||outR.length)?inc.map(r=>row({name:r.fromName},`<span class="socTag">${t('inc')}</span><button type="button" class="pwSm" data-acc="${r.id}">${t('accept')}</button><button type="button" class="pwSm alt" data-dec="${r.id}">${t('decline')}</button>`)).join('')+outR.map(r=>row({name:r.toName},`<span class="socTag">${t('out')}</span><button type="button" class="pwSm alt" data-del="${r.id}">${t('cancel')}</button>`)).join(''):`<p class="mut">${t('noInv')}</p>`;
 if(tab==='s'){const st=uid=>frs.some(f=>f.uid===uid)?`<span class="socTag">${t('already')}</span>`:outR.some(r=>r.to===uid)||inc.some(r=>r.from===uid)?`<span class="socTag">${t('sent')}</span>`:`<button type="button" class="pwSm" data-add="${uid}">${t('add')}</button>`;
  body=`<form id="socSF" class="socSearch"><input id="socQ" value="${esc(q)}" placeholder="${t('search')}" autocomplete="off"><button class="pwSm" type="submit">🔍</button></form>`+(q?(res.length?res.map(p=>row(p,st(p.uid))).join(''):`<p class="mut">${t('noRes')}</p>`):'')}
 if(tab==='c')body=`<p class="mut">${t('cH')}</p>`+(chs.length?chs.map(c=>{const mine=c.from===me.uid,my=mine?c.fromScore:c.toScore,th=mine?c.toScore:c.fromScore,other=mine?c.toName:c.fromName;
   let st='';if(my!=null&&th!=null)st=my>th?`🏆 ${t('win')}`:my<th?t('lose'):t('draw');else if(my==null)st=`<button type="button" class="pwSm" data-play="${c.id}">${t('play')}</button>`;else st=`<span class="socTag">${t('wait')} ${esc(other)}</span>`;
   return `<div class="socRow socCh"><span class="socN"><b>${t('you')} ${my==null?'?':my} – ${th==null?'?':th} ${esc(other)}</b><small>${c.t&&c.t.toMillis?new Date(c.t.toMillis()).toLocaleString('nl-BE',{hour12:false,day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}):''}</small></span>${st}</div>`}).join(''):`<p class="mut">${t('cNone')}</p>`);
 ov.innerHTML=`<div class="socIn">${head}<div class="socTabs" role="tablist">${tabs.map(([k,l,n])=>`<button type="button" role="tab" aria-selected="${tab===k}" data-tab2="${k}">${l}${n?` <i class="socBadge">${n}</i>`:''}</button>`).join('')}</div><div class="socList">${body}</div></div>`;
 const sf=$('socSF');if(sf)sf.addEventListener('submit',e=>{e.preventDefault();doSearch($('socQ').value)})}
async function setName(e){e.preventDefault();const{F,db}=FB;const n=($('socName').value||'').trim(),lc=n.toLowerCase(),E=$('socNameE');
 if(!/^[a-z0-9_]{3,16}$/i.test(n)){E.hidden=false;E.textContent=t('nameBad');return}
 try{const u=await F.getDoc(F.doc(db,'usernames',lc));if(u.exists()&&u.data().uid!==me.uid){E.hidden=false;E.textContent=t('nameTaken');return}
  if(!u.exists())await F.setDoc(F.doc(db,'usernames',lc),{uid:me.uid});if(prof&&prof.nameLc&&prof.nameLc!==lc){try{await F.deleteDoc(F.doc(db,'usernames',prof.nameLc))}catch(x){}}
  await F.setDoc(F.doc(db,'profiles',me.uid),{name:n,nameLc:lc},{merge:true});prof=Object.assign(prof||{},{name:n,nameLc:lc});view()}catch(x){E.hidden=false;E.textContent=t('nameTaken')}}
async function doSearch(v){q=(v||'').trim().toLowerCase();if(!q){res=[];view();return}const{F,db}=FB;
 try{const s=await F.getDocs(F.query(F.collection(db,'profiles'),F.where('nameLc','>=',q),F.where('nameLc','<=',q+''),F.limit(10)));res=s.docs.filter(d=>d.id!==me.uid).map(d=>Object.assign({uid:d.id},d.data()))}catch(x){console.warn(x);res=[]}view()}
async function sendReq(uid){const{F,db}=FB;const p=res.find(r=>r.uid===uid)||{};const back=inc.find(r=>r.from===uid);if(back){await setStatus(back.id,'accepted');return}
 const ref=F.doc(db,'friendReq',me.uid+'_'+uid),d=()=>({from:me.uid,to:uid,fromName:prof.name,toName:p.name||'',status:'pending',t:F.serverTimestamp()});
 try{await F.setDoc(ref,d())}catch(x){try{await F.deleteDoc(ref);await F.setDoc(ref,d())}catch(y){console.warn(y)}}}
async function setStatus(id,s){const{F,db}=FB;try{await F.updateDoc(F.doc(db,'friendReq',id),{status:s})}catch(x){console.warn(x)}}
async function delReq(id){const{F,db}=FB;try{await F.deleteDoc(F.doc(db,'friendReq',id))}catch(x){console.warn(x)}sureId='';view()}
async function challenge(uid){const{F,db}=FB;const p=frs.find(f=>f.uid===uid)||{};try{const r=await F.addDoc(F.collection(db,'challenges'),{from:me.uid,to:uid,fromName:prof.name,toName:p.name||'',type:'push60',fromScore:null,toScore:null,status:'open',t:F.serverTimestamp()});goPlay({id:r.id,from:me.uid,toName:p.name,fromName:prof.name})}catch(x){console.warn(x)}}
// ---- meedoen met de bestaande push-up wedstrijd ----
let active=null,compLen=0;
function goPlay(c){const other=c.from===me.uid?c.toName:c.fromName;active={id:c.id,role:c.from===me.uid?'from':'to',other};try{compLen=JSON.parse(localStorage.getItem('strongninja_comp')||'[]').length}catch(e){compLen=0}
 close();const tb=document.querySelector('[data-tab="train"]');if(tb)tb.click();setTimeout(()=>{const cc=document.querySelector('.card.comp');if(cc)cc.scrollIntoView({behavior:'smooth',block:'start'});const nm=$('cName');if(nm&&prof&&prof.name)nm.value=prof.name},300);toast(t('goNow').replace('{n}',other))}
setInterval(async()=>{if(!active||!FB)return;let C=[];try{C=JSON.parse(localStorage.getItem('strongninja_comp')||'[]')}catch(e){}if(C.length>compLen){const n=+C[C.length-1].n||0,a=active;active=null;const{F,db}=FB;const upd={};upd[a.role==='from'?'fromScore':'toScore']=n;try{await F.updateDoc(F.doc(db,'challenges',a.id),upd);toast(t('scoreSent').replace('{s}',n).replace('{n}',a.other))}catch(x){console.warn(x)}}},1500);
function open(){if(!me)return;sel=null;ov.hidden=false;document.body.classList.add('pwLock');view()}
function close(){ov.hidden=true;sel=null;sureId='';if(![...document.querySelectorAll('.rOv,.pw,.gw,.hc,.snNewOv,.snIntro,.snAuth:not([hidden]),.socAdm')].some(x=>!x.hidden))document.body.classList.remove('pwLock')}
btn.addEventListener('click',open);
ov.addEventListener('click',async e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset;
 if(d.a==='x'){close();return}if(d.a==='prof'){close();profOpen();return}if(d.a==='back'){sel=null;view();return}if(d.a==='nosure'){sureId='';view();return}
 if(d.tab2){tab=d.tab2;view();return}if(d.add){b.disabled=true;await sendReq(d.add);return}
 if(d.acc){await setStatus(d.acc,'accepted');return}if(d.dec){await setStatus(d.dec,'declined');return}
 if(d.del){await delReq(d.del);return}if(d.sure){sureId=d.sure;view();return}
 if(d.info){sel=frs.find(f=>f.uid===d.info);view();return}
 if(d.ch){b.disabled=true;await challenge(d.ch);return}
 if(d.play){const c=chs.find(x=>x.id===d.play);if(c)goPlay(c);return}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!ov.hidden)close()});
// ---- admin: spelerslijst via de tellers ----
const adm=document.createElement('div');adm.className='soc socAdm';adm.hidden=true;adm.setAttribute('role','dialog');adm.setAttribute('aria-modal','true');document.body.appendChild(adm);
async function admOpen(which){if(!FB)return;admTab=which||'all';admSel=null;adm.hidden=false;document.body.classList.add('pwLock');adm.innerHTML='<div class="socIn"><div class="snSpin"></div></div>';
 const{F,db}=FB;try{const [s,ac,pr]=await Promise.all([F.getDocs(F.collection(db,'profiles')),F.getDocs(F.collection(db,'accounts')).catch(()=>({docs:[]})),F.getDocs(F.collection(db,'presence')).catch(()=>({docs:[]}))]);const pm={};pr.docs.forEach(d=>pm[d.id]=d.data().t);const seen=new Set(s.docs.map(d=>d.id));admList=s.docs.map(d=>Object.assign({uid:d.id},d.data())).concat(ac.docs.filter(d=>!seen.has(d.id)).map(d=>({uid:d.id,lastSeen:pm[d.id],created:d.data().t}))).sort((a,b)=>(b.lastSeen&&b.lastSeen.toMillis?b.lastSeen.toMillis():0)-(a.lastSeen&&a.lastSeen.toMillis?a.lastSeen.toMillis():0))}catch(x){console.warn(x);admList=[]}admView()}
function admView(){const on=admList.filter(isOn),list=admTab==='on'?on:admList;
 const head=`<div class="pwTop"><button type="button" class="pwIco" data-a="x" aria-label="${t('close')}">✕</button><b class="pwT2">${t('players')}</b></div>`;
 if(admSel){adm.innerHTML=`<div class="socIn">${head}${liveHtml(admSel.live)}${infoCard(admSel.p,admSel.fl)}</div>`;return}
 adm.innerHTML=`<div class="socIn">${head}<div class="socTabs"><button type="button" role="tab" aria-selected="${admTab==='all'}" data-at="all">${t('all')} <i class="socBadge">${admList.length}</i></button><button type="button" role="tab" aria-selected="${admTab==='on'}" data-at="on">${t('onl')} <i class="socBadge">${on.length}</i></button></div><div class="socList">${list.map(p=>`<div class="socRow">${av(p)}<span class="socN"><b>${esc(p.name||t('noName'))}</b><small><i class="socDot ${isOn(p)?'on':''}"></i>${isOn(p)?t('online'):t('lastSeen')+' '+ago(p.lastSeen)}${p.belt?' · '+esc(p.belt):''}</small></span><button type="button" class="pwSm alt" data-ai="${p.uid}">ℹ️ ${t('info')}</button></div>`).join('')||`<p class="mut">-</p>`}</div><p class="mut socSmall">${t('privacy')}</p></div>`}
adm.addEventListener('click',async e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset;
 if(d.a==='x'){adm.hidden=true;admSel=null;liveWatch(null);if(ov.hidden)document.body.classList.remove('pwLock');return}if(d.a==='back'){admSel=null;liveWatch(null);admView();return}
 if(d.at){admTab=d.at;admView();return}
 if(d.ai){const p=admList.find(x=>x.uid===d.ai);const{F,db}=FB;let fl=[];try{const R=F.collection(db,'friendReq');const [a,c]=await Promise.all([F.getDocs(F.query(R,F.where('from','==',p.uid),F.where('status','==','accepted'))),F.getDocs(F.query(R,F.where('to','==',p.uid),F.where('status','==','accepted')))]);fl=[...a.docs.map(x=>x.data().toName),...c.docs.map(x=>x.data().fromName)]}catch(x){console.warn(x)}await photosFor([p]);admSel={p,fl};liveWatch(p.uid);admView()}});
document.addEventListener('click',e=>{const c=e.target.closest('.snCnt');if(!c||!window.SN_AUTH||!window.SN_AUTH.isAdmin())return;const onlineClicked=!!e.target.closest('#snCO')||(e.target.closest('.dot'));admOpen(onlineClicked?'on':'all')});
// ---- starten zodra de speler is ingelogd en akkoord gaf ----
let started=false;
setInterval(async()=>{const A=window.SN_AUTH;const u=A&&A.user&&A.user();const ok=u&&A.ready&&A.ready();
 if(ok&&!started){started=true;FB=A.fb();me=u;await loadProfile();if(prof&&prof.av==='photo')await loadPhoto(me.uid);btn.hidden=false;paintBtn();listen();saveProfile();if(A.repaint)A.repaint();setTimeout(autoSetup,2500)}
 else if(!ok&&started){started=false;unsubs.forEach(x=>x());unsubs=[];me=null;prof=null;frs=[];inc=[];outR=[];chs=[];btn.hidden=true;close()}},1500);
setInterval(()=>{if(started)saveProfile()},60000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&started)saveProfile()});
// ---- profiel: gebruikersnaam, profielfoto (ninja of galerij), taal, account ----
const POSES=[
 {n:'groet',a:[[50,46,38,56,34,66],[50,46,62,38,66,24]],l:[[50,64,44,78,42,90],[50,64,56,78,58,90]]},
 {n:'trap',a:[[50,46,38,40,30,34],[50,46,60,52,56,60]],l:[[50,64,46,78,44,90],[50,64,66,58,84,52]]},
 {n:'stoot',a:[[50,46,64,46,82,44],[50,46,42,54,48,58]],l:[[50,64,40,76,34,90],[50,64,60,76,66,90]]},
 {n:'sprong',a:[[50,46,40,34,36,22],[50,46,60,34,64,22]],l:[[50,64,40,70,46,80],[50,64,60,70,54,80]]},
 {n:'kracht',a:[[50,46,36,46,34,34],[50,46,64,46,66,34]],l:[[50,64,44,78,42,90],[50,64,56,78,58,90]]},
 {n:'zen',a:[[50,46,40,58,46,66],[50,46,60,58,54,66]],l:[[50,64,34,72,56,78],[50,64,66,72,44,78]]},
 {n:'zwaard',a:[[50,46,60,42,70,34],[50,46,40,54,42,62]],l:[[50,64,42,76,36,90],[50,64,58,76,64,90]],s:[70,34,88,12]},
 {n:'hoog',a:[[50,46,38,42,28,44],[50,46,62,50,70,56]],l:[[50,64,46,78,44,90],[50,64,58,48,62,28]]}];
const BG=['#16c6dc','#f59e0b','#ef4444','#8b5cf6','#22c55e','#3b82f6','#ec4899','#14b8a6'];
const ninja=(i,belt)=>{const P=POSES[i%8],L=pt=>`<polyline points="${pt[0]},${pt[1]} ${pt[2]},${pt[3]} ${pt[4]},${pt[5]}" fill="none" stroke="#1f2430" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`;
 return `<svg viewBox="0 0 100 100" class="nj" aria-hidden="true"><circle cx="50" cy="50" r="50" fill="${BG[i%8]}"/>${P.s?`<line x1="${P.s[0]}" y1="${P.s[1]}" x2="${P.s[2]}" y2="${P.s[3]}" stroke="#e5e7eb" stroke-width="3" stroke-linecap="round"/>`:''}${P.l.map(L).join('')}<line x1="50" y1="44" x2="50" y2="64" stroke="#1f2430" stroke-width="12" stroke-linecap="round"/><rect x="43" y="60" width="14" height="4" rx="1" fill="${bcol(belt)}"/>${P.a.map(L).join('')}<path d="M60 28 q10 2 14 -4 M60 30 q9 6 15 3" stroke="#ef4444" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="50" cy="31" r="11" fill="#1f2430"/><rect x="40" y="28" width="20" height="6" rx="3" fill="#f2c9a0"/><circle cx="46" cy="31" r="1.4" fill="#111"/><circle cx="54" cy="31" r="1.4" fill="#111"/></svg>`};
const photos={};
async function loadPhoto(uid){if(uid in photos)return photos[uid];photos[uid]=null;try{const s=await FB.F.getDoc(FB.F.doc(FB.db,'photos',uid));photos[uid]=s.exists()?s.data().img:null}catch(x){}return photos[uid]}
async function photosFor(list){await Promise.all(list.filter(p=>p&&p.av==='photo'&&p.uid).map(p=>loadPhoto(p.uid)))}
const PX={nl:{h:'Mijn gegevens',user:'Gebruikersnaam',pick:'🎲 Laat de app kiezen',save:'Bewaren',saved:'Bewaard!',photo:'Profielfoto',ninjas:'Kies een ninja',rnd:'🎲 Willekeurige ninja',gal:'🖼️ Kies uit galerij',tip:'Tip: een ninja is veiliger dan een foto van jezelf. Een eigen foto zien enkel je vrienden.',lang:'Taal',acc:'Account',email:'E-mail',out:'Uitloggen',sure:'Echt uitloggen?',yes:'Ja',no:'Nee',back:'Sluiten',first:'Kies eerst een gebruikersnaam en profielfoto.',bad:'3 tot 16 tekens: letters, cijfers en _.',taken:'Die naam is al bezet. Kies een andere.',big:'Die foto kon niet geladen worden.',admSee:'De beheerder ziet waar je in de app bent (bv. welke training). Nooit je camera of je scherm.'},
 en:{h:'My details',user:'Username',pick:'🎲 Let the app choose',save:'Save',saved:'Saved!',photo:'Profile picture',ninjas:'Pick a ninja',rnd:'🎲 Random ninja',gal:'🖼️ Pick from gallery',tip:'Tip: a ninja is safer than a photo of yourself. Only your friends see your own photo.',lang:'Language',acc:'Account',email:'Email',out:'Log out',sure:'Really log out?',yes:'Yes',no:'No',back:'Close',first:'First pick a username and profile picture.',bad:'3 to 16 characters: letters, numbers and _.',taken:'That name is taken. Pick another one.',big:'That photo could not be loaded.',admSee:'The admin sees where you are in the app (e.g. which workout). Never your camera or your screen.'}};
const px=k=>PX[lang()][k];
const W1=['Stille','Snelle','Sterke','Vlugge','Gouden','Zwarte','Bliksem','Schaduw','Wilde','Slimme','Stoere','IJzer'],W2=['Ninja','Tijger','Draak','Vos','Panda','Wolf','Valk','Haai','Kat','Leeuw','Cobra','Uil'];
const genName=()=>{const r=a=>a[Math.floor(Math.random()*a.length)];let n;do{n=r(W1)+r(W2)+Math.floor(10+Math.random()*90)}while(n.length>16);return n};
async function freeName(){for(let i=0;i<8;i++){const n=genName();try{const u=await FB.F.getDoc(FB.F.doc(FB.db,'usernames',n.toLowerCase()));if(!u.exists())return n}catch(x){return n}}return genName()}
const pv=document.createElement('div');pv.className='soc socProf';pv.hidden=true;pv.setAttribute('role','dialog');pv.setAttribute('aria-modal','true');document.body.appendChild(pv);
let pvMsg='',pvErr='',pvSure=false,pvName=null;
function bigAv(){return av(Object.assign({uid:me.uid},prof||{}),true)}
function pvView(){if(!me){pv.hidden=true;return}const cur=prof&&prof.av;const nm=pvName!=null?pvName:(prof&&prof.name)||'';const en=lang()==='en';
 pv.innerHTML=`<div class="socIn"><div class="pwTop"><button type="button" class="pwIco" data-p="x" aria-label="${px('back')}">✕</button><b class="pwT2">${px('h')}</b></div>
 <div class="socInfo"><span class="profBig">${bigAv()}</span><h3>${esc((prof&&prof.name)||'')}</h3>${needSetup()?`<p class="mut">${px('first')}</p>`:''}</div>
 <section class="socCard profSec"><h4>${px('user')}</h4><form id="pvNF" class="socSearch"><input id="pvN" maxlength="16" autocomplete="off" value="${esc(nm)}" placeholder="ninja_123"><button class="pwSm" type="submit">${px('save')}</button></form><button type="button" class="pwSm alt" data-p="gen">${px('pick')}</button>${pvErr?`<p class="snAuthErr">${esc(pvErr)}</p>`:''}${pvMsg?`<p class="profOk">${esc(pvMsg)}</p>`:''}</section>
 <section class="socCard profSec"><h4>${px('photo')}</h4><p class="mut socSmall">${px('ninjas')}</p><div class="profGrid">${POSES.map((x,i)=>`<button type="button" class="profNj ${String(cur)===String(i)?'on':''}" data-nj="${i}" aria-label="ninja ${x.n}">${ninja(i,prof&&prof.belt)}</button>`).join('')}</div>
 <div class="profBtns"><button type="button" class="pwSm alt" data-p="rnd">${px('rnd')}</button><label class="pwSm alt profGal">${px('gal')}<input type="file" accept="image/*" id="pvFile" hidden></label></div><p class="mut socSmall">${px('tip')}</p></section>
 <section class="socCard profSec"><h4>${px('lang')}</h4><div class="socTabs"><button type="button" role="tab" aria-selected="${!en}" data-lang2="nl">🇧🇪 Nederlands</button><button type="button" role="tab" aria-selected="${en}" data-lang2="en">🇬🇧 English</button></div></section>
 <section class="socCard profSec"><h4>${px('acc')}</h4><p><span class="mut">${px('email')}:</span> ${esc(me.email||'')}</p><p class="mut socSmall">${px('admSee')}</p>${pvSure?`<p>${px('sure')} <button type="button" class="pwSm" data-p="outY">${px('yes')}</button> <button type="button" class="pwSm alt" data-p="outN">${px('no')}</button></p>`:`<button type="button" class="pwSm alt" data-p="out">${px('out')}</button>`}</section></div>`;
 $('pvNF').addEventListener('submit',e=>{e.preventDefault();saveName($('pvN').value)});
 const f=$('pvFile');f.addEventListener('change',()=>{if(f.files[0])savePhoto(f.files[0])});
 const ni=$('pvN');ni.addEventListener('input',()=>{pvName=ni.value})}
async function saveName(n){n=(n||'').trim();pvErr='';pvMsg='';const lc=n.toLowerCase();const{F,db}=FB;
 if(!/^[a-z0-9_]{3,16}$/i.test(n)){pvErr=px('bad');pvView();return}
 try{const u=await F.getDoc(F.doc(db,'usernames',lc));if(u.exists()&&u.data().uid!==me.uid){pvErr=px('taken');pvView();return}
  if(!u.exists())await F.setDoc(F.doc(db,'usernames',lc),{uid:me.uid});if(prof&&prof.nameLc&&prof.nameLc!==lc){try{await F.deleteDoc(F.doc(db,'usernames',prof.nameLc))}catch(x){}}
  const upd={name:n,nameLc:lc};if(prof.av==null)upd.av=Math.floor(Math.random()*8);await F.setDoc(F.doc(db,'profiles',me.uid),upd,{merge:true});Object.assign(prof,upd);pvName=null;pvMsg=px('saved')}catch(x){pvErr=px('taken')}
 pvView();refresh()}
async function setAv(v){const{F,db}=FB;try{await F.setDoc(F.doc(db,'profiles',me.uid),{av:v},{merge:true});prof.av=v;pvMsg=px('saved');pvErr=''}catch(x){console.warn(x)}pvView();refresh()}
function savePhoto(file){const fr=new FileReader();fr.onload=()=>{const im=new Image();im.onload=async()=>{const c=document.createElement('canvas');c.width=c.height=160;const g=c.getContext('2d');const m=Math.min(im.width,im.height);g.drawImage(im,(im.width-m)/2,(im.height-m)/2,m,m,0,0,160,160);const url=c.toDataURL('image/jpeg',.8);
  try{await FB.F.setDoc(FB.F.doc(FB.db,'photos',me.uid),{img:url});photos[me.uid]=url;await setAv('photo')}catch(x){console.warn(x);pvErr=px('big');pvView()}};im.onerror=()=>{pvErr=px('big');pvView()};im.src=fr.result};fr.readAsDataURL(file)}
function refresh(){paintBtn();if(!ov.hidden)view();if(window.SN_AUTH&&SN_AUTH.repaint)SN_AUTH.repaint()}
function profOpen(){if(!me)return;pvMsg='';pvErr='';pvSure=false;pvName=null;pv.hidden=false;document.body.classList.add('pwLock');pvView()}
function profClose(){pv.hidden=true;if(![...document.querySelectorAll('.rOv,.pw,.gw,.hc,.snNewOv,.snIntro,.soc:not(.socProf)')].some(x=>!x.hidden))document.body.classList.remove('pwLock')}
pv.addEventListener('click',async e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset;
 if(d.p==='x'){profClose();return}
 if(d.p==='gen'){b.disabled=true;pvName=await freeName();pvErr='';pvMsg='';pvView();return}
 if(d.p==='rnd'){await setAv(Math.floor(Math.random()*8));return}
 if(d.nj!=null){await setAv(+d.nj);return}
 if(d.lang2){if(lang()!==d.lang2){const lg=$('lang');if(lg)lg.click()}return}
 if(d.p==='out'){pvSure=true;pvView();return}if(d.p==='outN'){pvSure=false;pvView();return}
 if(d.p==='outY'){profClose();if(window.SN_AUTH&&SN_AUTH.logout)await SN_AUTH.logout();return}});
const needSetup=()=>!prof||!prof.name||prof.av==null;
function autoSetup(n=0){if(!me||!needSetup()||!pv.hidden)return;const st=document.getElementById('setup');const busy=document.body.classList.contains('snWait')||[...document.querySelectorAll('.snAuth,.pw,.gw,.hc,.rOv,.snIntro,.snNewOv,.soc')].some(x=>!x.hidden)||(st&&!st.hidden&&st.offsetParent!==null);if(busy){if(n<200)setTimeout(()=>autoSetup(n+1),3000);return}profOpen()}
// ---- live activiteit voor de beheerder: alleen waar je in de app bent, nooit camera of scherm ----
let actLast='',actT=0,actSince=Date.now(),actK='',liveUn=null;
const txt=s=>{const e=document.querySelector(s);return e?(e.textContent||'').trim().slice(0,80):''};
const shown=s=>{const e=document.querySelector(s);return !!(e&&!e.hidden)};
function curAct(){let a;const hT=document.getElementById('hT'),cs=document.getElementById('cStop');
 if(shown('.gw'))a={k:'gw',n:txt('.gw .gwName'),s:txt('.gw .gwSub'),p:txt('.gw .gwProg')};
 else if(hT&&hT.offsetParent&&txt('#hT')&&txt('#hT')!=='0:00')a={k:'ride',t:txt('#hT'),d:txt('#hD'),v:txt('#hS')};
 else if(shown('#cStage')&&cs&&!cs.hidden)a={k:'comp',n:txt('#cNum'),t:txt('#cTime')};
 else if(shown('.hc'))a={k:'hair'};
 else if(shown('.pw'))a={k:'gear'};
 else if(!pv.hidden)a={k:'prof'};
 else if(!ov.hidden)a={k:'friends'};
 else{const tb=document.querySelector('nav [aria-selected="true"]');const tab=tb?tb.dataset.tab:'';a={k:'tab',tab};
  if(tab==='train'){const pr=document.querySelector('#progs [aria-pressed="true"] b');a.n=pr?pr.textContent.trim():'';a.sd=document.querySelectorAll('#exList .set.on').length;a.st=document.querySelectorAll('#exList .set').length}}
 return a}
setInterval(async()=>{if(!started||!FB||!me||document.hidden)return;const a=curAct();const key=a.k+(a.tab||'');if(key!==actK){actK=key;actSince=Date.now()}a.since=actSince;const j=JSON.stringify(a);if(j===actLast&&Date.now()-actT<25000)return;actLast=j;actT=Date.now();try{await FB.F.setDoc(FB.F.doc(FB.db,'presence',me.uid),{t:FB.F.serverTimestamp(),act:a},{merge:true})}catch(x){}},4000);
const LXT={nl:{liveH:'Live',off:'Nu niet actief in de app.',gw:'Begeleide training',ride:'Rit',comp:'Push-up wedstrijd',page:'Pagina',t_today:'Vandaag',t_train:'Train',t_prog:'Progressie',sets:'reeksen',k_hair:'Kapsel-coach',k_gear:'Mijn apparatuur',k_prof:'Mijn gegevens',k_friends:'Vrienden',since:'Hiermee bezig sinds',kmh:'km/u'},
 en:{liveH:'Live',off:'Not active in the app right now.',gw:'Guided workout',ride:'Ride',comp:'Push-up contest',page:'Page',t_today:'Today',t_train:'Train',t_prog:'Progress',sets:'sets',k_hair:'Haircut coach',k_gear:'My equipment',k_prof:'My details',k_friends:'Friends',since:'Doing this since',kmh:'km/h'}};
const LX=k=>LXT[lang()][k]||'';
function liveHtml(L){if(!L||!L.act||!L.t||!L.t.toMillis||Date.now()-L.t.toMillis()>2*60*1000)return `<div class="socLive off"><b>⚪ ${LX('liveH')}</b><p class="mut">${LX('off')}</p></div>`;const a=L.act;let w='';
 if(a.k==='gw')w=`${LX('gw')}: <b>${esc(a.n)}</b>${a.s?' · '+esc(a.s):''}${a.p?' · '+esc(a.p):''}`;
 else if(a.k==='ride')w=`${LX('ride')}: <b>${esc(a.t)}</b> · ${esc(a.d)} km · ${esc(a.v)} ${LX('kmh')}`;
 else if(a.k==='comp')w=`${LX('comp')}: <b>${esc(a.n||'0')}</b> push-ups · ${esc(a.t)} s`;
 else if(a.k==='tab')w=`${LX('page')}: <b>${LX('t_'+a.tab)||esc(a.tab)}</b>${a.tab==='train'&&a.n?` · ${esc(a.n)} · ${LX('sets')} ${a.sd||0}/${a.st||0}`:''}`;
 else w=`<b>${LX('k_'+a.k)||esc(a.k)}</b>`;
 return `<div class="socLive"><b><i class="socDot on"></i> ${LX('liveH')}</b><p>${w}</p><p class="mut socSmall">${LX('since')} ${a.since?new Date(a.since).toLocaleTimeString('nl-BE',{hour:'2-digit',minute:'2-digit',hour12:false}):'-'}</p></div>`}
function liveWatch(uid){if(liveUn){liveUn();liveUn=null}if(!uid||!FB)return;liveUn=FB.F.onSnapshot(FB.F.doc(FB.db,'presence',uid),s=>{if(admSel&&admSel.p.uid===uid){admSel.live=s.exists()?s.data():null;if(!adm.hidden)admView()}},()=>{})}
setInterval(()=>{if(!adm.hidden&&admSel)admView()},20000);
window.SN_PROF={ok:()=>!!me,open:profOpen,chip:()=>me&&prof?`<span class="snMeAv">${av(Object.assign({uid:me.uid},prof))}</span>${esc(prof.name||(me.email||'').split('@')[0])}`:esc(((me&&me.email)||'').split('@')[0])};
new MutationObserver(()=>{if(!pv.hidden)pvView()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
new MutationObserver(()=>{paintBtn();if(!ov.hidden)view();if(!adm.hidden)admView()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();
// Strong Ninja: in een ingebed venster (bv. VS Code preview) kan de browser je login niet onthouden
(()=>{let emb=false;try{emb=window.top!==window}catch(e){emb=true}if(!emb)return;
const nl=document.documentElement.lang!=='en';const d=document.createElement('div');d.className='snEmb';
d.innerHTML=`<span>${nl?'Hier onthoudt je browser je login niet.':'Your browser cannot remember your login here.'}</span><a href="${location.href.split('#')[0]}" target="_blank" rel="noopener">${nl?'Open in eigen tabblad':'Open in own tab'}</a>`;
document.body.appendChild(d)})();
