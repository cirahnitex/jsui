#!/bin/python
from bs4 import BeautifulSoup
import os

DEV_FILE_NAME = 'dev.html'
HTML_FILE_NAME = 'app.html'


def compressable_script(tag):
    return tag.name == 'script' and tag.get('compress') != 'false' and tag.get('src') is not None


def compressable_style(tag):
    return tag.name == 'link' and (tag.get('rel') is not None and 'stylesheet' in tag.get('rel')) and tag.get(
        'compress') != 'false' and tag.get('href') is not None


def main():
    input_file = open(DEV_FILE_NAME, 'r')
    soup = BeautifulSoup(input_file)


    html_file = open(HTML_FILE_NAME, 'w+')
    html_file.write("""
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <script>""")
    # js script goes here


    for tag in soup.find_all(compressable_script):
        source = open(tag.get('src'), 'r')
        html_file.write(source.read())
        html_file.write('\n')
        source.close()

    html_file.write("""</script>
    <style>""")
    # css stylesheet goes here
    for tag in soup.find_all(compressable_style):
        source = open(tag.get('href'), 'r')
        html_file.write(source.read())
        html_file.write('\n')
        source.close()

    html_file.write("""</style>
</head>
<body>
    """)

    for root, dirs, files in os.walk("Root"):
        for name in files:
            if name[-5:] == '.html':
                path = os.path.join(root, name).replace('\\', '/')
                html_file.write("<div class='template' href='" + path + "'>")
                template = open(path, 'r')
                html_file.write(template.read())
                html_file.write("</div>")

    html_file.write("""
</body>
</html>
    """)
    input_file.close()
    html_file.close()

if __name__ == "__main__":
    main()
