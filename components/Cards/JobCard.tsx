import { JobicyJob } from "@/lib/jobicy";

const dateFormat = new Intl.DateTimeFormat("it-IT", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

function formatSalary(job: JobicyJob): string | null {
  if (!job.salaryMin || !job.salaryCurrency) return null;
  try {
    const money = new Intl.NumberFormat("en", {
      style: "currency",
      currency: job.salaryCurrency,
      notation: "compact",
      maximumFractionDigits: 0,
    });
    const range =
      job.salaryMax && job.salaryMax !== job.salaryMin
        ? `${money.format(job.salaryMin)} – ${money.format(job.salaryMax)}`
        : money.format(job.salaryMin);
    return job.salaryPeriod ? `${range} / ${job.salaryPeriod}` : range;
  } catch {
    return null; // valuta non valida
  }
}

export default function JobCard({ job }: { job: JobicyJob }) {
  const salary = formatSalary(job);

  return (
    <a
      href={job.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-line bg-surface p-5 transition duration-200 hover:-translate-y-1 hover:border-accent/50 hover:bg-surface-2"
    >
      {/* bagliore decorativo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-accent-2/20 blur-3xl transition-colors duration-300 group-hover:bg-accent/20"
      />

      <div className="relative flex items-center gap-3">
        {job.companyLogo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={job.companyLogo}
            alt=""
            loading="lazy"
            className="size-12 shrink-0 rounded-xl bg-white object-contain p-1"
          />
        ) : (
          <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-surface-2 text-lg font-bold text-accent">
            {job.companyName.charAt(0)}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{job.companyName}</p>
          <p className="text-xs text-muted">
            {dateFormat.format(new Date(job.pubDate))}
          </p>
        </div>
      </div>

      <h3 className="relative text-lg font-semibold leading-snug tracking-tight">
        {job.jobTitle}
      </h3>

      <div className="relative flex flex-wrap gap-2 text-xs">
        {job.jobLevel && job.jobLevel !== "Any" && (
          <span className="rounded-full bg-accent/10 px-2.5 py-1 font-medium text-accent">
            {job.jobLevel}
          </span>
        )}
        {job.jobType.map((type) => (
          <span
            key={type}
            className="rounded-full bg-surface-2 px-2.5 py-1 text-muted"
          >
            {type}
          </span>
        ))}
        <span className="rounded-full border border-line px-2.5 py-1 text-muted">
          {job.jobGeo}
        </span>
      </div>

      <p className="relative line-clamp-3 text-sm leading-relaxed text-muted">
        {job.jobExcerpt}
      </p>

      <div className="relative mt-auto flex items-center justify-between pt-2 text-sm">
        <span className="font-medium">
          {salary ?? <span className="text-muted">Salario n/d</span>}
        </span>
        <span className="text-accent transition-transform group-hover:translate-x-1">
          →
        </span>
      </div>
    </a>
  );
}
