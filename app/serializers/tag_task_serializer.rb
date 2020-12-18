class TagTaskSerializer
  include JSONAPI::Serializer
  attributes 

  belongs_to :tag
  belongs_to :task
end
