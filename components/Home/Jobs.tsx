import { getJobs, JobsQuery } from "@/lib/jobicy";
import JobCard from "../Cards/JobCard";

type Params = Promise<JobsQuery>;

export default async function Jobs({ searchParams }: { searchParams: Params }) {
  const { count, geo, tag, industry } = await searchParams;
  const data = await getJobs({
    count: count ?? 100,
    tag: tag && tag.length > 3 ? tag : undefined,
    industry: industry ?? undefined,
    geo: geo ?? "anywhere",
  });

  

  if (data.jobs.length <= 0) return <p className="text-center text-accent uppercase text-xl font-black mt-5">There are no jobs for this search at the moment</p>;

  return (
    <div className="p-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3  max-h-[70vh] overflow-y-auto">
      {data.jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
