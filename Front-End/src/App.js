import './App.css';
import { Outlet } from 'react-router-dom';
import Header from "./shared/Header";
import Footer from "./shared/Footer";

function App() {
  return <div className="App">
    <Header />
    <Outlet />
    <Footer />
  </div>
}

export default App;
