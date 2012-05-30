class SignalModify < ActiveRecord::Migration
  def up
  	change_table :cloths do |t|
    	t.remove :signal
    	t.string :signal
    end
  end

  def down
  end
end