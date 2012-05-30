class ClothClassification < ActiveRecord::Migration
  def up
  	change_table :cloths do |t|
    	t.remove :classification
    	t.string :public_class
    	t.string :private_class
    end
  end

  def down
  end
end
