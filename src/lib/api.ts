import type { AgentRun } from "./mock-data";

/**
 * API Configuration
 * Update this with your backend API endpoint
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const API_KEY = import.meta.env.VITE_API_KEY || "";

/**
 * Get API headers with authentication
 */
function getHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    "X-API-Key": API_KEY,
    "Authorization": `Bearer ${API_KEY}`,
  };
}

/**
 * Analyze a repository and get bug fix results
 * @param repo - GitHub repository URL
 * @param team - Team name
 * @param leader - Leader name
 * @returns Promise with analysis results
 */
export async function analyzeRepository(
  repo: string,
  team: string,
  leader: string
): Promise<AgentRun> {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        repo,
        team,
        leader,
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid API key. Please check your configuration.");
      }
      if (response.status === 403) {
        throw new Error("Access forbidden. API key may not have required permissions.");
      }
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to analyze repository:", error);
    throw error;
  }
}

/**
 * Get analysis status
 * @param runId - Analysis run ID
 * @returns Promise with current status
 */
export async function getAnalysisStatus(runId: string): Promise<{
  status: "pending" | "running" | "completed" | "failed";
  progress: number;
  message: string;
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/status/${runId}`, {
      headers: getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to get analysis status:", error);
    throw error;
  }
}

/**
 * Verify API key is valid
 * @returns Promise with verification result
 */
export async function verifyApiKey(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/verify`, {
      method: "GET",
      headers: getHeaders(),
    });
    
    return response.ok;
  } catch (error) {
    console.error("Failed to verify API key:", error);
    return false;
  }
}
