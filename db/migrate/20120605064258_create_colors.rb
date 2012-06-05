class CreateColors < ActiveRecord::Migration
  def change
    create_table :colors do |t|
      t.string :color
      t.integer :cloth_id

      t.timestamps
    end
  end
end
