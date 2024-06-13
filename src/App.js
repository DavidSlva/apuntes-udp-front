import { HashRouter, Route, Routes } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <div>
      <HashRouter>
        {routes ? (
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={toString(index)}
                path={route.path}
                element={
                  <route.layout>
                    <route.element />
                  </route.layout>
                }
              />
            ))}
          </Routes>
        ) : null}
      </HashRouter>
    </div>
  );
}

export default App;
