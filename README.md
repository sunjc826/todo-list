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

  - [Deployed Application](https://secure-shelf-48205.herokuapp.com/)

- Some of the Functionalities

  - Account creation
  - Add tasks with deadlines and priorities
  - Comment on tasks
  - Toggle completion state of tasks and projects
  - Tags, Labels, Filters

For more, see the User Manual in the application itself, or [here](https://github.com/sunjc826/todo-list/blob/main/submission/final/UserManual.pdf).

- Issues
  - Project sharing is very experimental. See warning below.
  - I have removed the ability to edit tasks belonging to shared projects. However, it is still possible for the user to edit tasks before sharing. **Please _DO NOT_ add labels to tasks in projects that you plan to share!** Since other users don't have your labels, the frontend app will crash when trying to access those labels.
