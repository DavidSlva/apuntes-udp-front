import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <MainLayout>
        <Home />
      </MainLayout>
    </div>
  );
}

export default App;
