from flask import Flask, request
import Audiodownloader as ad
import Transcriptgenerator as tg
import Summarizer as sm
import Translation as tl
import Websummarization as ws
import os


app = Flask(__name__)


@app.get('/summary')
def summary_api():
    url = request.args.get('url', '')
    if "youtube.com" in url:
        audio_file = ad.youtube_audio_downloader(url) 
        transcript = tg.transcribe(audio_file)
        summary = sm.summarizemain(transcript)
        os.remove(audio_file)
        os.remove(transcript)
    else:
        transcript = ws.websummar(url)
        summary = sm.summarizemain(transcript)
        os.remove(transcript)
    return summary, 200


@app.get('/translate')
def translate_api():
    text = request.args.get('summary')
    language = request.args.get('language')
    translation = tl.translate1(text, language)
    return translation, 200

if __name__ == '__main__':
    app.run()
