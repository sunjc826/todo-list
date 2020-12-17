class CreateLabels < ActiveRecord::Migration[6.1]
  def change
    create_table :labels do |t|
      t.string :description
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
    add_index :labels, :user
  end
end
