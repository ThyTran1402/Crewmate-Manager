import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import CreateCrewmate from './components/CreateCrewmate'
import CrewmateGallery from './components/CrewmateGallery'
import CrewmateDetail from './components/CrewmateDetail'
import EditCrewmate from './components/EditCrewmate'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>🚀 Crewmate Manager</h1>
          <nav className="nav-menu">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/create" className="nav-link">Create Crewmate</Link>
            <Link to="/gallery" className="nav-link">Crewmate Gallery</Link>
          </nav>
        </header>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateCrewmate />} />
            <Route path="/gallery" element={<CrewmateGallery />} />
            <Route path="/crewmate/:id" element={<CrewmateDetail />} />
            <Route path="/edit/:id" element={<EditCrewmate />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

function Home() {
  return (
    <div className="home-page">
      <h2>Welcome to Crewmate Manager!</h2>
      <p>Create and manage your own team of crewmates. Give them unique attributes and build the perfect crew!</p>
      <div className="home-actions">
        <Link to="/create" className="btn btn-primary">Create New Crewmate</Link>
        <Link to="/gallery" className="btn btn-secondary">View All Crewmates</Link>
      </div>
    </div>
  )
}

export default App
