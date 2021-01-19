class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true

  has_many :labels
  has_many :filters
  has_many :projects
  has_many :shared_project_users
  has_many :shared_projects, class_name: "Project", through: :shared_project_users, foreign_key: "user_id"
  has_many :tasks
  has_many :tags
  has_many :activities, through: :tasks

  # These are needed for authentication purposes
  # When adding a new tag_task, we want to associate it with the user
  # has_many :tag_tasks
  # has_many :label_tasks
  
end
