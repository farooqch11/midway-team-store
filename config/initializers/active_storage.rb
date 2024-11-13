Rails.configuration.to_prepare do
    ActiveStorage::Blob.class_eval do
      before_create :generate_key_with_prefix
  
      private
  
      def generate_key_with_prefix
        self.key = [prefix, self.class.generate_unique_secure_token].join('/')
      end
  
      def prefix
        Time.current.to_i.to_s
      end
    end
end