import React from 'react'
import { Link } from 'react-router-dom'

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
    },
    heading: {
      fontSize: '3rem',
      marginBottom: '1rem',
      color: '#333',
    },
    text: {
      fontSize: '1.2rem',
      marginBottom: '2rem',
      color: '#555',
    },
    link: {
      fontSize: '1rem',
      color: '#007BFF',
      textDecoration: 'none',
    },
  };
  
export default function NotFoundPage() {
  return (
    <div style={styles.container}>
    <h1 style={styles.heading}>404 - Not Found</h1>
    <p style={styles.text}>The page you are looking for might be in another castle.</p>
    <Link to="/" style={styles.link}>Go back to Home</Link>
  </div>
  )
}
