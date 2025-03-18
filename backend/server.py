import socketio
from aiohttp import web

import ssl

from datetime import datetime

from SystemWrapper import SystemWrapper

app = web.Application()
sio = socketio.AsyncServer(cors_allowed_origins=[])
sio.attach(app)

isMicOccupied = False

@sio.on('startClient')
async def start_client(c_id,config):
    global isMicOccupied
    isMicOccupied = True
    await sio.emit('mic_status',{"occupied": isMicOccupied})
    await SystemWrapper.start_client(c_id,sio,config)

@sio.on('stopClient')
async def stop_client(c_id):
    global isMicOccupied
    isMicOccupied = False
    await sio.emit('mic_status',{"occupied": isMicOccupied})
    await SystemWrapper.stop_client(c_id)
    
    
@sio.on('audioData')
async def receive_audio(c_id, audio_data):
    SystemWrapper.receive_audio_data(c_id, audio_data)

# web.run_app(app, host='0.0.0.0', port=10000)
ssl_context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
ssl_context.load_cert_chain('../cert.pem', '../key.pem')
web.run_app(app, host='0.0.0.0', port=10000, ssl_context=ssl_context)