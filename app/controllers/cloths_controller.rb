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

  if params[:choose_privacy] != nil
    if params[:choose_privacy] == "public"
      pri = false
    else
      pri = true
    end
  end

  user = User.find_by_account(cookies[:user].to_s)
  t = user.cloths.create(:public_class   => params[:choose_type], 
                         :description    => params[:description], 
                         :privacy        => pri,
                         :image          => cookies[:path], 
                         :color          => params[:choose_color].to_json,
                         :signal         => "lightAvailable")#, :redRemark, :redTime, :signal
  
  params[:choose_color].each do |i|
    c = t.colors.create(:cloth_id   => t[:id],
                        :color      => i)
  end
  
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

=begin
def red_remark
  $(this).attr('title')
end
=end

def drop_method
  user = User.find_by_account(cookies[:user])
  t = user.cloths.find(cookies[:temp].to_i)
  t[:private_class] = params[:shelf]
  t.save
  render :text => "ok"
end

def switch
  user = User.find_by_account(cookies[:user])
  t = user.cloths.find(params[:id].to_i)
  t[:signal] = params[:changeTo]
  t.save
  render :text => "ok"
end

def red_mark
  user = User.find_by_account(cookies[:user])
  t = user.cloths.find(params[:id].to_i)
  t[:redRemark] = params[:content]
  #t[:redTime] = Time.now.to_i.to_s
  t.save
  render :text => params[:content]
  
end

def search_form
  user = User.find_by_account(cookies[:user].to_s)
  if params[:choose_privacy] != nil
    if params[:choose_privacy] == "public"
      pri = false
    else
      pri = true
    end
  end

  if params[:choose_privacy] != nil && params[:choose_type] != nil #若user想要找特定權限、公開分類的衣服
    @new = user.cloths.where(:privacy => pri, :public_class => params[:choose_type])
  elsif params[:choose_privacy] != nil && params[:choose_type] == nil
    @new = user.cloths.where(:privacy => pri)
  elsif params[:choose_privacy] == nil && params[:choose_type] != nil 
    @new = user.cloths.where(:public_class   => params[:choose_type])
  else #params[:choose_privacy] == nil && params[:choose_type] == nil 
    @new = user.cloths.all
  end

  if params[:choose_color] != nil
    i = 0
    @result = []
    @new.each do |r|
      if r['color'].include? params[:choose_color]
        @result[i] = r
        i = i + 1
      end
      
    end
  else
    @result = @new
  end
  #params[:result] = @result
  render :template => '/cloths/search_after.html.erb'#, :result => params[:result]
end

def delete
  @cloth_d = Cloth.find(params[:id])
  file_name = @cloth_d.image
  delete_path = File.join(Rails.root, 'public', 'uploads', file_name)

  #if file_name exists and file exists
  if File.file?(delete_path)
    File.delete(delete_path) 
  end
  @cloth_d.destroy

  redirect_to '/browse.html'
end

private
  def create
  #@cloth = Cloth.new()  
  #@cloth.save
 
  #redirect_to @cloth
  end

end 