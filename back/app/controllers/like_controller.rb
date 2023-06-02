class LikeController < ApplicationController
    protect_from_forgery :except => [:create]

    def create
    end

    private
    def like_params
    end
end
