import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

const CrewmateDetail = () => {
  const { id } = useParams()
  const [crewmate, setCrewmate] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchCrewmate()
  }, [id])

  const fetchCrewmate = async () => {
    try {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setCrewmate(data)
    } catch (error) {
      console.error('Error fetching crewmate:', error)
      alert('Error loading crewmate: ' + error.message)
      navigate('/gallery')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading crewmate details...</div>
  }

  if (!crewmate) {
    return <div className="error">Crewmate not found</div>
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getSpeedDescription = (speed) => {
    const descriptions = {
      0: 'Stationary - Prefers to stay in one place',
      1: 'Slow - Takes their time with tasks',
      2: 'Steady - Reliable and consistent',
      3: 'Moderate - Balanced approach to movement',
      4: 'Fast - Quick to respond and act',
      5: 'Lightning Fast - First to complete any task'
    }
    return descriptions[speed] || 'Unknown speed level'
  }

  return (
    <div className="crewmate-detail">
      <div className="detail-header">
        <Link to="/gallery" className="back-btn">← Back to Gallery</Link>
      </div>
      
      <div className="detail-content">
        <div className="crewmate-profile">
          <div 
            className="profile-avatar"
            style={{ backgroundColor: crewmate.color.toLowerCase() }}
          >
            <span className="profile-emoji">👨‍🚀</span>
          </div>
          
          <div className="profile-info">
            <h1>{crewmate.name}</h1>
            <div className="profile-stats">
              <div className="stat-item">
                <strong>Color:</strong> 
                <span 
                  className="color-indicator"
                  style={{ backgroundColor: crewmate.color.toLowerCase() }}
                >
                  {crewmate.color}
                </span>
              </div>
              
              <div className="stat-item">
                <strong>Speed Level:</strong> {crewmate.speed}/5
              </div>
              
              <div className="stat-item">
                <strong>Speed Description:</strong> 
                <p className="speed-description">{getSpeedDescription(crewmate.speed)}</p>
              </div>
              
              <div className="stat-item">
                <strong>Created:</strong> {formatDate(crewmate.created_at)}
              </div>
              
              <div className="stat-item">
                <strong>Crewmate ID:</strong> #{crewmate.id}
              </div>
            </div>
          </div>
        </div>
        
        <div className="detail-actions">
          <Link to={`/edit/${crewmate.id}`} className="btn btn-primary">
            Edit Crewmate
          </Link>
          <Link to="/gallery" className="btn btn-secondary">
            View All Crewmates
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CrewmateDetail 