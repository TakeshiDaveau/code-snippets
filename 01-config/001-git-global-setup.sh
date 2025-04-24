#!/bin/bash
#
# git-config-setup.sh - Advanced Global Git Configuration
#
# This script configures Git globally with optimized settings for advanced use,
# inspired by the configurations of Git's core developers (https://blog.gitbutler.com/how-git-core-devs-configure-git/).
#
# Configurations include:
#   - Improved handling of file renames in diffs.
#   - Optimized column display in Git commands.
#   - Sorting branches and tags for better readability.
#   - Setting the default branch to 'main'.
#   - More precise diff algorithm.
#   - Enhancements for diff visualization.
#   - Simplified management of push and fetch operations.
#   - Options for help, commits, rebases, and pulls.
#
# Author: @TakeshiDaveau (GitHub)
#

# Diff configurations
git config --global diff.renames true
git config --global column.ui auto
git config --global branch.sort -committerdate
git config --global tag.sort version:refname
git config --global init.defaultBranch main
git config --global diff.algorithm histogram
git config --global diff.colorMoved plain
git config --global diff.mnemonicPrefix true

# Push and fetch operations configurations
git config --global push.default simple # (default since 2.0)
git config --global push.autoSetupRemote true
git config --global push.followTags true
git config --global fetch.prune true
git config --global fetch.pruneTags true
git config --global fetch.all true

# Help, commit, rebase, and pull configurations
git config --global help.autocorrect prompt
git config --global commit.verbose true
git config --global rerere.enabled true
git config --global rerere.autoupdate true
git config --global rebase.autoSquash true
git config --global rebase.autoStash true
git config --global rebase.updateRefs true
git config --global pull.rebase true

# Aliases
git config --global alias.c 'commit'
git config --global alias.a 'add'
git config --global alias.cm 'commit -m'
git config --global alias.last 'log -1 HEAD --stat' # last commit
git config --global alias.gpf 'push --force-with-lease' 
