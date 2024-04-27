import React from 'react'

const Footer = () => {
  return (
    <footer className="max-w-2xl w-full mx-auto p-5 items-center justify-center gap-5 animate-slide-in-right">
      <p className="text-md text-gray-400 text-center">
        Made with ❤️ by{' '}
        <a
          href="https://josecanizales.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Jose Canizales
        </a>
      </p>
    </footer>
  )
}
export default Footer
