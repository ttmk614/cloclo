class Cloth < ActiveRecord::Base
  attr_accessible :classification, :color, :description, :image, :privacy, :redRemark, :redTime, :signal

  belongs_to :user
end
