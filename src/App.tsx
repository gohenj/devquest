import "./App.css";
import { MissionCard } from "./components/MissionCard";
import type { Mission } from "./types/mission";
import { useState } from "react";
import type { FormEvent } from "react";

const initialMissions: Mission[] = [
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
  const [missions, setMissions] = useState<Mission[]>(initialMissions);
  const [title, setTitle] = useState("");
  const [technology, setTechnology] = useState("");
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanTitle = title.trim();
    const cleanTechnology = technology.trim();

    if (!cleanTitle || !cleanTechnology) return;

    setMissions((currentMissions) => {
      const nextId =
        Math.max(0, ...currentMissions.map((mission) => mission.id)) + 1;

      return [
        ...currentMissions,
        {
          id: nextId,
          title: cleanTitle,
          technology: cleanTechnology,
        },
      ];
    });

    setTitle("");
    setTechnology("");
  }
  return (
    <main className="devquest">
      <header>
        <h1>DevQuest</h1>
        <p>Sua próxima evolução começa com uma missão.</p>
      </header>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="mission-title">Nome da missão</label>
          <input
            id="mission-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="mission-technology">Tecnologia</label>
          <input
            id="mission-technology"
            type="text"
            value={technology}
            onChange={(event) => setTechnology(event.target.value)}
            required
          />
        </div>

        <button type="submit">Adicionar missão</button>
      </form>
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
