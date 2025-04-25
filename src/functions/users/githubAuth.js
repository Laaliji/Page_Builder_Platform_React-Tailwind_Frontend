import { api_url } from "@/constant/global";
import useFetch from "@/hooks/useFetch";

/**
 * Redirects user to GitHub OAuth authentication flow
 * @param {boolean} isLinking - Whether we're linking to existing account (true) or authenticating (false)
 */
export function redirectToGitHub(isLinking = false) {
  const endpoint = isLinking ? "/auth/github/link" : "/auth/github/redirect";
  window.location.href = `${api_url}${endpoint}`;
}

/**
 * Unlinks a GitHub account from the user's account
 * @param {number} userId - The user's ID
 * @returns {Promise} Response indicating success or failure
 */
export async function unlinkGitHubAccount(userId) {
  return useFetch({
    method: "DELETE",
    resource: "auth/github/unlink",
  });
}

/**
 * Gets the GitHub connection status for a user
 * @param {number} userId - The user's ID
 * @returns {Promise} Connection status information
 */
export async function getGitHubStatus(userId) {
  return useFetch({
    method: "GET",
    resource: `auth/github/status`,
  });
}

/**
 * Checks if a user is connected with GitHub
 * @param {Object} params - Parameters object
 * @param {number} params.idUser - The user's ID
 * @returns {Promise} Connection information
 */
export async function isUserConnectedWithGitHub({ idUser }) {
  return useFetch({
    method: "GET",
    resource: `user/checkGitHubConnection/${idUser}`,
  });
}

/**
 * Handles the GitHub callback parameters in the URL
 * @returns {Object|null} GitHub auth data if present, null otherwise
 */
export function handleGitHubCallback() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const githubId = urlParams.get("github_id");
  const email = urlParams.get("email");
  const username = urlParams.get("username");
  const firstname = urlParams.get("firstname");
  const lastname = urlParams.get("lastname");
  const error = urlParams.get("error");

  if (error) {
    return { error };
  }

  if (token && (githubId || email)) {
    return {
      token,
      githubId,
      email,
      username,
      firstname,
      lastname
    };
  }

  return null;
} 