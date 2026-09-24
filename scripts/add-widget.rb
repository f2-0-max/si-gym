require 'xcodeproj'
require 'fileutils'

proj_path = 'ios/App/App.xcodeproj'
src_dir = 'ios-widget/SeleenWidget'
dest_dir = 'ios/App/SeleenWidget'
FileUtils.rm_rf(dest_dir)
FileUtils.cp_r(src_dir, dest_dir)

project = Xcodeproj::Project.open(proj_path)
app = project.targets.find { |t| t.name == 'App' }

widget = project.new_target(:app_extension, 'SeleenWidget', :ios, '17.0')
group = project.main_group.new_group('SeleenWidget', 'SeleenWidget')
%w[SeleenWidget.swift Schedule.swift].each do |f|
  widget.add_file_references([group.new_file(f)])
end
group.new_file('Info.plist')

widget.build_configurations.each do |c|
  s = c.build_settings
  s['PRODUCT_BUNDLE_IDENTIFIER'] = 'com.seleen.fitness.widget'
  s['PRODUCT_NAME'] = 'SeleenWidget'
  s['INFOPLIST_FILE'] = 'SeleenWidget/Info.plist'
  s['GENERATE_INFOPLIST_FILE'] = 'NO'
  s['SWIFT_VERSION'] = '5.0'
  s['IPHONEOS_DEPLOYMENT_TARGET'] = '17.0'
  s['TARGETED_DEVICE_FAMILY'] = '1,2'
  s['SKIP_INSTALL'] = 'YES'
  s['LD_RUNPATH_SEARCH_PATHS'] = '$(inherited) @executable_path/Frameworks @executable_path/../../Frameworks'
end

widget.add_system_framework(%w[WidgetKit SwiftUI])

app.add_dependency(widget)
embed = app.new_copy_files_build_phase('Embed App Extensions')
embed.dst_subfolder_spec = '13'
bf = embed.add_file_reference(widget.product_reference, true)
bf.settings = { 'ATTRIBUTES' => ['RemoveHeadersOnCopy'] }

project.save
puts 'SeleenWidget target added'
