class Post < ActiveRecord::Base
  attr_accessible :content, :name, :user_id

  has_many :comments
  belongs_to :user
end
