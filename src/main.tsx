import { Provider } from 'react-redux'

import { App } from '@/app/App'
import { store } from '@/app/store'
import { createRoot } from 'react-dom/client'

import './styles/index.scss'

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)
