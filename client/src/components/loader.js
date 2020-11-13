import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        margin: 'auto',
        display: 'block',
        color: '#4caf50',
      }}
    >
      <span className="sr-only">Loading ...</span>
    </Spinner>
  );
};

export default Loader;
