class TaskController < ApplicationController
    protect_from_forgery :except => [:create, :index, :delete, :update]

    def index
        task = Task.where(user_id: params[:user_id])
        render json: { task: task }
    end

    def get_all_task
        task = Task.all
        like = []
        for i in task do
            like.push(Like.where(task_id: i[:id]))
        end
        render json: { task: task, like: like }
    end

    def create
        task = Task.new(task_params)
        task.save
        render json: { task: task }
    end

    def delete
        p params
        task = Task.find(params[:id])
        if task[:user_id] == params[:user_id] then
            task.destroy
            render json: { result: true }
        else
            render json: { result: false }
        end
    end

    def update
        task = Task.find(params[:id])
        task.update(task_update_params)
        render json: { task: task }
    end

    private
    def task_params
        params.require(:task).permit(:user_id, :context, :checked)
    end

    private
    def task_update_params
        params.require(:task).permit(:id, :user_id, :context, :checked)
    end
end
