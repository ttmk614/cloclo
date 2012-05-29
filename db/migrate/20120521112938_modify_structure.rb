class ModifyStructure < ActiveRecord::Migration
  def up
	#add_column :comments, :post_id, :integer
	add_column :posts, :user_id, :integer
	
	drop_table :has
	drop_table :replies
  end

  def down
  end
end
