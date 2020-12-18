class User < ApplicationRecord
  has_many :labels
  has_many :filters
  has_many :projects
  has_many :tasks
  
  

end
