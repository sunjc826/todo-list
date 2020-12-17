# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

users = User.create([
  {
    name: "Default User",
    email: nil
  }
])

user1 = users[0]

tags = Tag.create([
  {
    description: "Work"
  },
  {
    description: "Social"
  },
  {
    description: "Personal"
  }
])

labels = Label.create([
  {
    user_id: user1.id,
    description: "Label 1"
  }
])


projectlessTasks = Task.create([
  {
    user_id: user1.id,
    deadline: nil,
    content: "Task 1",
    priority: 3,
    completed: false,
    project_id: nil
  }
])

projects = Project.create([
  {
    user_id: user1.id,
    title: "Project 1",
    content: "This is a sample project",
    completed: false
  }
])

project1 = projects[0]

projectTasks = Task.create([
  {
    user_id: user1.id,
    project_id: project1.id,
    deadline: nil,
    content: "Task 2",
    priority: 5,
    completed: false,
  },
  {
    user_id: user1.id,
    project_id: project1.id,
    deadline: nil,
    content: "Task 3",
    priority: 6,
    completed: false,
  }
])
