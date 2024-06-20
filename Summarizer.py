def summarizemain(transcript_file):
    import os
    from transformers import pipeline
    from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
    summarizer = pipeline("summarization", model = "facebook/bart-large-cnn")
    
    if not os.path.exists(transcript_file): 
        print('The transcript file does not exist!')
        return False

    with open(transcript_file, encoding="utf-8") as f:
        transcript = f.read()
    text=str(transcript)
    print('Summarizing video....', end='')

    tokenizer = AutoTokenizer.from_pretrained("facebook/bart-large-cnn")
    model = AutoModelForSeq2SeqLM.from_pretrained("facebook/bart-large-cnn")

    tokens_input = tokenizer.encode("summarize: "+text, return_tensors='pt')
    ids = model.generate(tokens_input, min_length=150, max_length=220)
    summary = tokenizer.decode(ids[0], skip_special_tokens=True)

    summary = str(summary)
    print('Done!')

    return summary