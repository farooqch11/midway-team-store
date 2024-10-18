class ColorImage < ApplicationRecord
    belongs_to :product

    attr_reader :color_code

    def color_code
        self.get_color_code
    end
    def get_color_code
        c = self.get_color
        if c
            return c.code
        end
        return ""
    end
    def get_color
        c = Color.find_by_title self.color
        if c
            return c
        end
        return false
    end

    def as_json(options = {})
        super(options).merge({
            'color_code' => self.color_code
        })
    end
end
