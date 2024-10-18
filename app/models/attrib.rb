class Attrib < ApplicationRecord
  has_many :product_attribs

  def get_values
    values = []
    if self.attrib_type == "color"
      self.product_attribs.each do |pa|
       if pa.color != nil
        i = pa.color.id
        c = pa.color.code
        t = pa.color.title
        val = {
          id: i,
          title: t,
          color: c,
        }
        values << val if !values.include? val
       end
      end
    else
      self.product_attribs.each do |pa|
        values << pa.title if !values.include? pa.title
      end
    end
    return values
  end
end
