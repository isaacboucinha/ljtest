
runserver:
		rails s --binding=127.0.0.1
	
migrate:
		rails db:migrate

compileassets:
		rake assets:precompile

# NOTE: these are commented because they're just
# to keep track of the actual commands :)
# rubocheck:
# 		rubocop

# rubocorrect:
# 		rubocop -a