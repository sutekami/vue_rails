class User < ApplicationRecord
    has_secure_password
    has_many :likes, dependent: :destroy
        has_many :tasks, through: :likes
end
