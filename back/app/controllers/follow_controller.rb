class FollowController < ApplicationController
    protect_from_forgery :except => [:create, :index]

    def index
        follow = Follow.where(follow_id: params[:user_id])
        render json: { following: follow }
    end

    def create
        follow = Follow.new(follow_params)
        follow.save
        render json: { follow: follow }
    end

    private
    def follow_params
        params.require(:follow).permit(:follow_id, :followed_id)
    end
end
