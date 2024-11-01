import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'
import Form from './lib/Components/Login/Form'
import Dashboard from './lib/Components/Dashboard/Dashboard';
import { DataProvider } from './lib/Context/DataContext';

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </Router>
    </DataProvider>
  )
}

export default App
