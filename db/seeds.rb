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
    email: "default@email.com"
  },
  {
    name: "User 1",
    email: "hello@world.com"
  }
])

user1 = users[0]
user2 = users[1]

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
    deadline: Time.new(2020, 12, 18),
    content: "Task 1",
    priority: 5,
    completed: false,
  },
  {
    user_id: user1.id,
    project_id: project1.id,
    deadline: Time.new(2020, 12, 19),
    content: "Task 2",
    priority: 6,
    completed: false,
  }
])

projectlessTasks = Task.create([
  {
    user_id: user1.id,
    deadline: Time.new(2020, 12, 19),
    content: "Task 3",
    priority: 3,
    completed: false,
    project_id: nil
  },
  {
    user_id: user1.id,
    deadline: Time.new(2020, 12, 19),
    content: "Task 4",
    priority: 3,
    completed: false,
    project_id: nil
  },
  {
    user_id: user1.id,
    deadline: Time.now,
    content: "Task 5",
    priority: 3,
    completed: false,
    project_id: nil
  },
  {
    user_id: user1.id,
    deadline: Time.new(2020, 12, 20),
    content: "Task 6",
    priority: 3,
    completed: false,
    project_id: nil
  }, {
    user_id: user2.id,
    deadline: Time.new(2020, 12, 20),
    content: "Task 7",
    priority: 3,
    completed: false,
    project_id: nil
  }
])
task1 = projectTasks[0]
task2 = projectTasks[1]
Subtask.create([
  {
    content: "Subtask 1",
    completed: false,
    task_id: task1.id,
  },
  {
    content: "Subtask 2",
    completed: false,
    task_id: task1.id,
  },
  {
    content: "Subtask 3",
    completed: false,
    task_id: task2.id,
  },
  {
    content: "Subtask 4",
    completed: false,
    task_id: task2.id,
  },
  {
    content: "Subtask 5",
    completed: false,
    task_id: task2.id,
  }
])