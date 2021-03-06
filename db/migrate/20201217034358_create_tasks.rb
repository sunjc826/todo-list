class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.datetime :deadline
      t.string :content
      t.integer :priority
      t.boolean :completed
      t.references :user, null: false, foreign_key: true
      t.references :project, foreign_key: true
      # project foreign key can be null if task is not part of any project
      t.timestamps
    end

  end
end
