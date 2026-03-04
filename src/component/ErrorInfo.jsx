import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ErrorInfo() {
  const navigate = useNavigate();
  return (
    <div className="error_page">
      <h2>this page is wrong approach.</h2>
      <div>⚠︎</div>
      <button onClick={() => navigate(`/`, { replace: true })}>Back to our site</button>
    </div>
  );
}
