class CreateReplies < ActiveRecord::Migration
  def change
    create_table :replies do |t|
      t.integer :post_id
      t.integer :comment_id

      t.timestamps
    end
  end
end
