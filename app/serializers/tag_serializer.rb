class TagSerializer
  include JSONAPI::Serializer
  attributes :description


  has_many :tag_tasks
  has_many :filter_criteria, as: :filterable
  has_many :tasks, through: :tag_tasks
  has_many :filters, through: :filter_criteria

end
