class Cloth < ActiveRecord::Base
  attr_accessible :public_class, :private_class, :color, :description, :image, :privacy, :redRemark, :redTime, :signal

  belongs_to :user
  has_many :colors
end
