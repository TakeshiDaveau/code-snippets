# Node Hexagonal Architecture with DDD and CQS using NestJS

Here is a proven way to organize your code using hexagonal architecture with Domain-Driven Design (DDD) and Command Query Separation (CQS) principles in Node.js and NestJS. While this is not the only way to implement it, it is a well-structured and effective approach.

**DDD is a software design approach that emphasizes collaboration between technical and domain experts to create a model that accurately reflects the business domain**. It focuses on structuring the code around the core domain logic, ensuring that the software aligns closely with the business requirements.

**CQS is a principle that separates operations into two distinct categories: commands and queries**. Commands modify the state of the system, while queries retrieve data without causing side effects. This separation improves code clarity, testability, and maintainability.

By combining Hexagonal Architecture, DDD, and CQS, this structure ensures a clear separation of concerns, making the codebase easier to maintain, test, and extend.

## Directory Structure

```
contexts/
  <bounded-context>/
    configs/                # Configuration files specific to the bounded context
    adapters/               # Implementations of external interfaces
      repositories/         # Repository implementations
    domain/                 # Core domain logic
      models/
        aggregates/         # Aggregate root models
        value-objects/      # Value objects
        exceptions/         # Domain-specific exceptions
      ports/                # Interfaces for adapters
      events/               # Domain events
        done/
          done.event.ts     # Event definition
          done.event-handler.ts # Event handler
      use-cases/            # Application use cases
        to-do/
          to-do.command.ts  # Command definition
          to-do.command-handler.ts # Command handler
      queries/              # Query definitions and handlers
        get/
          get.query.ts      # Query definition
          get.query-handler.ts # Query handler
    drivers/                # Entry points for the application
      apis/                 # API controllers, DTOs, etc.
      listeners/            # Event listeners
      workers/              # Background workers
      crons/                # Scheduled tasks
      clis/                 # Command-line interfaces

shared/                     # Shared resources across contexts
  configs/                  # Shared configuration files
  adapters/                 # Shared tooling configurations (e.g., loggers, notifications, databases)
  domain/                   # Shared domain logic
    ports/                  # Shared interfaces for adapters
  drivers/                  # Shared entry points
    apis/                   # Shared API-related utilities (e.g., guards, validators). Should not contain endpoints.
    listeners/              # Shared event listener utilities. Should not contain specific event handlers.
    workers/                # Shared background worker utilities. Should not contain specific worker logic.
    crons/                  # Shared scheduled task utilities. Should not contain specific cron job logic.
    clis/                   # Shared command-line interface utilities. Should not contain specific CLI commands.
```

## Hexagonal Architecture Schema

Below is a visual representation of the hexagonal architecture:

```
          +-------------------+
          |   External World  |
          +-------------------+
                   |
                   v
          +-------------------+
          |      Drivers      |
          | (APIs, CLIs, etc.)|
          +-------------------+
                   |
                   v
          +-------------------+
          |  Outbound Ports   |
          | (Interfaces)      |
          +-------------------+
                   |
                   v
          +-------------------+
          |      Domain       |
          | (Core Logic)      |
          +-------------------+
                   ^
                   |
          +-------------------+
          |  Inbound Ports    |
          | (Interfaces)      |
          +-------------------+
                   ^
                   |
          +-------------------+
          |     Adapters      |
          | (Implementations) |
          +-------------------+
```