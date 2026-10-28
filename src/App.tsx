import './App.css'

type Mission = {
  id: number
  title: string
  technology: string
}

const missions: Mission[] = [
  {
    id: 1,
    title: 'Criar meu primeiro componente',
    technology: 'React',
  },
  {
    id: 2,
    title: 'Entender tipos e interfaces',
    technology: 'TypeScript',
  },
  {
    id: 3,
    title: 'Abrir um Pull Request',
    technology: 'Git',
  },
  {
    id: 4,
    title: 'Fazer o merge',
    technology: 'Git',
  },
]

function App() {
  return (
    <main className="devquest">
      <header>
        <h1>DevQuest</h1>
        <p>Sua próxima evolução começa com uma missão.</p>
      </header>

      <section aria-labelledby="missions-title">
        <h2 id="missions-title">Minhas missões</h2>

        <ul className="mission-list">
          {missions.map((mission) => (
            <li key={mission.id} className="mission-card">
              <h3>{mission.title}</h3>
              <span>{mission.technology}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App