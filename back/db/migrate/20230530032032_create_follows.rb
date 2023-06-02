class CreateFollows < ActiveRecord::Migration[7.0]
  def change
    create_table :follows do |t|
      t.string :follow_id
      t.string :followed_id
      t.timestamps
    end
  end
end
