class User < ActiveRecord::Base
  attr_accessible :account, :friend, :spec, :visible

  has_many :clothes
  has_many :posts
end
