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
      
      for less_theme in less_themes
        FileUtils.mkdir_p(less_cssPath)
          begin
            command = [less_bin, ' -x ',
                       less_themePath + less_theme['id'] + '/index.less',
                       ' > ',
                       less_cssPath + less_theme['id'] + '.css'
                      ].join(' ')
            
            puts 'Compiling LESS: ' + command
            puts `#{command}`
            raise "LESS compilation error" if $?.to_i != 0
          end
          
          # Add this output file so it won't be "cleaned away"
          site.static_files << CssFile.new(site, site.source, less_cssPath, less_theme['id'] + '.css')
      end
    end
  end
end
