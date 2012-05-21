class ChangeComment < ActiveRecord::Migration
  def up
  	change_table :comments do |t|
    	t.remove :name
    	t.integer :user_id
    end
  end

  def down
  end
end
