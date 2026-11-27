// Strong Ninja: account verwijderen (vereist voor Play Store)
(()=>{const en=()=>document.documentElement.lang==='en';const T=(n,e)=>en()?e:n;
async function wipe(btn){const S=window.SN_AUTH;if(!S||!S.user())return;
if(!confirm(T('Weet je zeker dat je je account wilt verwijderen? Al je voortgang gaat weg.','Are you sure you want to delete your account? All progress will be lost.')))return;
if(prompt(T('Typ VERWIJDER om te bevestigen','Type DELETE to confirm'))!==T('VERWIJDER','DELETE'))return;
btn.disabled=true;btn.textContent='…';const {A,F,db,auth}=S.fb();const u=auth.currentUser;
const del=async(c,id)=>{try{await F.deleteDoc(F.doc(db,c,id))}catch(e){}};
try{let lc=null;try{const p=await F.getDoc(F.doc(db,'profiles',u.uid));lc=p.exists()&&p.data().nameLc}catch(e){}
if(lc)await del('usernames',lc);for(const c of['photos','profiles','presence','accounts','users'])await del(c,u.uid);
try{localStorage.removeItem('strongninja_shop')}catch(e){}
await A.deleteUser(u);alert(T('Je account is verwijderd. Tot ziens, ninja!','Your account has been deleted. Bye, ninja!'));location.reload()}
catch(e){btn.disabled=false;btn.textContent=T('🗑️ Account verwijderen','🗑️ Delete account');
alert(e&&e.code==='auth/requires-recent-login'?T('Log even uit en opnieuw in, en probeer dan nog eens.','Please log out and in again, then try once more.'):T('Dat lukte niet: ','That failed: ')+(e&&e.message||e))}}
function add(){const pv=document.querySelector('.socProf');if(!pv||pv.hidden||pv.querySelector('.snDel'))return;
const d=document.createElement('div');d.className='snDel';d.style.cssText='margin-top:18px;padding-top:12px;border-top:1px solid rgba(255,255,255,.12);text-align:center';
d.innerHTML=`<button type="button" style="background:transparent;color:#f87171;border:1px solid #f87171;border-radius:10px;padding:8px 14px;font-weight:700;cursor:pointer">${T('🗑️ Account verwijderen','🗑️ Delete account')}</button><div style="font-size:12px;opacity:.6;margin-top:6px"><a href="privacy.html" target="_blank" style="color:inherit">${T('Privacybeleid','Privacy policy')}</a></div>`;
const b=d.querySelector('button');b.onclick=()=>wipe(b);pv.appendChild(d)}
new MutationObserver(add).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['hidden']})})();

