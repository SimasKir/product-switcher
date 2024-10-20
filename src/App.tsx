import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'
import Form from './lib/Components/Login/Form'
import Dashboard from './lib/Components/Dashboard/Dashboard';

function App() {
  return (
    <Router>
       <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
