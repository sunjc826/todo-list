class AddDetailsToProjects < ActiveRecord::Migration[6.1]
  def change
    add_column :projects, :title, :string
    add_column :projects, :content, :string
  end
end
