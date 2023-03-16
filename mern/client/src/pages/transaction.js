import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function Transaction() {
  return (
    <>
        <h3>Transactions:</h3>
        <br/>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Amount ($)</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>14/01/2022</td>
              <td>9500</td>
              <td>Mark</td>
              <td>Otto</td>
            </tr>
            <tr>
              <td>2</td>
              <td>15/12/2021</td>
              <td>8000</td>
              <td>Jacob</td>
              <td>Thornton</td>
            </tr>
            <tr>
              <td>3</td>
              <td >01/06/2021</td>
              <td >10000</td>
              <td>Larry</td>
              <td>Bird</td>
            </tr>
          </tbody>
        </Table>
        <Row className="g-2">
          <Col md>
            <FloatingLabel controlId="floatingInputGrid" label="Amount of Transaction ($)">
              <Form.Control type="number" placeholder="number" />
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel controlId="floatingSelectGrid" label="Select the Agent">
              <Form.Select aria-label="Floating label select example">
                <option>-----</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col xs='5'>
            <Button type="submit">
              Submit
            </Button>
          </Col>
        </Row>
    </>
    
  );
}

export default Transaction;