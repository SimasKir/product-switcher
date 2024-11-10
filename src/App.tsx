import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'
import Form from './lib/Components/Login/Form'
import Dashboard from './lib/Components/Dashboard/Dashboard';
import { DataProvider } from './lib/Context/DataContext';
import CommentsList from './lib/Components/Dashboard/CommentsList';

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/comments" element={<CommentsList />}/>
        </Routes>
      </Router>
    </DataProvider>
  )
}

export default App
