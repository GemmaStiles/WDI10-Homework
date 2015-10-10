class PagesController < ApplicationController
	def index
		@tweet = Tweet.all
	end	
end