import express from 'express';
import { validateApiKey } from '../middleware/auth.js';
import { cloneRepository, createBranch, cleanupRepository } from '../services/gitService.js';
import { analyzeRepository } from '../services/analysisService.js';

const router = express.Router();

// Verify API key endpoint (no auth required)
router.get('/verify', (req, res) => {
  const apiKey = req.headers['x-api-key'] || 
                 req.headers['authorization']?.replace('Bearer ', '');
  
  const validKeys = process.env.VALID_API_KEYS?.split(',') || [];
  const isValid = validKeys.includes(apiKey);
  
  res.json({ 
    valid: isValid,
    message: isValid ? 'API key is valid' : 'Invalid API key'
  });
});

// Analyze repository endpoint (protected)
router.post('/analyze', validateApiKey, async (req, res) => {
  let repoPath = null;
  
  try {
    const { repo, team, leader } = req.body;

    // Validation
    if (!repo || !team || !leader) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'repo, team, and leader are required'
      });
    }

    console.log(`\n🔍 Starting analysis for ${team}/${leader}`);
    console.log(`📦 Repository: ${repo}`);

    // Clone repository
    const cloneResult = await cloneRepository(repo, team, leader);
    repoPath = cloneResult.path;

    // Create branch
    const branchName = `${team}_${leader}_AI_Fix`.replace(/\s+/g, '_');
    await createBranch(repoPath, branchName);

    // Analyze repository with AI
    const analysisResult = await analyzeRepository(repoPath, team, leader);

    // Prepare response
    const response = {
      repo,
      teamName: team,
      leaderName: leader,
      branch: branchName,
      bugsDetected: analysisResult.bugsDetected,
      fixesApplied: analysisResult.fixesApplied,
      cicdResult: analysisResult.cicdResult,
      executionTime: analysisResult.executionTime,
      score: analysisResult.score,
      fixes: analysisResult.fixes,
      cicdRuns: analysisResult.cicdRuns
    };

    console.log(`✅ Analysis complete: ${analysisResult.bugsDetected} bugs detected, ${analysisResult.fixesApplied} fixes applied`);

    res.json(response);

  } catch (error) {
    console.error('❌ Analysis failed:', error);
    res.status(500).json({
      error: 'Analysis failed',
      message: error.message
    });
  } finally {
    // Cleanup
    if (repoPath) {
      setTimeout(() => cleanupRepository(repoPath), 5000);
    }
  }
});

// Get analysis status endpoint (protected)
router.get('/status/:runId', validateApiKey, (req, res) => {
  const { runId } = req.params;
  
  // Mock status response
  res.json({
    runId,
    status: 'completed',
    progress: 100,
    message: 'Analysis completed successfully'
  });
});

export default router;
