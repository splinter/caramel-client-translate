This script provides a way for caramel based applications to perform
translations even on the client side

#Installation
1. Copy this script to the themes/{themeName}/js folder of your caramel based jaggery application
2. Include this script in the base page (e.g. themes/{themeName}/pages/single-col-fluid.hbs)
3. Include the appropriate translation definition files in the i18n directory
4. Use the gettext method to translate text


#How does it work?
1. The script looks up the language of the page using the lang attribute in the html tag
2. It then attempts to retrieve a matching language file from the i18n directory of the application (This is not performed in the case of English)
3. The language file is cached in the sessionStorage of the browser
4. The gettext method uses this cache represenation to perform translations


