module PortfoliosHelper
  def image_generator(side:)
    "https://placehold.it/#{side}"
  end

  def portfolio_img(img, type)
    if img.model.main_image? || img.model.thumb_image?
      img
    elsif type == 'thumb'
      image_generator(side: '300')
    else type == 'main'
      image_generator(side: '450')
    end
  end
end
