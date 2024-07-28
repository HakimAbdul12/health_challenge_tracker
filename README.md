# HealthChallengeTracker
# Overview

This project includes a service and component to manage and display user workout data. It features a grid table displaying workouts by type and supports both dark and light modes.

This project is used to track workout progress was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.3.

# Running the Project Locally
  ## cloning the repo
  Run  `git clone https://github.com/HakimAbdul12/health_challenge_tracker.git` to clone the repo

  ## Navigate to the Project Directory:
  Run `cd health_challenge_tracker`

  ## Install Dependencies:
  Run `npm i`

  ## Development server

  Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


  ## Build

  Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

  ## Running unit tests

  Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

  ## Code Coverage

  ### Running Tests

  To run the tests and generate the code coverage report, use:

  ```bash
  ng test --code-coverage
  ```
# Assumptions
1. Grid Table Workouts Display:

    In the grid table, workouts of the same type are listed in the format {workout_type}{number}. For example, if a user has multiple workouts of the type "Running", it will be displayed as Running(2).

2. Dark and Light Mode:

    The application supports both dark and light modes. The theme can be toggled to switch between these modes, and styles are adjusted accordingly to match the selected theme.
