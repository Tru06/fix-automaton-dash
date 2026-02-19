import simpleGit from 'simple-git';
import fs from 'fs/promises';
import path from 'path';

const TEMP_DIR = process.env.TEMP_DIR || './temp';

export async function cloneRepository(repoUrl, teamName, leaderName) {
  try {
    // Create temp directory if it doesn't exist
    await fs.mkdir(TEMP_DIR, { recursive: true });

    // Generate unique directory name
    const timestamp = Date.now();
    const dirName = `${teamName}_${leaderName}_${timestamp}`.replace(/\s+/g, '_');
    const repoPath = path.join(TEMP_DIR, dirName);

    console.log(`Cloning repository: ${repoUrl} to ${repoPath}`);

    const git = simpleGit();
    await git.clone(repoUrl, repoPath);

    return {
      path: repoPath,
      dirName
    };
  } catch (error) {
    console.error('Clone Error:', error);
    throw new Error(`Failed to clone repository: ${error.message}`);
  }
}

export async function createBranch(repoPath, branchName) {
  try {
    const git = simpleGit(repoPath);
    await git.checkoutLocalBranch(branchName);
    return true;
  } catch (error) {
    console.error('Branch Creation Error:', error);
    throw new Error(`Failed to create branch: ${error.message}`);
  }
}

export async function commitChanges(repoPath, message) {
  try {
    const git = simpleGit(repoPath);
    await git.add('.');
    await git.commit(message);
    return true;
  } catch (error) {
    console.error('Commit Error:', error);
    throw new Error(`Failed to commit changes: ${error.message}`);
  }
}

export async function cleanupRepository(repoPath) {
  try {
    await fs.rm(repoPath, { recursive: true, force: true });
    console.log(`Cleaned up: ${repoPath}`);
  } catch (error) {
    console.error('Cleanup Error:', error);
  }
}

export async function getRepositoryFiles(repoPath) {
  try {
    const files = [];
    
    async function scanDirectory(dir) {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        // Skip node_modules, .git, dist, etc.
        if (entry.name === 'node_modules' || 
            entry.name === '.git' || 
            entry.name === 'dist' ||
            entry.name === 'build') {
          continue;
        }
        
        if (entry.isDirectory()) {
          await scanDirectory(fullPath);
        } else if (entry.isFile()) {
          // Only include code files
          const ext = path.extname(entry.name);
          if (['.js', '.ts', '.jsx', '.tsx', '.py', '.java', '.go'].includes(ext)) {
            files.push({
              path: fullPath,
              relativePath: path.relative(repoPath, fullPath),
              name: entry.name,
              extension: ext
            });
          }
        }
      }
    }
    
    await scanDirectory(repoPath);
    return files;
  } catch (error) {
    console.error('File Scan Error:', error);
    throw new Error(`Failed to scan repository files: ${error.message}`);
  }
}
