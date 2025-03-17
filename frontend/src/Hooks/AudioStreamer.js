import io from 'socket.io-client';

const mediaConstraints = {
    audio: true,
    video: false
  };

let AudioContext, context, processor, globalStream, input

let AudioStreamer = {
    startRecording: function (socket,config) {
        socket.emit('startClient',config);

        AudioContext = window.AudioContext || window.webkitAudioContext;
        context = new AudioContext();
        processor = context.createScriptProcessor(2048, 1, 1);
        processor.connect(context.destination);
        context.resume();

        const handleSuccess = function (stream) {
            globalStream = stream;
            input = context.createMediaStreamSource(stream);
            input.connect(processor);
      
            processor.onaudioprocess = function (e) {
              microphoneProcess(e,socket);
            };
          };
      
          navigator.mediaDevices.getUserMedia(mediaConstraints)
            .then(handleSuccess);
          
        socket.on('stopClient', () => {
            closeAll(socket);
        });

    },

    stopRecording: function (socket) {
        socket.emit('stopClient');
        closeAll(socket);
    }
}

export {AudioStreamer};

function microphoneProcess(e,socket) {
    const left = e.inputBuffer.getChannelData(0);
    const left16 = convertFloat32ToInt16(left);
    socket.emit('audioData',left16);
  }

  function convertFloat32ToInt16(buffer) {
    let l = buffer.length;
    let buf = new Int16Array(l / 3);
  
    while (l--) {
      if (l % 3 === 0) {
        buf[l / 3] = buffer[l] * 0xFFFF;
      }
    }
    return buf.buffer
  }

function closeAll(socket) {
    socket.off("transcriptData");
    let tracks = globalStream ? globalStream.getTracks() : null;
    let track = tracks ? tracks[0] : null;
    if (track) {
        track.stop();
    }

    if (processor) {
        if (input) {
        try {
            input.disconnect(processor);
        } catch (error) {
            console.warn('Attempt to disconnect input failed.')
        }
        }
        processor.disconnect(context.destination);
    }
    if (context) {
        
        context.close().then(function () {
        input = null;
        processor = null;
        context = null;
        AudioContext = null;
        });
}
}