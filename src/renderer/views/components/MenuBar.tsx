/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState, useEffect, useContext } from 'react';
import { Container, Collapse, Button, Row, ButtonToolbar, Dropdown, ButtonGroup, Col, Form } from 'react-bootstrap';
import { basename, dirname, join } from 'path-browserify';
//import { fileURLToPath } from 'url';

import { MainContext } from '../../App';
import { runFile } from 'renderer/communication';

function MenuBar(props) {
  let context = useContext(MainContext);

  const { filename, canSave, canRun, showsConsole, setShowsConsole, editorSize, setEditorSize, consoleWrap, setConsoleWrap } = props;

  function didTapRun() {
    context.clearConsole();
    runFile("Yikes")
  }

  return (
    <ButtonToolbar className="p-2 border-bottom justify-content-between">
      <span className="fs-6 mt-2 ms-2">{filename}</span>
      <ButtonToolbar className="justify-content-end">
        <Button className="me-2" variant="outline-info" disabled={!canSave}>
          <SaveIcon />
          Guardar
        </Button>
        <Button
          className={canRun ? 'me-2' : 'd-none'}
          variant="outline-success"
          disabled={!canRun}
          onClick={() => didTapRun()}
        >
          <PlayIcon />
          Ejecutar
        </Button>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
            <SettingsIcon />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <div className="py-1 px-3" style={{ whiteSpace: 'nowrap' }}>
              <Form.Check
                type="checkbox"
                id="show-console"
                label="Mostrar Consola"
                checked={showsConsole}
                onChange={(e) => setShowsConsole(e.target.checked)}
              />
            </div>

            <div
              className="py-1 px-3 d-flex"
              style={{ whiteSpace: 'nowrap', alignItems: 'center' }}
            >
              <i className={`bi bi-layout-split fs-5 me-2 ${showsConsole ? "" : "text-secondary"}`} />
              {/* <i class="bi bi-window-split fs-5 me-2" style={{ transform: 'scaleX(-1)' }}></i> */}
              <Form.Range
                style={{ width: '120px' }}
                disabled={!showsConsole}
                min="6" max="9" step="1"
                value={editorSize}
                onChange={(e) => setEditorSize(Number(e.target.value))}
              />
              <i className={`bi bi-layout-sidebar-reverse fs-5 ms-2 ${showsConsole ? "" : "text-secondary"}`} />
              {/* <i class="bi bi-window-sidebar fs-5 ms-2" style={{ transform: 'scaleX(-1)' }}></i> */}
            </div>

            <div className="py-1 px-3" style={{ whiteSpace: 'nowrap' }}>
              <Form.Check
                disabled={!showsConsole}
                type="checkbox"
                id="console-wrap"
                label="Line Wrap"
                checked={consoleWrap}
                onChange={(e) => setConsoleWrap(e.target.checked)}
              />
            </div>

            <Dropdown.Divider />
            <Dropdown.Item onClick={() => { context.changeDirectory() }}>Cambiar carpeta</Dropdown.Item>
            <Dropdown.Item onClick={() => { context.closeDirectory() }}>Cerrar carpeta</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ButtonToolbar>
    </ButtonToolbar>
  );
}

export default MenuBar;

function SaveIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-save2 me-2" viewBox="0 0 16 16">
      <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v4.5h2a.5.5 0 0 1 .354.854l-2.5 2.5a.5.5 0 0 1-.708 0l-2.5-2.5A.5.5 0 0 1 5.5 6.5h2V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-fill me-1" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
    </svg>
  );
}


function SettingsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
      <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
    </svg>
  );
}
