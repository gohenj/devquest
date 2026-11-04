import "./App.css";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { MissionCard } from "./components/MissionCard";
import type { Mission, MissionStatus } from "./types/mission";

const initialMissions: Mission[] = [
  {
    id: 1,
    title: "Criar meu primeiro componente",
    technology: "React",
    status: "planned",
  },
  {
    id: 2,
    title: "Entender tipos e interfaces",
    technology: "TypeScript",
    status: "planned",
  },
  {
    id: 3,
    title: "Abrir um Pull Request",
    technology: "Git",
    status: "planned",
  },
  {
    id: 4,
    title: "Fazer o merge",
    technology: "Git",
    status: "planned",
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

    return data.map((mission) => ({
      id: mission.id,
      title: mission.title,
      technology: mission.technology,
      status:
        mission.status === "studying" || mission.status === "completed"
          ? mission.status
          : "planned",
    }));
  } catch {
    return initialMissions;
  }
}

function App() {
  const [missions, setMissions] = useState<Mission[]>(loadMissions);
  const [title, setTitle] = useState("");
  const [technology, setTechnology] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [technologyFilter, setTechnologyFilter] = useState("");

  const technologies = [
    ...new Set(missions.map((mission) => mission.technology)),
  ].sort((a, b) => a.localeCompare(b, "pt-BR"));

  const filteredMissions = missions.filter((mission) => {
    const matchesSearch = mission.title
      .toLocaleLowerCase("pt-BR")
      .includes(search.trim().toLocaleLowerCase("pt-BR"));

    const matchesTechnology =
      technologyFilter === "" || mission.technology === technologyFilter;

    return matchesSearch && matchesTechnology;
  });
  const totalMissions = missions.length;

  const completedMissions = missions.filter(
    (mission) => mission.status === "completed",
  ).length;

  const studyingMissions = missions.filter(
    (mission) => mission.status === "studying",
  ).length;

  const plannedMissions = missions.filter(
    (mission) => mission.status === "planned",
  ).length;

  const progressPercentage =
    totalMissions === 0
      ? 0
      : Math.round((completedMissions / totalMissions) * 100);
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
          status: "planned",
        },
      ];
    });

    setTitle("");
    setTechnology("");
  }

  function handleStatusChange(id: number, status: MissionStatus) {
    setMissions((currentMissions) =>
      currentMissions.map((mission) =>
        mission.id === id ? { ...mission, status } : mission,
      ),
    );
  }

  return (
    <main className="devquest">
      <header>
        <h1>DevQuest</h1>
        <p>Sua próxima evolução começa com uma missão.</p>
      </header>
      <section className="mission-progress" aria-labelledby="progress-title">
        <h2 id="progress-title">Sua evolução</h2>

        <div className="progress-stats">
          <div>
            <strong>{totalMissions}</strong>
            <span>Total de missões</span>
          </div>

          <div>
            <strong>{plannedMissions}</strong>
            <span>Vou estudar</span>
          </div>

          <div>
            <strong>{studyingMissions}</strong>
            <span>Estudando</span>
          </div>

          <div>
            <strong>{completedMissions}</strong>
            <span>Concluídas</span>
          </div>
        </div>

        <label htmlFor="mission-progress-bar">
          {progressPercentage}% concluído
        </label>

        <progress
          id="mission-progress-bar"
          max={100}
          value={progressPercentage}
        >
          {progressPercentage}%
        </progress>

        <p>
          {completedMissions} de {totalMissions} missões concluídas.
        </p>
      </section>
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

        <div className="mission-filters">
          <div>
            <label htmlFor="mission-search">Buscar missão</label>
            <input
              id="mission-search"
              type="search"
              placeholder="Digite o nome da missão"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="technology-filter">Filtrar por tecnologia</label>
            <select
              id="technology-filter"
              value={technologyFilter}
              onChange={(event) => setTechnologyFilter(event.target.value)}
            >
              <option value="">Todas as tecnologias</option>

              {technologies.map((technology) => (
                <option key={technology} value={technology}>
                  {technology}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p role="status">
          {filteredMissions.length} de {missions.length} missões exibidas.
        </p>

        {filteredMissions.length > 0 ? (
          <ul className="mission-list">
            {filteredMissions.map((mission) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                onStatusChange={handleStatusChange}
              />
            ))}
          </ul>
        ) : (
          <div className="mission-empty">
            <p>Nenhuma missão encontrada com esses filtros.</p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setTechnologyFilter("");
              }}
            >
              Limpar filtros
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
