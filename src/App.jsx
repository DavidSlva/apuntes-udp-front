// src/App.js

import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import routes from './routes';
import ProjectProvider from './providers/projectProvider';
import TagsProvider from './providers/tagsProvider';
import { AuthProvider } from './providers/authProvider';
import { CommentProvider } from './providers/commentProvider';
import { ProjectMemberProvider } from './providers/projectMemberProvider';

function App() {
  return (
    <div>
      {' '}
      <HashRouter>
        {routes ? (
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  <AuthProvider>
                    <ProjectProvider>
                      <TagsProvider>
                        <CommentProvider>
                          <ProjectMemberProvider>
                            <route.layout>{route.element}</route.layout>{' '}
                          </ProjectMemberProvider>
                        </CommentProvider>
                      </TagsProvider>
                    </ProjectProvider>
                  </AuthProvider>
                }
              />
            ))}
          </Routes>
        ) : null}{' '}
      </HashRouter>
    </div>
  );
}

export default App;
