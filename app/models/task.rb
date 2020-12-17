class Task < ApplicationRecord
  belongs_to :user
  belongs_to :project

  has_many :tag_tasks
  has_many :label_tasks
  has_many :tags, through: :tag_tasks
  has_many :labels, through: :label_tasks
  

end
