/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState, useEffect, useContext } from 'react';
import { Container, Collapse, Button, Row } from 'react-bootstrap';
import { basename, dirname, join } from 'path-browserify';

import { MainContext } from 'renderer/App';

function Sidebar(props) {
  const context = useContext(MainContext);

  const [collapseState, setCollapseState] = useState(
    new Map<string, boolean>()
  );

  function didTapCollapse(dir: string, value: boolean) {
    const newState = collapseState;
    newState.set(dir, value);
    setCollapseState(new Map(newState));
  }

  function getListItemForItem(item: string | string[]) {
    if (typeof item === 'string' || item instanceof String) {
      return <FileItem key={item} item={item} onFileChange={props.onFileChange} />;
    }
    return <FolderItem key={item[0]} items={item} />;
  }

  function FolderItem(props) {
    const items: string[] = props.items;

    const folderPath = items[0];
    const title = basename(folderPath);

    const isCollapsed = collapseState.get(folderPath) ?? true;
    const parentFolderPath = dirname(folderPath)
    const isTopLevelFolder = context.currrentDirectory === parentFolderPath

    return (
      <li key={folderPath}>
        <button
          type="button"
          className={`btn btn-toggle align-items-center rounded${isCollapsed ? ' collapsed' : ''}`}
          onClick={() => didTapCollapse(folderPath, !isCollapsed)}
          aria-expanded={!isCollapsed}
        >
          <i className="bi bi-folder-fill me-1"></i>{title}
        </button>
        <Collapse in={!isCollapsed} data-parent={isTopLevelFolder ? `#${parentFolderPath}` : undefined} mountOnEnter>
          <div id={`collapse-${folderPath}`}>
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ms-2">
              {items.slice(1).map((item) => getListItemForItem(item))}
            </ul>
          </div>
        </Collapse>
      </li>
    );
  }

  function FileItem(props) {
    const filePath: string = props.item;
    const title = basename(filePath);

    return (
      <li key={filePath}>
        <button
          type="button"
          className="btn btn-not-toggle align-items-center rounded"
          onClick={() => props.onFileChange(filePath)}
        >
          <span className="ms-3">
            <i className="bi bi-file-earmark-code me-1" />{title}
          </span>
        </button>
      </li>
    );
  }

  return (
    <div className="flex-shrink-0" style={{ width: props.width, maxHeight: '100px' }}>
      <div className="d-flex align-items-center pb-3 pt-3 px-3 link-dark text-decoration-none border-bottom border-end">
        <Row>
          <span className="fs-5 fw-semibold">EA Code</span>
          <span className="fs-6">{basename(context.currrentDirectory)}</span>
        </Row>
      </div>
      <ul className="list-unstyled p-2 m-0 border-end" style={{ height: 'calc(100vh - 87px)', overflowY: 'auto' }}>
        {context.directoryMap.slice(1).map((value) => getListItemForItem(value))}
      </ul>
    </div>
  );
}

export default Sidebar;
