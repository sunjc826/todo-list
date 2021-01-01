class CreateActivities < ActiveRecord::Migration[6.1]
  def change
    create_table :activities do |t|
      t.string :crud_type
      t.string :item
      t.references :task, null: false, foreign_key: true

      t.timestamps
    end
  end
end
