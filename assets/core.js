  var PF_EDIT=/[?&]edit=1/.test(location.search);
/* ---- theme toggle (persisted across pages) ---- */
  const sw=document.getElementById('switch'),lbl=document.getElementById('switchlbl');
  function _syncLbl(){if(lbl)lbl.textContent=document.documentElement.classList.contains('light')?'Day mode':'Night mode';}
  _syncLbl();
  if(sw)sw.addEventListener('click',()=>{document.documentElement.classList.toggle('light');
    try{localStorage.setItem('pf-theme',document.documentElement.classList.contains('light')?'light':'dark');}catch(e){}
    _syncLbl();});

  /* ---- mobile menu ---- */
  const burger=document.getElementById('burger');
  if(burger)burger.addEventListener('click',()=>document.body.classList.toggle('menu'));
  document.querySelectorAll('.overlay a').forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('menu')));

  /* ---- split headlines: words -> chars (no mid-word break, non-destructive) ---- */
  function splitInto(h){
    const frag=document.createDocumentFragment();
    h.childNodes.forEach(n=>{
      const pop=n.nodeType===1&&n.classList&&n.classList.contains('pop');
      (n.textContent||'').split(/(\s+)/).forEach(part=>{
        if(!part)return;
        if(/^\s+$/.test(part)){frag.appendChild(document.createTextNode(' '));return;}
        const w=document.createElement('span');w.className='word';
        for(const c of part){const s=document.createElement('span');s.className='ch'+(pop?' pop':'');s.textContent=c;w.appendChild(s);}
        frag.appendChild(w);
      });
    });
    return frag;
  }
  if(!PF_EDIT){try{document.querySelectorAll('.split').forEach(h=>{const f=splitInto(h);if(f.childNodes.length){h.textContent='';h.appendChild(f);}});}catch(e){}}
  const chars=[...document.querySelectorAll('.ih .ch')];

  /* ---- interactive headline (chars react to cursor) ---- */
  let mx=-999,my=-999,rects=[],raf=null;
  function measure(){rects=chars.map(c=>{const r=c.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2,el:c};});}
  function tick(){
    const R=165;
    rects.forEach(o=>{
      const dx=o.x-mx,dy=o.y-my,d=Math.hypot(dx,dy);
      if(d<R){
        const f=1-d/R;
        o.el.style.transform=`translateY(${-12*f}px) scale(${1+0.19*f})`;
        o.el.style.color=`color-mix(in srgb, var(--lime) ${Math.round(f*100)}%, var(--ink))`;
        o.el.style.textShadow=`0 0 ${24*f}px rgba(199,247,59,${0.9*f}),0 0 ${56*f}px rgba(199,247,59,${0.4*f})`;
      }else{o.el.style.transform='';o.el.style.color='';o.el.style.textShadow='';}
    });
    raf=null;
  }
  window.addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;if(!raf)raf=requestAnimationFrame(tick);});
  let _msr=false;
  window.addEventListener('scroll',()=>{if(!_msr){_msr=true;requestAnimationFrame(()=>{measure();_msr=false;});}},{passive:true});
  window.addEventListener('resize',measure);
  measure();

  /* ---- minimal cursor + interactive background ---- */
  const cdot=document.getElementById('cdot'),cring=document.getElementById('cring'),root=document.documentElement;
  let rx=innerWidth/2,ry=innerHeight/2,tx=rx,ty=ry;
  let _pm=false;
  window.addEventListener('pointermove',e=>{
    tx=e.clientX;ty=e.clientY;
    if(!_pm){_pm=true;requestAnimationFrame(()=>{
      cdot.style.transform=`translate(${tx}px,${ty}px) translate(-50%,-50%)`;
      root.style.setProperty('--mx',tx+'px');root.style.setProperty('--my',ty+'px');
      if(ty<90)document.body.classList.remove('nav-hidden');_pm=false;});}
  });
  (function follow(){rx+=(tx-rx)*.2;ry+=(ty-ry)*.2;cring.style.transform=`translate(${rx}px,${ry}px) translate(-50%,-50%)`;requestAnimationFrame(follow);})();
  document.querySelectorAll('a,button,.switch,.chip,.core,.burger').forEach(el=>{
    el.addEventListener('pointerenter',()=>cring.classList.add('lg'));
    el.addEventListener('pointerleave',()=>cring.classList.remove('lg'));
  });

  /* ---- magnetic buttons ---- */
  document.querySelectorAll('.btn').forEach(b=>{
    b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();
      b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.3}px)`;});
    b.addEventListener('pointerleave',()=>b.style.transform='');
  });

  /* ---- scroll reveal ---- */
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.14});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  /* ---- HUD coordinate readout ---- */
  const hudpos=document.getElementById('hudpos');
  const pad=n=>String(Math.max(0,Math.round(n))).padStart(4,'0');
  let _hud=false,_hx=0,_hy=0;
  window.addEventListener('pointermove',e=>{_hx=e.clientX;_hy=e.clientY;if(!_hud){_hud=true;requestAnimationFrame(()=>{hudpos.textContent=`PTR X:${pad(_hx)} Y:${pad(_hy)}`;_hud=false;});}});

  /* ---- card spotlight (cursor-follow glow) — unified across ALL card types for consistency ---- */
  var SPOT='.core,.bento,.scard,.stat,.case,.duocard .inner,.glass .inner,.qcard,.crow,.tool,.feature .frame,.preview-shell,.titem';
  document.querySelectorAll(SPOT).forEach(function(c){
    c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();
      c.style.setProperty('--cx',(e.clientX-r.left)+'px');c.style.setProperty('--cy',(e.clientY-r.top)+'px');});
  });

  window.addEventListener('load',measure);

  /* ---- count-up ---- */
  function countUp(em){var to=+em.dataset.to;if(isNaN(to))return;var d=1300,t0=performance.now();(function s(t){var p=Math.min(1,(t-t0)/d),e=1-Math.pow(1-p,3);em.textContent=Math.round(to*e);if(p<1)requestAnimationFrame(s);})(t0);}
  var _cio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){countUp(e.target);_cio.unobserve(e.target);}});},{threshold:.4});
  document.querySelectorAll('em[data-to]').forEach(function(el){_cio.observe(el);});
  /* ---- extra cursor hover + card spotlight targets ---- */
  document.querySelectorAll('.scard,.case,.logo,.tool,.prow,.stat,.shot,.titem,.skill').forEach(function(el){el.addEventListener('pointerenter',function(){cring.classList.add('lg');});el.addEventListener('pointerleave',function(){cring.classList.remove('lg');});});
  document.querySelectorAll('.scard,.stat').forEach(function(c){c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--cx',(e.clientX-r.left)+'px');c.style.setProperty('--cy',(e.clientY-r.top)+'px');});});
  /* ---- right rail scroll-spy ---- */
  (function(){var links=[].slice.call(document.querySelectorAll('.rail a'));if(!links.length)return;var secs=links.map(function(a){return document.querySelector(a.getAttribute('href'));}).filter(Boolean);var rio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var id='#'+e.target.id;links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')===id);});}});},{rootMargin:'-45% 0px -50% 0px'});secs.forEach(function(s){rio.observe(s);});})();
  /* ---- preloader ---- */
  (function(){var pl=document.querySelector('.preload');if(!pl)return;var bar=pl.querySelector('.pl-bar i'),num=pl.querySelector('.pl-num');var v=0;var t=setInterval(function(){v+=Math.random()*13+5;if(v>=100){v=100;clearInterval(t);setTimeout(function(){pl.classList.add('done');},350);}bar.style.width=v+'%';num.textContent=String(Math.round(v)).padStart(3,'0')+'%';},85);})();


  /* ---- page transition: smooth content fade (no blackout) ---- */
  (function(){
    if(PF_EDIT)return;
    window.addEventListener('pageshow',function(){document.body.classList.remove('leaving');});
    document.querySelectorAll('a[href]').forEach(function(a){
      var href=a.getAttribute('href');
      if(!href||href.charAt(0)==='#'||/^(https?:|mailto:|tel:)/i.test(href)||a.target==='_blank')return;
      a.addEventListener('click',function(e){if(e.metaKey||e.ctrlKey||e.shiftKey||e.button)return;
        e.preventDefault();document.body.classList.add('leaving');setTimeout(function(){location.href=href;},300);});
    });
  })();


  /* ===== ENHANCEMENTS ===== */
  (function(){var p=document.getElementById('progress');var h=document.documentElement;var tick=false;var lastY=h.scrollTop||0;var b=document.body;
    function upd(){var y=h.scrollTop;var max=h.scrollHeight-h.clientHeight,s=max>0?y/max:0;if(p)p.style.transform='scaleX('+s+')';b.classList.toggle('scrolled',y>18);
      b.classList.remove('nav-hidden');   /* nav stays visible at all times (sticky, follows scroll) */
      lastY=y;tick=false;}
    function onScroll(){if(!tick){tick=true;requestAnimationFrame(upd);}}
    window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);upd();})();
  (function(){document.querySelectorAll('.grid3,.grid4,.logos,.tools,.skillwrap,.duo').forEach(function(g){var i=0;[].forEach.call(g.children,function(c){if(c.classList&&c.classList.contains('reveal')){c.style.setProperty('--d',(i%4)*70+'ms');i++;}});});})();
  (function(){var lb=document.getElementById('lightbox');if(!lb)return;var img=lb.querySelector('img'),close=document.getElementById('lbclose');
    function open(src,alt){if(!src)return;img.src=src;img.alt=alt||'';lb.classList.add('open');}
    function shut(){lb.classList.remove('open');img.src='';}
    document.querySelectorAll('[data-full]').forEach(function(el){el.style.cursor='zoom-in';el.addEventListener('click',function(e){e.preventDefault();open(el.getAttribute('data-full'),el.getAttribute('alt'));});});
    if(close)close.addEventListener('click',shut);
    lb.addEventListener('click',function(e){if(e.target===lb)shut();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')shut();});})();

  /* ===== copy-to-clipboard + toast ===== */
  (function(){var toast=document.getElementById('toast');
    function show(msg){if(!toast)return;toast.textContent=msg;toast.classList.add('show');clearTimeout(toast._t);toast._t=setTimeout(function(){toast.classList.remove('show');},1600);}
    function fallback(t){try{var ta=document.createElement('textarea');ta.value=t;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);}catch(e){}}
    document.querySelectorAll('[data-copy]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();var t=b.getAttribute('data-copy');
      if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(function(){show('Copied to clipboard');}).catch(function(){fallback(t);show('Copied to clipboard');});}
      else{fallback(t);show('Copied to clipboard');}});});
  })();

  /* footer year */
  (function(){var y=document.getElementById('yr');if(y)y.textContent=new Date().getFullYear();})();

  /* ===== projects proposal-reel ===== */
  (function(){document.querySelectorAll('.proj').forEach(function(pr){
    var main=pr.querySelector('.pv-main'),idx=pr.querySelector('.pv-i'),thumbs=pr.querySelectorAll('.thumb');
    thumbs.forEach(function(t,i){t.addEventListener('click',function(){var src=t.getAttribute('data-src');if(src&&main)main.src=src;if(idx)idx.textContent=i+1;thumbs.forEach(function(x){x.classList.remove('active');});t.classList.add('active');});});
    var btn=pr.querySelector('.expand-deck'),stack=pr.querySelector('.full-stack');
    if(btn&&stack){btn.addEventListener('click',function(e){e.preventDefault();var open=stack.classList.toggle('open');btn.setAttribute('aria-expanded',open);var l=btn.querySelector('.lbl-txt');if(l)l.textContent=open?'Hide full deck':'Expand full deck';});}
  });})();

  /* ===== contact form -> mail draft (user sends manually) ===== */
  (function(){var f=document.getElementById('contactForm');if(!f)return;
    f.addEventListener('submit',function(e){e.preventDefault();
      var el=f.elements,n=(el['name']&&el['name'].value)||'',em=(el['email']&&el['email'].value)||'',msg=(el['message']&&el['message'].value)||'';
      var to=f.getAttribute('data-to')||'';
      var subj=encodeURIComponent('Project enquiry from '+n);
      var body=encodeURIComponent(msg+'\n\n— '+n+(em?(' <'+em+'>'):''));
      window.location.href='mailto:'+to+'?subject='+subj+'&body='+body;
      var t=document.getElementById('toast');if(t){t.textContent='Opening your mail app…';t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(function(){t.classList.remove('show');},1800);}
    });})();


  /* ================= EDIT MODE (?edit=1) ================= */
  (function(){
    if(!PF_EDIT) return;
    var KEY='pf-edit-'+location.pathname;
    var b=document.body; b.classList.add('pf-edit');
    /* block link navigation while editing */
    document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a');if(a&&!(e.target.closest&&e.target.closest('.pf-editbar'))){e.preventDefault();}},true);
    /* editable text nodes */
    var SEL='h1,h2,h3,p,li,figcaption,.cap,.capt,.lab,.role,.co,.ro,.casemeta,.nm,.rl,.v,.l,.pc,.chip,.tool,.stackline span,.meta span,.brand,.k,.eyebrow';
    var eds=[].slice.call(document.querySelectorAll(SEL)).filter(function(el){return !(el.closest&&el.closest('.pf-editbar'));});
    eds.forEach(function(el,i){el.setAttribute('data-eid','e'+i);el.setAttribute('contenteditable','true');el.setAttribute('spellcheck','false');});
    /* restore */
    var saved={};try{saved=JSON.parse(localStorage.getItem(KEY)||'{}');}catch(e){}
    var edits=saved.edits||{},hidden=saved.hidden||{};
    eds.forEach(function(el){var k=el.getAttribute('data-eid');if(edits[k]!=null)el.innerHTML=edits[k];});
    /* hideable sections */
    var secs=[].slice.call(document.querySelectorAll('section, header.head'));
    secs.forEach(function(s,i){var sid=s.id||('sec'+i);s.setAttribute('data-sid',sid);if(getComputedStyle(s).position==='static')s.style.position='relative';
      if(hidden[sid])s.setAttribute('data-pf-hidden','1');
      var eye=document.createElement('button');eye.type='button';eye.className='pf-eye';eye.contentEditable='false';eye.textContent=hidden[sid]?'Show':'Hide';
      eye.addEventListener('click',function(ev){ev.stopPropagation();ev.preventDefault();var h=s.getAttribute('data-pf-hidden')==='1';if(h){s.removeAttribute('data-pf-hidden');eye.textContent='Hide';}else{s.setAttribute('data-pf-hidden','1');eye.textContent='Show';}save();});
      s.appendChild(eye);
    });
    /* autosave */
    var tmr;function save(){clearTimeout(tmr);tmr=setTimeout(function(){
      var e={};eds.forEach(function(el){e[el.getAttribute('data-eid')]=el.innerHTML;});
      var h={};secs.forEach(function(s){if(s.getAttribute('data-pf-hidden')==='1')h[s.getAttribute('data-sid')]=1;});
      try{localStorage.setItem(KEY,JSON.stringify({edits:e,hidden:h}));}catch(err){}
      setStatus('Saved ✓');},400);}
    document.addEventListener('input',function(e){if(e.target.closest&&e.target.closest('[contenteditable="true"]'))save();});
    /* toolbar */
    var bar=document.createElement('div');bar.className='pf-editbar';bar.contentEditable='false';
    bar.innerHTML='<span class="pf-tag">EDIT MODE</span><span class="pf-status" id="pfStatus">Auto-save on</span><button type="button" id="pfReset">Reset</button><button type="button" id="pfExport">Export HTML</button><a id="pfExit" href="'+location.pathname+'">Exit</a>';
    document.body.appendChild(bar);
    function setStatus(m){var s=document.getElementById('pfStatus');if(!s)return;s.textContent=m;clearTimeout(s._t);s._t=setTimeout(function(){s.textContent='Auto-save on';},1600);}
    document.getElementById('pfReset').addEventListener('click',function(){if(confirm('Reset all edits on this page?')){localStorage.removeItem(KEY);location.reload();}});
    document.getElementById('pfExport').addEventListener('click',function(){
      var root=document.documentElement.cloneNode(true);
      root.querySelectorAll('.pf-editbar,.pf-eye').forEach(function(n){n.remove();});
      root.querySelectorAll('[data-pf-hidden]').forEach(function(n){n.remove();});
      root.querySelectorAll('[contenteditable]').forEach(function(n){n.removeAttribute('contenteditable');n.removeAttribute('data-eid');n.removeAttribute('spellcheck');});
      root.querySelectorAll('[data-sid]').forEach(function(n){n.removeAttribute('data-sid');});
      var bd=root.querySelector('body');if(bd)bd.classList.remove('pf-edit');
      root.classList.remove('light');
      var html='<!DOCTYPE html>\n'+root.outerHTML;
      var blob=new Blob([html],{type:'text/html'});var url=URL.createObjectURL(blob);
      var a=document.createElement('a');a.href=url;a.download=(location.pathname.split('/').pop()||'index.html');document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url);},1000);
      setStatus('Exported ↓');
    });
  })();

  /* ================= content.json loader (single source sync) ================= */
  (function(){
    if(PF_EDIT) return;                 /* edit mode edits raw HTML */
    if(!window.fetch) return;
    fetch('assets/content.json',{cache:'no-store'}).then(function(r){return r.ok?r.json():null;}).then(function(c){
      if(!c) return;
      document.querySelectorAll('[data-c]').forEach(function(el){var k=el.getAttribute('data-c');if(c[k]!=null&&c[k]!=='')el.textContent=c[k];});
      document.querySelectorAll('[data-c-href]').forEach(function(el){var k=el.getAttribute('data-c-href');if(c[k]!=null&&c[k]!=='')el.setAttribute('href',c[k]);});
      document.querySelectorAll('[data-c-copy]').forEach(function(el){var k=el.getAttribute('data-c-copy');if(c[k]!=null&&c[k]!=='')el.setAttribute('data-copy',c[k]);});
      var f=document.getElementById('contactForm');if(f&&c.email)f.setAttribute('data-to',c.email);
      if(c.name){try{document.title=document.title.replace('[YOUR NAME]',c.name);}catch(e){}}
    }).catch(function(){});
  })();

  /* ===== floating Contact button (all pages, draggable) -> Home #connect ===== */
  (function(){
    if(PF_EDIT) return;
    var path=location.pathname.split('/').pop();
    var isHome=(!path||path==='portfolio-home.html'||path==='index.html');
    var fab=document.createElement('a');
    fab.className='fab-contact';fab.href=isHome?'#connect':'portfolio-home.html#connect';fab.setAttribute('aria-label','Contact me');
    fab.innerHTML='<span class="fic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span><span class="flbl">Contact</span>';
    document.body.appendChild(fab);
    try{var pos=JSON.parse(localStorage.getItem('pf-fab')||'null');if(pos){fab.style.left=pos.x+'px';fab.style.top=pos.y+'px';fab.style.right='auto';fab.style.bottom='auto';}}catch(e){}
    var down=false,moved=false,sx,sy,ox,oy;
    fab.addEventListener('pointerdown',function(e){down=true;moved=false;sx=e.clientX;sy=e.clientY;var r=fab.getBoundingClientRect();ox=r.left;oy=r.top;try{fab.setPointerCapture(e.pointerId);}catch(e2){}});
    fab.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx,dy=e.clientY-sy;if(Math.abs(dx)+Math.abs(dy)>4)moved=true;if(moved){var nx=Math.max(8,Math.min(innerWidth-fab.offsetWidth-8,ox+dx)),ny=Math.max(8,Math.min(innerHeight-fab.offsetHeight-8,oy+dy));fab.style.left=nx+'px';fab.style.top=ny+'px';fab.style.right='auto';fab.style.bottom='auto';}});
    fab.addEventListener('pointerup',function(){down=false;if(moved){try{var r=fab.getBoundingClientRect();localStorage.setItem('pf-fab',JSON.stringify({x:r.left,y:r.top}));}catch(e3){}}});
    fab.addEventListener('click',function(e){if(moved){e.preventDefault();return;}if(isHome){e.preventDefault();var t=document.getElementById('connect');if(t)t.scrollIntoView({behavior:'smooth'});}});
  })();

  /* ===== detail drawer (CRM-style slide-over) for Projects / AI Vibecode ===== */
  (function(){
    if(PF_EDIT) return;
    /* auto-inject "View details" triggers on Projects + AI Vibecode cards */
    var page=location.pathname.split('/').pop();
    var btnHTML='View details <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>';
    function injBtn(p){if(p.querySelector(':scope > .js-drawer'))return;var b=document.createElement('button');b.type='button';b.className='card-cta js-drawer';b.innerHTML=btnHTML;p.appendChild(b);}
    if(page==='ai-vibecode.html'){[].forEach.call(document.querySelectorAll('#builds .scard'),injBtn);}
    if(page==='projects.html'){[].forEach.call(document.querySelectorAll('.proj .proj-copy'),injBtn);}
    var triggers=document.querySelectorAll('.js-drawer');
    if(!triggers.length) return;
    var ov=document.createElement('div');ov.className='dwr-ov';
    ov.innerHTML='<aside class="dwr-panel" role="dialog" aria-modal="true"><button class="dwr-x" aria-label="Close">&times;</button><div class="dwr-head"><div class="dwr-sub"></div><h3 class="dwr-title"></h3><div class="dwr-meta"></div></div><div class="dwr-tabs"></div><div class="dwr-body"></div></aside>';
    document.body.appendChild(ov);
    var elT=ov.querySelector('.dwr-title'),elS=ov.querySelector('.dwr-sub'),elM=ov.querySelector('.dwr-meta'),elTabs=ov.querySelector('.dwr-tabs'),elB=ov.querySelector('.dwr-body');
    function close(){ov.classList.remove('open');document.body.classList.remove('dwr-lock');}
    ov.addEventListener('click',function(e){if(e.target===ov)close();});
    ov.querySelector('.dwr-x').addEventListener('click',close);
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
    function extract(card){
      var h=card.querySelector('h3');var ps=card.querySelectorAll('p');
      var desc=[].map.call(ps,function(p){return '<p>'+p.innerHTML+'</p>';}).join('');
      var tags=[].map.call(card.querySelectorAll('.stackline span,.chip,.meta span,.tag'),function(s){return s.textContent.trim();}).filter(Boolean);
      var seen={},imgs=[];[].forEach.call(card.querySelectorAll('img'),function(im){var s=im.getAttribute('data-full')||im.getAttribute('src');if(s&&!seen[s]){seen[s]=1;imgs.push({src:im.getAttribute('src'),full:s,alt:im.getAttribute('alt')||''});}});
      var slides=[].map.call(card.querySelectorAll('figure'),function(fg){var im=fg.querySelector('img');var cap=fg.querySelector('figcaption');return {src:im?im.getAttribute('src'):'',full:im?(im.getAttribute('data-full')||im.getAttribute('src')):'',cap:cap?cap.textContent.trim():''};}).filter(function(s){return s.full;});
      return {title:h?h.textContent:(card.getAttribute('data-title')||'Details'),sub:card.getAttribute('data-sub')||'',desc:desc,tags:tags,images:imgs,slides:slides,details:card.getAttribute('data-details')||''};
    }
    function open(card){
      var d=extract(card);
      elT.textContent=d.title;elS.textContent=d.sub||'Case detail';
      elM.innerHTML=d.tags.slice(0,6).map(function(t){return '<span class="dwr-tag">'+t+'</span>';}).join('');
      var hero=(d.slides[0]&&d.slides[0].full)||(d.images[0]&&d.images[0].full)||'';
      var heroHTML=hero?'<div class="dwr-hero"><img src="'+hero+'" alt="" loading="lazy"/></div>':'';
      var facts=d.tags.length?'<div class="dwr-facts">'+d.tags.slice(0,4).map(function(t){return '<span>'+t+'</span>';}).join('')+'</div>':'';
      var ovHTML=heroHTML+'<div class="dwr-section">'+(d.desc||'<p class="dwr-empty">Summary coming soon — add it in the card or ask me to fill it in.</p>')+facts+'</div>';
      var tabs=[{k:'Overview',html:ovHTML}];
      if(d.slides.length){tabs.push({k:'Deck &middot; '+d.slides.length,html:'<div class="dwr-deck">'+d.slides.map(function(s,i){var n=('0'+(i+1)).slice(-2);var cap=s.cap.replace(/^\d+\s*[·.–\-]\s*/,'');return '<figure class="dwr-slide"><div class="dwr-sn">'+n+'</div><img src="'+s.full+'" alt="" loading="lazy"/><figcaption>'+(cap||'Slide '+n)+'</figcaption></figure>';}).join('')+'</div>'});}
      else if(d.images.length){tabs.push({k:'Gallery',html:'<div class="dwr-gal">'+d.images.map(function(im){return '<img src="'+im.full+'" alt="'+im.alt+'" loading="lazy"/>';}).join('')+'</div>'});}
      tabs.push({k:'Details',html:d.details||'<div class="dwr-section"><p class="dwr-empty">Objective, role, actions, result and links for this project will live here. Add them in <b>projects.html</b> or ask me to fill it in.</p></div>'});
      function show(i){elB.innerHTML=tabs[i].html;[].forEach.call(elTabs.children,function(b){b.classList.toggle('on',+b.dataset.i===i);});
        elB.querySelectorAll('.dwr-deck img,.dwr-gal img').forEach(function(im){im.style.cursor='zoom-in';im.addEventListener('click',function(){var lb=document.getElementById('lightbox');if(lb){lb.querySelector('img').src=im.getAttribute('src');lb.classList.add('open');}});});}
      elTabs.innerHTML=tabs.map(function(t,i){return '<button class="dwr-tab'+(i===0?' on':'')+'" data-i="'+i+'">'+t.k+'</button>';}).join('');
      [].forEach.call(elTabs.children,function(b){b.addEventListener('click',function(){show(+b.dataset.i);});});
      show(0);ov.classList.add('open');document.body.classList.add('dwr-lock');ov.scrollTop=0;
    }
    triggers.forEach(function(t){t.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();
      var card=t.closest('[data-card]')||t.closest('.proj')||t.closest('.scard')||t;open(card);});});
  })();

  /* ===== Recruiter Mode — 60-second scan overlay (all pages) ===== */
  (function(){
    if(PF_EDIT) return;
    var LI='https://www.linkedin.com/in/t%E1%BA%A5n-ho%C3%A0ng-nh%C6%B0-qu%E1%BB%91c-933941280/';
    var toggle=document.createElement('button');
    toggle.className='rec-toggle';toggle.type='button';toggle.setAttribute('aria-label','Open recruiter mode');
    toggle.innerHTML='<span class="rd"></span> Recruiter mode';
    document.body.appendChild(toggle);
    var ov=document.createElement('div');ov.className='rec-ov';
    ov.innerHTML='<div class="rec-card" role="dialog" aria-modal="true"><button class="rec-x" aria-label="Close">&times;</button>'+
      '<div class="rec-ey">Recruiter mode &middot; 60-second scan</div>'+
      '<h2 class="rec-name">Hoàng Như Quốc Tấn</h2>'+
      '<div class="rec-role">Business Development &amp; Marketing &rarr; Influencer Management &middot; UEH</div>'+
      '<p class="rec-pitch">Target-driven UEH graduate (GPA 3.98, TOEIC 970). I optimize what converts and automate what slows things down &mdash; now bringing that operator mindset into influencer management.</p>'+
      '<div class="rec-kpis">'+
        '<div class="rec-kpi"><b>50%</b><span>SQL&rarr;Student conversion</span></div>'+
        '<div class="rec-kpi"><b>+30%</b><span>YoY Q3 revenue</span></div>'+
        '<div class="rec-kpi"><b>&minus;20%</b><span>Manual workload &middot; N8N</span></div>'+
        '<div class="rec-kpi"><b>30+</b><span>Students led &middot; campaign</span></div>'+
      '</div>'+
      '<div class="rec-proof"><div class="rec-pt">Proof in one line each</div><ul>'+
        '<li><b>PMAX</b> &mdash; BD Trainee: reworked sales scripts + built N8N automation &rarr; conversion &amp; revenue up.</li>'+
        '<li><b>xSCORE</b> &mdash; BD Intern: 2 tailored proposals, sales contracts, landing-page rebuild.</li>'+
        '<li><b>Leadership</b> &mdash; led 30+ students, engaged 100+ children, raised 12.5M VND (charity).</li>'+
      '</ul></div>'+
      '<div class="rec-cta">'+
        '<a class="btn btn-primary" href="assets/Hoang-Nhu-Quoc-Tan-CV.pdf" download>Download CV <span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></span></a>'+
        '<a class="btn btn-ghost" href="mailto:harryhoang10@gmail.com">Email</a>'+
        '<a class="btn btn-ghost" href="'+LI+'" target="_blank" rel="noopener">LinkedIn</a>'+
        '<button class="btn btn-ghost rec-close2" type="button">See full portfolio</button>'+
      '</div></div>';
    document.body.appendChild(ov);
    function open(){ov.classList.add('open');document.body.classList.add('dwr-lock');}
    function close(){ov.classList.remove('open');document.body.classList.remove('dwr-lock');}
    toggle.addEventListener('click',open);
    ov.querySelector('.rec-x').addEventListener('click',close);
    ov.querySelector('.rec-close2').addEventListener('click',close);
    ov.addEventListener('click',function(e){if(e.target===ov)close();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&ov.classList.contains('open'))close();});
  })();

