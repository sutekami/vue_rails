class LikeController < ApplicationController
    protect_from_forgery :except => [:create, :delete]

    def create
        like = Like.create(like_params)
        render json: { like: like }
    end

    def delete
        like = Like.find_by(like_params)
        like.destroy
        render json: { like: like }
    end

    private
    def like_params
        params.require(:like).permit(:user_id, :task_id)
    end
end