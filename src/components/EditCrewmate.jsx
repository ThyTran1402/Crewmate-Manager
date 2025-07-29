import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

const EditCrewmate = () => {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [speed, setSpeed] = useState(0)
  const [color, setColor] = useState('Red')
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [deleting, setDeleting] = useState(false)
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
      
      setName(data.name)
      setSpeed(data.speed)
      setColor(data.color)
    } catch (error) {
      console.error('Error fetching crewmate:', error)
      alert('Error loading crewmate: ' + error.message)
      navigate('/gallery')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    
    if (!name.trim()) {
      alert('Please enter a crewmate name!')
      return
    }

    setUpdating(true)
    
    try {
      const { error } = await supabase
        .from('crewmates')
        .update({ name: name.trim(), speed, color })
        .eq('id', id)

      if (error) throw error

      alert('Crewmate updated successfully!')
      navigate(`/crewmate/${id}`)
    } catch (error) {
      console.error('Error updating crewmate:', error)
      alert('Error updating crewmate: ' + error.message)
    } finally {
      setUpdating(false)
    }
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}? This action cannot be undone.`
    )
    
    if (!confirmDelete) return

    setDeleting(true)
    
    try {
      const { error } = await supabase
        .from('crewmates')
        .delete()
        .eq('id', id)

      if (error) throw error

      alert('Crewmate deleted successfully!')
      navigate('/gallery')
    } catch (error) {
      console.error('Error deleting crewmate:', error)
      alert('Error deleting crewmate: ' + error.message)
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading crewmate...</div>
  }

  const speedOptions = [0, 1, 2, 3, 4, 5]
  const colorOptions = ['Red', 'Blue', 'Green', 'Pink', 'Orange', 'Yellow', 'Black', 'White', 'Purple', 'Brown']

  return (
    <div className="edit-crewmate">
      <div className="edit-header">
        <Link to={`/crewmate/${id}`} className="back-btn">← Back to Details</Link>
        <h2>Edit Crewmate</h2>
      </div>
      
      <form onSubmit={handleUpdate} className="crewmate-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter crewmate name"
            required
          />
        </div>

        <div className="form-group">
          <label>Speed:</label>
          <div className="attribute-options">
            {speedOptions.map((speedValue) => (
              <button
                key={speedValue}
                type="button"
                className={`attribute-btn ${speed === speedValue ? 'selected' : ''}`}
                onClick={() => setSpeed(speedValue)}
              >
                {speedValue}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Color:</label>
          <div className="attribute-options">
            {colorOptions.map((colorValue) => (
              <button
                key={colorValue}
                type="button"
                className={`attribute-btn color-btn ${color === colorValue ? 'selected' : ''}`}
                style={{ backgroundColor: colorValue.toLowerCase(), color: colorValue === 'Yellow' || colorValue === 'White' ? 'black' : 'white' }}
                onClick={() => setColor(colorValue)}
              >
                {colorValue}
              </button>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={updating}>
            {updating ? 'Updating...' : 'Update Crewmate'}
          </button>
          
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete Crewmate'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditCrewmate 