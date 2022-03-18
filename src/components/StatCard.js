import { Card, Button } from 'react-bootstrap';

export const StatCard = ({
  heading,
  list,
  titleStyle,
  isLast,
  hasClaimButton,
  showModal,
}) => {
  return (
    <Card className={!isLast && 'mb-4'}>
      <Card.Header className='text-center py-1'>{heading}</Card.Header>
      <Card.Body>
        {hasClaimButton && (
          <Card.Title
            className={`${titleStyle} d-flex flex-row justify-content-between align-items-center`}
          >
            <span>{list[0].title}</span>

            <Button
              className='w-50 btn-effect btn-animated'
              variant='primary'
              onClick={showModal}
            >
              MINT
            </Button>
          </Card.Title>
        )}

        {!hasClaimButton &&
          list.map((content, idx) => {
            return (
              <div key={`content-${idx}`}>
                <Card.Title className={titleStyle}>{content.title}</Card.Title>
                {content.text && (
                  <Card.Text className='small'>{content.text}</Card.Text>
                )}
              </div>
            );
          })}
      </Card.Body>
    </Card>
  );
};
