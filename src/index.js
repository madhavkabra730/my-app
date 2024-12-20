import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
async function enableMocking() {
  if (process.env.NODE_ENV !== 'development' ||process.env.REACT_APP_USE_MOCKS === 'true') {
    return
  }
  const { worker } = await import('./mocks/browser')

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start()
}
enableMocking().then(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
})
