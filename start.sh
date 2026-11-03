#!/bin/bash

# Kill any existing Xvfb sessions
pkill Xvfb

# Start virtual frame buffer
Xvfb :99 -screen 0 1920x1080x24 &
export DISPLAY=:99

# Start window manager & VNC server
fluxbox &
x11vnc -display :99 -forever -nopw -rfbport 5900 &

# Start noVNC web interface on port 6080
/usr/share/novnc/utils/novnc_proxy --vnc localhost:5900 --listen 6080 &

# Run your Node.js Puppeteer script
node index.js
