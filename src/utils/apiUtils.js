/**
 * Safely parses JSON data, handling errors gracefully
 * @param {string} data - The JSON string to parse
 * @param {any} fallback - Fallback value to return if parsing fails
 * @returns {any} Parsed JSON or fallback value
 */
export const safeJsonParse = (data, fallback = {}) => {
  if (!data) return fallback;
  
  if (typeof data === 'object') {
    // Already a JSON object, return as is
    return data;
  }
  
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return fallback;
  }
};

/**
 * Process API response to ensure proper format
 * @param {any} response - The API response to process
 * @returns {Object} Processed response in a consistent format
 */
export const processApiResponse = (response) => {
  if (!response) return { success: false, data: null, error: 'Empty response' };
  
  // If response is a string, try to parse it
  if (typeof response === 'string') {
    response = safeJsonParse(response);
  }
  
  // Check if the response has a data property
  if (response.data) {
    return {
      success: true,
      data: response.data,
      error: null
    };
  }
  
  // Check if response itself is the data
  if (typeof response === 'object' && !response.error && !response.success) {
    return {
      success: true,
      data: response,
      error: null
    };
  }
  
  // Handle error responses
  if (response.error) {
    return {
      success: false,
      data: null,
      error: response.error
    };
  }
  
  // Default format
  return {
    success: response.success || false,
    data: response.data || null,
    error: response.error || null
  };
};

/**
 * Handles fetch requests with error handling and automatic JSON parsing
 * @param {string} url - URL to fetch
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} Processed response
 */
export const safeFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    
    // Check if the response is OK (status in the range 200-299)
    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        data: null,
        error: `Request failed with status ${response.status}: ${errorText}`
      };
    }
    
    // Check content type to decide how to parse the response
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return processApiResponse(data);
    } else {
      // For non-JSON responses, return the text
      const text = await response.text();
      return {
        success: true,
        data: text,
        error: null
      };
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return {
      success: false,
      data: null,
      error: error.message || 'Unknown fetch error'
    };
  }
}; 