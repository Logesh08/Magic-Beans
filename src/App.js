import 'swiper/css';
// import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './App.css';

import boywatering from './images/boywatering.png';
import logo from './images/logo.png';
import connectButtonLogo from './images/connect-button-logo.png';

import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSpring, animated } from 'react-spring';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import { TopNavBar } from './components/TopNavBar';
import { StatCard } from './components/StatCard';
import { LockedCoinCard } from './components/LockedCoinCard';
import { Footer } from './components/Footer';
import { MintModal } from './components/MintModal';
// import { Button } from 'bootstrap';

import {
  mySeedsStat,
  myAllStat,
  myBeansStat,
  priceStat,
  TVLStat,
  totalBeansStat,
  lockedCoinStats,
} from './data/HomeComponentData';

function App() {
  const styles = useSpring({
    loop: { reverse: true, config: { friction: 500 } },
    from: { x: -280 },
    to: { x: 10 },
  });
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <MintModal show={modalShow} onHide={() => setModalShow(false)} />
      <Container fluid='lg' className='min-vh-100 position-relative p-4 p-xl-0'>
        <TopNavBar {...{ logo, connectButtonLogo }} />
        <Row className='align-items-stretch'>
          <Col
            sm={12}
            md
            xl={3}
            className='d-flex flex-column justify-content-between'
            id='maxix'
          >
            <StatCard
              heading='My Seeds'
              list={mySeedsStat}
              titleStyle='mb-0 fs-4'
            />
            <StatCard
              heading='My Stats'
              list={myAllStat}
              titleStyle='mb-1 fs-4'
            />
            <StatCard
              heading='My Beans'
              list={myBeansStat}
              titleStyle='mb-0 fs-4'
              isLast
              hasClaimButton
              showModal={() => setModalShow(true)}
            />
          </Col>
          <Col
            sm={12}
            md={5}
            xl={6}
            className='align-self-end position-relative'
          >
            <animated.img
              className='boy-watering position-absolute'
              src={boywatering}
              alt='boy watering'
              style={{ ...styles }}
            />
            {/* <Row sm={1} xl={2} className='g-2'> */}
            <Row>
              <Swiper
                slidesPerView={1}
                slidesPerGroup={1}
                spaceBetween={0}
                grabCursor={true}
                speed={0}
                breakpoints={{
                  1200: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    slidesPerGroup: 2,
                  },
                }}
                navigation={true}
                // pagination={{
                //   clickable: true,
                //   dynamicBullets: true,
                //   dynamicMainBullets: 3,
                //   renderBullet: function (index, className) {
                //     return `<button type="button" class="btn ${className}">${
                //       index + 1
                //     }</button>`;
                //   },
                // }}
                modules={[
                  // Pagination,
                  Navigation,
                ]}
              >
                {lockedCoinStats.map((lockedCoinStat, idx) => (
                  <SwiperSlide key={`lockedCard-${idx}`}>
                    <LockedCoinCard
                      {...lockedCoinStat}
                      plantimage={lockedCoinStat.plantLevel}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Row>
          </Col>
          <Col
            sm={12}
            md
            xl={3}
            className='d-flex flex-column justify-content-between'
            id = 'rightty-tab'
          >
            <StatCard heading='$1.5' list={priceStat} titleStyle='mb-0 fs-4' />
            <StatCard heading='TVL' list={TVLStat} />
            <StatCard
              heading='Total Beans'
              list={totalBeansStat}
              titleStyle='mb-0 fs-4'
              isLast
            />
          </Col>
        </Row>
      </Container>
      <Footer logo={logo} />
    </>
  );
}

export default App;
