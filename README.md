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

- Database commands

  - To clear database data, `rails db:schema:load`
  - To update migrations, `rails db:migrate`
  - Do not use `db:seed`, since seed data is very much outdated

- Starting application

  - In terminal, type `rails server`
  - Go to port 3000 on localhost

- Testing

  - Backend API testing: Insomnia
  - Database access: `rails console`

## User

- Links

  - [Deployed Application](secure-shelf-48205.herokuapp.com/)

- Some of the Functionalities

  - Account creation
  - Add tasks with deadlines and priorities
  - Comment on tasks
  - Toggle completion state of tasks and projects
  - Tags, Labels, Filters

For more, see the User Manual in the application itself, or [here](https://github.com/sunjc826/todo-list/blob/main/submission/final/UserManual.pdf).

- Issues

  - Project sharing is very experimental and will likely stay the case in future due to the sheer difficulty in its implementation. So far, adding and deleting tasks on a shared project seems to work correctly, however editing of tasks, as well as adding/deleting subtasks and comments will probably not work. Even checking/unchecking completion status does not work.
