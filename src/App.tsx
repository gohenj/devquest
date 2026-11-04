import "./App.css";
import { MissionCard } from "./components/MissionCard";
import type { Mission } from "./types/mission";
import { useEffect, useState } from "react";
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

function loadMissions(): Mission[] {
  try {
    const saved = localStorage.getItem("devquest:missions");

    if (saved === null) return initialMissions;

    const data: unknown = JSON.parse(saved);

    if (!Array.isArray(data)) return initialMissions;

    const isValid = data.every(
      (mission: unknown) =>
        typeof mission === "object" &&
        mission !== null &&
        "id" in mission &&
        typeof mission.id === "number" &&
        Number.isFinite(mission.id) &&
        "title" in mission &&
        typeof mission.title === "string" &&
        "technology" in mission &&
        typeof mission.technology === "string",
    );

    if (!isValid) return initialMissions;

    return data;
  } catch {
    return initialMissions;
  }
}

function App() {
  const [missions, setMissions] = useState<Mission[]>(loadMissions);
  const [title, setTitle] = useState("");
  const [technology, setTechnology] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    try {
      localStorage.setItem("devquest:missions", JSON.stringify(missions));
    } catch {
      console.error("Não foi possível salvar as missões neste navegador.");
    }
  }, [missions]);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanTitle = title.trim();
    const cleanTechnology = technology.trim();

    if (!cleanTitle || !cleanTechnology) {
      setError("Preencha o nome da missão e a tecnologia com um texto válido.");
      return;
    }

    setError("");

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
      <form className="mission-form" onSubmit={handleSubmit}>
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
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
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
