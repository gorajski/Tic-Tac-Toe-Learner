get '/' do
	@row_size = 12
	@column_size = 12
  erb :index
end