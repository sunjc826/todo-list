class Comment < ApplicationRecord
  validates :content, presence: true

  belongs_to :task
end
