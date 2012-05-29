class ClothsController < ApplicationController
def create_form
  user = User.find_by_account(cookies[:user].to_s)
  user.cloths.create(:classification => params[:choose_type], :color => params[:choose_color], :description => params[:description], 
                      :privacy => params[:choose_privacy]))#, :image => cookies[:user].to_s+'.jpg')#, :redRemark, :redTime, :signal
end

def upload
  file_name = cookies[:user].to_s + '.jpg'
  upload_path = File.join(Rails.root, 'public', 'uploads', file_name)
  
  File.open(upload_path, 'wb') do |f|
    f.write request.raw_post
  end

  render :text => "ok"
end

def upload_file

  uploaded_io = params[:picture] 
  file_name = 'YA' + '.jpg'
  upload_path = File.join(Rails.root, 'public', 'uploads', file_name)
  
  File.open(upload_path, 'wb') do |f|
    f.write(uploaded_io.read)
  end

  render :text => "ok"
end

private
  def create
  #@cloth = Cloth.new()  
  #@cloth.save
 
  #redirect_to @cloth
  end

end 