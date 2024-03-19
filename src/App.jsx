import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import InternMembersForm from './components/InternMembersForm.jsx';
import InternMembersTable from './components/InternMembersTable.jsx';
import EditInternMember from './components/EditInternMember.jsx';
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>Intern Members Management System</h1>
          <nav>
            <ul className="nav-links">
              <li>
                <Link to="/">Intern Members Table</Link>
              </li>
              <li>
                <Link to="/add">Add Intern Member</Link>
              </li>
              {}
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<InternMembersTable />} />
            <Route path="/add" element={<InternMembersForm />} />
            <Route path="/edit/:id" element={<EditInternMember />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
