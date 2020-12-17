class SubtaskSerializer
  include JSONAPI::Serializer
  attributes :content, :completed, :task_id

  belongs_to :task
end
