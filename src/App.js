import { useState } from "react";
import { Acciones } from "./componentes/Acciones";
import { Display } from "./componentes/Display";
import { Info } from "./componentes/Info";
import { Teclado } from "./componentes/Teclado";

function App() {
  const teclas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const [numeroTotal, setnumeroTotal] = useState("");
  const [desabilitadoLlamar, setDesabilitadoLlamar] = useState(true);
  const [ocultarLlamar, setOcultarLlamar] = useState(false);
  const [ocultarColgar, setOcultarColgar] = useState(true);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [timer, setTimer] = useState();
  const numMaxLenght = 9;
  const marcarNumero = (numero) => {
    if (numeroTotal.length === numMaxLenght) {
      return;
    }
    setnumeroTotal(numeroTotal + numero);
    setDesabilitadoLlamar(numeroTotal.length + 1 === 9 ? false : true);
  };
  const borraDigito = () => {
    setnumeroTotal(numeroTotal.slice(0, numeroTotal.length - 1));
    setDesabilitadoLlamar(true);
  };
  const llamar = (evento) => {
    evento.preventDefault();
    if (numeroTotal.length === numMaxLenght) {
      setMostrarMensaje(true);
      setOcultarLlamar(true);
      setOcultarColgar(false);

      setTimeout(() => {
        setMostrarMensaje(false);
        setOcultarLlamar(false);
        setOcultarColgar(true);
        setnumeroTotal("");
        setDesabilitadoLlamar(true);
      }, 5000);
    }
  };
  const colgar = () => {
    setTimer(clearTimeout(timer));
    setMostrarMensaje(false);
    setOcultarLlamar(false);
    setOcultarColgar(true);
    setnumeroTotal("");
    setDesabilitadoLlamar(true);
  };
  return (
    <div className="contenedor">
      <Info mostrarMensaje={mostrarMensaje} />
      <main className="telefono">
        <Teclado
          teclas={teclas}
          marcarNumero={marcarNumero}
          borraDigito={borraDigito}
          teclasDesabilitadas={ocultarLlamar}
        />
        <div className="acciones">
          <Display numero={numeroTotal} />
          <Acciones
            desabilitadoLlamar={desabilitadoLlamar}
            ocultarLlamar={ocultarLlamar}
            ocultarColgar={ocultarColgar}
            funcionLlamar={llamar}
            funcionColgar={colgar}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
