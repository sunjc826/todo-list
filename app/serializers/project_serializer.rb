class ProjectSerializer
  include JSONAPI::Serializer
  attributes :completed, :user_id

  belongs_to :user

  has_many :tasks
end
