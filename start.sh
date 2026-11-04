#!/bin/bash
pkill Xvfb 2>/dev/null || true
pkill x11vnc 2>/dev/null || true
pkill fluxbox 2>/dev/null || true

rm -f /tmp/.X99-lock

Xvfb :99 -screen 0 1920x1080x24 &
export DISPLAY=:99

fluxbox &
x11vnc -display :99 -forever -nopw -rfbport 5900 &

python3 -m websockify.websocketproxy --web=/usr/share/novnc 6080 localhost:5900 &

node index.js
