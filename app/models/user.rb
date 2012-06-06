class User < ActiveRecord::Base
  attr_accessible :account, :friend, :spec, :visible, :sh1, :sh2, :sh3, :sh4, :sh5, :sh6, :sh7

  validates :account, :presence => true

  has_many :cloths
  has_many :posts
end
