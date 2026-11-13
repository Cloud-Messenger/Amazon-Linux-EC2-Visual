# Amazon Linux EC2 Visual™ – From PEM Key to PuTTY SSH Connection
Created by Cloud Messenger™ · https://cloudmessenger.in/ · #buildwithCloud-Messenger

A no-build, vanilla HTML/CSS/JS lab with nine interactive steps: launch Amazon Linux 2023, create a PEM key, open port 22 safely, understand Nitro, convert PEM to PPK with PuTTYgen, configure PuTTY, connect as `ec2-user`, explore Linux and NGINX, and troubleshoot 16 incidents.

**Everything is a simulation.** No AWS credentials, no real keys, nothing stored. Never upload a real private key anywhere.

## Run locally
Open `index.html` in a browser. Check syntax: `for f in js/*.js; do node --check $f; done`

## GitHub Pages
Push to GitHub > Settings > Pages > Deploy from branch `main` / root. `.nojekyll` is included.

## Real-world workflow (outside the simulation)
1. Launch an Amazon Linux 2023 instance; create key pair `cloud-messenger-key` (RSA, .pem).
2. Security group: SSH 22 from My IP; HTTP 80 only if the site is public.
3. PuTTYgen (local on Windows): Load > All Files > select the .pem > Save private key as `.ppk`. Conversion never happens on EC2. Recent PuTTY can use some OpenSSH-format keys, so conversion is the traditional workflow, not always required.
4. PuTTY: Host `ec2-user@<EC2-PUBLIC-IP>`, port 22, SSH; Connection > SSH > Auth > Credentials > select the `.ppk`; save the session; Open; verify host key.
5. Deploy: `sudo dnf update -y && sudo dnf install git nginx -y`, clone this repo, `sudo cp -r amazon-linux-putty-visual/* /var/www/html/`, `sudo systemctl enable --now nginx`.

## Security
Restrict SSH to your IP, never commit `.pem`/`.ppk` files (.gitignore blocks them), protect both files, rotate keys if exposed.

© 2026 Cloud Messenger. Third-party trademarks and software remain the property of their owners.
