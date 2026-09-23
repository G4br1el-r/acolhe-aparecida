import { HOW_TO_GET_THERE } from "@/constants/Modules/Cidade/how-to-get-there";

export function HowToGetThere() {
  return (
    <section
      aria-labelledby="como-chegar"
      className="rounded-3xl bg-blue-50/60 px-6 py-8 md:px-8"
    >
      <h2 id="como-chegar" className="text-xl font-semibold text-blue-950">
        Como chegar
      </h2>
      <dl className="mt-6 grid gap-6 md:grid-cols-3 md:gap-8">
        {HOW_TO_GET_THERE.map((item) => (
          <div key={item.id}>
            <dt className="text-sm font-semibold text-blue-950">
              {item.title}
            </dt>
            <dd className="mt-1.5 text-sm text-blue-950/70">
              {item.description}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
