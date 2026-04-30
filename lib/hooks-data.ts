import type { Hook } from "./types";

export const hooks: Hook[] = [
  {
    id: "auto-prettier",
    name: "Auto Prettier",
    description:
      "Runs prettier --write on every file Claude writes, keeping your codebase consistently formatted without any manual effort.",
    category: "formatting",
    event: "PostToolUse",
    matcher: "Write",
    author: "nickvdyck",
    repoUrl: "https://github.com/nickvdyck/claude-hooks",
    stars: 312,
    language: "bash",
    tags: ["formatting", "prettier", "auto-format"],
    snippet: JSON.stringify(
      {
        hooks: {
          PostToolUse: [
            {
              matcher: "Write",
              hooks: [
                {
                  type: "command",
                  command: 'npx prettier --write "$TOOL_INPUT_FILE" 2>/dev/null || true',
                },
              ],
            },
          ],
        },
      },
      null,
      2
    ),
    addedAt: "2025-11-01",
  },
  {
    id: "eslint-autofix",
    name: "ESLint Auto-fix",
    description:
      "Automatically runs eslint --fix after every Write tool call so lint errors never accumulate during a Claude session.",
    category: "formatting",
    event: "PostToolUse",
    matcher: "Write",
    author: "darcyclarke",
    repoUrl: "https://github.com/darcyclarke/claude-eslint-hook",
    stars: 198,
    language: "bash",
    tags: ["formatting", "eslint", "lint"],
    snippet: JSON.stringify(
      {
        hooks: {
          PostToolUse: [
            {
              matcher: "Write",
              hooks: [
                {
                  type: "command",
                  command: 'npx eslint --fix "$TOOL_INPUT_FILE" 2>/dev/null || true',
                },
              ],
            },
          ],
        },
      },
      null,
      2
    ),
    addedAt: "2025-11-15",
  },
  {
    id: "dangerous-command-blocker",
    name: "Dangerous Command Blocker",
    description:
      "Blocks rm -rf, sudo, and other destructive shell commands before Claude can execute them. Exit code 2 cancels the tool call.",
    category: "security",
    event: "PreToolUse",
    matcher: "Bash",
    author: "msaari",
    repoUrl: "https://github.com/msaari/claude-safety-hooks",
    stars: 541,
    language: "bash",
    tags: ["security", "block", "bash", "destructive"],
    snippet: JSON.stringify(
      {
        hooks: {
          PreToolUse: [
            {
              matcher: "Bash",
              hooks: [
                {
                  type: "command",
                  command:
                    'cmd="$TOOL_INPUT_COMMAND"; if echo "$cmd" | grep -qE "(rm -rf|sudo |--force|--no-verify)"; then echo "Blocked dangerous command: $cmd" >&2; exit 2; fi',
                },
              ],
            },
          ],
        },
      },
      null,
      2
    ),
    addedAt: "2025-10-20",
  },
  {
    id: "git-safety-guard",
    name: "Git Safety Guard",
    description:
      "Prevents force-pushes, --no-verify flags, and hard resets from being executed by Claude, protecting your git history.",
    category: "security",
    event: "PreToolUse",
    matcher: "Bash",
    author: "tj",
    repoUrl: "https://github.com/tj/claude-git-guard",
    stars: 423,
    language: "bash",
    tags: ["security", "git", "branch-protection"],
    snippet: JSON.stringify(
      {
        hooks: {
          PreToolUse: [
            {
              matcher: "Bash",
              hooks: [
                {
                  type: "command",
                  command:
                    'cmd="$TOOL_INPUT_COMMAND"; if echo "$cmd" | grep -qE "(push --force|push -f|reset --hard|--no-verify)"; then echo "Blocked unsafe git command" >&2; exit 2; fi',
                },
              ],
            },
          ],
        },
      },
      null,
      2
    ),
    addedAt: "2025-10-25",
  },
  {
    id: "tool-activity-logger",
    name: "Tool Activity Logger",
    description:
      "Appends a timestamped log entry for every tool invocation to ~/.claude/activity.log, giving you a full audit trail of your sessions.",
    category: "logging",
    event: "PostToolUse",
    author: "sindresorhus",
    repoUrl: "https://github.com/sindresorhus/claude-activity-logger",
    stars: 287,
    language: "bash",
    tags: ["logging", "audit", "history"],
    snippet: JSON.stringify(
      {
        hooks: {
          PostToolUse: [
            {
              matcher: "",
              hooks: [
                {
                  type: "command",
                  command:
                    'echo "$(date -u +"%Y-%m-%dT%H:%M:%SZ") [$TOOL_NAME] $TOOL_INPUT_FILE" >> ~/.claude/activity.log',
                },
              ],
            },
          ],
        },
      },
      null,
      2
    ),
    addedAt: "2025-11-05",
  },
  {
    id: "session-env-check",
    name: "Session Init Env Check",
    description:
      "Validates that required environment variables are set before a Claude session begins, failing fast with a clear error message.",
    category: "environment",
    event: "SessionStart",
    author: "wycats",
    repoUrl: "https://github.com/wycats/claude-env-validator",
    stars: 156,
    language: "bash",
    tags: ["environment", "env-vars", "validation", "startup"],
    snippet: JSON.stringify(
      {
        hooks: {
          SessionStart: [
            {
              hooks: [
                {
                  type: "command",
                  command:
                    'for var in NODE_ENV DATABASE_URL; do [ -z "${!var}" ] && echo "Missing required env var: $var" >&2 && exit 1; done',
                },
              ],
            },
          ],
        },
      },
      null,
      2
    ),
    addedAt: "2025-12-01",
  },
  {
    id: "slack-notify-on-stop",
    name: "Slack Notify on Stop",
    description:
      "Posts a Slack webhook message whenever Claude finishes a turn, so your team can track when an AI task completes.",
    category: "productivity",
    event: "Stop",
    author: "fauna",
    repoUrl: "https://github.com/fauna/claude-slack-notify",
    stars: 203,
    language: "bash",
    tags: ["productivity", "slack", "notifications", "webhook"],
    snippet: JSON.stringify(
      {
        hooks: {
          Stop: [
            {
              hooks: [
                {
                  type: "command",
                  command:
                    'curl -s -X POST "$SLACK_WEBHOOK_URL" -H "Content-Type: application/json" -d \'{"text":"Claude finished a task in \'$(basename $PWD)\'"}\' || true',
                },
              ],
            },
          ],
        },
      },
      null,
      2
    ),
    addedAt: "2025-12-10",
  },
  {
    id: "compact-blocker",
    name: "Compact Blocker",
    description:
      "Prevents context compaction from running during CI environments, ensuring deterministic session behavior in automated pipelines.",
    category: "ci-cd",
    event: "PreCompact",
    author: "jaredpalmer",
    repoUrl: "https://github.com/jaredpalmer/claude-ci-hooks",
    stars: 134,
    language: "bash",
    tags: ["ci-cd", "compaction", "determinism"],
    snippet: JSON.stringify(
      {
        hooks: {
          PreCompact: [
            {
              hooks: [
                {
                  type: "command",
                  command:
                    '[ -n "$CI" ] && echo "Compaction blocked in CI" >&2 && exit 2 || true',
                },
              ],
            },
          ],
        },
      },
      null,
      2
    ),
    addedAt: "2025-12-15",
  },
  {
    id: "prompt-audit-log",
    name: "Prompt Audit Log",
    description:
      "Records every user prompt to a local audit file with a timestamp, creating a searchable log of all queries sent to Claude.",
    category: "logging",
    event: "UserPromptSubmit",
    author: "feross",
    repoUrl: "https://github.com/feross/claude-prompt-audit",
    stars: 178,
    language: "bash",
    tags: ["logging", "audit", "prompts", "compliance"],
    snippet: JSON.stringify(
      {
        hooks: {
          UserPromptSubmit: [
            {
              hooks: [
                {
                  type: "command",
                  command:
                    'echo "$(date -u +"%Y-%m-%dT%H:%M:%SZ") $HOOK_INPUT_PROMPT" >> ~/.claude/prompt-audit.log',
                },
              ],
            },
          ],
        },
      },
      null,
      2
    ),
    addedAt: "2026-01-05",
  },
  {
    id: "input-sanitizer",
    name: "Input Sanitizer",
    description:
      "Scans file content before writes and blocks the operation if it detects patterns matching secrets, API keys, or environment variables.",
    category: "input-sanitization",
    event: "PreToolUse",
    matcher: "Write",
    author: "zkat",
    repoUrl: "https://github.com/zkat/claude-secret-guard",
    stars: 389,
    language: "python",
    tags: ["security", "input-sanitization", "secrets", "api-keys"],
    snippet: JSON.stringify(
      {
        hooks: {
          PreToolUse: [
            {
              matcher: "Write",
              hooks: [
                {
                  type: "command",
                  command:
                    "python3 ~/.claude/hooks/secret_guard.py \"$TOOL_INPUT_FILE\"",
                },
              ],
            },
          ],
        },
      },
      null,
      2
    ),
    addedAt: "2026-01-12",
  },
  {
    id: "cwd-logger",
    name: "CWD Logger",
    description:
      "Logs every working directory change during a session, helping you trace navigation patterns when debugging multi-repo workflows.",
    category: "logging",
    event: "CwdChanged",
    author: "isaacs",
    repoUrl: "https://github.com/isaacs/claude-cwd-logger",
    stars: 89,
    language: "bash",
    tags: ["logging", "navigation", "cwd"],
    snippet: JSON.stringify(
      {
        hooks: {
          CwdChanged: [
            {
              hooks: [
                {
                  type: "command",
                  command:
                    'echo "$(date -u +"%Y-%m-%dT%H:%M:%SZ") cd $HOOK_CWD" >> ~/.claude/cwd.log',
                },
              ],
            },
          ],
        },
      },
      null,
      2
    ),
    addedAt: "2026-01-20",
  },
  {
    id: "build-on-write",
    name: "Build on Write",
    description:
      "Triggers npm run build automatically whenever Claude writes to a source file, catching compile errors the moment they're introduced.",
    category: "ci-cd",
    event: "PostToolUse",
    matcher: "Write",
    author: "Rich-Harris",
    repoUrl: "https://github.com/Rich-Harris/claude-build-hooks",
    stars: 267,
    language: "bash",
    tags: ["ci-cd", "build", "compile", "typescript"],
    snippet: JSON.stringify(
      {
        hooks: {
          PostToolUse: [
            {
              matcher: "Write",
              hooks: [
                {
                  type: "command",
                  command:
                    'file="$TOOL_INPUT_FILE"; if echo "$file" | grep -qE "\\.(ts|tsx|js|jsx)$"; then npm run build --silent 2>&1 | tail -5; fi',
                },
              ],
            },
          ],
        },
      },
      null,
      2
    ),
    addedAt: "2026-02-01",
  },
];
