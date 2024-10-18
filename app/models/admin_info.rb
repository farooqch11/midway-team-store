class AdminInfo < ApplicationRecord
    belongs_to :team_admin, :optional => true
end
