#!/bin/bash

pkill Xvfb 2>/dev/null || true

Xvfb :99 -screen 0 1920x1080x24 &
export DISPLAY=:99

fluxbox &
x11vnc -display :99 -forever -nopw -rfbport 5900 &

/usr/share/novnc/utils/novnc_proxy --vnc localhost:5900 --listen 6080 &

node index.js
