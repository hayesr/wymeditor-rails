ENV['BUNDLE_GEMFILE'] = File.dirname(__FILE__) + '/../Gemfile'

require 'rake'
require 'rake/testtask'
require 'rspec'
require 'rspec/core/rake_task'

puts "loading tasks"
desc "Run the test suite"
task :spec => ['spec:setup', 'spec:requests']

namespace :spec do
  desc "Setup the test environment"
  task :setup do
    rails_path = File.expand_path(File.dirname(__FILE__) + '/../spec/dummy')
  end
  
  desc "Run the code examples in spec/requests"
  RSpec::Core::RakeTask.new(:requests) do |task|
    dummy_root = File.expand_path(File.dirname(__FILE__) + '/..')
    task.pattern = dummy_root + '/spec/requests/**/*_spec.rb'
  end

end
