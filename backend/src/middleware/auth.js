export const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || 
                 req.headers['authorization']?.replace('Bearer ', '');
  
  if (!apiKey) {
    return res.status(401).json({
      error: 'API key is required',
      message: 'Please provide an API key in X-API-Key or Authorization header'
    });
  }
  
  // Get valid keys from environment
  const validKeys = process.env.VALID_API_KEYS?.split(',') || [];
  
  if (!validKeys.includes(apiKey)) {
    return res.status(403).json({
      error: 'Invalid API key',
      message: 'The provided API key is not valid'
    });
  }
  
  // Attach API key info to request
  req.apiKey = apiKey;
  req.team = extractTeamFromKey(apiKey);
  
  next();
};

function extractTeamFromKey(apiKey) {
  // Extract team name from key format: team_year_random_leader
  const parts = apiKey.split('_');
  return parts[0] || 'unknown';
}
