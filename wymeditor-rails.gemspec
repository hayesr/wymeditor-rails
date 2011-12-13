$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "wymeditor-rails/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "wymeditor-rails"
  s.version     = WymeditorRails::VERSION
  s.authors     = ["Seth Faxon"]
  s.email       = ["seth.faxon@gmail.com"]
  s.homepage    = ""
  s.summary     = "wymeditor with Rails 3.1 asset pipeline."
  s.description = "Makes wymeditor play well with Rails 3.1 asset pipeline."

  s.files = Dir["{app,config,db,lib}/**/*"] + ["MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["spec/**/*"]

  s.add_dependency "rails", "> 3.1.0"
  s.add_dependency "jquery-rails"

  s.add_development_dependency "sqlite3"
  s.add_development_dependency "rspec-rails"
end
