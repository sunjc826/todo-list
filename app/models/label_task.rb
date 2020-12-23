class LabelTask < ApplicationRecord
  belongs_to :label
  belongs_to :task
  # belongs_to :user
end
