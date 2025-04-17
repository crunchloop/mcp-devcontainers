import { spawn } from 'child_process';
import fs from 'fs';
import { devcontainerBinaryPath } from './meta.js';

/**
 * Common interface for devcontainer options.
 */
interface DevcontainerOptions {
  stdioFilePath?: string;
}

/**
 * Options for creating and running a devcontainer.
 */
interface DevContainerUpOptions extends DevcontainerOptions {
  workspaceFolder: string;
}

/**
 * Options for running user commands in the devcontainer.
 */
interface DevContainerRunUserCommandsOptions extends DevcontainerOptions {
  workspaceFolder: string;
}

/**
 * Options for executing a command in the devcontainer.
 */
interface DevContainerExecOptions extends DevcontainerOptions {
  workspaceFolder: string;
  command: string[];
}

/**
 * Create and run a devcontainer.
 *
 */
export async function up(options: DevContainerUpOptions): Promise<number> {
  return runCommand(
    ['up', '--workspace-folder', options.workspaceFolder],
    createStdoutStream(options)
  );
}

/**
 * Run the user commands in the devcontainer.
 */
export async function runUserCommands(options: DevContainerRunUserCommandsOptions): Promise<number> {
  return runCommand(
    ['run-user-commands', '--workspace-folder', options.workspaceFolder],
    createStdoutStream(options)
  );
}

/**
 * Execute a command in the devcontainer.
 */
export async function exec(options: DevContainerExecOptions): Promise<number> {
  return runCommand(
    ['exec', '--workspace-folder', options.workspaceFolder, ...options.command],
    createStdoutStream(options)
  );
}

async function runCommand(args: string[], stdout: fs.WriteStream): Promise<number> {
  return new Promise((resolve, reject) => {
    const proc = spawn('node', [devcontainerBinaryPath(), ...args], {
      stdio: ['ignore', 'pipe', 'inherit'],
    });

    proc.stdout.pipe(stdout);

    proc.on('close', (code) => {
      stdout.end();

      if (code === 0) {
        resolve(code);
      } else {
        reject(new Error(`devcontainer command ${args.join(' ')} exited with code ${code}`));
      }
    });
  });
}

function createStdoutStream(options: DevcontainerOptions): fs.WriteStream {
  if (!options.stdioFilePath)
    return fs.createWriteStream('/dev/null', { flags: 'w' })
  
  return fs.createWriteStream(options.stdioFilePath, { flags: 'w' });
}