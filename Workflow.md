docker compose up -d --build
docker compose logs -f
docker compose down -v

Local Development Workflow (Docker + Local IDE)
Core Concept
To keep VS Code IntelliSense working without errors, we maintain node_modules in two places:

Locally: For the IDE (VS Code) to provide Autocomplete and Types.

In Docker: For the actual application to run in a controlled environment.
The Docker volume configuration prevents these two from overwriting or breaking each other.

1. Initial Setup (First time or after cloning)
Run these commands in your local terminal to sync your IDE with the project dependencies:

Bash
# 1. Install Client dependencies locally
cd client
npm install

# 2. Install Server dependencies locally
cd ../server
npm install

# 3. Start the environment
cd ..
1. docker compose up -d --build

2. Daily Routine:
Every time you start working:

Start Containers: docker compose up -d

Check Logs: docker compose logs -f (To see errors from Server or Vite)

Stop Containers: docker compose down (When finished)

3. Adding New Packages
If you need to install a new library (e.g., axios or lucide-react):

Install locally (for VS Code):

Bash
cd client # or server
npm install <package-name>
Update Docker:

Bash
cd ..
docker compose up -d --build
Note: Rebuilding ensures the container's internal node_modules match your local ones.

4. Troubleshooting
If the IDE shows red lines or Docker is stuck:

Clear Volumes: docker compose down -v

Full Rebuild: docker compose up -d --build

Restart TS Server: Press Ctrl+Shift+P in VS Code and run "TypeScript: Restart TS Server".