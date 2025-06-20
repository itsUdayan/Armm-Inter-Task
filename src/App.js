import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ViewItems from './pages/ViewItems';
import AddItem from './pages/AddItem';
import './styles/main.css';

function App() {
  return (
    <Router>
      <div className="app">
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 120 }}
          className="navbar"
        >
          <Link to="/" className="logo">FashionHub</Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">View Items</Link>
            <Link to="/add" className="nav-link">Add Item</Link>
          </div>
        </motion.nav>

        <Routes>
          <Route path="/" element={<ViewItems />} />
          <Route path="/add" element={<AddItem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;