export interface Project {
  number: string;
  title: string;
  category: {
    en: string;
    fa: string;
  };
  description: {
    en: string;
    fa: string;
  };
  image: string;
  href: string;
  tags: string[];
}

export async function getProjects(): Promise<Project[]> {
  const response = await fetch("/api/projects", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
}