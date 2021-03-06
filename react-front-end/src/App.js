import React, { Component } from 'react';
import TraductorPage from './components/pages/TraductorPage';
import UploadFilePage from './components/pages/UploadFilePage';
import NavBar from './components/navigation/NavBar';
import AboutPage from './components/pages/AboutPage';
import { BrowserRouter ,Route} from 'react-router-dom';
import LoginPage from './components/pages/LoginPage'
import MainPage from './components/pages/MainPage';

class App extends Component {
  
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="App">
          <Route path="/" exact component={LoginPage}></Route>
          <Route path='/MainPage' component={MainPage}></Route>
        </div>
      </BrowserRouter>
    )
  }
}
export default App;
