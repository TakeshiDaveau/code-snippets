# Code Snippets & Tech Insights

This repository is a collection of useful code snippets, concise summaries of inspiring tech articles, and notes on architectural concepts, design patterns, and methodologies.

## Purpose

The goal of this repository is to serve as a personal knowledge base and quick reference for common coding tasks and important software development principles. It aims to capture key takeaways from influential tech content in an easily digestible format.

## How to Use

Feel free to browse the different directories and files. You can copy and paste code snippets for your projects or use the summaries as quick reminders of important concepts.

## Contents

The repository is organized into the following directories:

* **[01-config/](./01-config/000-index.md):** Configuration snippets for various tools and environments.
* **[02-languages/](./02-languages/000-index.md):** Code snippets organized by programming language.
* **[03-databases/](./03-databases/000-index.md):** Snippets and notes related to database interactions and concepts.
* **[04-architecture/](./04-architecture/000-index.md):** Notes and summaries on different software architectural styles and considerations.
* **[05-pattern/](./05-pattern/000-index.md):** Summaries and examples of common software design patterns.
* **[06-process/](./06-process/000-index.md):** Notes and insights on software development processes.
* **[07-methodology/](./07-methodology/000-index.md):** Brief overviews and key principles of various software development methodologies (e.g., Agile, Scrum, Kanban).
* **[08-infrastructure/](./08-infrastructure/000-index.md):** Snippets and notes related to infrastructure as code, cloud services, etc.
* **[09-misc/](./09-misc/000-index.md):** A catch-all for other useful snippets and notes that don't fit into the other categories.

## Contributing

This is primarily a personal repository, but if you find something useful or have suggestions, feel free to reach out!

### Installing the Pre-commit Hook for Automatic Indexing (Symbolic Link)

To ensure that the index files (`000-index.md`) are automatically updated with each commit, you can install a `pre-commit` hook using a symbolic link. Here's how:

1.  **Ensure the `pre-commit` file (provided at the root of the repository) is executable.** If not, run:
    ```bash
    chmod +x pre-commit
    ```
2.  **Navigate to the `.git/hooks` directory** of your repository in your terminal:
    ```bash
    cd .git/hooks
    ```
3.  **Create a symbolic link to the `pre-commit` file located at the root:**
    ```bash
    ln -s ../../pre-commit pre-commit
    ```

Now, before each commit, the linked script (`../../pre-commit`) will be executed, and the updated `000-index.md` files will be automatically added to your commit.

**Enjoy exploring!**

