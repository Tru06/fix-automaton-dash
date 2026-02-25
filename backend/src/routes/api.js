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

    // Check if user provided a GitHub Pages URL instead of repo URL (check this FIRST)
    if (repo.includes('.github.io/')) {
      const suggestion = repo.replace(/https?:\/\/([^.]+)\.github\.io\/([^\/]+).*/, 'https://github.com/$1/$2');
      return res.status(400).json({
        error: 'Invalid repository URL',
        message: 'You provided a GitHub Pages website URL. Please use the repository URL instead.',
        providedUrl: repo,
        suggestedUrl: suggestion,
        hint: 'Go to your GitHub profile and copy the repository URL, not the deployed website URL'
      });
    }

    // Validate repository URL format
    if (!repo.includes('github.com/')) {
      return res.status(400).json({
        error: 'Invalid repository URL',
        message: 'Please provide a valid GitHub repository URL (e.g., https://github.com/username/repo)',
        example: 'https://github.com/facebook/react'
      });
    }

    console.log(`\n🔍 Starting analysis for ${team}/${leader}`);
    console.log(`📦 Repository: ${repo}`);

    // Clone repository
    const cloneResult = await cloneRepository(repo, team, leader);
    repoPath = cloneResult.path;

    // Create branch with EXACT hackathon format: TEAM_NAME_LEADER_NAME_AI_Fix
    const branchName = `${team.toUpperCase().replace(/\s+/g, '_')}_${leader.toUpperCase().replace(/\s+/g, '_')}_AI_Fix`;
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
    
    // Provide more helpful error messages
    let errorMessage = error.message;
    let errorDetails = {};
    
    if (error.message.includes('Filename too long') || error.message.includes('checkout failed')) {
      errorMessage = 'Repository too large for Windows path limits';
      errorDetails = {
        issue: 'This repository has very long file paths that exceed Windows limits',
        solution: 'Try a smaller repository or use WSL/Linux',
        suggestions: [
          'https://github.com/Tru06/Hactoberfest2025',
          'https://github.com/Tru06/HEALTHCARE-LIFESCIENCES-PROJECT',
          'https://github.com/airbnb/javascript',
          'https://github.com/expressjs/express'
        ],
        note: 'Large repos like facebook/react and vercel/next.js may have path issues on Windows'
      };
    } else if (error.message.includes('Repository not found') || error.message.includes('not found')) {
      errorMessage = 'Repository not found. Please check:';
      errorDetails = {
        checks: [
          '1. The repository URL is correct and complete',
          '2. The repository exists and is public',
          '3. You have access to the repository',
          '4. The URL is not truncated (check the full name)'
        ],
        providedUrl: repo,
        hint: 'Try accessing the repository in your browser first to verify it exists'
      };
    }
    
    res.status(500).json({
      error: 'Analysis failed',
      message: errorMessage,
      ...errorDetails
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
