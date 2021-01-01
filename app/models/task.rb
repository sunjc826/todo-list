class Task < ApplicationRecord
  validates :content, presence: true
  validates :deadline, presence: true
  validates :priority, numericality: { 
    only_integer: true,
    greater_than_or_equal_to: 1,
    less_than_or_equal_to: 5 
  }

  belongs_to :user
  # Note to self: although db allows this foreign key to be null,
  # as of Rails 5, by default, the presence of the associated entity
  # is required by default, i.e. there is an additional check outside of 
  # database level requirements.
  # hence the need to explicitly declare optional: true.
  belongs_to :project, optional: true

  has_many :subtasks, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :tag_tasks, dependent: :destroy
  has_many :label_tasks, dependent: :destroy
  has_many :tags, through: :tag_tasks
  has_many :labels, through: :label_tasks
  has_many :activities, dependent: :destroy
  def date_string
    return self.deadline.to_s
  end


end
