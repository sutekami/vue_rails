class ApiController < ApplicationController
    protect_from_forgery :except => [:create, :index]

    def index
        user_mail = User.find_by(mail: params[:user][:user_id])
        user_id = User.find_by(user_id: params[:user][:user_id])
        if user_mail then
            if user_mail[:password] == params[:user][:password] then
                tekitou = Task.all
                render json: { result: true, user_id: user_mail[:user_id], id: user_mail[:id] }
            else
                render json: { result: false }
            end
        elsif user_id then
            if user_id[:password] == params[:user][:password] then
                render json: { result: true, user_id: user_id[:user_id], id: user_id[:id] }
            else
                render json: { result: false }
            end
        else
            render json: { result: false }
        end
    end

    def create
        user = User.find_by(mail: params[:user][:mail])
        if user then
            # 既存のメアドのため、新規作成不可
            render json: { result: false }
        else
            user_id = User.find_by(user_id: params[:user][:user_id])
            if user_id then
                # 既存のidがあるため新規作成不可
                render json: { result: false }
            else    
                new_user = User.new(new_user_params)
                new_user.save
                render json: { result: true }
            end
        end
    end

    private
    def new_user_params
        params.require(:user).permit(:mail, :user_id, :password)
    end
end
