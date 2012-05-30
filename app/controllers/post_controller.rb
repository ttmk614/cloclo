class PostController < ApplicationController

def new
	user = User.find_by_account(params[:account])
	user.posts.create(:content => params[:content])
	#@post.save
	#@post =//created_at

	render :json => { "content"=> params[:content], "created_at" => Post.last.read_attribute(:created_at) }
end

end
