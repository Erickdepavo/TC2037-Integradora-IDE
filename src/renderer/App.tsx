import * as React from 'react';
import { useState, useEffect, useContext } from 'react';

import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import '../../node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff';
import '../../node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff2';
import '../../node_modules/bootstrap-icons/font/bootstrap-icons.scss';
import './App.scss';

import MainView from './views/MainView';
import EditorView from './views/EditorView';
import { showOpenDialog } from './communication';

export const MainContext = React.createContext<{
  currrentDirectory: string | null,
  directoryMap: (string | string[])[],
  changeDirectory: () => void,
  closeDirectory: () => void,
  consoleOutput: string,
  clearConsole: () => void,
}>({
  currrentDirectory: null,
  directoryMap: [],
  changeDirectory: () => {},
  closeDirectory: () => {},
  consoleOutput: '',
  clearConsole: () => {},
})
MainContext.displayName = 'MainContext';

function BaseView() {
  const context = useContext(MainContext);
  const needsDirectory = () => !context.currrentDirectory;

  return needsDirectory() ? <MainView /> : <EditorView />;
}

export default function App() {

  const [directory, setDirectory] = useState<{
    currrentDirectory: string | null,
    directoryMap: (string | string[])[]
  }>({
    currrentDirectory: null,
    directoryMap: []
  })

  function changeDirectory() {
    showOpenDialog()
    .then((data) => {
      console.log('Opened', data);
      return setDirectory({
        currrentDirectory: data.currrentDirectory,
        directoryMap: data.directoryMap,
      });
    })
    .catch((e) =>
      console.error('Open Dialog cancelled with message', e.message)
    );
  }

  function closeDirectory() {
    setDirectory({
      currrentDirectory: null,
      directoryMap: [],
    });
  }

  // Console
  const [consoleOutput, setConsoleOutput] = useState('');

  const getConsoleOutput = () => consoleOutput;

  function updateOutput(newText: string) {
    const text = [consoleOutput, newText].join('');
    console.log("updateOutput adding", newText)
    setConsoleOutput(text);
  }

  function clearOutput() {
    setConsoleOutput('');
  }

  const listener = (event, args) => {
    console.log("Outputt:", event);
    updateOutput(event)
  };

  useEffect(() => {
    console.log("Now listening", window.electron.ipcRendererFull)

    const unsubscribe = window.electron.ipcRenderer.on('mainprocess-response', listener);
    return () => {
      unsubscribe();
    }

  }, [consoleOutput]);

  useEffect(() => {
    console.log("Command length", consoleOutput.length)
  }, [consoleOutput]);

  const value = {
    ...directory,
    changeDirectory: changeDirectory,
    closeDirectory: closeDirectory,
    consoleOutput: consoleOutput,
    clearConsole: clearOutput,
  };

  return (
    <MainContext.Provider value={value}>
      <Router>
        <Routes>
          <Route path="/" element={<BaseView />} />
        </Routes>
      </Router>
    </MainContext.Provider>
  );
}
