module Placeholder
  extend ActiveSupport::Concern

  def self.image_generator(side:)
    "https://placehold.it/#{side}"
  end
end