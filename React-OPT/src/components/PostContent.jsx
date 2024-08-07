import React from 'react';
import { Card } from 'react-bootstrap';


const PostContent = React.memo(({ title, body }) => {
  console.log("Rendering PostContent"); 

  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{body}</Card.Text>
      </Card.Body>
    </Card>
  );
});

export default PostContent;
