import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { persistor, store } from './redux/store.js'
import {Provider} from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import ThemeProvider from './components/ThemeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <ThemeProvider>
     <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
</ThemeProvider>
  </Provider>
  
)
