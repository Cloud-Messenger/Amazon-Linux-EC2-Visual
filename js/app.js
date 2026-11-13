const N=[['lap','Windows laptop',20,40],['pem','PEM key',160,40],['pgen','PuTTYgen',300,40],['ppk','PPK key',440,40],['putty','PuTTY',580,40],['con','AWS Console',20,170],['sg','Security Group',200,170],['ec2','EC2 · Amazon Linux',380,170],['nginx','NGINX',560,170],['web','Website',730,170]];
const $=s=>document.querySelector(s);let cur=0,timer=null;const done=new Set();
function flow(){const pos={};N.forEach(n=>pos[n[0]]=[n[2]+55,n[3]+20]);const act=STEPS[cur].n;
 const L=[['lap','pem'],['pem','pgen'],['pgen','ppk'],['ppk','putty'],['putty','sg'],['con','sg'],['sg','ec2'],['ec2','nginx'],['nginx','web']];
 $('#flow').innerHTML=L.map(l=>{const a=pos[l[0]],b=pos[l[1]];return '<path class="ln'+(act.includes(l[0])&&act.includes(l[1])?' a':'')+'" d="M'+a+' L'+b+'"/>'}).join('')+
 N.map(n=>'<g class="n'+(act.includes(n[0])?' a':'')+'"><rect x="'+n[2]+'" y="'+n[3]+'" width="110" height="40" rx="6"/><text x="'+(n[2]+55)+'" y="'+(n[3]+24)+'">'+n[1]+'</text></g>').join('')+
 '<text x="450" y="235" fill="currentColor" font-size="11" text-anchor="middle" style="fill:var(--mu)">PEM stays on your PC · PuTTYgen converts locally · the private key is never sent to EC2</text>'}
function show(){const s=STEPS[cur];flow();
 $('#steps').innerHTML=STEPS.map((x,i)=>'<li class="'+(i==cur?'on ':'')+(done.has(i)?'done':'')+'"><button data-i="'+i+'">'+x.e+' '+(i+1)+'. '+x.t+'</button></li>').join('');
 document.querySelectorAll('#steps button').forEach(b=>b.onclick=()=>go(+b.dataset.i));
 $('#card').innerHTML='<h2>'+s.e+' Step '+(cur+1)+': '+s.t+'</h2><p>'+s.s+'</p><p><span class="tag">Analogy:</span> '+s.a+'</p><p class="tech"><span class="tag">Technical:</span> '+s.x+'</p>'+
 '<details open><summary>Commands / configuration</summary><pre>'+s.c+'</pre></details><details><summary>Expected output</summary><pre>'+s.o+'</pre></details><details><summary>Common mistakes</summary><p>'+s.m+'</p></details><details><summary>Interview question</summary><p>'+s.q+'</p></details>';
 const b=$('#simbox');b.innerHTML='';if(SIM[cur]){b.innerHTML='<h3>Try it: simulator</h3><div id="sm"></div>';SIM[cur]($('#sm'))}else b.style.display='none';if(SIM[cur])b.style.display='block';
 if(cur==8)b.insertAdjacentHTML('beforeend','<p class="ok">SSH Connection Successful — you launched Amazon Linux 2023 on EC2 and connected with PuTTY!</p>');
 const p=Math.round(done.size/STEPS.length*100);$('#bar').style.width=p+'%';$('#pct').textContent=p+'% complete'}
function go(i){done.add(cur);cur=Math.max(0,Math.min(STEPS.length-1,i));if(cur==STEPS.length-1)done.add(cur);show()}
function stop(){clearInterval(timer);timer=null;$('#play').textContent='Play'}
$('#next').onclick=()=>go(cur+1);$('#prev').onclick=()=>go(cur-1);
$('#play').onclick=()=>{if(timer)return stop();$('#play').textContent='Pause';timer=setInterval(()=>{if(cur>=STEPS.length-1){done.add(cur);show();stop()}else go(cur+1)},5000)};
$('#reset').onclick=()=>{stop();done.clear();cur=0;show()};
$('#mode').onclick=e=>{const t=document.body.dataset.mode=='beginner';document.body.dataset.mode=t?'technical':'beginner';e.target.textContent=t?'Technical Mode':'Beginner Mode'};
$('#theme').onclick=e=>{document.body.classList.toggle('light');e.target.textContent=document.body.classList.contains('light')?'Dark':'Light'};
show();
