class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :account
      t.text :friend
      t.text :visible
      t.text :spec

      t.timestamps
    end
  end
end
