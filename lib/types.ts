export type HookCategory =
  | "security"
  | "formatting"
  | "logging"
  | "environment"
  | "ci-cd"
  | "productivity"
  | "input-sanitization"
  | "other";

export type HookEvent =
  | "PreToolUse"
  | "PostToolUse"
  | "PostToolUseFailure"
  | "UserPromptSubmit"
  | "Stop"
  | "SubagentStop"
  | "SessionStart"
  | "CwdChanged"
  | "FileChanged"
  | "PreCompact"
  | "WorktreeCreate"
  | "PermissionRequest";

export interface Hook {
  id: string;
  name: string;
  description: string;
  category: HookCategory;
  event: HookEvent;
  matcher?: string;
  author: string;
  repoUrl: string;
  stars: number;
  language: string;
  tags: string[];
  snippet: string;
  addedAt: string;
}
