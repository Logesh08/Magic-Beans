import { useState, useRef } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useSpring, animated } from 'react-spring';
import Countdown, { zeroPad } from 'react-countdown';

const calc = (x, y, rect) => [
  (y - rect.top - rect.height / 2) / 20,
  -(x - rect.left - rect.width / 2) / 20,
  1,
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export const LockedCoinCard = ({
  level,
  lockedAmount,
  pendingRewards,
  dailyRewards,
  plantimage,
}) => {
  const [xys, set] = useState([0, 0, 1]);
  const props = useSpring({ xys, config: 'stiff' });
  const ref = useRef(null);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    return (
      <Button
        className='btn-effect btn-animated'
        disabled={completed ? false : true}
        variant='primary'
      >
        CLAIM
        {!completed ? (
          <span>{` IN ${zeroPad(days * 24 + hours)}:${zeroPad(
            minutes
          )}:${zeroPad(seconds)}`}</span>
        ) : (
          ''
        )}
      </Button>
    );
  };
  return (
    <Col ref={ref}>
      <animated.div
        className='card locked-card ccard h-100'
        style={{
          transform: props.xys.to(trans),
        }}
        onMouseLeave={() => set([0, 0, 1])}
        onMouseMove={(e) => {
          const rect = ref.current.getBoundingClientRect();
          set(calc(e.clientX, e.clientY, rect));
        }}
      >
        <img
          className='plant-level'
          src={plantimage}
          width='90%'
          alt='plant level'
        />
        <Card.Header className='py-1'></Card.Header>
        <Card.Body className='d-flex flex-column'>
          <Row>
            <Col>
              <Card.Title className='mb-1 fs-4'>Locked Amount</Card.Title>
              <Card.Text className='small mb-3'>{lockedAmount}</Card.Text>
            </Col>
            <Col className='pe-0'>
              <div className='d-flex align-items-center justify-content-center level-ind h-100'>
                {`LEVEL ${level}`}
              </div>
            </Col>
          </Row>

          <Card.Title className='mb-1 fs-4'>Pending Rewards</Card.Title>
          <Card.Text className='small'>{pendingRewards}</Card.Text>
          <Card.Title className='mb-1 fs-4'>Daily Rewards</Card.Title>
          <Card.Text className='small'>{dailyRewards}</Card.Text>
          <Row className='mt-auto'>
            <Col className='d-flex justify-content-center'>
              <Button
                className='me-4 btn-effect btn-animated'
                variant='primary'
              >
                COMPOUND
              </Button>
              <Countdown date={'2022-03-10T00:00:00'} renderer={renderer} />
            </Col>
          </Row>
        </Card.Body>
      </animated.div>
    </Col>
  );
};
