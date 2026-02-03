# GSD Framework - Get Shit Done

**Source:** https://github.com/glittercowboy/get-shit-done  
**For:** Claude Code, OpenCode, Gemini CLI

---

## Core Philosophy

> "The complexity is in the system, not in your workflow."

- Context engineering over vibe coding
- Atomic commits and fresh context per task
- No enterprise theater — just ship

---

## GSD Phases

### 1.  — Initialize
Creates: , , , , 

- Questions to understand your idea completely
- Research (parallel agents investigate domain)
- Extract requirements (v1, v2, out of scope)
- Create phases mapped to requirements

### 2.  — Shape Implementation
Creates: 

Captures preferences before building:
- Visual features → Layout, density, interactions, empty states
- APIs/CLIs → Response format, flags, error handling
- Content systems → Structure, tone, depth, flow
- Organization → Grouping criteria, naming, exceptions

### 3.  — Research & Plan
Creates: , 

- Research based on CONTEXT.md decisions
- Create 2-3 atomic task plans per phase
- Verify plans against requirements

### 4.  — Execute
Creates: , 

- Runs plans in waves (parallel where possible)
- Fresh context per plan (no context rot)
- Atomic commits per task
- Verifies against phase goals

### 5.  — Human Verification
Creates:  (UAT results)

- Extracts testable deliverables
- Walks through functionality one at a time
- Diagnoses failures automatically
- Creates fix plans if issues found

### 6.  — Ship
Archives milestone, tags release, starts next version.

###  — Ad-hoc Tasks
For bug fixes, small features, config changes.
Creates: , 

---

## File Structure



---

## Commands Reference

| Command | Purpose |
|---------|---------|
|  | Initialize new project |
|  | Shape phase N implementation |
|  | Plan phase N |
|  | Execute phase N |
|  | Verify phase N |
|  | Ship milestone |
|  | Quick ad-hoc task |

---

## GSD Tips

- **Skip permissions mode:** Run Claude with 
- **Parallel waves:** Same wave = no dependencies = parallelize
- **Fresh context:** Every plan runs in fresh context window
- **Atomic commits:** Every task gets its own commit

