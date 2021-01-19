class UserSerializer
  include JSONAPI::Serializer
  attributes :name, :email


  has_many :labels
  has_many :filters
  has_many :projects
  has_many :shared_project_users
  has_many :shared_projects, class_name: "Project", through: :shared_project_users, foreign_key: "user_id", serializer: ProjectSerializer
  has_many :tasks
  has_many :tags
  has_many :activities, through: :tasks
end
