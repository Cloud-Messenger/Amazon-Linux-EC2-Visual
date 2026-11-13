const INC=[['Wrong PEM selected','Loaded a different key','Server refused our key','Load the key matching the EC2 key pair name','Login succeeds'],
['PEM not visible','File filter shows only .ppk','(file missing in dialog)','Set filter to All Files','File appears'],
['PPK not generated','Save private key not clicked','No .ppk in Downloads','Click Save private key and name it','.ppk exists'],
['Wrong PPK in PuTTY','Pointed at another key','Disconnected: No supported authentication methods available','Pick cloud-messenger-key.ppk under Auth > Credentials','Login succeeds'],
['Unsupported key format','Key not loaded or corrupt','Unable to use key file','Re-convert with current PuTTYgen','Key loads'],
['Wrong username','Not ec2-user','Disconnected: No supported authentication methods available','Use ec2-user for Amazon Linux','Prompt appears'],
['Port 22 blocked','No inbound SSH rule','Network error: Connection timed out','Add SSH TCP 22 rule','Port reachable'],
['Outdated source IP','Your public IP changed','Network error: Connection timed out','Update the rule to My IP','Connects'],
['Wrong public IP','Typed an old or private IP','Network error: Connection timed out','Copy the current public IPv4 from the console','Connects'],
['Instance stopped','State is stopped','Network error: Connection refused/timed out','Start the instance; recheck the IP','State: running'],
['PuTTY timeout','Firewall, route or VPN issue','Network error: Connection timed out','Check SG, Windows network, then subnet route/IGW','Connects'],
['Host-key warning','Instance replaced or IP reused','POTENTIAL SECURITY BREACH!','Verify the fingerprint via console output before accepting','Warning cleared'],
['SSH auth failure','Key/user mismatch','Server refused our key','Check key pair, user and authorized_keys','Login succeeds'],
['NGINX stopped','Service not running','curl: connection refused','sudo systemctl start nginx','Status: active'],
['HTTP 80 blocked','No inbound HTTP rule','Browser: site can\'t be reached','Add HTTP TCP 80 to the security group','curl -I returns 200'],
['Website not loading','Wrong web root or file','403/404 Not Found','Put index.html in /var/www/html/','Page displays']];
INC.push(['Everything checked','Layers verified','—','SG → Windows network → PuTTY settings → sshd → nginx','SSH Connection Successful']);
SIM[8]=function(el){el.innerHTML='<div class="lab"><ul>'+INC.map((x,i)=>'<li><button data-i="'+i+'">'+(i+1)+'. '+x[0]+'</button></li>').join('')+'</ul><div id="d">Pick an incident.</div></div>';
 el.querySelectorAll('button').forEach(b=>b.onclick=()=>{const x=INC[b.dataset.i];el.querySelector('#d').innerHTML='<p><b>'+x[0]+'</b></p><p><b>Root cause:</b> '+x[1]+'</p><pre>'+x[2]+'</pre><p><b>Fix:</b> '+x[3]+'</p><p class="ok">Verify: '+x[4]+'</p><p><small>Interview: explain root cause, diagnostic order and fix in one minute.</small></p>'})};
