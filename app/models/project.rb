class Project < ApplicationRecord
  validates :title, presence: true


  belongs_to :user
  has_many :shared_project_users, dependent: :destroy
  has_many :shared_users, class_name: "User", through: :shared_project_users, foreign_key: "project_id"
  has_many :tasks, dependent: :destroy
  has_many :comments, through: :tasks
  has_many :subtasks, through: :tasks
  has_many :activities, through: :tasks
end
