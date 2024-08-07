import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Spinner, Alert, Container, Row, Col } from 'react-bootstrap';
import UserSelector from './UserSelector';
import PostContent from './PostContent';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setStatus('loading');
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
        setStatus('succeeded');
      } catch (err) {
        setError(err.message);
        setStatus('failed');
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => selectedUserId === null || post.userId === selectedUserId);
  }, [posts, selectedUserId]);

  const handleUserChange = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <Container className="mt-5">
      <h2>Post List</h2>
      <UserSelector selectedUserId={selectedUserId} onUserChange={handleUserChange} />

      {status === 'loading' && <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>}
      {status === 'failed' && <Alert variant="danger">{error}</Alert>}
      
      <Row xs={1} md={2} lg={3} className="g-4 mt-3">
        {filteredPosts.map(post => (
          <Col key={post.id}>
            <PostContent title={post.title} body={post.body} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PostList;
