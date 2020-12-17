class FilterCriterium < ApplicationRecord
  belongs_to :filter
  belongs_to :filterable, polymorphic: true
end
