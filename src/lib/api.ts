const API_URL = "http://localhost:5050";

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  url: string;
}

export async function getProjects(): Promise<Project[]> {
  const response = await fetch(`${API_URL}/api/projects`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch projects from ASP.NET Core API");
  }

  return response.json();
}