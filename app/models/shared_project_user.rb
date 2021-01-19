class SharedProjectUser < ApplicationRecord
  belongs_to :shared_project, class_name: "Project", foreign_key: "project_id"
  belongs_to :shared_user, class_name: "User", foreign_key: "user_id"
end
