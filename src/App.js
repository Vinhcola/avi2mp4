/**
 * React Main Component - Compact Single-Page Layout
 * 
 * FFVN Video AutoConvert - Medical IT Utility
 * 
 * Layout Design:
 * - Single-page, no scrolling (fits in one screen)
 * - Max width: 960px, centered
 * - Compact header, config row, controls inline, fixed-height logs
 * - Optimized for 1366×768 and 1920×1080 displays
 */

import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  // State management
  const [isWatching, setIsWatching] = useState(false);
  const [config, setConfig] = useState({
    watchFolder: 'D:/ffvn/avi',
    outputFolder: 'D:/ffvn/mp4',
    interval: 60
  });
  const [logs, setLogs] = useState([]);
  const logEndRef = useRef(null);

  // Auto-scroll to bottom when new log arrives
  const scrollToBottom = () => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  // Initialize on component mount
  useEffect(() => {
    // Get initial configuration
    if (window.electronAPI) {
      window.electronAPI.getConfig();
      window.electronAPI.getStatus();

      // Set up listeners
      window.electronAPI.onConfig((receivedConfig) => {
        setConfig(receivedConfig);
      });

      window.electronAPI.onWatchStatus((status) => {
        setIsWatching(status.isWatching);
      });

      window.electronAPI.onLog((logEntry) => {
        setLogs((prevLogs) => [...prevLogs, logEntry]);
      });
    }

    // Cleanup listeners on unmount
    return () => {
      if (window.electronAPI) {
        window.electronAPI.removeAllListeners('log');
        window.electronAPI.removeAllListeners('watch-status');
        window.electronAPI.removeAllListeners('config');
      }
    };
  }, []);

  // Handle START button click
  const handleStart = () => {
    if (window.electronAPI) {
      window.electronAPI.startWatch();
    }
  };

  // Handle STOP button click
  const handleStop = () => {
    if (window.electronAPI) {
      window.electronAPI.stopWatch();
    }
  };

  // Get log level CSS class
  const getLogLevelClass = (level) => {
    switch (level) {
      case 'success':
        return 'log-success';
      case 'error':
        return 'log-error';
      case 'warning':
        return 'log-warning';
      default:
        return 'log-info';
    }
  };

  return (
    <div className="App">
      {/* Compact Header */}
      <header className="App-header">
        <h1>FFVN Video AutoConvert</h1>
        <p className="subtitle">Medical IT Utility</p>
      </header>

      {/* Main Content - Single Page, No Scroll */}
      <main className="App-main">
        {/* Configuration Row - All in One Row */}
        <section className="config-section">
          <div className="config-row">
            <div className="config-item">
              <label>Watch Folder:</label>
              <span className="config-value">{config.watchFolder}</span>
            </div>
            <div className="config-item">
              <label>Output Folder:</label>
              <span className="config-value">{config.outputFolder}</span>
            </div>
            <div className="config-item">
              <label>Interval:</label>
              <span className="config-value">{config.interval} seconds</span>
            </div>
          </div>
        </section>

        {/* Controls - Inline Layout */}
        <section className="control-section">
          <div className="control-row">
            <div className="button-group">
              <button
                className={`btn btn-start ${isWatching ? 'btn-disabled' : ''}`}
                onClick={handleStart}
                disabled={isWatching}
              >
                START
              </button>
              <button
                className={`btn btn-stop ${!isWatching ? 'btn-disabled' : ''}`}
                onClick={handleStop}
                disabled={!isWatching}
              >
                STOP
              </button>
            </div>
            <div className="status-indicator">
              <span className={`status-dot ${isWatching ? 'status-active' : 'status-inactive'}`}></span>
              <span className="status-text">
                {isWatching ? 'Watching...' : 'Stopped'}
              </span>
            </div>
          </div>
        </section>

        {/* Log Panel - Fixed Height, Scroll Inside */}
        <section className="log-section">
          <h2>Conversion Logs</h2>
          <div className="log-panel">
            {logs.length === 0 ? (
              <div className="log-empty">No logs yet. Click START to begin watching.</div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className={`log-entry ${getLogLevelClass(log.level)}`}>
                  <span className="log-timestamp">[{log.timestamp}]</span>
                  <span className="log-level">[{log.level.toUpperCase()}]</span>
                  <span className="log-message">{log.message}</span>
                </div>
              ))
            )}
            <div ref={logEndRef} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
