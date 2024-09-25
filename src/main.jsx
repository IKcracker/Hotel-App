import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import store from './Redux/Store.js'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { initialOptions } from './util/payment.js'

createRoot(document.getElementById('root')).render(
  <PayPalScriptProvider options={initialOptions}>
  <Provider store={store}>
    <App />
  </Provider>
  </PayPalScriptProvider>,
)
