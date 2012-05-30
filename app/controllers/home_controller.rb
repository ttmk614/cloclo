class HomeController < ApplicationController
	include RestGraph::RailsUtil
	before_filter :login_facebook, :only => [:login]
	before_filter :load_facebook, :except => [:login]
	
	def index
      @access_token = rest_graph.access_token
      if @access_token
        @me = rest_graph.get('/me')

        #check by loading the existing user data
        if User.find_by_account( @me['id'] )
          @user = User.find_by_account( @me['id'] )
        #for first use
        else
          @user = User.create(:account => @me['id'],
                              :friend => nil )
          #need to initialize visible
        end
        cookies[:user] = @user.account
      end
  end

  def login
    redirect_to home_path
  end

  def logout
    reset_session
    redirect_to home_path
  end

  def friends
      @access_token = rest_graph.access_token
      if @access_token
        @me = rest_graph.get('/me')
        @friends = rest_graph.get('me/friends')
        @user = User.find_by_account( @me['id'] )
      end

      if @user.read_attribute(:friend)
        @prevList = @user.read_attribute(:friend)
      else
        @prevList = Array.new()
      end

      #respond_to do |format|
      #format.html # editfriend.html.erb
      #format.json { render json: params }
      #end
  end

  def editfriend
    @access_token = rest_graph.access_token
    @me = rest_graph.get('/me')
    #user = cookies[:user]

    @user = User.find_by_account( @me['id'] )

    #checkingfriends = JSON.parse(params[:checkingfriends])
    @user.update_attribute(:friend, params[:editfriend] )

    render :text => params[:editfriend]
    #respond_to do |format|
    #  if params
    #    format.html { render :text => params}
    #    format.json { render json: params }
    #  else
    #    format.html 
      #  format.json { render json: @post.errors, status: :unprocessable_entity }
    #  end
    #end
  end

  def help
    redirect_to home_path
  end


private
  def load_facebook
    rest_graph_setup(:write_session => true)
  end

  def login_facebook
    rest_graph_setup(:auto_authorize         => true,
                     :auto_authorize_scope   => 'read_friendlists, publish_stream',
                     :ensure_authorized      => true,
                     :write_session          => true)
  end  	
end
