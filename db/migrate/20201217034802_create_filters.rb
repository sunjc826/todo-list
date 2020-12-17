class CreateFilters < ActiveRecord::Migration[6.1]
  def change
    create_table :filters do |t|
      t.datetime :time_filter
      t.int :priority_filter
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
    add_index :filters, :user
  end
end
