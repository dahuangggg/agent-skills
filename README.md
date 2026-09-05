# Agent Skills

面向 Codex 及兼容 Agent 的个人 Skill 集合。

## Skills

| Skill | 用途 |
| --- | --- |
| [`init-my-project`](skills/init-my-project) | 探索仓库，生成 `AGENTS.md` 和 `_session_handoff.md` 审核稿，确认后写入；包含文档组织和 ISO 周归档规则。 |
| [`project-interview-prep`](skills/project-interview-prep) | 基于源码和运行证据，准备项目介绍、简历要点及面试追问材料。 |
| [`teach`](skills/teach) | 根据仓库源码和学习目标生成 HTML 课程，包含架构说明、互动练习及学习记录。 |

## 安装

每个 Skill 位于 `skills/<skill-name>`，可独立安装。将对应目录推送到 GitHub 后，使用：

```bash
python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo dahuangggg/agent-skills \
  --path skills/<skill-name>
```

将 `<skill-name>` 替换为上表中的名称。
