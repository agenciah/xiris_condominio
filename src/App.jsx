import { HashRouter as Router, Route, Routes, Link } from "react-router-dom";

const Home = () => <h2>Página Principal</h2>;
const Page1 = () => <h2>Componente 1</h2>;
const Page2 = () => <h2>Componente 2</h2>;
const Page3 = () => <h2>Componente 3</h2>;
const Page4 = () => <h2>Componente 4</h2>;
const Page5 = () => <h2>Componente 5</h2>;

function App() {
  return (
    <Router>
      <div style={{ textAlign: "center", padding: 20 }}>
        <h1>Prueba de HashRouter</h1>
        <nav>
          <Link to="/">Inicio</Link> | 
          <Link to="/page1"> Página 1</Link> | 
          <Link to="/page2"> Página 2</Link> | 
          <Link to="/page3"> Página 3</Link> | 
          <Link to="/page4"> Página 4</Link> | 
          <Link to="/page5"> Página 5</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
          <Route path="/page4" element={<Page4 />} />
          <Route path="/page5" element={<Page5 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

