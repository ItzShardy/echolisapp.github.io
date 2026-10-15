/* Shared behaviour: compact nav on scroll, reveal, card tilt+light, cursor halo, curtain parallax, page fade */
const nav=document.querySelector('.nav');
addEventListener('scroll',()=>{nav.classList.toggle('compact',scrollY>80);document.querySelectorAll('.curtain').forEach(c=>c.style.setProperty('--py',scrollY*.25+'px'))},{passive:true});
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(e=>io.observe(e));
document.querySelectorAll('.card').forEach(c=>{
  c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    c.style.transform=`perspective(900px) rotateX(${(.5-y)*6}deg) rotateY(${(x-.5)*8}deg) translateY(-6px)`;c.style.setProperty('--mx',x*100+'%');c.style.setProperty('--my',y*100+'%')});
  c.addEventListener('pointerleave',()=>c.style.transform='')});
const h=document.getElementById('halo');let tx=innerWidth/2,ty=300,x=tx,y=ty;
addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY});(function f(){x+=(tx-x)*.08;y+=(ty-y)*.08;h.style.transform=`translate(${x}px,${y}px)`;requestAnimationFrame(f)})();
document.querySelectorAll('a[href$=".html"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();document.body.classList.add('leaving');setTimeout(()=>location.href=a.href,380)}));
addEventListener('pageshow',()=>document.body.classList.remove('leaving'));
