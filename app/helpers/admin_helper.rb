module AdminHelper
    def formatMoney(p)
        return "$ #{p.to_f/100.0}"
    end
end
