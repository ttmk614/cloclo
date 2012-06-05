class Color < ActiveRecord::Base
  attr_accessible :cloth_id, :color

  belongs_to :cloth
end
