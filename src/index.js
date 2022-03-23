import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

const App = (props) => {
  return props.title;
};

const Message = () => {
  return (
    <div className='testDiv'>
      <App title='test1' />
    </div>
  );
};


ReactDOM.render(
  <React.StrictMode>
    <Message />
  </React.StrictMode>,
  document.getElementById('root')
);