/**
 * Submit feedback to Sheet.best endpoint.
 * @param {Object} data - The feedback data.
 * @param {string} data.name - The name of the user.
 * @param {string} data.feedback - The feedback message.
 * @param {number} data.rating - The user rating (1-5).
 * @returns {Promise<Object>} The response from Sheet.best.
 */
export async function submitFeedback({ name, feedback, rating }) {
  const endpoint = 'https://api.sheetbest.com/sheets/b7dbf6d5-3a56-4566-98e3-ec3210f0f13b';

  const body = {
    name,
    feedback,
    rating,
    timestamp: new Date().toISOString(),
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Failed to submit feedback: ${response.statusText}`);
  }

  return response.json();
}