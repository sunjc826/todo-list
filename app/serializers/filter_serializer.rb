class FilterSerializer
  include JSONAPI::Serializer
  attributes :time_filter, :priority_filter, :user_id

  belongs_to :user

  has_many :filter_criteria
  has_many :tags, through: :filter_criteria, source: :filterable, source_type: "Tag"
  has_many :labels, through: :filter_criteria, source: :filterable, source_type: "Label"
end
