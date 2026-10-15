/* Echolis components behaviour */
(()=>{const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
// dynamic text
$$('.dyn').forEach(el=>{const w=el.dataset.words.split(','),i0={i:0};setInterval(()=>{el.classList.add('out');setTimeout(()=>{i0.i=(i0.i+1)%w.length;el.textContent=w[i0.i];el.classList.remove('out')},350)},2200)});
// glitch: periodic burst
$$('.glitch').forEach(g=>{g.dataset.t=g.textContent;setInterval(()=>{g.classList.add('go');setTimeout(()=>g.classList.remove('go'),420)},4200)});
// bento light follow
$$('.bt').forEach(b=>b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.setProperty('--mx',(e.clientX-r.left)+'px');b.style.setProperty('--my',(e.clientY-r.top)+'px')}));
// count-up
const co=new IntersectionObserver(es=>es.forEach(x=>{if(!x.isIntersecting)return;co.unobserve(x.target);const t=+x.target.dataset.n,s=performance.now();(function f(n){const p=Math.min((n-s)/1400,1);x.target.textContent=Math.round(t*(1-Math.pow(1-p,3)));p<1&&requestAnimationFrame(f)})(s)}));$$('[data-n]').forEach(e=>co.observe(e));
// switch (motion)
const sw=$('.sw');if(sw){const set=v=>{sw.setAttribute('aria-checked',v);document.body.classList.toggle('calm',!v)};sw.addEventListener('click',()=>set(sw.getAttribute('aria-checked')!=='true'));
if(matchMedia('(prefers-reduced-motion:reduce)').matches)set(false)}
// profile dropdown
$$('.pd').forEach(p=>{const b=$('button',p);b.addEventListener('click',e=>{e.stopPropagation();p.classList.toggle('open')});addEventListener('click',()=>p.classList.remove('open'));addEventListener('keydown',e=>e.key==='Escape'&&p.classList.remove('open'))});
// currency transfer
const x=$('.xfer');if(x){let usd=true;const rate=.92,amt=$('#a',x),out=$('#b',x),cA=$('#ca',x),cB=$('#cb',x),go=$('.btn',x),fmt=(v,u)=>(u?'$':'€')+v.toFixed(2),
tween=(el,from,to,u)=>{const s=performance.now();(function f(n){const p=Math.min((n-s)/700,1);el.textContent=fmt(from+(to-from)*(1-Math.pow(1-p,3)),u);p<1&&requestAnimationFrame(f)})(s)};
let a=49,b=a*rate;const render=()=>{cA.textContent=usd?'USD':'EUR';cB.textContent=usd?'EUR':'USD';tween(amt,0,a,usd);tween(out,0,b,!usd)};render();
$('.sw2',x).addEventListener('click',e=>{usd=!usd;e.currentTarget.style.transform=`rotate(${usd?0:180}deg)`;const na=b,nb=a;a=na;b=nb;render()});
go.addEventListener('click',()=>{go.textContent='Sending…';setTimeout(()=>{go.textContent='Sent ✓';go.classList.add('done');setTimeout(()=>{go.textContent='Send again';go.classList.remove('done')},1800)},900)})}
})();
/* theme, animated bg, email */
(()=>{const R=document.documentElement,$=s=>document.querySelector(s);
const th=$('.th'),apply=t=>{R.dataset.theme=t;th&&th.setAttribute('aria-checked',t==='day');try{localStorage.setItem('ec-theme',t)}catch(e){}};
th&&th.addEventListener('click',()=>apply(R.dataset.theme==='day'?'night':'day'));th&&th.setAttribute('aria-checked',R.dataset.theme==='day');
const c=$('#fx');if(c){const g=c.getContext('2d');let W,H,P=[];const rs=()=>{W=c.width=innerWidth;H=c.height=innerHeight};rs();addEventListener('resize',rs);
for(let i=0;i<90;i++)P.push({x:Math.random()*2e3,y:Math.random()*2e3,r:Math.random()*1.8+.4,v:Math.random()*.25+.05,p:Math.random()*6.3});
const B=[[.2,.3,.45,0],[.8,.6,.5,2],[.5,.9,.4,4]];let t=0;
(function f(){t+=.004;const day=R.dataset.theme==='day';g.clearRect(0,0,W,H);
B.forEach(([x,y,s,o],i)=>{const cx=W*(x+Math.sin(t+o)*.12),cy=H*(y+Math.cos(t*.8+o)*.1),r=Math.max(W,H)*s,gr=g.createRadialGradient(cx,cy,0,cx,cy,r);
const col=day?['255,190,120','150,170,255','255,150,190'][i]:['110,90,255','60,120,255','170,80,255'][i];gr.addColorStop(0,`rgba(${col},${day?.22:.13})`);gr.addColorStop(1,`rgba(${col},0)`);g.fillStyle=gr;g.fillRect(0,0,W,H)});
P.forEach(p=>{p.y-=p.v;p.x+=Math.sin(t*3+p.p)*.15;if(p.y<-5){p.y=H+5;p.x=Math.random()*W}p.x=(p.x+W)%W;const a=.35+.35*Math.sin(t*6+p.p);
g.beginPath();g.arc(p.x,p.y%H,p.r*(day?1.6:1),0,6.3);g.fillStyle=day?`rgba(255,170,60,${a*.5})`:`rgba(255,255,255,${a})`;g.fill()});
document.body.classList.contains('calm')||0;requestAnimationFrame(f)})()}
const f=$('#mf');f&&f.addEventListener('submit',e=>{e.preventDefault();const b=f.querySelector('.btn'),v=f.querySelector('input').value;b.textContent='Opening…';
setTimeout(()=>{b.textContent='Sent ✓';b.classList.add('ok');location.href='mailto:hello@echolis.studio?subject='+encodeURIComponent('Hello Echolis')+'&body='+encodeURIComponent('Reply to: '+v);setTimeout(()=>{b.textContent='Send';b.classList.remove('ok')},2400)},700)})})();
/* Discord presence (Lanyard). Fill in each owner's numeric Discord ID, and join discord.gg/lanyard once so the API can see them. */
window.ECHOLIS_DISCORD={samsam26901:'1121467555865968660',im_shardy:'1126831477783527434'};
(()=>{const ids=window.ECHOLIS_DISCORD,L={online:'Online',idle:'Idle',dnd:'Do not disturb',offline:'Offline'};
document.querySelectorAll('.cp').forEach(b=>b.addEventListener('click',async()=>{const t=b.dataset.copy,l=b.querySelector('em');
try{await navigator.clipboard.writeText(t)}catch(e){const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(_){}a.remove()}
l.textContent='Copied ✓';b.classList.add('ok');setTimeout(()=>{l.textContent='Copy';b.classList.remove('ok')},1600)}));
document.querySelectorAll('.tc').forEach(c=>{const id=ids[c.dataset.user],dot=c.querySelector('.av i'),st=c.querySelector('.st'),act=c.querySelector('.act');if(!id){st.textContent='Status unavailable';return}
const load=async()=>{try{const d=(await(await fetch('https://api.lanyard.rest/v1/users/'+id)).json()).data,s=d.discord_status||'offline';dot.className=s;st.textContent=L[s]||s;
const u=d.discord_user;if(u&&u.avatar){const im=new Image();im.onload=()=>{c.querySelector('.av span').replaceWith(im)};im.src=`https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png?size=128`}
const a=(d.activities||[]).filter(x=>x.type!==4)[0],cs=(d.activities||[]).find(x=>x.type===4);
act.innerHTML=d.listening_to_spotify?`<small>Listening to Spotify</small>${d.spotify.song} &middot; ${d.spotify.artist}`:a?`<small>${['Playing','Streaming','Listening to','Watching','','Competing in'][a.type]||'Doing'}</small>${a.name}${a.details?' &middot; '+a.details:''}${a.state?'<br><span style="opacity:.6">'+a.state+'</span>':''}`:`<small>Activity</small>${cs&&cs.state?cs.state:'Not doing anything right now'}`}catch(e){st.textContent='Status unavailable'}};load();setInterval(load,30000)})})();
