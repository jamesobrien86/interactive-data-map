# Data Map Visualizer (Prototype)

A frontend prototype for visualizing and exploring a system-level data
map.\
The application is designed as an interactive alternative to a
spreadsheet, making it easier to understand how systems process data,
which data categories are involved, and how systems relate to one
another.

------------------------------------------------------------------------

## How to run the project

### Local development

1.  Install dependencies:

    npm install

2.  Start the development server:

    npm run dev


The application uses static sample data embedded directly in the source
code, as allowed by the challenge instructions.

------------------------------------------------------------------------

## Time spent

Approximately **3:54:31** total, including: - data normalization
and modeling - filtering and grouping logic - UI layout and visual
polish - refactoring, cleanup, and documentation

------------------------------------------------------------------------

## Assumptions

-   Sample data is static and does not need to be loaded dynamically.
-   A system may have multiple data uses; when grouped by data use, a
    system can appear in multiple groups.
-   Leaf data categories are derived by taking the final segment of a
    taxonomy path\
    (for example: `user.derived.identifiable.location` → `location`).
-   This project is a prototype rather than production software; clarity
    and extensibility were prioritized over completeness.

------------------------------------------------------------------------

## Trade-offs

-   System dependencies are displayed as a readable list in an
    expandable "Details" section rather than rendered as arrows between
    systems.\
    This keeps the scope reasonable while still surfacing dependency
    information.
-   The Graph implementation is basic and could be greatly enhanced.
-   Animations are intentionally minimal to avoid unnecessary
    complexity.

------------------------------------------------------------------------

## Special / unique features

-   Group-by toggle to relayout systems by:
    -   System Type
    -   Data Use
-   Multi-select filtering by leaf data categories
-   Deterministic colored tags for data categories and data uses,
    improving visual scanability
-   Expandable system details including:
    -   system description
    -   resolved dependency names
-   Clear separation between domain logic (normalization, filtering,
    grouping) and UI components
-   Tools like Charka UI where used to align with Eythca's
    design system.

------------------------------------------------------------------------

## Anything else you should know

-   The codebase is structured to support incremental improvement, such
    as adding a graph-based layout or visual dependency arrows in the
    future.
-   Domain logic is isolated from presentation logic to keep components
    focused and easier to reason about.
-   UI decisions emphasize readability and usability over visual
    complexity.

------------------------------------------------------------------------

## Feedback on the technical challenge

I really enjoyed this challenge, I could of kept going.\
The open-ended nature encouraged creative problem-solving and made it
easy to focus on trade-offs and design decisions rather than a single
"correct" solution. 

Thank you for the opportunity --- I'm looking forward to discussing the
implementation and possible next steps during the debrief interview.
