class TagTask < ApplicationRecord
  belongs_to :tag
  belongs_to :task
  # belongs_to :user
end
