import { NavLink } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import agentpic from "../public/agent.jpg"
import transactionpic from "../public/transaction.jpg"

function Home() {
  return (
    <Row xs={1} md={2} className="g-4">
        <Col>
          <Card style={{ width: '30rem' }}>
            <Card.Img variant="top" src={agentpic}/>
            <Card.Body>
              <Card.Title>Agent Management</Card.Title>
              <Card.Text>
                
              </Card.Text>
              <NavLink className="nav-link" to="/agents">
                <Button variant="info">Go to agents page</Button>
              </NavLink>
              {/* <Button variant="info">Go to agents page</Button> */}
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '30rem' }}>
            <Card.Img variant="top" src={transactionpic}/>
            <Card.Body>
              <Card.Title>Transaction</Card.Title>
              <Card.Text>
                
              </Card.Text>
              <NavLink className="nav-link" to="/create">
                <Button variant="success">Go to transaction page</Button>
              </NavLink>
              {/* <Button variant="success">Go to transaction page</Button> */}
            </Card.Body>
          </Card>
        </Col>
    </Row>
  );
}

export default Home
