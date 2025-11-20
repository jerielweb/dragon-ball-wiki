export function translateRace(race: string): string {
  const raceMap: Record<string, string> = {
    "Human": "Humano",
    "Android": "Androide",
    "Saiyan": "Saillayin",
    "Namekian": "Namekiano",
    "Majin": "Majin Buu",
    "Frieza Race": "Raza De Freezer",
    "Jiren Race": "Raza de Jiren",
    "God": "Dios",
    "Evil": "Malvado",
    "Unknown": "Desconocido",
  };
  return raceMap[race] || race;
}

export function translateGender(gender: string): string {
  const genderMap: Record<string, string> = {
    "Male": "Masculino",
    "Female": "Femenina",
    "Unknown": "Desconocido",
    "Other": "Otro",
  };
  return genderMap[gender] || gender;
}

export function translateKi(ki: string): string {
  if (!ki || ki === "0") return "Sin Poder de pelea";
  if (ki?.toLowerCase() === "unknown") return "Desconocido";
  return ki;
}

export function translateMaxKi(maxKi: string): string {
  if (!maxKi || maxKi === "0") return "Sin máximo poder";
  if (maxKi?.toLowerCase() === "unknown") return "Desconocido";
  return maxKi;
}

export function translateAffiliation(affiliation: string): string {
  const affiliationMap: Record<string, string> = {
    "Z Fighter": "Guerrero Z",
    "Villain": "Villano",
    "Red Ribbon Army": "Ejército del Listón Rojo",
    "Army of Frieza": "Ejército de Freezer",
    "Other": "Otro",
    "Freelancer": "Freelancer",
    "Namekian Warrior": "Luchador Namekiano",
    "Pride Troopers": "La Tropa del Orgullo",
    "Assistant of Vermoud": "Asistente de Vermoud",
    "Assistant of Beerus": "Asistente de Beerus",
  };
  return affiliationMap[affiliation] || affiliation;
}