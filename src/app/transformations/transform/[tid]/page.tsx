import { getAllTransformations, getAllCharacters } from "@/lib/api";
import { NAV_BAR } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { translateKi } from "@/functions/Characters.translate";

export async function generateStaticParams() {
  try {
    const t = await getAllTransformations();
    return t.map((tr) => ({ tid: String(tr.id) }));
  } catch (err) {
    console.error("[generateStaticParams] transformations", err);
    return [];
  }
}

export default async function Page({ params }: { params: { tid: string } }) {
  const { tid } = params;
  const numericTid = tid ? parseInt(tid, 10) : NaN;

  if (Number.isNaN(numericTid)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">ID inválido</h1>
        <Link href="/transformations" className="text-blue-500 hover:underline">
          Volver a transformaciones
        </Link>
      </div>
    );
  }

  const all = await getAllTransformations();
  const transformation = all.find((t) => Number(t.id) === Number(numericTid));

  const characters = await getAllCharacters();
  const parent = characters.find((c) =>
    (c.transformations ?? []).some((tr) => Number(tr.id) === Number(numericTid))
  );

  return (
    <>
      <NAV_BAR
        link="/transformations"
        linkP="/transformations"
        showHome={true}
        path="/transformations"
        showtitle={true}
        title="Transformación"
        showLogo={true}
        showNavLinks={false}
      />
      <main className="size-full min-h-screen flex flex-col items-center justify-center py-8 pt-20">
        <article className="max-w-3xl w-full p-4">
          {!transformation ? (
            <div className="flex flex-col items-center justify-center min-h-[40vh]">
              <h2 className="text-2xl font-bold">
                Transformación no encontrada
              </h2>
              <Link href="/transformations" className="text-blue-500 mt-4">
                Volver
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex flex-row gap-6 items-start">
                <div className="w-48 h-64">
                  <Image
                    src={transformation.image}
                    alt={transformation.name}
                    width={300}
                    height={400}
                    className="rounded-lg object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{transformation.name}</h1>
                  <p className="text-lg mt-2">
                    <strong>Ki:</strong> {translateKi(transformation.ki)}
                  </p>
                  {parent ? (
                    <p className="text-lg mt-2">
                      Personaje:{" "}
                      <Link
                        href={`/characters/${parent.id}`}
                        className="text-blue-600 underline"
                      >
                        {parent.name}
                      </Link>
                    </p>
                  ) : (
                    <p className="text-lg mt-2">Personaje: No disponible</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </article>
      </main>
    </>
  );
}
