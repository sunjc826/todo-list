class ActivitySerializer
  include JSONAPI::Serializer
  attributes :crud_type, :item, :created_at

  belongs_to :task
end
