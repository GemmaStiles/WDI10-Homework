namespace :twitter do
	desc "Clears the user and tweet tables"
	task :clear => :environment do
		User.destroy_all
		Tweet.destroy_all
	end		

	desc "Creates fake Twitter posts and users"
	task :posts, [:user_count] => :environment do |t, args|
		FactoryGirl.create_list :user_with_tweets, args[:user_count].to_i
		puts "users: #{ User.count }, tweets: #{ Tweet.count }"
	end	

	desc "Searches Twitter and fetches number of Tweets matching the specified query"
	task :search, [:query, :limit] => :environment do |t, args|
		limit = args[:limit].to_i
    	$client.search(args[:query], :result_type => "recent").take(limit).collect do |tweet|
      		puts "User: #{tweet.user.name}, Handle: #{tweet.user.screen_name}, Post: #{tweet.text} "
      		Tweet.create(:post => tweet.text)
		end
	end	
		# YOUR CODE GOES HERE
		# DON'T USE FACTORYGIRL
		# FETCH LIMIT NUMBER OF TWEETS MATCHING QUERY FROM TWITTER AND INSERT THEM INTO THE DB
		# DON'T CREATE USERS
		# EG. rake twitter:search[butterfly,80]
		# GEM THAT TALKS TO TWITTER?

		
end