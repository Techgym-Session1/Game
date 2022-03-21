import { Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux'
import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';
import Score from './pages/Score';
import { store } from './store'

const App = () => {  
  return (
    <Provider store={store} >
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/game" element={<Game />} />
          <Route path="/score" element={<Score />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
