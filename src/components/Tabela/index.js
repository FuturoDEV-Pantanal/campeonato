import './styles.css';

export default function Tabela( {classificacao} ) {
  return (
    <table>
      <thead>
        <tr>
          <th>Time</th>
          <th>Pontos</th>
          <th>Vitórias</th>
          <th>Empates</th>
          <th>Derrotas</th>
          <th>Gols Pro</th>
          <th>Gols Contra</th>
          <th>Saldo de Gols</th>
        </tr>
      </thead>
      <tbody>
        {
          classificacao.map(time => <Linha key={time.sigla} time={time} />)
        }
      </tbody>
    </table>
  )
}

function Linha( {time} ) {
  return (
    <tr>
      <td className='time-nome'>{time.nome}</td>
      <td>{time.pontos}</td>
      <td>{time.vitorias}</td>
      <td>{time.empates}</td>
      <td>{time.derrotas}</td>
      <td>{time.golsPro}</td>
      <td>{time.golsContra}</td>
      <td>{time.saldoGols}</td>
    </tr>
  );
}