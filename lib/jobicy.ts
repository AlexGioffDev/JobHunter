import { cacheLife } from "next/cache";

const BASEURL = "https://jobicy.com/api/jobs";

export type JobsQuery = {
  count?: number;
  geo?: string;
  industry?: string;
  tag?: string;
};

export type JobicyJob = {
  id: number;
  url: string;
  jobSlug: string;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  jobIndustry: string[];
  jobType: string[];
  jobGeo: string;
  jobLevel: string;
  jobExcerpt: string;
  jobDescription: string;
  pubDate: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  salaryPeriod?: string;
};

export type JobicyResponse = {
  apiVersion: string;
  jobCount: number;
  nextCursor: string | null;
  hasMore: boolean;
  jobs: JobicyJob[];
};

export type JobIndustries = {
  industries: Industry[];
};

export type Industry = {
  industryID: number;
  industryName: string;
  industrySlug: string;
};

export type JobsLocations = {
  locations: Location[];
};

export type Location = {
  geoID: number;
  geoName: string;
  geoSlug: string;
};

async function fetchJobicy(params: URLSearchParams) {
  const res = await fetch(`${BASEURL}?${params}`);
  if (!res.ok) throw new Error(`Jobicy HTTP ${res.status}`);
  return res.json();
}

export async function getJobs(query: JobsQuery = {}): Promise<JobicyResponse> {
  "use cache";
  cacheLife("hours");

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) params.set(key, String(value));
  }

  return fetchJobicy(params);
}

export async function getIndustries(): Promise<JobIndustries> {
  "use cache";
  cacheLife("days");
  return fetchJobicy(new URLSearchParams({ get: "industries" }));
}

export async function getLocations(): Promise<JobsLocations> {
  "use cache";
  cacheLife("days");
  return fetchJobicy(new URLSearchParams({ get: "locations" }));
}
