import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import Navigation from './components/Navigation';

function App() {

  return (
    
    <div className="app">
      <header>
        <h1>Exercise Tracker</h1>
        <p>Full Stack MERN App Demonstration</p>
      </header>
               
        <Router>
          <Navigation/>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/create-exercise" element={ <CreateExercisePage  />}></Route>
            <Route path="/edit-exercise/:id" element={ <EditExercisePage   />}></Route>
          </Routes>
        </Router>
        
        <footer><p>© 2025 </p></footer>
    </div>
  );
}

export default App;