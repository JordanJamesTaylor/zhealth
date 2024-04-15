import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import CreateTicketForm from './components/issueTickets/CreateTicketForm';
import AdminPage from './components/AdminPage';

function App() {

  return (
    <main>
      <Router >
        <Navbar />
        <Routes>
          <Route path="/" element={<CreateTicketForm />} />
          <Route path="/Admin Page" element={<AdminPage />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
