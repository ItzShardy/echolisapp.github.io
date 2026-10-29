/* Echolis loader: cat lies on the logo, logo morphs into the wordmark. Shown once per session. */
(function(){
  var seen=false;try{seen=sessionStorage.getItem('ecl')==='1'}catch(e){}
  if(seen||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  var root=document.documentElement;root.classList.add('ld');
  var mark='<svg class="mk" viewBox="0 0 120 120"><defs><linearGradient id="ecg" x1="0" y1="0" x2="0" y2="1"><stop offset=".05" stop-color="#fff"/><stop offset=".5" stop-color="#b9c6ff"/><stop offset="1" stop-color="#6f86f0"/></linearGradient></defs><g fill="url(#ecg)"><path d="M16 46 20 6 54 26Q36 30 16 46ZM104 46 100 6 66 26Q84 30 104 46Z"/><path d="M60 40 66.5 61.5 88 68 66.5 74.5 60 96 53.5 74.5 32 68 53.5 61.5Z"/></g><circle cx="60" cy="68" r="42" fill="none" stroke="url(#ecg)" stroke-width="5"/></svg>';
  var cat='<svg class="ec-cat" viewBox="0 0 160 76" aria-hidden="true"><defs><linearGradient id="ecp" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#7a67c4"/><stop offset="1" stop-color="#2f2560"/></linearGradient></defs>'
   +'<path class="tail" d="M20 50C0 54 -2 68 8 74" fill="none" stroke="#4a3d8c" stroke-width="10" stroke-linecap="round"/>'
   +'<g class="body"><path d="M12 56C10 30 46 20 86 24C118 27 132 38 134 56Z" fill="url(#ecp)"/>'
   +'<path d="M30 40l14-4M52 34l16-3M76 32l14 0M100 36l12 4" stroke="#a89be0" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>'
   +'<path d="M118 30 120 8 134 20ZM142 20 152 8 154 32Z" fill="#5a4aa0"/><circle cx="138" cy="38" r="19" fill="url(#ecp)"/>'
   +'<g class="blink"><ellipse cx="131" cy="35" rx="3.6" ry="3" fill="#f2d95c"/><ellipse cx="146" cy="35" rx="3.6" ry="3" fill="#f2d95c"/></g>'
   +'<path d="M138 41l-2 2h4Z" fill="#e48fb2"/><rect x="118" y="50" width="12" height="20" rx="6" fill="#4a3d8c"/></g>'
   +'<path d="M92 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="#cdbfff" opacity=".8"/></svg>';
  var word='ECHOLIS'.split('').map(function(c,i){return '<span style="--i:'+i+'">'+c+'</span>'}).join('');
  var el=document.createElement('div');el.id='ecl';el.setAttribute('role','status');el.setAttribute('aria-label','Loading Echolis');
  el.innerHTML='<div class="ec-stage"><div class="ec-logo">'+mark+cat+'</div><div class="ec-word" aria-hidden="true">'+word+'</div><div class="ec-bar"><i></i></div></div>';
  root.appendChild(el);
  function end(){el.classList.add('out');root.classList.remove('ld');try{sessionStorage.setItem('ecl','1')}catch(e){}setTimeout(function(){el.remove()},800)}
  var ready=new Promise(function(r){document.readyState==='complete'?r():addEventListener('load',r)});
  var min=new Promise(function(r){setTimeout(r,2300)});
  Promise.all([ready,min]).then(function(){el.classList.add('go');setTimeout(end,2000)});
  el.addEventListener('click',end);setTimeout(end,9000);
})();
