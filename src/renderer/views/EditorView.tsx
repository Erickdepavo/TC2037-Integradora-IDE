/* eslint-disable @typescript-eslint/no-use-before-define */

import { useState, useEffect, useContext } from 'react';
import { Container, Collapse, Button, Row, ButtonToolbar, Dropdown, ButtonGroup, Col, Form } from 'react-bootstrap';
import { basename, dirname, extname, join } from 'path-browserify';
//import { fileURLToPath } from 'url';

// import * as monaco from 'monaco-editor';
import Editor, { useMonaco } from '@monaco-editor/react';

// import loader from '@monaco-editor/loader';
// loader.config({ monaco });
// loader.config({ paths: { vs: "extras" },});

import { MainContext } from '../App';

import './EditorView.scss';
import Sidebar from './components/Sidebar';
import MenuBar from './components/MenuBar';
import ConsoleView from './components/ConsoleView';
import { readFile } from 'renderer/communication';

function EditorView() {
  let context = useContext(MainContext);

  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const [fileContents, setFileContents] = useState<string>('');
  const [originalFileContents, setOriginalFileContents] = useState<string>('');

  function onFileChange(path: string) {
    console.log(path);
    setCurrentFile(path);
  }

  useEffect(() => {
    console.log("extname", extname(currentFile))
    readFile(currentFile)
    .then((text) => {
      console.log("File read:", text)
      setOriginalFileContents(text);
      setFileContents(text);
    })
    .catch((error) => {
      console.error("File couldn't be read", error);
      setCurrentFile(null);
      setFileContents('');
      setOriginalFileContents('');
    })
  }, [currentFile]);

  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      console.log("here is the monaco instance:", monaco);
    }
  }, [monaco]);

  const [sidebarWidth, setSidebarWidth] = useState('280px');

  const [showsConsole, setShowsConsole] = useState(true);
  const [editorSize, setEditorSize] = useState(6);
  const [consoleWrap, setConsoleWrap] = useState(true);

  return (
    <div className="d-flex bd-highlight">
      <Sidebar width={sidebarWidth} onFileChange={onFileChange} />
      <div className="w-100 h-100">
        <Container fluid>
          <Row>
            <MenuBar
              filename={currentFile ? basename(currentFile) : ' '}
              canSave={fileContents !== originalFileContents}
              canRun={currentFile ? extname(currentFile) === '.ea' : false}
              showsConsole={showsConsole}
              setShowsConsole={setShowsConsole}
              editorSize={editorSize}
              setEditorSize={setEditorSize}
              consoleWrap={consoleWrap}
              setConsoleWrap={setConsoleWrap}
            />
          </Row>
          <Row>
            <Col sm={showsConsole ? editorSize : 12} className="p-0">
              {
                !currentFile ? <p>
                  No file selected
                </p> :
                <Editor
                  height="calc(100vh - 55px)"
                  path={currentFile}
                  value={fileContents}
                  onChange={(value, event) => {
                    console.log("File contents changed")
                    setFileContents(value);
                  }}
                  //defaultValue={originalFileContents}
                  //language={extname(currentFile)}
                />
              }
            </Col>
            <Col
              sm={12 - editorSize}
              className={`p-0 ${showsConsole ? '' : 'd-none'}`}
            >
              <ConsoleView wrap={consoleWrap} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default EditorView;
