class Task < ApplicationRecord
    has_many :likes, dependent: :destroy
        has_many :tasks, through: :likes
end
