function getProgramLink(document_root) {

    path = "#articleSoundsList > div > div.swiper-wrapper > ul > li > div.play-wrap";
    el = document_root.querySelector(path).innerHTML;
    start = el.search("static.prsa.pl");
    end = el.search(".mp3");
    
    if (start>=0 && end>=0) {
        end+=4;
        len = end-start;
        url = "http://"+el.substr(start, len);

        // title:
        start = el.search("title=\"odsłuchaj ")
        title = el.substr(start+17)
        end = title.search("\"")
        title = title.substr(0, end);
        if (title.length>0) {
            html = "<a href=\"" + url + "\" download=\""+title+".mp3\">Pobierz plik z audycją</a>";
        } else {
            html = "<a href=\"" + url + "\" download=\"audycja.mp3\">Pobierz plik z audycją</a>";
        }
        return html;
    }
    return "Nie znalazłem pliku z audycją";

}

chrome.runtime.sendMessage({
    action: "getSource",
    source: getProgramLink(document)
});
