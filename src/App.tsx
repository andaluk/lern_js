import React from 'react';
import './App.css';
import { ToggleSwitch } from './ToggleSwitch';

function App() {
  return (
    <div className='App'>
      <label>
        ToggleSwitch <ToggleSwitch name='switch1' />
      </label>
    </div>
  );
}

export default App;
