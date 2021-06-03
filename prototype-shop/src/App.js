import Header from './components/Header'
import Prototypes from './components/Prptotypes'
import Orders from './components/Orders'
import Footer from './components/Footer'
import AppStateProvider from './providers/AppStateProvider';

function App() {
  return (
    <AppStateProvider>
    <Header />
    <div className="container">
      <Prototypes />
      <Orders />
      <Footer />
    </div>
    </AppStateProvider>
  );
}

export default App;
