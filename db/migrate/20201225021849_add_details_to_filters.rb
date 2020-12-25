class AddDetailsToFilters < ActiveRecord::Migration[6.1]
  def change
    add_column :filters, :startdate, :datetime
    add_column :filters, :enddate, :datetime
  end
end
