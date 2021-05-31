# Specify session store key
if Rails.env == 'production'
  Rails.application.config.session_store :cookie_store, key: '_lsjtest',
                                                        domain: 'ljtest-json-api'
else
  Rails.application.config.session_store :cookie_store, key: '_ljtest'
end
