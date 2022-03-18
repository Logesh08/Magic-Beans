import { Container, Row, Col } from 'react-bootstrap';

export const Footer = ({ logo }) => {
  return (
    <Container fluid className='p-5 footer-container'>
      <Container>
        <Row>
          <Col sm={4}>
            <img
              src={logo}
              width='80'
              className='d-inline-block align-top'
              alt='React Bootstrap logo'
            />
          </Col>
          <Col sm={8}>
            <p className='fs-4 mb-0'>Our SEED token contract address</p>
            <p className=''>0x23456789</p>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <p className='fs-4 mb-0'>SEEDs Pages</p>
            <ul>
              <li>Connect Wallet</li>
              <li>Trading Chart</li>
              <li>Whitepaper</li>
            </ul>
          </Col>
          <Col sm={4}>
            <p className='fs-4 mb-0'>SEEDs FAQ</p>
            <ul>
              <li>What is SEED token?</li>
              <li>Where to buy SEED token?</li>
              <li>How much APR we earn when we stake SEED?</li>
            </ul>
          </Col>
          <Col sm={4}>
            <p className='fs-4 mb-0'>Connect us from social media</p>
          </Col>
        </Row>
        <Row>
          <Col sm={4}></Col>
          <Col sm={4}></Col>
        </Row>
      </Container>
    </Container>
  );
};
