class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.string :content
      t.references :task, null: false, foreign_key: true

      t.timestamps
    end
    add_index :comments, :task
  end
end
