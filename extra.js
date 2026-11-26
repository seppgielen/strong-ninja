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
