class Filter < ApplicationRecord
  include ActiveModel::Validations

  validates :description, presence: true
  validates_with DateValidator
  validates :priority_filter, numericality: { 
    only_integer: true,
    greater_than_or_equal_to: 1,
    less_than_or_equal_to: 5 
  }, allow_nil: true

  belongs_to :user

  has_many :filter_criteria
  has_many :tags, through: :filter_criteria, source: :filterable, source_type: "Tag"
  has_many :labels, through: :filter_criteria, source: :filterable, source_type: "Label"
end

