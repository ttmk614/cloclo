class ClothsController < ApplicationController
def create_form
  #if upload file
  uploaded_io = params[:upload_pic]
  if !uploaded_io.nil?
    file_name = cookies[:user].to_s + '_' + Time.now.to_i.to_s + '.jpg'
    upload_path = File.join(Rails.root, 'public', 'uploads', file_name)
    File.open(upload_path, 'wb') do |f|
      f.write uploaded_io.read
    end
    cookies[:path] = file_name
  end

  user = User.find_by_account(cookies[:user].to_s)
  t = user.cloths.create(:public_class   => params[:choose_type],
                         :color          => params[:choose_color].to_json, 
                         :description    => params[:description], 
                         :privacy        => params[:choose_privacy],
                         :image          => cookies[:path], 
                         :signal         => "lightAvailable")#, :redRemark, :redTime, :signal
  cookies[:temp] = t[:id]
  redirect_to "/created"
end

def upload
  file_name = cookies[:user].to_s + '_' + Time.now.to_i.to_s + '.jpg'
  upload_path = File.join(Rails.root, 'public', 'uploads', file_name)
  cookies[:path] = file_name
  
  File.open(upload_path, 'wb') do |f|
    f.write request.raw_post
  end

  render :text => "ok"
end

def browse_method
  cookies[:temp] = params[:shelf]
  render :text => "ok"
end

def drop_method
  user = User.find_by_account(cookies[:user])
  t = user.cloths.find(cookies[:temp].to_i)
  t[:private_class] = params[:shelf]
  t.save
  render :text => params[:shelf]
end

private
  def create
  #@cloth = Cloth.new()  
  #@cloth.save
 
  #redirect_to @cloth
  end

end 