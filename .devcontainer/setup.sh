#!/bin/bash
export DEBIAN_FRONTEND=noninteractive

# Update and install desktop, VNC, and browser
sudo apt update
sudo apt install -y lxde tightvncserver firefox git

# Set up VNC password automatically (e.g., password 'password123')
mkdir -p ~/.vnc
echo "password123" | vncpasswd -f > ~/.vnc/passwd
chmod 600 ~/.vnc/passwd

# Configure xstartup
echo -e "#!/bin/bash\nxrdb \$HOME/.Xresources\nstartlxde &" > ~/.vnc/xstartup
chmod +x ~/.vnc/xstartup

# Start VNC server
vncserver :1 -geometry 1280x800 -depth 24

# Clone and run noVNC
git clone https://github.com/novnc/noVNC.git
./noVNC/utils/novnc_proxy --vnc localhost:5901 --listen 6080 &
