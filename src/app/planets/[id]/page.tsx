import { getPlanetById, getAllPlanets } from "@/lib/api";
import { NAV_BAR } from "@/components";
import Link from "next/link";
import Image from "next/image";

export async function generateStaticParams() {
  try {
    const planets = await getAllPlanets();
    return planets.map((planet) => ({
      id: String(planet.id),
    }));
  } catch (error) {
    console.error("[generateStaticParams] error fetching planets", error);
    return [];
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = id ? parseInt(id, 10) : NaN;

  if (Number.isNaN(numericId)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">ID inválido</h1>
        <Link href="/planets" className="text-blue-500 hover:underline">
          Volver a la lista de planetas
        </Link>
      </div>
    );
  }

  const planet = await getPlanetById(numericId);

  if (!planet) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Planeta no encontrado</h1>
        <Link href="/planets" className="text-blue-500 hover:underline">
          Volver a la lista de planetas
        </Link>
      </div>
    );
  }

  const allPlanets = await getAllPlanets();
  const currentIndex = allPlanets.findIndex(
    (p) => Number(p.id) === Number(planet.id)
  );
  const prevId = currentIndex > 0 ? allPlanets[currentIndex - 1].id : null;
  const nextId =
    currentIndex >= 0 && currentIndex < allPlanets.length - 1
      ? allPlanets[currentIndex + 1].id
      : null;


  return (
    <>
      <NAV_BAR
        link={nextId ? `${nextId}` : `/planets`}
        linkP={prevId ? `${prevId}` : `/planets`}
        showHome={true}
        path="/planets"
        showtitle={false}
        title="Planetas"
        showLogo={true}
        showNavLinks={true}
      />
      <main className="flex flex-col items-center justify-center min-h-screen p-5">
        <div className="flex flex-col gap-8 md:flex-row max-w-300">
          <div className="sm:min-w-120 h-auto">
            <Image
              src={planet.image}
              alt={planet.name}
              width={700}
              height={700}
              className="object-cover rounded-lg border border-amber-600 aspect-video size-full"
            />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 mt-4">{planet.name}</h1>
            <p className="text-lg mb-6">{planet.description}</p>
            <p className="text-lg">
              <strong>Estado:&nbsp;</strong>
              {planet.isDestroyed ? (
                <span className="text-red-600 font-semibold">
                  El Planeta a sido Destruido
                </span>
              ) : (
                <span className="text-green-600 font-semibold">
                  El Planeta esta Intacto
                </span>
              )}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
