class TaskSerializer
  include JSONAPI::Serializer
  attributes :deadline, :date_string, :content, :priority, :completed, :user_id, :project_id

  belongs_to :user
  belongs_to :project

  has_many :subtasks
  has_many :comments
  has_many :tag_tasks
  has_many :label_tasks
  has_many :tags, through: :tag_tasks
  has_many :labels, through: :label_tasks
end
