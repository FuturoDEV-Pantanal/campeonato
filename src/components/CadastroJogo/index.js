import { useEffect, useRef } from 'react';
import './styles.css';

export default function CadastroJogo( {siglas, fcCadastrar} ) {

  const siglaTime1Ref = useRef();
  const siglaTime2Ref = useRef();
  const golsTime1Ref = useRef();
  const golsTime2Ref = useRef();

  useEffect(() => {   // para inicializar com zero no placar 
    golsTime1Ref.current.value = 0;
    golsTime2Ref.current.value = 0;
  }, [])
  
  function handleCadastro() {
    const siglaTime1 = siglaTime1Ref.current.value;
    const siglaTime2 = siglaTime2Ref.current.value;
    const golsTime1 = +golsTime1Ref.current.value; // colocado + pra converter pra number
    const golsTime2 = +golsTime2Ref.current.value; // colocado + pra converter pra number
    const partida = { siglaTime1, golsTime1, siglaTime2, golsTime2 };
    if (siglaTime1 === siglaTime2) {
      alert('Dados inválidos!');
      return;
    }
    fcCadastrar(partida);
  }

  return (
    <div className='cadastro-container'>
      <p className='cadastro-titulo'>Cadastrar Partida</p>
      <div className='partida-dados'>
        <select ref={siglaTime1Ref}>
          {
            siglas.map(sigla => <option key={sigla}>{sigla}</option>)
          }
        </select>
        <input type='number' min="0" max="99" ref={golsTime1Ref} />
        <span> X </span>
        <input type='number' min="0" max="99" ref={golsTime2Ref} />
        <select ref={siglaTime2Ref}>
          {
            siglas.map(sigla => <option key={sigla}>{sigla}</option>)
          }
        </select>
      </div>
      <button onClick={handleCadastro}>Cadastrar</button>
    </div>
  )
}
