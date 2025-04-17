import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as devcontainers from "./devcontainer.js";

const server = new McpServer({
  name: "devcontainers",
  version: "0.0.2"
});

server.tool(
  "devcontainer_up",
  "Start or initialize a devcontainer environment in the specified workspace folder." + 
  "Use this to ensure the devcontainer is running and ready for development tasks.",
  {
    workspaceFolder: z.string(),
    outputFilePath: z.string().optional(),
  },
  async ({ workspaceFolder, outputFilePath }) => {
    await devcontainers.up({ workspaceFolder, stdioFilePath: outputFilePath });

    return {
      content: [
        {
          type: "text",
          text: `Devcontainer started in ${workspaceFolder}`,
        }
      ]
    }
  }
);

server.tool(
  "devcontainer_run_user_commands",
  "Run the user-defined postCreateCommand and postStartCommand scripts in the devcontainer" +
  "for the specified workspace folder. Use this to execute setup or initialization commands" + 
  "after the devcontainer starts.",
  {
    workspaceFolder: z.string(),
    outputFilePath: z.string().optional(),
  },
  async ({ workspaceFolder, outputFilePath }) => {
    await devcontainers.runUserCommands({ workspaceFolder, stdioFilePath: outputFilePath });

    return {
      content: [
        {
          type: "text",
          text: `User commands run in ${workspaceFolder}`,
        }
      ]
    }
  }
);

server.tool(
  "devcontainer_exec",
  "Execute an arbitrary shell command inside the devcontainer for the specified workspace folder." +
  "Use this to run custom commands or scripts within the devcontainer context.",
  {
    workspaceFolder: z.string(),
    command: z.array(z.string()),
    outputFilePath: z.string().optional(),
  },
  async ({ workspaceFolder, command, outputFilePath }) => {
    await devcontainers.exec({ workspaceFolder, command, stdioFilePath: outputFilePath });
    return {
      content: [
        {
          type: "text",
          text: `Executed command ${command.join(" ")} in ${workspaceFolder}`,
        }
      ]
    }
  }
);

export { server };