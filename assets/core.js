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

  /* ---- card spotlight (cursor-follow border glow) ---- */
  document.querySelectorAll('.core,.bento').forEach(c=>{
    c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();
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
      if(b.classList.contains('menu')){b.classList.remove('nav-hidden');}        /* never hide while mobile menu open */
      else if(y>140&&y>lastY+4){b.classList.add('nav-hidden');}                  /* scrolling down -> hide */
      else if(y<lastY-4||y<=140){b.classList.remove('nav-hidden');}             /* scrolling up / near top -> reveal */
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

