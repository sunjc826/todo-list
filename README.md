# README

- Name: Sun Jia Cheng
- Matriculation Number: A0214263N

## Developer

- Details

  - Ruby version: ruby 2.7.2p137 (2020-10-01 revision 5445e04352) [x86_64-linux]
  - Frontend: React
  - Backend: Rails
  - Uses react-rails
  - Database: Postgres

- Installing dependencies

  ```
  bundle install
  yarn install
  ```

- Resetting database and using the most recent migrations
  ```
  rails db:schema:load (to clear db)
  rails db:migrate
  ```

## User

- Links

  - [Deployed Application](secure-shelf-48205.herokuapp.com/)

- Functionalities

  - Account creation
  - Add tasks with deadlines and priorities
  - Comment on tasks
  - Toggle completion state of tasks and projects
  - Tags, Labels, Filters

For more, see the User Manual in the application itself, or [here](https://github.com/sunjc826/todo-list/blob/main/submission/final/UserManual.pdf).

- Issues

  - Project sharing is quite experimental. So far, adding and deleting tasks on a shared project seems to work correctly, however editing of tasks, as well as adding/deleting subtasks and comments will probably not work.
