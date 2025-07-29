import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

const CreateCrewmate = () => {
  const [name, setName] = useState('')
  const [speed, setSpeed] = useState(0)
  const [color, setColor] = useState('Red')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!name.trim()) {
      alert('Please enter a crewmate name!')
      return
    }

    setLoading(true)
    
    try {
      const { data, error } = await supabase
        .from('crewmates')
        .insert([{ name: name.trim(), speed, color }])
        .select()

      if (error) throw error

      alert('Crewmate created successfully!')
      navigate('/gallery')
    } catch (error) {
      console.error('Error creating crewmate:', error)
      alert('Error creating crewmate: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const speedOptions = [0, 1, 2, 3, 4, 5]
  const colorOptions = ['Red', 'Blue', 'Green', 'Pink', 'Orange', 'Yellow', 'Black', 'White', 'Purple', 'Brown']

  return (
    <div className="create-crewmate">
      <h2>Create a New Crewmate</h2>
      <form onSubmit={handleSubmit} className="crewmate-form">
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

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating...' : 'Create Crewmate'}
        </button>
      </form>
    </div>
  )
}

export default CreateCrewmate 