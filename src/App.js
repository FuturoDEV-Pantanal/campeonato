import { useEffect, useState } from 'react';
import Tabela from './components/Tabela';
import CadastroJogo from './components/CadastroJogo';
import './App.css';

function App() {

  const [classificacao, setClassificacao] = useState([]);

  useEffect(() => {
    fetch('times.json')
      .then(resp => resp.json())
      .then(dados => {
        const classificacaoInicial = dados.map(time => { 
          return { nome: time.nome, sigla: time.sigla, pontos: 0, vitorias: 0, empates: 0, derrotas: 0, golsPro: 0, golsContra: 0, saldoGols: 0 }; 
        });
        setClassificacao(classificacaoInicial);
      })
      .catch(err => console.log(err));
  }, [])

  function processarPartida(partida) {
    const time1 = classificacao.find(time => time.sigla === partida.siglaTime1);
    const time2 = classificacao.find(time => time.sigla === partida.siglaTime2);
    // atualizando saldo de gols
    time1.golsPro += partida.golsTime1;
    time1.golsContra += partida.golsTime2;
    time1.saldoGols = time1.golsPro - time1.golsContra;
    time2.golsPro += partida.golsTime2;
    time2.golsContra += partida.golsTime1;
    time2.saldoGols = time2.golsPro - time2.golsContra;
    // atualizando pontuacao
    if (partida.golsTime1 > partida.golsTime2) {  // time 1 venceu
      time1.vitorias++;
      time1.pontos += 3;
      time2.derrotas++;
    } else if (partida.golsTime1 < partida.golsTime2) {  // time 1 perdeu
      time1.derrotas++;
      time2.vitorias++;
      time2.pontos += 3;
    } else { // empate
      time1.empates++;
      time2.empates++;
      time1.pontos += 1;
      time2.pontos += 1;
    }

    // comparador que ordena pela quantidade de pontos
    const comparador = (t1,t2) => {
      if (t1.pontos > t2.pontos)
        return -1;
      if (t1.pontos < t2.pontos)
        return 1;
      // para outro comparador
      // if (t1.saldoGols > t2.saldoGols)
      //   return -1;
      // if (t1.saldoGols < t2.saldoGols)
      //   return 1;      
      // return 0;
    }

    const atualizado = classificacao
      .map(time => {
        if (time.sigla === time1.sigla)
          return time1;
        if (time.sigla === time2.sigla)
          return time2;
        return time;  
      })
      .sort(comparador);
    
    setClassificacao(atualizado);
  }
  
  if (classificacao.length === 0)
    return 'Carregando....';

  return (
    <div className="App">
      <h1>Tabela do Campeonato</h1>
      <Tabela classificacao={classificacao} />
      <CadastroJogo 
        siglas={ classificacao.map(t => t.sigla).sort((a,b) => a-b) }  // siglas dos times em ordem alfabetica  
        fcCadastrar={processarPartida} 
      />
    </div>
  );
}

export default App;
