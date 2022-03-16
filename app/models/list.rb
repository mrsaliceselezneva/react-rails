class List < ApplicationRecord
  has_many :cards , dependent: :destroy
  belongs_to :table
  validates :name, presence: true
end
