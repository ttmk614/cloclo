class User < ActiveRecord::Base
  attr_accessible :account, :friend, :spec, :visible

  validates :account, :presence => true

  has_many :cloths
  has_many :posts
end
