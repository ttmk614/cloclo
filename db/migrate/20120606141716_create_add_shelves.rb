class CreateAddShelves < ActiveRecord::Migration
  def up
  	change_table :users do |t|
    	t.string :sh1
    	t.string :sh2
    	t.string :sh3
    	t.string :sh4
    	t.string :sh5
    	t.string :sh6
    	t.string :sh7
    end
  end

  def down
  end
end
