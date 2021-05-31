class CreateUserProfiles < ActiveRecord::Migration[6.0]
  def change
    create_table :user_profiles do |t|
      t.belongs_to :user, foreign_key: true
      t.string :profile_username

      t.timestamps
    end
  end
end
