class Task < ApplicationRecord
  belongs_to :user
  # Note to self: although db allows this foreign key to be null,
  # as of Rails 5, by default, the presence of the associated entity
  # is required by default, i.e. there is an additional check outside of 
  # database level requirements.
  # hence the need to explicitly declare optional: true.
  belongs_to :project, optional: true

  has_many :tag_tasks
  has_many :label_tasks
  has_many :tags, through: :tag_tasks
  has_many :labels, through: :label_tasks

  def date_string
    return self.deadline.to_s
  end


end
