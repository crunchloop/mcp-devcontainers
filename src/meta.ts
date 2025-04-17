import { createRequire } from "module";
import path from "path";

/**
 * The `createRequire` function is used to create a CommonJS require function
 * in an ES module context. This is necessary because the `require` function 
 * is not available in ES modules by default. 
 */
const require = createRequire(import.meta.url);

/**
 * Get the path to the devcontainer binary.
 * 
 * This function dynamically resolves the path to the devcontainer binary
 * based on the location of the package.json file of the @devcontainers/cli 
 * package. It is used to ensure that the correct binary is used regardless
 * of the environment in which the code is run.
 */
export function devcontainerBinaryPath(): string {
  const pkgPath = require.resolve('@devcontainers/cli/package.json');
  const pkg = require('@devcontainers/cli/package.json');

  return path.join(path.dirname(pkgPath), pkg.bin.devcontainer);
}