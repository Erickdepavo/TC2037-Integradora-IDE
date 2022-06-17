/* eslint-disable @typescript-eslint/no-use-before-define */

import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
//import useIpcListener from 'useIpcListener';
import { Container, Collapse, Button, Row, ButtonToolbar, Dropdown, ButtonGroup, Col, Form } from 'react-bootstrap';
import { MainContext } from 'renderer/App';

/*
export const ConsoleContext = React.createContext<{
  currentText: string,
}>({
  currrentDirectory: null,
  directoryMap: [],
  changeDirectory: () => {},
  closeDirectory: () => {},
})
MainContext.displayName = "MainContext";
*/

function ConsoleView(props) {
  let context = useContext(MainContext);

  /*
  const [currentOutput, setCurrentOutput] = useState('');

  function updateOutput(newText: string) {
    const text = [currentOutput, newText].join('\n');
    setCurrentOutput(text);
  }
*/
  /*useIpcListener("mainprocess-response", ((event, ...args) => {
    console.log('Received message from Main Process', ...args);
    console.log(event);
}));*/

  /*useEffect(() => {
    console.log("Now listening", window.electron.ipcRendererFull)

    window.electron.ipcRenderer.on("mainprocess-response", (event, args) => {
      console.log("Outputtt:", event);
      updateOutput(event);
    });
  }, [])*/


  useEffect(() => {
    console.log("Current output: ", context.consoleOutput)
  }, [context.consoleOutput]);

  return (
    <>
      <ButtonToolbar className="py-1 px-3 border-start border-bottom">
        <code className="text-dark" style={{ fontSize: '14px', fontWeight: '700' }}>OUTPUT</code>
      </ButtonToolbar>
      <div className="border-start px-3 py-2" style={{ height: 'calc(100vh - 85px)', overflowY: 'auto' }}>
        <code className="w-100 text-dark" style={{ whiteSpace: props.wrap ? 'pre-wrap' : 'pre' }}>
          {context.consoleOutput}
          {/*'var let love me encewk ceaj kn caelk  nckaevcneak mnvkladnvklnkn kladnvl kdan '*/}
          {/*`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lectus justo, vestibulum nec sapien at, tristique ultrices dui. Donec ut mauris vel sapien faucibus tempus sit amet in augue. Ut facilisis eros felis. Nam at risus feugiat mauris luctus tempus. Vestibulum varius nisl odio, sed vestibulum erat tincidunt a. Sed ut lacus ipsum. Phasellus scelerisque pellentesque ante vitae convallis. Etiam efficitur, elit eu maximus vehicula, lorem velit rhoncus metus, ut venenatis mauris ante molestie dui.

Proin venenatis nisl at congue lobortis. Integer ullamcorper volutpat facilisis. Pellentesque semper ex id justo placerat semper. Aenean sollicitudin malesuada risus, eget gravida elit finibus ac. Phasellus fringilla urna nec venenatis finibus. Quisque pellentesque nulla in orci placerat ultricies. Nam aliquet accumsan diam bibendum molestie. Nulla tristique efficitur erat, at laoreet purus porttitor ac. Sed at elementum mauris. Fusce viverra imperdiet ante, nec efficitur mi.

Sed porttitor metus et lectus vehicula pharetra. Vestibulum neque leo, rutrum a libero nec, sodales mattis tortor. Etiam mollis, metus et accumsan suscipit, mauris orci feugiat augue, quis fermentum eros tortor ac justo. Vivamus molestie pretium mollis. Donec risus tortor, tempus ut lectus sed, efficitur gravida felis. Phasellus ultrices euismod tellus ut ornare. Donec erat dui, mattis at massa a.`*/}
        </code>
      </div>
    </>
  );
}

export default ConsoleView;
