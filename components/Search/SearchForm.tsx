import { getIndustries, getLocations } from "@/lib/jobicy";
import Form from "next/form";

export default async function SearchForm() {
  const [locations, industries] = await Promise.all([
    getLocations(),
    getIndustries(),
  ]);

  return (
    <Form
      action="/"
      className="mx-auto flex w-full max-w-5xl flex-col gap-3 rounded-2xl border border-line bg-surface p-4 shadow-lg shadow-black/20 sm:flex-row sm:items-center sm:gap-3"
    >
      <input
        type="text"
        name="tag"
        minLength={3}
        placeholder="Search a job"
        className="w-full flex-1 rounded-4xl border border-line bg-background px-4 py-3 text-foreground placeholder:text-muted outline-none transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20"
      />

      <select
        name="geo"
        defaultValue=""
        className="w-full cursor-pointer rounded-2xl border border-line bg-surface-2 px-3 py-3 text-foreground outline-none transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20 sm:w-auto"
      >
        <option value="">Locations</option>
        {locations.locations.map((location) => (
          <option value={location.geoSlug} key={location.geoID}>
            {location.geoName}
          </option>
        ))}
      </select>

      <select
        name="industry"
        defaultValue=""
        className="w-full cursor-pointer rounded-2xl border border-line bg-surface-2 px-3 py-3 text-foreground outline-none transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20 sm:w-auto"
      >
        <option value="">Categories</option>
        {industries.industries.map((industry) => (
          <option key={industry.industryID} value={industry.industrySlug}>
            {industry.industryName}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full shrink-0 cursor-pointer rounded-2xl border border-accent bg-accent px-6 py-3 font-semibold uppercase tracking-tighter text-background transition-all duration-300 ease-in hover:bg-transparent hover:text-accent active:scale-[0.98] sm:w-auto"
      >
        Search
      </button>
    </Form>
  );
}
