import { getCharacterById } from "@/lib/api"
import Image from "next/image"
import Link from "next/link"
import { ARROW_L } from "@/components"

import {
  translateRace,
  translateGender,
  translateKi,
  translateMaxKi,
  translateAffiliation
} from "@/functions/Characters.translate";

export default async function CharacterPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = (await params) as { id?: string };
  const numericId = id ? parseInt(id, 10) : NaN;

  if (Number.isNaN(numericId)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">ID inválido</h1>
        <Link href="/characters" className="text-blue-500 hover:underline">
          Volver a la lista de personajes
        </Link>
      </div>
    );
  }

  const character = await getCharacterById(numericId);

  if (!character) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Personaje no encontrado</h1>
        <Link href="/characters" className="text-blue-500 hover:underline">
          Volver a la lista de personajes
        </Link>
      </div>
    );
  }

  return (
    <main id="home" className="size-full min-h-screen flex flex-col items-center justify-center">
      <div className="relative container mx-auto px-4 py-8 flex flex-col items-center justify-center max-w-[1000px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-amber-100 p-6 rounded-lg shadow-md">
          <div className="flex justify-center h-96 md:h-[500px]">
            <Image
              width={500}
              height={500}
              src={character.image}
              alt={character.name}
              className="rounded-lg object-contain"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4">{character.name}</h1>
            <p className="text-lg mb-2">
              <strong>Raza:&nbsp;</strong>
                {translateRace(character.race) || 'Unknown' }
            </p>
            <p className="text-lg mb-2">
              <strong>Género:&nbsp;</strong>
                {translateGender(character.gender || "Unknown")}
            </p>
            <p className="text-lg mb-2">
              <strong>Ki:&nbsp;</strong>
                {translateKi(character.ki || "0")}
            </p>
            <p className="text-lg mb-2">
              <strong>Máximo&nbsp;Ki:&nbsp;</strong>
                {translateMaxKi(character.maxKi || "0")}
            </p>
            <p className="text-lg mb-4">
              <strong>Afiliación:&nbsp;</strong>
                {translateAffiliation(character.affiliation || "Unknown")}
            </p>
            <p className="text-lg">{character.description}</p>
          </div>
        </div>
        <div className="mt-8 absolute top-0 left-5 p-7">
          <Link href="/characters" className="transition-all druration-300 ease-out active:scale-95 flex flex-row w-fit pr-2 h-fit items-center justify-center border border-black rounded-full hover:bg-black/10 aspect-scquare overflow-hidden" title="Volver">
            <ARROW_L
            text={false}
            />
          </Link>
        </div>
      </div>
    </main>
  );
}
