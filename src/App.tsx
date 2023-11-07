import React from 'react';
import logo from './logo.svg';
import './App.css';

import { TopProvider } from './context/TopContext';
import { MessageSection } from './components/MessageSection';

function App() {
  return (
    <TopProvider>
    <div>
    <MessageSection/>
    </div>
   </TopProvider>
  );
}

export default App;
