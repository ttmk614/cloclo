class PostController < ApplicationController
	include RestGraph::RailsUtil
	before_filter :load_facebook

def new
	user = User.find_by_account(params[:account])
	newpost = user.posts.create(:content => params[:content])
    
	#post a feed on user's facebook wall
    unless rest_graph.access_token.nil?
      # logged in
      message = "Join CloClo!\n" + params[:content]
      
      rest_graph.post('/me/feed', 
      				  :message => message,
                      :picture => "http://cloclo.herokuapp.com/assets/sis_cloclo.gif",
                      :link => "http://cloclo.herokuapp.com",
                      :caption => "CloClo -- Share Our Cloud Closet.",
                      :description => "Solution to daily clothes management and sharing.")
      end   #message, picture, link, name, caption, description, source, place, tags

	render :json => { "content"=> params[:content], 
					 "created_at" => newpost.created_at.localtime("+08:00").to_s.split("+")[0] 
	}

end

def newComment #params-- account, postid, content
	post = Post.find(params[:postid])
	newcomment = post.comments.create(:content => params[:content], 
									  :user_id => User.find_by_account(params[:account]).read_attribute(:id))
	#parent post's update time
	post.user.update_attribute(:updated_at, Time.now)
	
	render :json => { "content" => params[:content], 
			 		  "created_at" => newcomment.created_at.localtime("+08:00").to_s.split("+")[0] 
	}
end

private
  def load_facebook
    rest_graph_setup(:write_session => true)
  end

end
