Here's a clean Markdown documentation for working with Git branches and pushing changes:

---

# Git Branching and Pushing Guide

## Terminology

- **Mathis**: Local branch (on your computer)
- **origin/Mathis**: Remote branch (on GitHub's server)

---

## Switching to a Branch

### Switching to a New Branch (Not Yet on Local)
If the branch doesn't yet exist locally:

**Command**:
```bash
git switch -c Mathis origin/Mathis
```

**Explanation**:
- `git switch`: Changes to another branch
- `-c`: Creates a new local branch
- `Mathis`: The name of the new local branch created
- `origin/Mathis`: The remote branch to link to the new local branch

---

### Switching to an Existing Local Branch
If the branch already exists locally:

**Command**:
```bash
git switch Mathis
```

---

## Pushing to Git

Pushing changes will send updates from your local branch to the linked remote branch.

**Example**:
If you’re on the local branch `Mathis`, which is linked to `origin/Mathis`, then your push will update `origin/Mathis` with your latest local changes.

---

## Pushing Changes in Steps

### 1. Add All Modifications to the Staging Area (Local Git)

**Command**:
```bash
git add .
```

### 2. Commit Changes (Local Git)

**Command**:
```bash
git commit -m "your message"
```

### 3. Push to the Remote Git Repository

**Command**:
```bash
git push
```

---

## Updating Your Current Branch with Changes from `main`

If you're currently on your branch `Mathis` and want to incorporate the latest changes from the `main` branch, follow these steps:

### 1. Switch to the `main` Branch

First, ensure you’re on the `main` branch to fetch the latest updates:

**Command**:
```bash
git switch main
```

### 2. Fetch the Latest Changes from the Remote Repository

This command downloads the latest changes from the remote repository without altering your local files:

**Command**:
```bash
git fetch origin
```

### 3. Merge the Changes from Remote `main` into Local `main`

Now, update your local `main` branch with the fetched changes:

**Command**:
```bash
git merge origin/main
```

### 4. Switch Back to Your Branch (`Mathis`)

Return to your branch where you want to apply the updates:

**Command**:
```bash
git switch Mathis
```

### 5. Merge Changes from `main` into Your Branch (`Mathis`)

Now, merge the updated `main` branch into your `Mathis` branch:

**Command**:
```bash
git merge main
```

### 6. Resolve Any Merge Conflicts (If Applicable)

If there are conflicts between your branch (`Mathis`) and the updated `main`, Git will notify you of the conflicting files. Open those files, resolve the conflicts, and then continue with:

**Commands**:
```bash
# After resolving conflicts
git add .
git commit -m "Resolved merge conflicts with main"
```

### 7. Push Your Updated Branch to the Remote Repository

Finally, push your updated branch (`Mathis`) to the remote repository:

**Command**:
```bash
git push
```

---

### Example Workflow

1. You’re on the `Mathis` branch.
2. Switch to `main` to fetch and merge updates.
3. Return to `Mathis`.
4. Merge the updated `main` into `Mathis`.
5. Resolve any conflicts.
6. Push the updated `Mathis` branch to the remote.

Now your branch is up to date with the latest changes from `main`!