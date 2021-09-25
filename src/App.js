import Components from './components/Layout'
import AppProvider from './components/Global/AppContext'


function App() {
  return (
    <>
      <AppProvider>
        <Components/>
      </AppProvider>
    </>
  );
}

export default App;
