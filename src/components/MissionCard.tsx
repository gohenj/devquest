import type { Mission } from '../types/mission'

type MissionCardProps = {
  mission: Mission
}

export function MissionCard({ mission }: MissionCardProps) {
  return (
    <li className="mission-card">
      <h3>{mission.title}</h3>
      <span>{mission.technology}</span>
    </li>
  )
}