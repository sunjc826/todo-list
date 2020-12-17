# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

defaultUser = User.create([
  {
    name: "Default User",
    email: nil
  }
])


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

label = defaultUser.labels.create([
  {
    description: "Label 1"
  }
])


task = defaultUser.tasks.create([
  {
    deadline: nil,
    content: "Task 1",
    priority: 3,
    completed: false,
    project_id: nil
  }
])

project = defaultUser.projects.create([
  {
    
  }
])

