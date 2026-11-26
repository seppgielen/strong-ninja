// Strong Ninja: winkel (enkel uiterlijk + supporter). Speler bestelt, beheerder krijgt mail en geeft vrij. Beveiligd met Firestore-regels.
(()=>{
const ADMIN_UID='sD76ZGw40FcJHb849FCbBPTDYTL2',ADMIN_MAIL='seppgielen@gmail.com';
const KEY='strongninja_shop';const $=id=>document.getElementById(id);const en=()=>document.documentElement.lang==='en';
const T={nl:{btn:'Winkel',h:'Ninja-winkel',i:'Alles hier is enkel uiterlijk of om de app te steunen. Je wordt er niet sterker van in het spel. Vraag altijd eerst een ouder.',owned:'In bezit',use:'Gebruik',on:'Actief',buy:'Vraag een ouder',soon:'Binnenkort te koop',parentH:'Voor de ouder',parentP:'Druk op Bestellen. De beheerder krijgt een bericht. Betaal met de referentie; na de betaling wordt het vrijgegeven.',pay:'Bestellen',ref:'Referentie',wait:'Besteld, wacht op vrijgave',cash:'Betaal aan de beheerder (cash of zoals afgesproken) en noem de referentie.',qr:'Scan met je bank-app (Wero/KBC/Belfius…)',cancel:'Annuleer',ok:'Vrijgegeven! Veel plezier.',bad:'Dat lukte niet, probeer later opnieuw.',admH:'💶 Betalingen (beheer)',admNone:'Geen open bestellingen.',admOk:'✅ Geef vrij',admNo:'✖ Weiger',admTot:'Totaal ontvangen',admPay:'Rekening voor QR (optioneel)',admName:'Naam',admIban:'IBAN',admSave:'Bewaar',saved:'Bewaard',close:'Sluiten',none:'Standaard',sup:'Supporter',supP:'Gouden naam en een supporter-badge. Je steunt de makers van Strong Ninja.',skinsH:'Ninja-skins',themesH:'Kleurthema’s',allH:'Alles-in-1 pakket'},
 en:{btn:'Shop',h:'Ninja shop',i:'Everything here is only looks or to support the app. It does not make you stronger in the game. Always ask a parent first.',owned:'Owned',use:'Use',on:'Active',buy:'Ask a parent',soon:'Coming soon',parentH:'For the parent',parentP:'Press Order. The admin gets a message. Pay using the reference; after payment it gets unlocked.',pay:'Order',ref:'Reference',wait:'Ordered, waiting for approval',cash:'Pay the admin (cash or as agreed) and mention the reference.',qr:'Scan with your banking app (Wero/KBC/Belfius…)',cancel:'Cancel',ok:'Unlocked! Have fun.',bad:'That failed, try again later.',admH:'💶 Payments (admin)',admNone:'No open orders.',admOk:'✅ Approve',admNo:'✖ Reject',admTot:'Total received',admPay:'Account for QR (optional)',admName:'Name',admIban:'IBAN',admSave:'Save',saved:'Saved',close:'Close',none:'Default',sup:'Supporter',supP:'Golden name and a supporter badge. You support the makers of Strong Ninja.',skinsH:'Ninja skins',themesH:'Colour themes',allH:'All-in-1 pack'}};
const t=k=>T[en()?'en':'nl'][k];
const SKINS=[['gold','Goud','Gold','sepia(1) saturate(5) hue-rotate(5deg) brightness(1.05)'],['neon','Neon','Neon','saturate(3) hue-rotate(90deg) brightness(1.1)'],['shadow','Schaduw','Shadow','grayscale(1) contrast(1.4) brightness(.8)'],['ice','IJs','Ice','hue-rotate(180deg) saturate(1.6) brightness(1.15)']];
const THEMES=[['lava','Lava','Lava','#ef4444'],['ocean','Oceaan','Ocean','#2563eb'],['jungle','Jungle','Jungle','#16a34a'],['royal','Koninklijk','Royal','#7c3aed']];
const PACKS=[['skins','€1,99'],['themes','€1,99'],['supporter','€4,99'],['all','€6,99']];
let S={own:[],skin:'',theme:''};try{S=Object.assign(S,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}apply()};
const fb=()=>{try{return window.SN_AUTH&&SN_AUTH.ready()&&SN_AUTH.fb()}catch(e){return null}};const me=()=>{const f=fb();return f&&f.auth.currentUser};
const adm=()=>{const u=me();return !!(u&&u.uid===ADMIN_UID)};const has=p=>adm()||S.own.includes(p)||S.own.includes('all');
function apply(){let st=$('snShopCss');if(!st){st=document.createElement('style');st.id='snShopCss';document.head.appendChild(st)}let c='';
 const sk=SKINS.find(x=>x[0]===S.skin);if(sk&&has('skins'))c+=`.snMeAv svg,.profBig svg{filter:${sk[3]}}`;
 const th=THEMES.find(x=>x[0]===S.theme);if(th&&has('themes'))c+=`:root{--red:${th[3]}}nav [aria-selected="true"],.pwBig,.pwSm:not(.alt){background:${th[3]}!important;color:#fff!important}`;
 if(has('supporter'))c+=`.snMe{color:#fbbf24!important;text-shadow:0 0 8px rgba(251,191,36,.6)}.snMe::after{content:' ⭐';}`;st.textContent=c}
// knop in de kopbalk
const btn=document.createElement('button');btn.type='button';btn.className='socBtn snShopBtn';
const paintBtn=()=>{btn.innerHTML=`🛒 <span>${t('btn')}</span>`;const lg=$('lang');if(lg&&!btn.isConnected)lg.parentNode.insertBefore(btn,lg)};
const ov=document.createElement('div');ov.className='soc snShop';ov.hidden=true;ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');document.body.appendChild(ov);
let msg='',err='',ask='';
const card=(id,title,desc,price,body)=>`<section class="socCard profSec"><h4>${title} <span class="mut" style="float:right">${has(id)?'✓ '+t('owned'):price}</span></h4>${desc?`<p class="mut socSmall">${desc}</p>`:''}${body||''}${has(id)?'':(myOrd(id)?ordBox(myOrd(id)):ask===id?`<div class="snShopAsk"><b>${t('parentH')}</b><p class="socSmall">${t('parentP')}</p><button type="button" class="pwSm" data-order="${id}">🧾 ${t('pay')}</button></div>`:`<button type="button" class="pwSm" data-ask="${id}">👪 ${t('buy')}</button>`)}</section>`;
function view(){const E=en();const P=Object.fromEntries(PACKS);
 const sk=`<div class="snShopRow">${[['', t('none'),'']].concat(SKINS.map(x=>[x[0],E?x[2]:x[1],x[3]])).map(([k,n,f])=>`<button type="button" class="snShopIt ${S.skin===k?'on':''}" data-skin="${k}" ${k&&!has('skins')?'disabled':''}><span class="snShopNj" style="filter:${f||'none'}">🥷</span>${n}</button>`).join('')}</div>`;
 const th=`<div class="snShopRow">${[['',t('none'),'#16c6dc']].concat(THEMES.map(x=>[x[0],E?x[2]:x[1],x[3]])).map(([k,n,c])=>`<button type="button" class="snShopIt ${S.theme===k?'on':''}" data-theme="${k}" ${k&&!has('themes')?'disabled':''}><span class="snShopDot" style="background:${c}"></span>${n}</button>`).join('')}</div>`;
 ov.innerHTML=`<div class="socIn"><div class="pwTop"><button type="button" class="pwIco" data-a="x" aria-label="${t('close')}">✕</button><b class="pwT2">${t('h')}</b></div><p class="mut">${t('i')}</p>
 ${card('skins',t('skinsH'),'',P.skins,sk)}${card('themes',t('themesH'),'',P.themes,th)}${card('supporter','⭐ '+t('sup'),t('supP'),P.supporter,'')}${card('all','🎁 '+t('allH'),'',P.all,'')}
 ${err?`<p class="snAuthErr">${err}</p>`:''}${msg?`<p class="profOk">${msg}</p>`:''}${adm()?admBox():''}</div>`;
 drawQR()}
// ---- bestellingen (beveiligd door Firestore-regels: speler kan enkel 'open' maken, alleen beheerder kan vrijgeven) ----
let ORD=[],ALL=[],CFG={},subU=null,unsub=[];
const AMT={skins:'1.99',themes:'1.99',supporter:'4.99',all:'6.99'};
const myOrd=id=>ORD.find(o=>o.item===id&&o.status==='open');
const rnd=()=>{const a=new Uint8Array(4);crypto.getRandomValues(a);return 'SN'+[...a].map(b=>b.toString(36).padStart(2,'0')).join('').toUpperCase().slice(0,6)};
const ordBox=o=>`<div class="snShopAsk"><b>⏳ ${t('wait')}</b><p class="socSmall">${t('ref')}: <b>${o.ref}</b> · €${AMT[o.item].replace('.',',')}</p>${CFG.iban?`<p class="socSmall">${t('qr')}</p><div class="snQR" data-qr="${o.ref}" data-amt="${AMT[o.item]}"></div>`:`<p class="socSmall">${t('cash')}</p>`}<button type="button" class="pwSm alt" data-cancel="${o.ref}">${t('cancel')}</button></div>`;
async function order(id){const f=fb(),u=me();if(!f||!u)return;err='';msg='';const ref=rnd();
 try{await f.F.setDoc(f.F.doc(f.db,'orders',ref),{uid:u.uid,email:u.email||'',item:id,ref,status:'open',t:f.F.serverTimestamp()});
  ORD=ORD.concat([{ref,item:id,status:'open'}]);ask='';view();
  try{const go=e=>e.send('service_ig5pxaf','template_y1hpj3h',{to_email:ADMIN_MAIL,code:ref,email:(u.email||'?')+' wil '+id+' (€'+AMT[id]+')',link:location.origin+location.pathname+'?winkel=1',time:new Date().toLocaleString('nl-BE',{hour12:false})});
   if(window.emailjs){emailjs.init({publicKey:'cAGjHaZpuYxclikSa'});await go(emailjs)}else{await new Promise((ok,no)=>{const sc=document.createElement('script');sc.src='https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';sc.onload=ok;sc.onerror=no;document.head.appendChild(sc)});emailjs.init({publicKey:'cAGjHaZpuYxclikSa'});await go(emailjs)}}catch(x){console.warn('mail',x)}
 }catch(x){err=t('bad');view()}}
async function cancelOrd(ref){const f=fb();if(!f)return;try{await f.F.deleteDoc(f.F.doc(f.db,'orders',ref));ORD=ORD.filter(o=>o.ref!==ref);view()}catch(x){err=t('bad');view()}}
async function setSt(ref,st){const f=fb();if(!f||!adm())return;try{await f.F.updateDoc(f.F.doc(f.db,'orders',ref),{status:st,paidAt:f.F.serverTimestamp()})}catch(x){err=t('bad');view()}}
async function saveCfg(){const f=fb();if(!f||!adm())return;const iban=($('snIban').value||'').replace(/\s+/g,'').toUpperCase(),name=($('snIbName').value||'').trim().slice(0,60);
 if(iban&&!/^[A-Z]{2}\d{2}[A-Z0-9]{8,30}$/.test(iban)){err='IBAN?';view();return}
 try{await f.F.setDoc(f.F.doc(f.db,'config','pay'),{iban,name});CFG={iban,name};msg=t('saved');err='';view()}catch(x){err=t('bad');view()}}
const esc=x=>String(x||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function admBox(){const open=ALL.filter(o=>o.status==='open'),paid=ALL.filter(o=>o.status==='paid');const tot=paid.reduce((a,o)=>a+parseFloat(AMT[o.item]||0),0);
 return `<section class="socCard profSec"><h4>${t('admH')}</h4>${open.length?open.map(o=>`<div class="snOrd"><div><b>${esc(o.email)}</b><br><span class="mut socSmall">${esc(o.item)} · €${AMT[o.item]} · ${esc(o.ref)}</span></div><div><button type="button" class="pwSm" data-ok="${esc(o.ref)}">${t('admOk')}</button> <button type="button" class="pwSm alt" data-no="${esc(o.ref)}">${t('admNo')}</button></div></div>`).join(''):`<p class="mut socSmall">${t('admNone')}</p>`}
 <p><b>${t('admTot')}: €${tot.toFixed(2).replace('.',',')}</b> <span class="mut socSmall">(${paid.length})</span></p>
 <details><summary class="socSmall">${t('admPay')}</summary><div class="socSearch" style="margin-top:6px"><input id="snIbName" placeholder="${t('admName')}" value="${esc(CFG.name)}"><input id="snIban" placeholder="${t('admIban')}" value="${esc(CFG.iban)}" autocomplete="off"><button type="button" class="pwSm" data-a="iban">${t('admSave')}</button></div></details></section>`}
let qrLib=null;const loadQR=()=>qrLib||(qrLib=new Promise((ok,no)=>{const sc=document.createElement('script');sc.src='https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js';sc.onload=()=>ok(window.qrcode);sc.onerror=no;document.head.appendChild(sc)}));
async function drawQR(){const els=[...ov.querySelectorAll('[data-qr]')];if(!els.length||!CFG.iban)return;try{const Q=await loadQR();els.forEach(el=>{const pl=['BCD','002','1','SCT','',(CFG.name||'Strong Ninja').slice(0,70),CFG.iban,'EUR'+el.dataset.amt,'','',el.dataset.qr].join('\n');const q=Q(0,'M');q.addData(pl);q.make();el.innerHTML=q.createImgTag(4,8)})}catch(x){}}
async function listen(){const f=fb(),u=me();if(!f||!u){if(subU){unsub.forEach(x=>{try{x()}catch(e){}});unsub=[];subU=null}return}if(subU===u.uid)return;subU=u.uid;const F=f.F;
 try{const c=await F.getDoc(F.doc(f.db,'config','pay'));CFG=c.exists()?c.data():{}}catch(e){}
 unsub.push(F.onSnapshot(F.query(F.collection(f.db,'orders'),F.where('uid','==',u.uid)),s=>{ORD=s.docs.map(d=>d.data());let ch=false;ORD.filter(o=>o.status==='paid').forEach(o=>{if(!S.own.includes(o.item)){S.own.push(o.item);ch=true}});if(ch){save();msg=t('ok')}if(!ov.hidden)view()},()=>{}));
 if(adm())unsub.push(F.onSnapshot(F.collection(f.db,'orders'),s=>{ALL=s.docs.map(d=>d.data());if(!ov.hidden)view()},()=>{}));
 if(new URLSearchParams(location.search).get('winkel')==='1')setTimeout(()=>btn.click(),800)}
ov.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset;
 if(d.a==='x'){ov.hidden=true;if(![...document.querySelectorAll('.soc:not(.snShop),.pw,.gw,.hc,.rOv')].some(x=>!x.hidden))document.body.classList.remove('pwLock');return}
 if(d.ask){ask=d.ask;view();return}if(d.order){order(d.order);return}if(d.cancel){cancelOrd(d.cancel);return}if(d.ok){setSt(d.ok,'paid');return}if(d.no){setSt(d.no,'rejected');return}if(d.a==='iban'){saveCfg();return}if(d.skin!=null){S.skin=d.skin;save();view();return}if(d.theme!=null){S.theme=d.theme;save();view();return}});
btn.addEventListener('click',()=>{msg='';err='';ask='';ov.hidden=false;document.body.classList.add('pwLock');view()});
const st=document.createElement('style');st.textContent=`.snShopRow{display:flex;flex-wrap:wrap;gap:8px}.snShopIt{display:flex;flex-direction:column;align-items:center;gap:4px;min-width:72px;padding:8px;border-radius:12px;border:2px solid transparent;background:rgba(255,255,255,.08);color:#fff;font-weight:700;font-size:12px;cursor:pointer}.snShopIt.on{border-color:#16c6dc}.snShopIt:disabled{opacity:.45;cursor:not-allowed}.snShopNj{font-size:28px}.snShopDot{width:28px;height:28px;border-radius:50%}.snShopAsk{background:rgba(255,255,255,.06);border-radius:12px;padding:10px;margin-top:4px}.snQR img{background:#fff;padding:6px;border-radius:8px;margin:6px 0}.snOrd{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.08);flex-wrap:wrap}`;document.head.appendChild(st);
setInterval(()=>{if(window.SN_AUTH&&SN_AUTH.ready&&SN_AUTH.ready())paintBtn();else if(btn.isConnected)btn.remove()},1500);
new MutationObserver(()=>{if(btn.isConnected)paintBtn();if(!ov.hidden)view()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
apply();setInterval(listen,2000);})();
