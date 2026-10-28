import "./App.css";
import { MissionCard } from "./components/MissionCard";
import type { Mission } from "./types/mission";

const missions: Mission[] = [
  {
    id: 1,
    title: "Criar meu primeiro componente",
    technology: "React",
  },
  {
    id: 2,
    title: "Entender tipos e interfaces",
    technology: "TypeScript",
  },
  {
    id: 3,
    title: "Abrir um Pull Request",
    technology: "Git",
  },
  {
    id: 4,
    title: "Fazer o merge",
    technology: "Git",
  },
];

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
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
