import Avisos_form from "./avisos_formulario/avisos_form";

function Avisos_main() {
  return (
    <div className="App" style={{ textAlign: 'center', padding: '20px' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Generador de comunicados Generales</h1>
      <Avisos_form />
    </div>
  );
}

export default Avisos_main;