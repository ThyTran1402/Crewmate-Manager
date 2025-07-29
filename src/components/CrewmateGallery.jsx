import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

const CrewmateGallery = () => {
  const [crewmates, setCrewmates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCrewmates()
  }, [])

  const fetchCrewmates = async () => {
    try {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setCrewmates(data || [])
    } catch (error) {
      console.error('Error fetching crewmates:', error)
      alert('Error loading crewmates: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading crewmates...</div>
  }

  if (crewmates.length === 0) {
    return (
      <div className="empty-gallery">
        <h2>No Crewmates Yet</h2>
        <p>You haven't created any crewmates yet. Let's create your first one!</p>
        <Link to="/create" className="btn btn-primary">Create Your First Crewmate</Link>
      </div>
    )
  }

  return (
    <div className="crewmate-gallery">
      <div className="gallery-header">
        <h2>Crewmate Gallery</h2>
        <p>Total crewmates: {crewmates.length}</p>
      </div>
      
      <div className="crewmate-grid">
        {crewmates.map((crewmate) => (
          <div key={crewmate.id} className="crewmate-card">
            <div 
              className="crewmate-avatar"
              style={{ backgroundColor: crewmate.color.toLowerCase() }}
            >
              <span className="crewmate-emoji">👨‍🚀</span>
            </div>
            <div className="crewmate-info">
              <h3>{crewmate.name}</h3>
              <div className="crewmate-stats">
                <span className="stat">Speed: {crewmate.speed}</span>
                <span className="stat">Color: {crewmate.color}</span>
              </div>
              <div className="crewmate-actions">
                <Link to={`/crewmate/${crewmate.id}`} className="btn btn-small">
                  View Details
                </Link>
                <Link to={`/edit/${crewmate.id}`} className="btn btn-small btn-secondary">
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CrewmateGallery 