// Strong Ninja: leeftijd (geboortemaand + jaar). Blijft privé: alleen in je eigen account (wordt mee bewaard in de cloud, niemand anders kan het lezen).
(()=>{const K='strongninja_age';const en=()=>document.documentElement.lang==='en';const T=(n,e)=>en()?e:n;
const get=()=>{try{const v=JSON.parse(localStorage.getItem(K)||'null');return v&&v.y?v:null}catch(e){return null}};
const age=()=>{const v=get();if(!v)return null;const n=new Date();let a=n.getFullYear()-v.y;if(n.getMonth()+1<v.m)a--;return a};
window.SN_AGE=age;
const M=()=>en()?['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']:['jan','feb','mrt','apr','mei','jun','jul','aug','sep','okt','nov','dec'];
function ask(force){if(document.getElementById('snAge'))return;const v=get()||{};const Y=new Date().getFullYear();
 const d=document.createElement('div');d.id='snAge';d.style.cssText='position:fixed;inset:0;z-index:99998;background:rgba(0,0,0,.65);display:grid;place-items:center;padding:16px;font-family:Inter,system-ui,sans-serif';
 let ys='';for(let y=Y-6;y>=Y-90;y--)ys+=`<option value="${y}" ${v.y===y?'selected':''}>${y}</option>`;
 d.innerHTML=`<div style="max-width:420px;width:100%;background:#0b2a33;color:#fff;border-radius:18px;padding:22px;text-align:center"><div style="font-size:38px">🎂</div><h2 style="margin:6px 0">${T('Wanneer ben je geboren?','When were you born?')}</h2><p style="opacity:.8;margin:0 0 14px;font-size:14px">${T('Nodig voor je groei-voorspelling en om de app veilig te houden. Alleen jij ziet dit.','Needed for your growth prediction and to keep the app safe. Only you can see this.')}</p>
 <div style="display:flex;gap:8px;justify-content:center;margin-bottom:14px"><select id="snAgeM" style="padding:10px;border-radius:10px;font-size:16px"><option value="">${T('Maand','Month')}</option>${M().map((x,i)=>`<option value="${i+1}" ${v.m===i+1?'selected':''}>${x}</option>`).join('')}</select><select id="snAgeY" style="padding:10px;border-radius:10px;font-size:16px"><option value="">${T('Jaar','Year')}</option>${ys}</select></div>
 <p id="snAgeE" style="color:#f87171;min-height:18px;margin:0 0 8px;font-size:14px"></p><button id="snAgeOk" style="width:100%;background:#16c6dc;color:#05252b;font-weight:900;border:0;border-radius:14px;padding:14px;cursor:pointer">${T('Opslaan','Save')}</button>${force?'':`<button id="snAgeX" style="width:100%;margin-top:8px;background:none;border:1px solid rgba(255,255,255,.3);color:#fff;border-radius:14px;padding:10px;cursor:pointer">${T('Annuleer','Cancel')}</button>`}</div>`;
 document.body.appendChild(d);
 d.querySelector('#snAgeOk').onclick=()=>{const m=+d.querySelector('#snAgeM').value,y=+d.querySelector('#snAgeY').value;if(!m||!y){d.querySelector('#snAgeE').textContent=T('Kies je maand en jaar.','Pick your month and year.');return}
  try{localStorage.setItem(K,JSON.stringify({m,y}));localStorage.setItem('sn_local_t',String(Date.now()))}catch(e){}d.remove();paint()};
 const x=d.querySelector('#snAgeX');if(x)x.onclick=()=>d.remove()}
// toon leeftijd in Mijn gegevens
function paint(){const pv=document.querySelector('.socProf');if(!pv||pv.hidden)return;let b=pv.querySelector('.snAgeRow');const a=age();
 if(!b){b=document.createElement('div');b.className='snAgeRow';b.style.cssText='margin-top:14px;padding:10px 12px;border-radius:12px;background:rgba(255,255,255,.06);display:flex;justify-content:space-between;align-items:center;gap:8px';const del=pv.querySelector('.snDel');pv.insertBefore(b,del||null)}
 b.innerHTML=`<span>🎂 ${T('Leeftijd','Age')}: <b>${a==null?'?':a}</b> <span style="opacity:.6;font-size:12px">(${T('alleen jij ziet dit','only you see this')})</span></span><button type="button" style="background:none;border:1px solid rgba(255,255,255,.3);color:inherit;border-radius:10px;padding:6px 10px;cursor:pointer">${T('Wijzig','Change')}</button>`;
 b.querySelector('button').onclick=()=>ask(false)}
new MutationObserver(paint).observe(document.body,{subtree:true,attributes:true,attributeFilter:['hidden']});
// jonger dan 13: bestellen in de winkel alleen met akkoord van een ouder
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-order]');if(!b)return;const a=age();
 if(a!=null&&a<13&&!confirm(T('Je bent jonger dan 13. Is je ouder akkoord met deze bestelling?','You are under 13. Does your parent agree to this order?'))){e.stopPropagation();e.preventDefault()}},true);
// vraag het automatisch als het nog niet ingevuld is (na inloggen)
setInterval(()=>{try{if(window.SN_AUTH&&SN_AUTH.ready()&&!get()&&!document.querySelector('#snMove,.snIntro:not([hidden])'))ask(true)}catch(e){}},4000);
})();
