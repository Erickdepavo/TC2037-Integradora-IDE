/* eslint-disable import/prefer-default-export */

export async function showOpenDialog() {
  const ipcRenderer = window.electron.ipcRendererFull;

  console.log(window.electron.ipcRenderer);
  console.log(ipcRenderer);
  return ipcRenderer.invoke('openDialog', []);
}

export async function runFile(path: string) {
  const ipcRenderer = window.electron.ipcRendererFull;

  console.log("runFile");
  console.log(ipcRenderer);
  return ipcRenderer.invoke('runFile', [path]);
}

export async function readFile(path: string) {
  const ipcRenderer = window.electron.ipcRendererFull;

  console.log("readFile");
  console.log(ipcRenderer);
  return ipcRenderer.invoke('readFile', [path]);
}

/*
let consoleCallback: (newOutput: string) => void = () => {}
window.electron.ipcRendererFull.on('listenToConsole', (event, args) => {

});*/

/*
export async function listenToConsole(callback: (newOutput: string) => void) {
  const ipcRenderer = window.electron.ipcRendererFull;

  console.log("runFile");
  console.log(ipcRenderer);
  return ipcRenderer.on()
}*/
