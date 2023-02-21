import React from 'react';
import logo from './logo.svg';
import './App.less';

const App: React.FC = () => {
  return (
    <div className='App'>
      <header>
        <img className='logo' src={logo} />
      </header>
      <div className='sider'></div>
      <div className='content'></div>
    </div>
  );
}

export default App;
