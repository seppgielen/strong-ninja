// Strong Ninja: winkel (enkel uiterlijk + supporter), betalen via een ouder, ontgrendelen met een code
(()=>{
// >>> Hier komen de betaallinks van Lemon Squeezy (of Stripe) zodra Rob ze heeft <<<
const CHECKOUT={skins:'',themes:'',supporter:'',all:''};
const KEY='strongninja_shop';const $=id=>document.getElementById(id);const en=()=>document.documentElement.lang==='en';
const T={nl:{btn:'Winkel',h:'Ninja-winkel',i:'Alles hier is enkel uiterlijk of om de app te steunen. Je wordt er niet sterker van in het spel. Vraag altijd eerst een ouder.',owned:'In bezit',use:'Gebruik',on:'Actief',buy:'Vraag een ouder',soon:'Binnenkort te koop',parentH:'Voor de ouder',parentP:'Betalen gebeurt veilig via onze betaalpartner. Na de betaling krijg je een code per mail. Typ die code hieronder in.',pay:'Naar betalen',code:'Heb je een code?',codePh:'Code uit de mail',codeGo:'Ontgrendel',ok:'Ontgrendeld! Veel plezier.',bad:'Die code klopt niet of is al gebruikt.',close:'Sluiten',none:'Standaard',sup:'Supporter',supP:'Gouden naam en een supporter-badge. Je steunt de makers van Strong Ninja.',skinsH:'Ninja-skins',themesH:'Kleurthema’s',allH:'Alles-in-1 pakket'},
 en:{btn:'Shop',h:'Ninja shop',i:'Everything here is only looks or to support the app. It does not make you stronger in the game. Always ask a parent first.',owned:'Owned',use:'Use',on:'Active',buy:'Ask a parent',soon:'Coming soon',parentH:'For the parent',parentP:'Payment is handled safely by our payment partner. After paying you get a code by email. Type that code below.',pay:'Go to payment',code:'Got a code?',codePh:'Code from email',codeGo:'Unlock',ok:'Unlocked! Have fun.',bad:'That code is wrong or already used.',close:'Close',none:'Default',sup:'Supporter',supP:'Golden name and a supporter badge. You support the makers of Strong Ninja.',skinsH:'Ninja skins',themesH:'Colour themes',allH:'All-in-1 pack'}};
const t=k=>T[en()?'en':'nl'][k];
const SKINS=[['gold','Goud','Gold','sepia(1) saturate(5) hue-rotate(5deg) brightness(1.05)'],['neon','Neon','Neon','saturate(3) hue-rotate(90deg) brightness(1.1)'],['shadow','Schaduw','Shadow','grayscale(1) contrast(1.4) brightness(.8)'],['ice','IJs','Ice','hue-rotate(180deg) saturate(1.6) brightness(1.15)']];
const THEMES=[['lava','Lava','Lava','#ef4444'],['ocean','Oceaan','Ocean','#2563eb'],['jungle','Jungle','Jungle','#16a34a'],['royal','Koninklijk','Royal','#7c3aed']];
const PACKS=[['skins','€1,99'],['themes','€1,99'],['supporter','€4,99'],['all','€6,99']];
let S={own:[],skin:'',theme:''};try{S=Object.assign(S,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}apply()};
const adm=()=>{try{return !!(window.SN_AUTH&&SN_AUTH.isAdmin())}catch(e){return false}};const has=p=>adm()||S.own.includes(p)||S.own.includes('all');
function apply(){let st=$('snShopCss');if(!st){st=document.createElement('style');st.id='snShopCss';document.head.appendChild(st)}let c='';
 const sk=SKINS.find(x=>x[0]===S.skin);if(sk&&has('skins'))c+=`.snMeAv svg,.profBig svg{filter:${sk[3]}}`;
 const th=THEMES.find(x=>x[0]===S.theme);if(th&&has('themes'))c+=`:root{--red:${th[3]}}nav [aria-selected="true"],.pwBig,.pwSm:not(.alt){background:${th[3]}!important;color:#fff!important}`;
 if(has('supporter'))c+=`.snMe{color:#fbbf24!important;text-shadow:0 0 8px rgba(251,191,36,.6)}.snMe::after{content:' ⭐';}`;st.textContent=c}
// knop in de kopbalk
const btn=document.createElement('button');btn.type='button';btn.className='socBtn snShopBtn';
const paintBtn=()=>{btn.innerHTML=`🛒 <span>${t('btn')}</span>`;const lg=$('lang');if(lg&&!btn.isConnected)lg.parentNode.insertBefore(btn,lg)};
const ov=document.createElement('div');ov.className='soc snShop';ov.hidden=true;ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');document.body.appendChild(ov);
let msg='',err='',ask='';
const card=(id,title,desc,price,body)=>`<section class="socCard profSec"><h4>${title} <span class="mut" style="float:right">${has(id)?'✓ '+t('owned'):price}</span></h4>${desc?`<p class="mut socSmall">${desc}</p>`:''}${body||''}${has(id)?'':(ask===id?`<div class="snShopAsk"><b>${t('parentH')}</b><p class="socSmall">${t('parentP')}</p>${CHECKOUT[id]?`<a class="pwSm" href="${CHECKOUT[id]}" target="_blank" rel="noopener">${t('pay')}</a>`:`<span class="socTag">${t('soon')}</span>`}</div>`:`<button type="button" class="pwSm" data-ask="${id}">👪 ${t('buy')}</button>`)}</section>`;
function view(){const E=en();const P=Object.fromEntries(PACKS);
 const sk=`<div class="snShopRow">${[['', t('none'),'']].concat(SKINS.map(x=>[x[0],E?x[2]:x[1],x[3]])).map(([k,n,f])=>`<button type="button" class="snShopIt ${S.skin===k?'on':''}" data-skin="${k}" ${k&&!has('skins')?'disabled':''}><span class="snShopNj" style="filter:${f||'none'}">🥷</span>${n}</button>`).join('')}</div>`;
 const th=`<div class="snShopRow">${[['',t('none'),'#16c6dc']].concat(THEMES.map(x=>[x[0],E?x[2]:x[1],x[3]])).map(([k,n,c])=>`<button type="button" class="snShopIt ${S.theme===k?'on':''}" data-theme="${k}" ${k&&!has('themes')?'disabled':''}><span class="snShopDot" style="background:${c}"></span>${n}</button>`).join('')}</div>`;
 ov.innerHTML=`<div class="socIn"><div class="pwTop"><button type="button" class="pwIco" data-a="x" aria-label="${t('close')}">✕</button><b class="pwT2">${t('h')}</b></div><p class="mut">${t('i')}</p>
 ${card('skins',t('skinsH'),'',P.skins,sk)}${card('themes',t('themesH'),'',P.themes,th)}${card('supporter','⭐ '+t('sup'),t('supP'),P.supporter,'')}${card('all','🎁 '+t('allH'),'',P.all,'')}
 <section class="socCard profSec"><h4>${t('code')}</h4><form id="snShopF" class="socSearch"><input id="snShopC" autocomplete="off" placeholder="${t('codePh')}"><button class="pwSm" type="submit">${t('codeGo')}</button></form>${err?`<p class="snAuthErr">${err}</p>`:''}${msg?`<p class="profOk">${msg}</p>`:''}</section></div>`;
 $('snShopF').addEventListener('submit',redeem)}
async function redeem(e){e.preventDefault();const code=($('snShopC').value||'').trim();err='';msg='';if(!code){return}
 try{const r=await fetch('https://api.lemonsqueezy.com/v1/licenses/validate',{method:'POST',headers:{Accept:'application/json','Content-Type':'application/x-www-form-urlencoded'},body:'license_key='+encodeURIComponent(code)});const j=await r.json();
  if(j&&j.valid){const n=String((j.meta&&(j.meta.variant_name+' '+j.meta.product_name))||'').toLowerCase();const p=/alles|all/.test(n)?'all':/supporter/.test(n)?'supporter':/thema|theme/.test(n)?'themes':/skin/.test(n)?'skins':'';
   if(p){if(!S.own.includes(p))S.own.push(p);save();msg=t('ok')}else err=t('bad')}else err=t('bad')}catch(x){err=t('bad')}view()}
ov.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset;
 if(d.a==='x'){ov.hidden=true;if(![...document.querySelectorAll('.soc:not(.snShop),.pw,.gw,.hc,.rOv')].some(x=>!x.hidden))document.body.classList.remove('pwLock');return}
 if(d.ask){ask=d.ask;view();return}if(d.skin!=null){S.skin=d.skin;save();view();return}if(d.theme!=null){S.theme=d.theme;save();view();return}});
btn.addEventListener('click',()=>{msg='';err='';ask='';ov.hidden=false;document.body.classList.add('pwLock');view()});
const st=document.createElement('style');st.textContent=`.snShopRow{display:flex;flex-wrap:wrap;gap:8px}.snShopIt{display:flex;flex-direction:column;align-items:center;gap:4px;min-width:72px;padding:8px;border-radius:12px;border:2px solid transparent;background:rgba(255,255,255,.08);color:#fff;font-weight:700;font-size:12px;cursor:pointer}.snShopIt.on{border-color:#16c6dc}.snShopIt:disabled{opacity:.45;cursor:not-allowed}.snShopNj{font-size:28px}.snShopDot{width:28px;height:28px;border-radius:50%}.snShopAsk{background:rgba(255,255,255,.06);border-radius:12px;padding:10px;margin-top:4px}.snShopAsk a{display:inline-block;text-decoration:none;line-height:42px}`;document.head.appendChild(st);
setInterval(()=>{if(window.SN_AUTH&&SN_AUTH.ready&&SN_AUTH.ready())paintBtn();else if(btn.isConnected)btn.remove()},1500);
new MutationObserver(()=>{if(btn.isConnected)paintBtn();if(!ov.hidden)view()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
apply();})();
