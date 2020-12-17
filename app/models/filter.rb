class Filter < ApplicationRecord
  belongs_to :user

  has_many :filter_criteria
  has_many :tags, through: :filter_criteria, source: :filterable, source_type: "Tag"
  has_many :labels, through: :filter_criteria, source: :filterable, source_type: "Label"
end
