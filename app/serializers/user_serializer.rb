class UserSerializer
  include JSONAPI::Serializer
  attributes :name, :email


  has_many :labels
  has_many :filters
  has_many :projects
  has_many :tasks
end
