import { dialog, ipcMain } from 'electron';
import { extname } from 'path';
import { run_script } from './main';
import { getCurrentDirectory, setCurrentDirectory, getFile } from './manager';


ipcMain.handle('openDialog', async (event, args) => {
  const directory = await dialog.showOpenDialog({ properties: ['openDirectory'] });

  if (directory.canceled || directory.filePaths.length < 1) {
    throw new Error('Cancelled');
  }

  const newPath = directory.filePaths[0];
  const newMap = await setCurrentDirectory(newPath);

  return {
    currrentDirectory: newPath,
    directoryMap: newMap,
  };
});

ipcMain.handle('runFile', async (event, args) => {
  const filePath: string = args[0];
  const extension = extname(filePath);

  //console.log("echo \"COMANDO ESTÁ JALANDO JEJE\"")
  run_script("curl", ["google.com"], () => {
    console.log("Command Executed")
  })
});

ipcMain.handle('readFile', async (event, args) => {
  const filePath: string = args[0];
  //const extension = extname(filePath);

  return getFile(filePath);
});
