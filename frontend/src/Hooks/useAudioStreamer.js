import {useState} from "react";

import {AudioStreamer} from "./AudioStreamer";

export const useAudioStreamer = (socket) => {
    const [isRecording, setIsRecording] = useState(false);
  
    const startStreaming = (config) => {
      setIsRecording(true);
      AudioStreamer.startRecording(socket, config);
    };
  
    const stopStreaming = () => {
      setIsRecording(false);
      AudioStreamer.stopRecording(socket);
    };
  
    return { startStreaming, stopStreaming, isRecording };
};