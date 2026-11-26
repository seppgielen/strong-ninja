// Strong Ninja: logo's (als bestanden op GitHub) + wisselen tussen oude (VS Code) en nieuwe (GitHub) versie met automatisch inloggen
(()=>{const OLD='https://galloping-friendly-cabinet-609.vscodeedu.app',NEW='https://seppgielen.github.io',NEWP=NEW+'/strong-ninja/',OLDP=OLD+'/';
const IMG=NEWP;window.SN_IMG={wm:IMG+'wm.webp',face:IMG+'face.webp',banner:IMG+'banner.webp'};
const isOld=location.origin===OLD,isNew=location.origin===NEW;if(!isOld&&!isNew)return;
const other=isOld?NEW:OLD,otherP=isOld?NEWP:OLDP;const en=()=>document.documentElement.lang==='en';
const DB='firebaseLocalStorageDb',ST='firebaseLocalStorage';
const idb=()=>new Promise((res,rej)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>{if(!r.result.objectStoreNames.contains(ST))r.result.createObjectStore(ST,{keyPath:'fbase_key'})};r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)});
async function readAuth(){try{const db=await idb();return await new Promise(res=>{const q=db.transaction(ST,'readonly').objectStore(ST).getAll();q.onsuccess=()=>res((q.result||[]).filter(x=>String(x.fbase_key).startsWith('firebase:authUser:')));q.onerror=()=>res([])})}catch(e){return[]}}
async function writeAuth(rows){const db=await idb();await new Promise(res=>{const tx=db.transaction(ST,'readwrite');const s=tx.objectStore(ST);rows.forEach(r=>s.put(r));tx.oncomplete=res;tx.onerror=res})}
const trustKeys=()=>{const o={};try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(/^sn_(trust|tok|first|later|soft)_/.test(k))o[k]=localStorage.getItem(k)}}catch(e){}return o};
// wisselen: open de andere versie en geef je login mee
function switchNow(){const w=window.open(otherP+'?switch=1','_blank');if(!w){location.href=otherP;return}
 const h=async e=>{if(e.origin!==other||!e.data||!e.data.snHello)return;window.removeEventListener('message',h);w.postMessage({snAuth:await readAuth(),snTrust:trustKeys()},other);
  const m=document.getElementById('snMove');if(m)m.remove()};window.addEventListener('message',h)}
// ontvangen in het nieuwe tabblad
if(new URLSearchParams(location.search).get('switch')==='1'&&window.opener){const h=async e=>{if(e.origin!==other||!e.data||!('snAuth' in e.data))return;window.removeEventListener('message',h);
 try{const rows=(e.data.snAuth||[]).filter(r=>r&&String(r.fbase_key).startsWith('firebase:authUser:'));if(rows.length)await writeAuth(rows);for(const[k,v]of Object.entries(e.data.snTrust||{}))if(/^sn_(trust|tok|first|later|soft)_/.test(k))localStorage.setItem(k,String(v))}catch(x){}
 location.replace(location.pathname)};window.addEventListener('message',h);setTimeout(()=>{try{window.opener.postMessage({snHello:1},other)}catch(x){}},300);setTimeout(()=>{if(location.search.includes('switch=1'))history.replaceState(null,'',location.pathname)},8000)}
// knop om op elk moment te wisselen
const ui=()=>{const b=document.createElement('button');b.type='button';b.id='snSwitch';b.textContent=isOld?(en()?'🆕 New version':'🆕 Nieuwe versie'):(en()?'↩ Old version':'↩ Oude versie');
 b.style.cssText='position:fixed;left:10px;bottom:10px;z-index:2600;border:0;border-radius:999px;padding:8px 12px;font:700 12px Inter,system-ui,sans-serif;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.25);'+(isOld?'background:#16c6dc;color:#05252b':'background:rgba(20,20,20,.75);color:#fff');
 b.onclick=switchNow;document.body.appendChild(b);
 if(!isOld)return;let st=null;try{st=sessionStorage.getItem('sn_stay_old')}catch(e){}if(st)return;
 const d=document.createElement('div');d.id='snMove';d.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.6);display:grid;place-items:center;padding:16px;font-family:Inter,system-ui,sans-serif';
 const E=en();d.innerHTML=`<div style="max-width:440px;width:100%;background:#0b2a33;color:#fff;border-radius:18px;padding:22px;text-align:center;box-shadow:0 10px 40px rgba(0,0,0,.5)"><div style="font-size:40px">🥷✨</div><h2 style="margin:8px 0">${E?'A newer version of Strong Ninja is here!':'Er is een nieuwere versie van Strong Ninja!'}</h2><p style="opacity:.85;margin:0 0 6px">${E?'Do you want to play the newest version? You are logged in there automatically.':'Wil je de nieuwste versie spelen? Je wordt er automatisch ingelogd.'}</p><p style="opacity:.6;font-size:13px;margin:0 0 16px">${E?'Wil je de nieuwste versie spelen? Je wordt er automatisch ingelogd.':'Do you want to play the newest version? You are logged in there automatically.'}</p><button id="snGoNew" style="width:100%;background:#16c6dc;color:#05252b;font-weight:900;border:0;border-radius:14px;padding:14px;margin-bottom:10px;cursor:pointer">${E?'Yes, go to the new version':'Ja, naar de nieuwe versie'}</button><button id="snStay" style="width:100%;background:none;border:1px solid rgba(255,255,255,.3);color:#fff;border-radius:14px;padding:12px;font-weight:700;cursor:pointer">${E?'No, stay on the old version':'Nee, ik blijf bij de oude versie'}</button></div>`;
 document.body.appendChild(d);d.querySelector('#snGoNew').onclick=switchNow;d.querySelector('#snStay').onclick=()=>{try{sessionStorage.setItem('sn_stay_old','1')}catch(e){}d.remove()}};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(ui,600));else setTimeout(ui,600);
window.SN_SWITCH=switchNow;
const ld=()=>{const sc=document.createElement('script');sc.src=NEWP+'shop.js?v='+Math.floor(Date.now()/36e5);document.body.appendChild(sc)};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ld);else ld()})();
