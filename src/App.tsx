import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import GaragePage from './components/garage/GaragePage';
import WinnersPage from './components/winners/WinnersPage';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<GaragePage />} />
          <Route path="/winners" element={<WinnersPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
