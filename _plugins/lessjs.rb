module Jekyll

  class CssFile < StaticFile
    def write(dest)
      dest_path = destination(dest)
      FileUtils.mv(path, dest_path)
    end
  end

  class LessJsGenerator < Generator
    safe true
    priority :high
    
    def generate(site)
      less_themes     = site.config['theme']['list']
      less_themePath  = site.config['theme']['less'] + '/'
      less_cssPath    = site.config['theme']['css'] + '/'
      less_bin        = site.config['theme']['bin'] || 'lessc'
      themeParts      = site.config['theme']['parts'].clone

      for less_theme in less_themes
        FileUtils.mkdir_p(less_cssPath)
          begin
            themeLess = less_themePath + less_theme['id']
            themeCss  = less_cssPath + less_theme['id']

            for theme_part in themeParts << 'index'
              command = less_bin

              if !site.config['development']
                command = command + ' -x'
              end

              command = command + ' ' + themeLess + '/' + theme_part + '.less' + ' > ' + themeCss + '_' + theme_part + '.css'
              
              print less_theme['id'] + ' (' + theme_part + ') ' + `#{command}` + "\n".ljust(21)
            
              raise "LESS compilation error" if $?.to_i != 0
              
              # Add this output file so it won't be "cleaned away"
              site.static_files << CssFile.new(site, site.source, less_cssPath, less_theme['id'] + '_' + theme_part + '.css')

            end
          end
      end
    end
  end
end
