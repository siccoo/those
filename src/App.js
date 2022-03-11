import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Store from './reducer/Store';

function App() {
  return (
    <div className="App">
      <Store>
        <Dashboard />
      </Store>
    </div>
  );
}

export default App;
