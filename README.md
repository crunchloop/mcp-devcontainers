# mcp-devcontainers

[![smithery badge](https://smithery.ai/badge/@crunchloop/mcp-devcontainers)](https://smithery.ai/server/@crunchloop/mcp-devcontainers)

The MCP Devcontainers is a Model Context Protocol (MCP) server that provides a simple integration with the [devcontainers cli](https://github.com/devcontainers/cli).

<a href="https://glama.ai/mcp/servers/@crunchloop/mcp-devcontainers">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@crunchloop/mcp-devcontainers/badge" alt="Devcontainers MCP server" />
</a>

## Dependencies

This server requires **Docker** to be installed and running on your system, as it is used by the [devcontainers cli](https://github.com/devcontainers/cli) to build and manage development containers.

- [Docker installation guide](https://docs.docker.com/get-docker/)

No other dependencies are required to use the MCP Devcontainers server.

## Usage

MCP servers are configured differently depending on the client that you are using. For reference, this is how you would configure it using Claude Desktop.

```json
{
  "mcpServers": {
    "devcontainers": {
      "command": "npx",
      "args": [
        "-y",
        "@crunchloop/mcp-devcontainers"
      ]
    }
  }
}
```

## MCP Transport

At the moment, only `stdio` transport has been implemented.

## Tools

- **devcontainer_up** - Start or initialize a devcontainer environment in the specified workspace folder. Use this to ensure the devcontainer is running and ready for development tasks.
  - `workspaceFolder`: Path to the workspace folder (string, required)
  - `outputFilePath`: Path to write output logs (string, optional)

- **devcontainer_run_user_commands** - Run the user-defined `postCreateCommand` and `postStartCommand` scripts in the devcontainer for the specified workspace folder. Use this to execute setup or initialization commands after the devcontainer starts.
  - `workspaceFolder`: Path to the workspace folder (string, required)
  - `outputFilePath`: Path to write output logs (string, optional)

- **devcontainer_exec** - Execute an arbitrary shell command inside the devcontainer for the specified workspace folder. Use this to run custom commands or scripts within the devcontainer context.
  - `workspaceFolder`: Path to the workspace folder (string, required)
  - `command`: Command to execute (string[], required)
  - `outputFilePath`: Path to write output logs (string, optional)

## License

Released under the MIT License.  See the [LICENSE](./LICENSE) file for further details.
