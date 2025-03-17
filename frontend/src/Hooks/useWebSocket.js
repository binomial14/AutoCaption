import { useState, useEffect } from "react";

export const useWebSocket = (socket) => {
    const [isMicAvailable, setIsMicAvailable] = useState(true);
    const [transcription, setTranscription] = useState([]);
    const [interimTranscription, setInterimTranscription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function handleDataReceived(spkr_id, data, isFinal) {
        if (isFinal) {
            setInterimTranscription('');
            setTranscription(oldData => [...oldData, [spkr_id, data]]);
        } else {
            setInterimTranscription(data);
        }
    }

    useEffect(() => {
        socket.on('mic_status', ({ occupied }) => {
          setIsMicAvailable(!occupied);
        });
    
        socket.on('transcriptData', (response) => {
          handleDataReceived(response.speaker_id, response.data, response.isFinal);
        });
    
        socket.on('systemInfo', (response) => {
          setIsLoading(response.isFinal);
        });
      }, []);

    return {isMicAvailable, transcription, interimTranscription, isLoading};
};
