'use client'

import dynamic from 'next/dynamic'

// Dynamically import your main app component to avoid SSR issues
const App = dynamic(() => import('./components/App'), { 
  ssr: false,
  loading: () => <div>Loading SignPro...</div>
})

export default function Home() {
  return <App />
}
