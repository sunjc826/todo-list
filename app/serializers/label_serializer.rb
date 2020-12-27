class LabelSerializer
  include JSONAPI::Serializer
  attributes :description, :user_id, :color

  belongs_to :user

  has_many :label_tasks
  has_many :filter_criteria, as: :filterable
  has_many :tasks, through: :label_tasks
  has_many :filters, through: :filter_criteria
end
