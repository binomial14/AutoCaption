import React, {useState, useEffect} from "react";
import io from 'socket.io-client';

import Settings from "./Components/Settings";
import TranscriptDisplay from "./Components/TranscriptDisplay";
import LoadingDots from "./Components/LoadingDots";
import { useWebSocket } from "./Hooks/useWebSocket";
import { useAudioStreamer } from "./Hooks/useAudioStreamer";

import './App.css';

function App() {
  const socket = io(process.env.REACT_APP_BACKEND_URL,{transports: ['websocket']});
  const {isMicAvailable, transcription, interimTranscription, isLoading} = useWebSocket(socket);
  const {startStreaming, stopStreaming, isRecording } = useAudioStreamer(socket);

  const [settingsConfig, setSettingsConfig] = useState({
    layoutTheme: "dark-theme",
    fontSize: 72,
    fontFamily: "Arial",
    model: "latest_long"
  });

  const updateSettings = (key, value) => {
    setSettingsConfig((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      root.className = settingsConfig.layoutTheme;
    }
  }, [settingsConfig.layoutTheme]);

  return (
    <div className="app">
      {isMicAvailable && !isRecording && 
        <div>
          <Settings settingsConfig={settingsConfig} updateSettings={updateSettings}/>
          
          <div className="center-button">
            <button onClick={() => startStreaming(settingsConfig)} variant="primary" className="customButton">Start transcribing</button>
          </div>
        </div>
      }

      {isRecording && 
        <div className="center-button">
          <button onClick={stopStreaming} variant="danger" className="customButton">Stop</button>
        </div>
      }

      <div style={{ fontSize: `${settingsConfig.fontSize}px`, fontFamily: settingsConfig.fontFamily }}>
        <TranscriptDisplay transcription={transcription} interimTranscription={interimTranscription}/>
        {isLoading &&
          <LoadingDots/>
        }
      </div>
    </div>
  );
}

export default App;
