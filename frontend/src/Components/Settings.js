import React from 'react';

const Settings = ({ settingsConfig, updateSettings}) => {
  return (
    <div>
      {/* <h2>Captions</h2> */}
      <div className="scrollable-container">    
        <div className="flex-container">
          <div className="flex-item">
              <label>
              Theme:{' '}
              <select value={settingsConfig.layoutTheme} onChange={(e) => updateSettings("layoutTheme",e.target.value)} className='customSelect'>
                  <option value="dark-theme">Default</option>
                  <option value="light-theme">Light</option>
                  <option value="court-theme">Court</option>
              </select>
              </label>
          </div>
          <div className="flex-item">
              <label>
              Font Size:{' '}
              <input
                  type="number"
                  value={parseInt(settingsConfig.fontSize, 10)}
                  onChange={(e) => updateSettings("fontSize",parseInt(e.target.value, 10))}
                  className="customInput"
              />
              </label>
          </div>
          <div className="flex-item">
              <label>
              Font Family:{' '}
              <select value={settingsConfig.fontFamily} onChange={(e) => updateSettings("fontFamily",e.target.value)} className='customSelect'>
                  <option value="Arial">Arial</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Georgia">Georgia</option>
              </select>
              </label>
          </div>
          <div className="flex-item">
              <label>
              Model:{' '}
              <select value={settingsConfig.model} onChange={(e) => updateSettings("model",e.target.value)} className='customSelect'>
                  <option value="latest_long">Default</option>
                  <option value="medical_conversation">Medical Conversation</option>
              </select>
              </label>
          </div>
        </div>
      </div>
      <div className="separator"></div>
    </div>
  );
};

export default Settings;
