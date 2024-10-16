import {BrowserRouter as Router} from 'react-router-dom'
import MainRouter from './routes/MainRouter'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Router>
          <MainRouter />
          <Toaster />
        </Router>
      </AuthProvider>
      
    </div>
  )
}

export default App
