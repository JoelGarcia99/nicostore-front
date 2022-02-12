import {BrowserRouter, Route, Routes, Switch} from 'react-router-dom';
import HomeScreen from '../components/home/HomeScreen';
import LoginScreen from '../components/home/LoginScreen';

const RouterComponent = ()=>{

  return <div>
    <BrowserRouter>
      <Routes>
	<Route exact path="/" element={<LoginScreen />} />
	<Route exact path="/home" element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  </div>
}

export default RouterComponent;
