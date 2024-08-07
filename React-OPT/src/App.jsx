import React from 'react';
import { Container } from 'react-bootstrap';
import PostList from './components/PostList';

const App = () => {
  return (
    <Container>
      <h1 className="mt-5">Blog Platform</h1>
      <PostList />
    </Container>
  );
};

export default App;

