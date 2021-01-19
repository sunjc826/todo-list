class CreateSharedProjectUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :shared_project_users do |t|
      # t.references :shared_project, null: false, foreign_key: true
      # t.references :shared_user, null: false, foreign_key: true
      t.references :project, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
