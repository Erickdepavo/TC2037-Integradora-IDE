import { useContext, useState } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { MainContext } from 'renderer/App';

function MainView() {
  let context = useContext(MainContext);

  function didClickOpen() {
    context.changeDirectory();
  }

  return (
    <div className="centered-content main-dialog">
      <Container fluid>
          <Col>
            <h1>EA Code</h1>
            <Button variant="primary" onClick={() => didClickOpen()}>
              Open Folder
            </Button>
          </Col>
      </Container>
    </div>
  );
}

export default MainView;
