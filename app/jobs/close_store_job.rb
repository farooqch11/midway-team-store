class CloseStoreJob < ApplicationJob
  queue_as :default

  def perform(id)
    store = Store.find(id)
    if store.countdown <= Time.now
      store.closed = true
      store.save
    else
      t = store.countdown - Time.now
      CloseStoreJob.set(wait: t).perform_later( id)
    end
  end
end
