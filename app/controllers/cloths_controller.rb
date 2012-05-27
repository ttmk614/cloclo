class ClothsController < ApplicationController
def upload
  file_name = session[:session_id].to_s() + '.jpg'
  upload_path = File.join(Rails.root, 'public', 'uploads', file_name)
  
  File.open(upload_path, 'wb') do |f|
    f.write request.raw_post
  end

  render :text => "ok"
end
 
private
 
#def create
#  @cloth = Cloth.new()  
#  @cloth.save
 
  #redirect_to @photo
#end
end
