class LabelTaskSerializer
  include JSONAPI::Serializer
  attributes 

  belongs_to :label
  belongs_to :task
end
