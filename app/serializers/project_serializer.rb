class ProjectSerializer
  include JSONAPI::Serializer
  attributes :completed, :user_id, :title, :content

  belongs_to :user

  has_many :tasks
end
