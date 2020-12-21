class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true

  has_many :labels
  has_many :filters
  has_many :projects
  has_many :tasks
  
  

end
