import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Archive() {
  const [archives, setArchives] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/archives')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(data => {
        setArchives(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace', background: '#fff', color: '#000', minHeight: '100vh' }}>
      <h1>Index of /archive</h1>
      <Link style={{ display: 'block', marginBottom: '1rem', color: 'blue' }} to="/">../ (Go back)</Link>
      
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      {!loading && !error && (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {archives.map(item => (
            <li key={item._id} style={{ marginBottom: '0.5rem' }}>
              📁 <strong>{item.title}</strong> - {item.author} ({item.date}) - [{item.type}]
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
