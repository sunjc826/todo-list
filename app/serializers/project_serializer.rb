class ProjectSerializer
  include JSONAPI::Serializer
  attributes :completed, :user_id, :title, :content

  belongs_to :user
  has_many :shared_project_users
  has_many :shared_users, class_name: "User", through: :shared_project_users, foreign_key: "project_id", serializer: UserSerializer
  has_many :tasks
end
