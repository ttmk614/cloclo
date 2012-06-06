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

        @visible_ids = Hash.new()
        @visible_ids[ @me['id'] ] = @me['name']
        #@visible_ids['100000280565711'] = "Hsiang Chih"
        if @user.read_attribute(:visible)
          JSON.parse(@user.read_attribute(:visible)).each do |visible|
            @visible_ids[ visible.to_s ] = rest_graph.get('/'+visible.to_s)['name']

          end
        end

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
  end

  def editfriend
    #get user account
    #@access_token = rest_graph.access_token
    #@me = rest_graph.get('/me')
    user = cookies[:user]

    #@user = User.find_by_account( @me['id'] )
    @user = User.find_by_account( user )

    #update self- friend list
    if params[:editfriend]
      @user.update_attribute(:friend, params[:editfriend].to_json )
    end
    @user = User.find_by_account( user )
    #update selected friends 
    JSON.parse(@user.read_attribute(:friend)).each do |friend|
      userfriend = User.find_by_account(friend)
      if userfriend
        if userfriend.read_attribute(:visible)
          friendsVisible = JSON.parse( userfriend.read_attribute(:visible) )
          if !friendsVisible.include?( cookies['user'] )
            newfriendsVisible = friendsVisible
            newfriendsVisible.push( cookies['user'] )
            userfriend.update_attribute(:visible, newfriendsVisible.to_json)
          end
        else #userfriend's visible is empty
          newfriendsVisible = Array.new()
          newfriendsVisible.push(cookies['user'])
          userfriend.update_attribute(:visible, newfriendsVisible.to_json)
        end
      end
    end
   render :text => params[:editfriend]
  end

  def help
       @access_token = rest_graph.access_token
      if @access_token
        @me = rest_graph.get('/me')
        @friends = rest_graph.get('me/friends')
        @user = User.find_by_account( @me['id'] )
      end
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
