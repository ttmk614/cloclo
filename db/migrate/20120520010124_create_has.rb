class CreateHas < ActiveRecord::Migration
  def change
    create_table :has do |t|
      t.integer :user_id
      t.integer :cloth_id

      t.timestamps
    end
  end
end
