class CreateFilterCriteria < ActiveRecord::Migration[6.1]
  def change
    create_table :filter_criteria do |t|
      t.references :filter, null: false, foreign_key: true
      t.bigint :filterable_id
      t.string :filterable_type
      t.timestamps
    end

    add_index :filter_criteria, [:filterable_id, :filterable_type]
  end
end
