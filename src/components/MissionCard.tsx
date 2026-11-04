import type { Mission, MissionStatus } from "../types/mission";

type MissionCardProps = {
  mission: Mission;
  onStatusChange: (id: number, status: MissionStatus) => void;
};

export function MissionCard({
  mission,
  onStatusChange,
}: MissionCardProps) {
  return (
    <li className="mission-card">
      <h3>{mission.title}</h3>
      <span>{mission.technology}</span>

      <label htmlFor={`mission-status-${mission.id}`}>
        Status de {mission.title}
      </label>

      <select
        id={`mission-status-${mission.id}`}
        value={mission.status}
        onChange={(event) => {
          const value = event.target.value;

          if (
            value === "planned" ||
            value === "studying" ||
            value === "completed"
          ) {
            onStatusChange(mission.id, value);
          }
        }}
      >
        <option value="planned">Vou estudar</option>
        <option value="studying">Estudando</option>
        <option value="completed">Concluído</option>
      </select>
    </li>
  );
}