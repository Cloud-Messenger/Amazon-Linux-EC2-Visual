const OUT={whoami:'ec2-user',pwd:'/home/ec2-user','ls -la':'total 12\ndrwx------ 3 ec2-user ec2-user 95 .\n-rw-r--r-- 1 ec2-user ec2-user 18 .bash_logout','uname -a':'Linux ip-172-31-10-20 6.1.x #1 SMP x86_64 GNU/Linux','cat /etc/os-release':'NAME="Amazon Linux"\nVERSION="2023"\nID="amzn"','hostname':'ip-172-31-10-20.ec2.internal','df -h':'/dev/nvme0n1p1  8.0G  1.6G  6.5G  20% /','free -m':'Mem: 904 total  310 used  420 free','uptime':' up 3 min, 1 user, load average: 0.00','ip addr':'2: ens5: <BROADCAST,MULTICAST,UP> inet 172.31.10.20/20',
'sudo dnf update -y':'Dependencies resolved.\nComplete!','sudo dnf install nginx -y':'Installing: nginx\nInstalled: nginx-1.x\nComplete!','sudo systemctl enable --now nginx':'Created symlink ... nginx.service','sudo systemctl status nginx':'● nginx.service - nginx\n   Active: active (running)\n   Listening on 0.0.0.0:80','curl -I http://localhost':'HTTP/1.1 200 OK\nServer: nginx'};
function term(el,login){let ok=!login;
 function ui(){el.innerHTML=(ok?'':'<div class="win"><h4>PuTTY Security Alert (simulated)</h4><div class="body"><p>The server\'s host key is not cached. Verify the fingerprint before trusting it.</p><button class="pri" id="acc">Accept</button></div></div>')+'<div class="term" id="t"></div><input id="i" placeholder="type a command, e.g. whoami" '+(ok?'':'disabled')+'><p><small>Try: '+Object.keys(OUT).join(' · ')+'</small></p>';
 const t=el.querySelector('#t'),i=el.querySelector('#i');
 const p=s=>{t.textContent+=s+'\n';t.scrollTop=1e5};
 if(ok){p(login?'login as: ec2-user\nAuthenticating with public key "cloud-messenger-key"\n\n       Amazon Linux 2023\n':'');}
 const acc=el.querySelector('#acc');if(acc)acc.onclick=()=>{ok=true;ui()};
 i.onkeydown=e=>{if(e.key!=='Enter')return;const c=i.value.trim();i.value='';p('[ec2-user@ip-172-31-10-20 ~]$ '+c);p(OUT[c]||'bash: '+c+': command not found (simulation supports the listed commands)')}}
 ui()}
SIM[6]=el=>term(el,true);SIM[7]=el=>term(el,false);
