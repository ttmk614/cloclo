class CreateCloths < ActiveRecord::Migration
  def change
    create_table :cloths do |t|
      t.integer :user_id
      t.string :image
      t.text :description
      t.string :color
      t.string :classification
      t.boolean :privacy
      t.boolean :signal
      t.string :redRemark
      t.time :redTime

      t.timestamps
    end
  end
end
