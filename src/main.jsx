import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="min-h-screen w-full bg-zinc-950 text-gray-200">
      <App />
    </div>
  </React.StrictMode>,
)
