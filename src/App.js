import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Navbar from "./components/navbar/Navbar"
import Store from './reducer/Store';

function App() {
  return (
    <div className="App">
      <Store>
        <Navbar />
        <Dashboard />
      </Store>
    </div>
  );
}

export default App;
